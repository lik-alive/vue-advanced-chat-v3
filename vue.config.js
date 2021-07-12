module.exports = {
	chainWebpack: config => {
		config.externals({
			lamejs: 'lamejs'
		})

		config.performance.maxEntrypointSize(1000 * 1024).maxAssetSize(1000 * 1024)

		// Added
		config.resolve.alias.set('vue', '@vue/compat')

		config.module
			.rule('vue')
			.use('vue-loader')
			.tap(options => {
				return {
					...options,
					compilerOptions: {
						compatConfig: {
							MODE: 2
						}
					}
				}
			})
	}
}
