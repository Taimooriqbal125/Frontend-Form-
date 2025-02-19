import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import envCompatible from "vite-plugin-env-compatible"


// https://vite.dev/config/
export default defineConfig({
  envPrefix: "VITE_",
  define: {
    'process.env': process.env, // Debugging purpose
  },
  plugins: [react(),envCompatible(), tailwindcss(),],
})
