const linkify = require('linkifyjs')
// require('linkifyjs/plugins/hashtag')(linkify)

export default (text, doLinkify, textFormatting) => {
	const typeMarkdown = {
		bold: textFormatting.bold,
		italic: textFormatting.italic,
		strike: textFormatting.strike,
		underline: textFormatting.underline,
		multilineCode: textFormatting.multilineCode,
		inlineCode: textFormatting.inlineCode,
		plain: textFormatting.plain
	}

	const pseudoMarkdown = {
		[typeMarkdown.bold]: {
			end: '\\' + typeMarkdown.bold,
			allowed_chars: '.',
			type: 'bold'
		},
		[typeMarkdown.italic]: {
			end: typeMarkdown.italic,
			allowed_chars: '.',
			type: 'italic'
		},
		[typeMarkdown.strike]: {
			end: typeMarkdown.strike,
			allowed_chars: '.',
			type: 'strike'
		},
		[typeMarkdown.underline]: {
			end: typeMarkdown.underline,
			allowed_chars: '.',
			type: 'underline'
		},
		[typeMarkdown.multilineCode]: {
			end: typeMarkdown.multilineCode,
			allowed_chars: '(.|\n)',
			type: 'multiline-code'
		},
		[typeMarkdown.inlineCode]: {
			end: typeMarkdown.inlineCode,
			allowed_chars: '.',
			type: 'inline-code'
		},
		'<usertag>': {
			allowed_chars: '.',
			end: '</usertag>',
			type: 'tag'
		},
		[typeMarkdown.plain]: {
			end: '\\' + typeMarkdown.plain,
			allowed_chars: '.',
			type: 'plain'
		}
	}

	const json = compileToJSON(text, pseudoMarkdown)

	const html = compileToHTML(json, pseudoMarkdown)

	const result = [].concat.apply([], html)

	if (doLinkify) return linkifyResult(result)

	return result
}

function compileToJSON(str, pseudoMarkdown) {
	let result = []
	let minIndexOf = -1
	let minIndexOfKey = null

	let links = linkify.find(str)
	let minIndexFromLink = false

	if (links.length) {
		minIndexOf = str.indexOf(links[0].value)
		minIndexFromLink = true
	}

	Object.keys(pseudoMarkdown).forEach(startingValue => {
		const io = str.indexOf(startingValue)
		if (io >= 0 && (minIndexOf < 0 || io < minIndexOf)) {
			minIndexOf = io
			minIndexOfKey = startingValue
			minIndexFromLink = false
		}
	})

	if (minIndexFromLink && minIndexOfKey !== -1) {
		let strLeft = str.substr(0, minIndexOf)
		let strLink = str.substr(minIndexOf, links[0].value.length)
		let strRight = str.substr(minIndexOf + links[0].value.length)
		if (strLeft.length) result.push(strLeft)
		result.push(strLink)
		result = result.concat(compileToJSON(strRight, pseudoMarkdown))
		return result
	}

	if (minIndexOfKey) {
		let strLeft = str.substr(0, minIndexOf)
		const char = minIndexOfKey
		let strRight = str.substr(minIndexOf + char.length)

		if (str.replace(/\s/g, '').length === char.length * 2) {
			return [str]
		}

		const match = strRight.match(
			new RegExp(
				'^(' +
				(pseudoMarkdown[char].allowed_chars || '.') +
				'*' +
				(pseudoMarkdown[char].end ? '?' : '') +
				')' +
				(pseudoMarkdown[char].end
					? '(' + pseudoMarkdown[char].end + ')'
					: ''),
				'm'
			)
		)
		if (!match || !match[1]) {
			strLeft = strLeft + char
			result.push(strLeft)
		} else {
			if (strLeft.length) {
				result.push(strLeft)
			}
			const object = {
				start: char,
				content: compileToJSON(match[1], pseudoMarkdown),
				end: match[2],
				type: pseudoMarkdown[char].type
			}
			if (pseudoMarkdown[char].type === 'plain') {
				object.content = [match[1]]
			}
			result.push(object)
			strRight = strRight.substr(match[0].length)
		}
		result = result.concat(compileToJSON(strRight, pseudoMarkdown))
		return result
	} else {
		if (str.length) {
			return [str]
		} else {
			return []
		}
	}
}

function compileToHTML(json, pseudoMarkdown) {
	const result = []

	json.forEach(item => {
		if (typeof item === 'string') {
			result.push({ types: [], value: item })
		} else {
			if (pseudoMarkdown[item.start]) {
				result.push(parseContent(item))
			}
		}
	})

	return result
}

function parseContent(item) {
	const result = []
	iterateContent(item, result, [])
	return result
}

function iterateContent(item, result, types) {
	item.content.forEach(it => {
		if (typeof it === 'string') {
			result.push({
				types: removeDuplicates(types.concat([item.type])),
				value: it
			})
		} else {
			iterateContent(
				it,
				result,
				removeDuplicates([it.type].concat([item.type]).concat(types))
			)
		}
	})
}

function removeDuplicates(items) {
	return [...new Set(items)]
}

function linkifyResult(array) {
	const result = []
	const regVal = new RegExp('.*\\[(.+)\\]$')

	array.forEach(arr => {
		const links = linkify.find(arr.value)

		if (links.length) {
			const spaces = arr.value.replace(links[0].value, '')
			if (spaces.length) result.push({ types: arr.types, value: spaces })

			arr.types = ['url'].concat(arr.types)
			arr.href = links[0].href
			arr.value = links[0].value

			if (result.length) {
				const prev = result[result.length - 1]
				const match = prev.value.match(regVal)
				if (match) {
					arr.value = match[1].trim()
					prev.value = prev.value.substr(
						0,
						prev.value.length - match[1].length - 2
					)
				}
			}
		}

		result.push(arr)
	})

	return result
}
