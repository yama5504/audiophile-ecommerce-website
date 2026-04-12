import { defineConfig } from 'vite'

export default defineConfig({
  base: '/audiophile-ecommerce-website/',
  css: {
    devSourcemap: true,
  },
  server: {
    open: true,
  },
})