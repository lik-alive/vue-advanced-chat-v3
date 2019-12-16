export const defaultThemeColors = {
	light: {
		headerBg: '#fff',
		sidemenuBg: '#fff',
		sidemenuBgHover: '#f6f6f6',
		sidemenuBgActive: '#e5effa',
		sidemenuColorActive: '#1976d2',
		menuBg: '#fff',
		menuBgHover: '#f6f6f6',
		messagesBg: '#f8f9fa',
		messageBg: '#fff',
		messageMeBg: '#ccf2cf',
		messageDeletedBg: '#dadfe2',
		messageDeletedColor: '#757e85',
		messageUsernameColor: '#9ca6af',
		messageTimestampColor: '#828c94',
		messageDateBg: 'rgba(33, 148, 243, 0.15)',
		messageDateColor: '#505a62',
		messageTextColor: '#0a0a0a',
		messageReplyBg: 'rgba(0, 0, 0, 0.08)',
		messageReplyUsernameColor: '#0a0a0a',
		messageReplyContentColor: '#6e6e6e',
		roomLastMessage: '#67717a',
		roomTimestamp: '#a2aeb8',
		textColor: '#0a0a0a',
		inputBg: '#fff',
		footerBg: '#f0f0f0',
		spinnerColor: '#333',
		borderColor: '#d3dde7',
		iconsColor: {
			search: '#9ca6af',
			add: '#1976d2',
			menu: '#0a0a0a',
			close: '#9ca6af',
			closeImage: '#fff',
			file: '#1976d2',
			paperclip: '#1976d2',
			closeOutline: '#1976d2',
			send: '#1976d2',
			sendDisabled: '#9ca6af',
			emoji: '#1976d2',
			document: '#1976d2',
			pencil: '#9e9e9e',
			checkmark: '#0696c7',
			eye: '#fff',
			dropdown: '#fff'
		}
	},
	dark: {
		headerBg: '#26272e',
		sidemenuBg: '#26272e',
		sidemenuBgHover: '#202024',
		sidemenuBgActive: '#1C1D21',
		sidemenuColorActive: '#fff',
		menuBg: '#687b8f',
		menuBgHover: '#5d6d80',
		messagesBg: '#1C1D21',
		messageBg: '#46586b',
		messageMeBg: '#4fb381',
		messageDeletedBg: '#353b40',
		messageDeletedColor: '#dadfe2',
		messageUsernameColor: '#b3bac9',
		messageTimestampColor: '#ebedf2',
		messageDateBg: 'rgba(33, 148, 243, 0.15)',
		messageDateColor: '#b8bdcc',
		messageTextColor: '#fff',
		messageReplyBg: 'rgba(0, 0, 0, 0.18)',
		messageReplyUsernameColor: '#fff',
		messageReplyContentColor: '#d6d6d6',
		roomLastMessage: '#a2aeb8',
		roomTimestamp: '#67717a',
		textColor: '#fff',
		inputBg: '#34343b',
		footerBg: '#26272e',
		spinnerColor: '#fff',
		borderColor: '#63686e',
		iconsColor: {
			search: '#9ca6af',
			add: '#fff',
			menu: '#fff',
			close: '#9ca6af',
			closeImage: '#fff',
			file: '#1976d2',
			paperclip: '#fff',
			closeOutline: '#fff',
			send: '#fff',
			sendDisabled: '#9ca6af',
			emoji: '#fff',
			document: '#1976d2',
			pencil: '#ebedf2',
			checkmark: '#f0d90a',
			eye: '#fff',
			dropdown: '#fff'
		}
	}
}

export const cssThemeVars = ({
	headerBg,
	sidemenuBg,
	sidemenuBgHover,
	sidemenuBgActive,
	sidemenuColorActive,
	menuBg,
	menuBgHover,
	messagesBg,
	messageBg,
	messageMeBg,
	messageDeletedBg,
	messageDeletedColor,
	messageUsernameColor,
	messageTimestampColor,
	messageDateBg,
	messageDateColor,
	messageTextColor,
	messageReplyBg,
	messageReplyUsernameColor,
	messageReplyContentColor,
	roomLastMessage,
	roomTimestamp,
	textColor,
	inputBg,
	footerBg,
	spinnerColor,
	borderColor,
	iconsColor
}) => {
	return {
		'--chat-header-bg-color': headerBg,
		'--chat-bg-color': sidemenuBg,
		'--chat-bg-color-hover': sidemenuBgHover,
		'--chat-bg-color-active': sidemenuBgActive,
		'--chat-color-active': sidemenuColorActive,
		'--chat-bg-menu': menuBg,
		'--chat-bg-menu-hover': menuBgHover,
		'--chat-bg-color-content': messagesBg,
		'--chat-bg-color-message': messageBg,
		'--chat-bg-color-message-me': messageMeBg,
		'--chat-bg-color-message-deleted': messageDeletedBg,
		'--chat-color-message-deleted': messageDeletedColor,
		'--chat-color-message-username': messageUsernameColor,
		'--chat-color-message-timestamp': messageTimestampColor,
		'--chat-color-room-last': roomLastMessage,
		'--chat-color-room-timestamp': roomTimestamp,
		'--chat-bg-color-message-date': messageDateBg,
		'--chat-color-message-date': messageDateColor,
		'--chat-color-message-text': messageTextColor,
		'--chat-bg-color-message-reply': messageReplyBg,
		'--chat-color-message-reply-username': messageReplyUsernameColor,
		'--chat-color-message-reply-content': messageReplyContentColor,
		'--chat-color': textColor,
		'--chat-bg-color-input': inputBg,
		'--chat-bg-color-footer': footerBg,
		'--chat-color-spinner': spinnerColor,
		'--chat-border-color': borderColor,
		'--chat-icon-color-search': iconsColor.search,
		'--chat-icon-color-add': iconsColor.add,
		'--chat-icon-color-menu': iconsColor.menu,
		'--chat-icon-color-close': iconsColor.close,
		'--chat-icon-color-close-image': iconsColor.closeImage,
		'--chat-icon-color-file': iconsColor.file,
		'--chat-icon-color-paperclip': iconsColor.paperclip,
		'--chat-icon-color-close-outline': iconsColor.closeOutline,
		'--chat-icon-color-send': iconsColor.send,
		'--chat-icon-color-send-disabled': iconsColor.sendDisabled,
		'--chat-icon-color-emoji': iconsColor.emoji,
		'--chat-icon-color-document': iconsColor.document,
		'--chat-icon-color-pencil': iconsColor.pencil,
		'--chat-icon-color-checkmark': iconsColor.checkmark,
		'--chat-icon-color-eye': iconsColor.eye,
		'--chat-icon-color-dropdown': iconsColor.dropdown
	}
}