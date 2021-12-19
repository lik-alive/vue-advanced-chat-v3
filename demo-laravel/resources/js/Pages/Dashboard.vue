<template>
	<app-layout>
		<template #header>
			<h2 class="font-semibold text-xl text-gray-800 leading-tight">
				Dashboard
			</h2>
		</template>

		<div class="py-12">
			<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
					<chat-container
						:currentUserId="$page.props.user.id"
						:isDevice="isDevice"
						:baseAvatar="baseAvatar"
					/>
				</div>
			</div>
		</div>
	</app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'
import ChatContainer from './ChatContainer'

export default {
	components: {
		AppLayout,
		ChatContainer
	},

	data() {
		return {
			isDevice: false,
			baseAvatar: `/images/charm-logo.svg`
		}
	},

	mounted() {
		this.isDevice = window.innerWidth < 900
		window.addEventListener('resize', this.onResize)
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.onResize)
	},

	methods: {
		onResize(ev) {
			if (ev.isTrusted) this.isDevice = window.innerWidth < 900
		}
	}
}
</script>
