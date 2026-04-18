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
        main: resolve('./index.html'),
        category: resolve('./category.html'),
        product: resolve('./product.html'),
        checkout: resolve('./checkout.html'),
      }
    }
  }
})