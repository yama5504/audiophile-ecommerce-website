import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: '/audiophile-ecommerce-website/',
  css: {
    devSourcemap: true,
  },
  server: {
    open: true,
  },

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        category: path.resolve(__dirname, 'category.html'),
        product: path.resolve(__dirname, 'product.html'),
        checkout: path.resolve(__dirname, 'checkout.html'),
      }
    }
  }
})