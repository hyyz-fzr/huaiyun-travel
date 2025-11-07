<<<<<<< HEAD
﻿import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
=======
﻿import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
<<<<<<< HEAD
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    outDir: "dist",
    assetsDir: "assets"
  }
})
=======
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
