import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"https://[2401:4900:1cb2:e07c:43f3:bf1b:d051:37f]",
      }
    }
  }
})
