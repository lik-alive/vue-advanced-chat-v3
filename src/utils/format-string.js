const linkify = require('linkifyjs')
// require('linkifyjs/plugins/hashtag')(linkify)

export default (text, doLinkify) => {
	const json = compileToJSON(text)

	const html = compileToHTML(json)

	const result = [].concat.apply([], html)

	if (doLinkify) return linkifyResult(result)

	return result
}

	const typeMarkdown = {
		bold: '*',
		italic: '_',
		strike: '~',
		underline: '°',
		noformat: '|',
		label_s: '[',
		label_e: ']'
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
		[typeMarkdown.noformat]: {
			end: '\\' + typeMarkdown.noformat,
			allowed_chars: '.',
			type: 'noformat'
		},
		[typeMarkdown.label_s]: {
			end: '\\' + [typeMarkdown.label_e],
			allowed_chars: '.',
			type: 'label'
		}
		// '```': {
		// 	end: '```',
		// 	allowed_chars: '(.|\n)',
		// 	type: 'multiline-code'
		// },
		// '`': {
		// 	end: '`',
		// 	allowed_chars: '.',
		// 	type: 'inline-code'
		// },
		// '<usertag>': {
		// 	allowed_chars: '.',
		// 	end: '</usertag>',
		// 	type: 'tag'
		// },
	}

function compileToJSON(str) {
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

	if (minIndexFromLink) {
		let strLeft = str.substr(0, minIndexOf)
		let strLink = str.substr(minIndexOf, links[0].value.length)
		let strRight = str.substr(minIndexOf + links[0].value.length)
		if (strLeft.length) result.push(strLeft)
		result.push(strLink)
		result = result.concat(compileToJSON(strRight))
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

			const type = pseudoMarkdown[char].type
			var content
			if (type === 'noformat') {
				content = [match[1]]
			} else if (type === 'label') {
				content = ['[' + match[1] + ']']
			} else {
				content = compileToJSON(match[1])
			}

			const object = {
				start: char,
				content: content,
				end: match[2],
				type: type
			}
			result.push(object)
			strRight = strRight.substr(match[0].length)
		}
		result = result.concat(compileToJSON(strRight))
		return result
	} else {
		if (str.length) {
			return [str]
		} else {
			return []
		}
	}
}

function compileToHTML(json) {
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
				if (prev.types.includes('label')) {
					arr.value = prev.value.substr(1, prev.value.length - 2)
					result.pop();
				}
			}
		}

		result.push(arr)
	})

	return result
}
