import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      exclude: [/virtual:/, /node_modules/],
    }),
    stylelintPlugin(),
  ],
  resolve: {
    alias: {
      src: '/src',
      [`~`]: '/src',
      // This tells Vite to resolve 'prop-types' to its actual CommonJS entry point
      // if it's having trouble with the default ESM import.
      'prop-types': 'prop-types/index.js',
    },
  },
})
