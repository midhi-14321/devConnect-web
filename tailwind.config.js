import { defineConfig } from 'vite'
import daisyui from 'daisyui'

export default {
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // Enable only these themes
  },
}
