<template>
	<div class="window-container" :class="{ 'window-mobile': isDevice }">
		<chat-window
			:height="screenHeight"
			:show-audio="false"
			:show-add-room="false"
			:show-reaction-emojis="false"
			theme="light"
			:styles="styles"
			:current-user-id="currentUserId"
			:room-id="roomId"
			:rooms="loadedRooms"
			:loading-rooms="loadingRooms"
			:messages="messages"
			:messages-loaded="messagesLoaded"
			:rooms-loaded="roomsLoaded"
			:room-actions="roomActions"
			:menu-actions="menuActions"
			:message-actions="messageActions"
			:room-message="roomMessage"
			:load-first-room="loadFirstRoom"
			:force-username="true"
			:multiple-files="false"
			@toggle-rooms-list="toggleRoomsList"
			@fetch-more-rooms="fetchMoreRooms"
			@fetch-messages="fetchMessages"
			@send-message="sendMessage"
			@edit-message="editMessage"
			@delete-message="deleteMessage"
			@open-file="openFile"
		>
		</chat-window>
	</div>
</template>

<script>
import axios from 'axios'
import ChatWindow from '../ChatWindow/lib/ChatWindow'
import FormatDatePlugin from 'date-format'
import { saveAs } from 'file-saver'
// import ChatWindow from './../../../../src/lib/ChatWindow'
// import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
	components: {
		ChatWindow
	},

	props: {
		currentUserId: {
			type: Number,
			default: null
		},
		isDevice: {
			type: Boolean,
			default: false
		},
		baseAvatar: {
			type: String,
			default: null
		}
	},

	data() {
		return {
			roomsPerPage: 15,
			rooms: [],
			roomId: '',
			startRooms: null,
			roomsLoaded: false,
			loadingRooms: true,
			allUsers: [],
			roomsLoadedCount: false,
			messagesPerPage: 20,
			messages: [],
			messagesLoaded: false,
			fetchMessagesRequest: null,
			roomMessage: '',
			startMessages: null,
			loadFirstRoom: false,
			roomActions: [],
			menuActions: [],
			messageActions: [
				{ name: 'replyMessage', title: 'Reply' },
				{
					name: 'editMessage',
					title: 'Edit Message',
					onlyMe: true,
					timeout: 15 * 60
				},
				{
					name: 'deleteMessage',
					title: 'Delete Message',
					onlyMe: true,
					timeout: 15 * 60
				}
			],
			styles: { container: { borderRadius: '4px' } }
		}
	},

	computed: {
		loadedRooms() {
			return this.rooms.slice(0, this.roomsLoadedCount)
		},
		screenHeight() {
			return this.isDevice ? '90vh' : '70vh'
		}
	},

	mounted() {
		this.fetchRooms()
		this.listenMessages()

		// Prevent hub duplication on hostory-back
		window.onpopstate = event => {
			if (event.state.url.endsWith('/messenger')) {
				if (sessionStorage.getItem('hubVisited')) {
					history.back()
				}
			}
		}
	},

	beforeDestroy() {
		this.resetRooms()
		Echo.private(`user.${this.currentUserId}`).stopListening(
			'MessageCenter.MessageUpdate'
		)
	},

	methods: {
		/**
		 * Clear room list
		 */
		resetRooms() {
			this.loadingRooms = true
			this.roomsLoadedCount = 0
			this.rooms = []
			this.roomsLoaded = true
			this.startRooms = null
			this.resetMessages()
		},

		/**
		 * Clear message list
		 */
		resetMessages() {
			this.messages = []
			this.messagesLoaded = false
			this.startMessages = null
		},

		/**
		 * Get rooms from the server
		 */
		fetchRooms() {
			const roomId = this.getRoomParam()
			if (roomId) {
				this.loadFirstRoom = true
				this.roomId = roomId
			}

			this.resetRooms()
			this.fetchRoomsUntilFound(roomId)
		},

		/**
		 * Return to room menu handler
		 */
		toggleRoomsList({ opened }) {
			if (this.isDevice && opened) {
				this.setRoomParam()
			}
		},

		/**
		 * Fetch rooms until exact roomId is found
		 */
		async fetchRoomsUntilFound(roomId = null) {
			do {
				await this.fetchMoreRooms()

				if (!roomId || this.rooms.find(r => r.roomId === roomId)) break
			} while (!this.roomsLoaded)
		},

		/**
		 * Get portion of rooms from the server
		 */
		async fetchMoreRooms(roomId = null) {
			let rooms = null

			if (roomId === null) {
				rooms = await this.loadRooms()
				this.roomsLoaded = rooms.length < this.roomsPerPage

				// Stop infinite-loading spinner
				if (!rooms.length) return (this.loadingRooms = false)
			} else {
				rooms = [await this.loadRoom(roomId)]
			}

			// Shift offset
			this.startRooms += rooms.length

			// Identify non-fetched users
			const newUserIds = []
			rooms.forEach(room => {
				room.userIds.forEach(userId => {
					const foundUser = this.allUsers.find(u => u._id === userId)
					if (!foundUser && !newUserIds.includes(userId)) {
						newUserIds.push(userId)
					}
				})
			})

			// Load new user data
			if (newUserIds.length) {
				const usersRes = await axios
					.get(route('api.mc.users.index'), {
						params: { ids: newUserIds }
					})
					.catch(e => {
						this.axiosError(e)
					})
				this.allUsers = [...this.allUsers, ...usersRes.data]
			}

			// Format rooms
			const formattedRooms = []
			rooms.forEach(room => {
				// The room is already loaded
				if (this.rooms.find(r => r.roomId === room.roomId)) return
				formattedRooms.push(this.formatRoom(room))
			})

			this.rooms = [...this.rooms, ...formattedRooms]

			if (roomId === null) this.loadingRooms = false

			this.roomsLoadedCount = this.rooms.length
		},

		/**
		 * Get portion of messages from the server
		 */
		async fetchMessages({ room, options = {} }) {
			// Create cancel token
			if (this.fetchMessagesRequest) this.fetchMessagesRequest.cancel()
			this.fetchMessagesRequest = axios.CancelToken.source()

			// Reset message list on room change
			if (options.reset) {
				this.resetMessages()
				this.roomId = room.roomId
				this.setRoomParam(room.roomId)
			}

			// Load messages
			await axios
				.get(route('api.mc.rooms.messages.index', room.roomId), {
					params: {
						limit: this.messagesPerPage,
						offset: this.startMessages
					},
					cancelToken: this.fetchMessagesRequest.token
				})
				.then(res => {
					const messages = res.data

					this.messagesLoaded = messages.length < this.messagesPerPage

					// Messages must be cleared here - after the room was changed
					if (options.reset) this.messages = []

					if (!messages.length) return

					this.startMessages += messages.length

					// Add messages
					const formattedMessages = []
					messages.forEach(msg => {
						// The message is already loaded
						if (this.messages.find(m => m._id === msg._id)) return

						formattedMessages.unshift(this.formatMessage(room, msg))
					})
					this.messages = [...formattedMessages, ...this.messages]

					// Update room's unreadCount
					room.unreadCount = 0

					// Update room's index
					const index = +new Date(messages[0].created_at)
					if (index > room.index) room.index = index

					// Update room's last message
					if (
						!room.lastMessage ||
						messages[0].updated_at > room.lastMessage.updated_at
					) {
						room.lastMessage = this.formatLastMessage(messages[0])
					}

					// Update room's visited_at
					room.visited_at = room.lastMessage.created_at
				})
				.catch(e => {
					this.axiosError(e)
				})
				.finally(() => {
					this.fetchMessagesRequest = null
				})
		},

		/**
		 * Listen websocket-broadcast of messages
		 */
		listenMessages() {
			// Listen to websocket
			Echo.private(`user.${this.currentUserId}`).listen(
				'MessageCenter.MessageUpdate',
				e => {
					const msg = e.message

					const room = this.rooms.find(r => r.roomId === msg.roomId)

					// Room is not loaded yet
					if (!room) return this.fetchMoreRooms(msg.roomId)

					// Update room's index
					const index = +new Date(msg.created_at)
					if (index > room.index) room.index = index

					// Update room's last message
					if (
						!room.lastMessage ||
						msg.updated_at > room.lastMessage.updated_at
					) {
						room.lastMessage = this.formatLastMessage(msg)
					}

					// Another room is currently opened
					if (this.roomId !== msg.roomId) {
						// Update unreadCount (msg is new, msg is not user's)
						if (
							msg.created_at === msg.updated_at &&
							msg.senderId !== this.currentUserId
						) {
							room.unreadCount += 1
						}
						return
					}

					// Update room's visited_at
					room.visited_at = msg.created_at

					const msgIndex = this.messages.findIndex(
						m => m._id === msg._id
					)
					// Add new message
					if (msgIndex === -1) {
						this.messages = [
							...this.messages,
							this.formatMessage(room, msg)
						]
						this.startMessages += 1
					}
					// Edit message
					else if (
						msg.created_at !== msg.updated_at &&
						msg.updated_at > this.messages[msgIndex].updated_at
					) {
						this.messages[msgIndex] = this.formatMessage(room, msg)
					}
				}
			)
		},

		/**
		 * Open uploaded file
		 */
		openFile({ file }) {
			// window.open(file.file.url, "_blank")
			this.DownloadFile(file.file.url)
		},

		DownloadFile(url, data = null, options = {}) {
			const defOptions = {
				method: 'GET',
				responseType: 'blob',
				type: 'application/octet-stream'
			}
			if (data) defOptions.method = 'POST'
			Object.assign(defOptions, options)

			return axios({
				url,
				data,
				method: defOptions.method,
				responseType: defOptions.responseType,
				onDownloadProgress: options.onDownloadProgress
			}).then(res => {
				const blob = new Blob([res.data], { type: defOptions.type })
				if (!blob.size) throw new Error('Empty file')

				let filename = defOptions.prefix || ''
				if (defOptions.filename) {
					filename += defOptions.filename
				} else if (res.headers.filename) {
					filename += res.headers.filename
				} else if (res.headers['content-disposition']) {
					const rus = res.headers['content-disposition'].match(
						/filename\*=utf-8''(.*)/
					)
					const eng =
						res.headers['content-disposition'].match(
							/filename="?(.*)"?/
						)

					if (rus) {
						filename += decodeURIComponent(rus[1])
					} else if (eng) {
						filename += eng[1]
					}
				}
				saveAs(blob, filename)
			})
		},

		/**
		 * Send message
		 * [Contains localable strings]
		 */
		sendMessage({ content, roomId, files, replyMessage }) {
			const date = new Date()
			const tempId = date.getTime() + '_' + this.currentUserId
			const msg = {
				_id: tempId,
				indexId: tempId,
				roomId,
				senderId: this.currentUserId,
				content,
				created_at: date.toISOString(),
				updated_at: date.toISOString()
			}
			// Add file
			if (files) {
				if (files.some(file => !this.isFileCorrect(file))) return
				msg.files = files
			}
			// Add reply
			if (replyMessage) {
				msg.reply_id = replyMessage._id
				msg.replyMessage = {
					content: replyMessage.content,
					senderId: replyMessage.senderId,
					files: replyMessage.files
				}
			}
			// Fast adding a message to the list
			const room = this.rooms.find(r => r.roomId === roomId)
			room.index = +date
			this.messages = [...this.messages, this.formatMessage(room, msg)]
			// // Update last message
			room.lastMessage = this.formatLastMessage(msg)

			const fd = new FormData()
			fd.append('content', msg.content)

			if (files) {
				files.forEach(file => {
					fd.append('files[]', file.blob, file.name)
				})
			}

			if (replyMessage) {
				fd.append('reply_id', replyMessage._id)
			}
			const msgSaved = this.messages.find(m => m._id === tempId)
			// Send message
			axios
				.post(route('api.mc.rooms.messages.store', roomId), fd)
				.then(res => {
					const id = res.data
					// Update message
					msgSaved._id = id
					// Update room's last message
					const room = this.rooms.find(r => r.roomId === roomId)
					if (room.lastMessage._id === tempId) {
						room.lastMessage._id = id
					}
					if (files)
						return axios.get(route('api.mc.messages.show', id))
				})
				.then(res => {
					// Update file
					if (res) msgSaved.files = res.data.files
					this.startMessages += 1
				})
				.catch(e => {
					this.axiosError(e)
					// Remove message
					const msgIndex = this.messages.findIndex(
						m => m._id === tempId
					)
					this.messages.splice(msgIndex, 1)
				})
		},

		/**
		 * Edit message
		 * [Contains localable strings]
		 */
		editMessage({ messageId, newContent, roomId, files }) {
			const msg = this.messages.find(m => m._id === messageId)

			msg.content = newContent
			msg.edited = true

			// Add file
			if (files) {
				if (files.some(file => !this.isFileCorrect(file))) return
				msg.files = files
			}

			const room = this.rooms.find(r => r.roomId === roomId)
			const msgIndex = this.messages.findIndex(m => m._id === messageId)

			// Update message
			this.messages[msgIndex] = this.formatMessage(room, msg)
			// Update last message
			room.lastMessage = this.formatLastMessage(msg)

			const fd = new FormData()
			fd.append('content', msg.content)

			files.forEach(file => {
				if (file.localUrl) {
					fd.append(
						'files[]',
						file.blob,
						file.name + '.' + file.extension
					)
				} else {
					fd.append('files_loaded[]', Number.parseInt(file.id))
				}
			})

			axios
				.post(
					route('api.mc.messages.update', messageId) + '?_method=PUT',
					fd
				)
				.then(() => {
					if (files)
						return axios.get(
							route('api.mc.messages.show', messageId)
						)
				})
				.then(res => {
					if (res) msg.files = res.data.files
				})
				.catch(e => {
					if (e.response.data?.source === 'timeout') {
						console.error(e.response.data.msg)
					} else {
						this.axiosError(e)
					}
				})
		},

		/**
		 * Delete message
		 * [Contains localable strings]
		 */
		deleteMessage({ message, roomId }) {
			axios
				.delete(route('api.mc.messages.destroy', message._id))
				.then(() => {
					// Update message
					message.deleted = true
					message.files = null

					// Update room
					const room = this.rooms.find(r => r.roomId === roomId)
					if (room.lastMessage._id === message._id) {
						room.lastMessage.deleted = true
						room.lastMessage.files = null
					}
				})
				.catch(e => {
					if (this.HasError(e, 422, 'timeout')) {
						console.error('Message cannot be deleted anymore')
					} else {
						this.axiosError(e)
					}
				})
		},

		// ------------------ PARTS

		async loadRooms() {
			const res = await axios
				.get(route('api.mc.rooms.index'), {
					params: {
						limit: this.roomsPerPage,
						offset: this.startRooms
					}
				})
				.catch(e => {
					this.axiosError(e)
				})
			return res.data
		},

		async loadRoom(roomId) {
			const res = await axios
				.get(route('api.mc.rooms.show', roomId))
				.catch(e => {
					this.axiosError(e)
				})

			return res.data
		},

		// ------------------ FORMATTERS

		/**
		 * Format room
		 */
		formatRoom(room) {
			// Format users data
			const users = []
			room.userIds.forEach(id => {
				const foundUser = this.allUsers.find(u => u._id === id)
				if (foundUser) users.push(foundUser)
			})

			// Format avatar
			const roomContacts = users.filter(u => u._id !== this.currentUserId)
			const avatar =
				roomContacts.length === 1 && roomContacts[0].avatar
					? roomContacts[0].avatar
					: this.baseAvatar

			return {
				...room,
				index: +new Date(room.updated_at),
				visitedDate: new Date(room.visited_at),
				users,
				avatar,
				lastMessage: room.lastMessage
					? this.formatLastMessage(room.lastMessage)
					: null
			}
		},

		/**
		 * Format message
		 */
		formatMessage(room, msg) {
			const senderUser = room.users.find(
				user => msg.senderId === user._id
			)

			if (msg.files) {
				msg.files.forEach(file => {
					if (file.localUrl) file.url = file.localUrl

					if (file.extension) {
						file.name += '.' + file.extension
					}
				})
			}

			return {
				...msg,
				createdDate: new Date(msg.created_at),
				timestamp: this.FormatDate(msg.created_at, 'hh:mm'),
				date: this.FormatDate(msg.created_at, 'dd.MM.yyyy'),
				username: senderUser ? senderUser.username : null,
				edited: msg.created_at < msg.updated_at,
				saved: null,
				distributed: null,
				seen:
					msg.senderId === this.currentUserId
						? null
						: msg.created_at <= room.visited_at
			}
		},

		/**
		 * Format last message for RoomHeader
		 */
		formatLastMessage(msg) {
			let content = msg.content
			if (msg.files) content = msg.files[0].name

			return {
				...msg,
				createdDate: new Date(msg.created_at),
				content,
				timestamp: this.formatTimestamp(msg.updated_at),
				new: true,
				distributed: null,
				seen: null
			}
		},

		// ------------------ HELPERS

		/**
		 * Process an axios error
		 * [Contains localable strings]
		 */
		axiosError(e) {
			// Canceled
			if (axios.isCancel(e)) return

			let msg = this.firstError(e)
			if (msg === null) msg = 'An error has occurred'
			console.error(msg)
		},

		firstError(e) {
			const errors = e.response?.data?.errors
			if (!errors) return null

			return errors[Object.keys(errors)[0]][0]
		},

		// ------------------ UTILS

		/**
		 * Check file size and name
		 * [Contains localable strings]
		 */
		isFileCorrect(file) {
			// Check file size
			if (file.size > 10 * 1024 * 1024) {
				console.error('Filesize is greater than 10 MB', 'danger')
				return false
			}

			// Check file name
			if ((file.name + '.' + file.extension).length > 255) {
				console.error(
					'Filename is longer than 255 characters',
					'danger'
				)
				return false
			}

			return true
		},

		/**
		 * Check if two dates relate to the same day
		 */
		isSameDay(d1, d2) {
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate()
			)
		},

		/**
		 * Format last message timestamp
		 */
		formatTimestamp(timestamp) {
			const date = new Date(timestamp)
			if (this.isSameDay(date, new Date())) {
				const result = this.FormatDate(date, 'hh:mm')
				return `Today, ${result}`
			} else {
				const result = this.FormatDate(date, 'dd/MM/yy')
				return result
			}
		},

		/**
		 * Set roomId in URL
		 */
		setRoomParam(roomId = null) {
			if (roomId === this.getRoomParam()) return

			const page = JSON.parse(JSON.stringify(this.$page))
			page.url = location.pathname

			if (roomId !== null) {
				page.url += `?room=${roomId}`
			}

			// Create history-stages for device
			if (this.isDevice) {
				if (roomId === null) {
					history.replaceState(page, '', page.url)
					sessionStorage.setItem('hubVisited', true)
				} else {
					history.pushState(page, '', page.url)
					sessionStorage.removeItem('hubVisited')
				}
			}
			// Block history for PC
			else {
				history.replaceState(page, '', page.url)
			}
		},

		/**
		 * Get roomId from URL
		 */
		getRoomParam() {
			const params = new URLSearchParams(window.location.search)
			return Number(params.get('room'))
		},

		FormatDate(value, format = 'yyyy-MM-dd') {
			if (typeof value !== 'object') {
				value = new Date(value)
			}
			return FormatDatePlugin(format, value)
		}
	}
}
</script>

<style lang="scss">
.window-container {
	svg {
		display: inline;
	}
}
</style>

<style lang="scss" scoped>
.window-container {
	width: 100%;
}

.window-mobile {
	form {
		padding: 0 10px 10px;
	}
}

form {
	padding-bottom: 20px;
}

input {
	padding: 5px;
	width: 140px;
	height: 21px;
	border-radius: 4px;
	border: 1px solid #d2d6da;
	outline: none;
	font-size: 14px;
	vertical-align: middle;

	&::placeholder {
		color: #9ca6af;
	}
}

button {
	background: #1976d2;
	color: #fff;
	outline: none;
	cursor: pointer;
	border-radius: 4px;
	padding: 8px 12px;
	margin-left: 10px;
	border: none;
	font-size: 14px;
	transition: 0.3s;
	vertical-align: middle;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}

	&:disabled {
		cursor: initial;
		background: #c6c9cc;
		opacity: 0.6;
	}
}
</style>
