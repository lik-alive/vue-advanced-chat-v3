module.exports = {
	productionSourceMap: process.env.NODE_ENV !== 'production',

	chainWebpack: config => {
		config.externals({
			lamejs: 'lamejs'
		})

		config.performance.maxEntrypointSize(1000 * 1024).maxAssetSize(1000 * 1024)
	}
}
