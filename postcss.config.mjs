import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'

const config = {
	plugins: [postcssNesting(), autoprefixer]
}

export default config
