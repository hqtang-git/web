import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    port: 5000, // 自定义端口号
    strictPort: true, // 如果端口被占用则报错，而不是自动切换
    proxy: {
      // 假设你的后端接口前缀是 /api
      '/*': {
        target: 'http://192.168.1.2:5050', // 后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        require('autoprefixer')
      ],
    },
    preprocessorOptions: {
      less: {
        // 这里可以添加 Less 全局变量、函数等配置
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    },
  },
})
