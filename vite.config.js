import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    
  ],
  server: {
    proxy: {
      
      '/dapi': {
        target: 'https://www.swiggy.com',
        changeOrigin: true, // یہ ضروری ہے تاکہ Swiggy سرور کو لگے کہ ریکویسٹ اسی کے ڈومین سے آئی ہے
        secure: false, // اگر آپ کا ٹارگٹ HTTPS ہے اور آپ SSL سرٹیفکیٹس کو verify نہیں کرنا چاہتے تو اسے false رکھیں
      },
    },
  },
})
