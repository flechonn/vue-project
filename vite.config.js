import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    // cors:{
    //   origin:"http://localhost:5173",
    //   methods:["POST","GET"]
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Remplacez cela par l'URL de votre serveur Express
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
