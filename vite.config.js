import { defineConfig } from 'vite'

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
        main: resolve(__dirname, 'index.html'),
        category: resolve(__dirname, 'category.html'),
        product: resolve(__dirname, 'product.html'),
        checkout: resolve(__dirname, 'checkout.html'),
      }
    }
  }
})