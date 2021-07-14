import ChatWindow from './Test'

Object.defineProperty(ChatWindow, 'install', {
	configurable: false,
	enumerable: false,
	value(Vue) {
		Vue.component('ChatWindow', ChatWindow)
	}
})

export default ChatWindow
