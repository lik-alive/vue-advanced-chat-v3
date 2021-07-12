import { createApp, configureCompat } from 'vue'
import App from './App.vue'

configureCompat({
	ATTR_FALSE_VALUE: false,
	WATCH_ARRAY: false
})

const app = createApp(App)
app.mount('#app')
