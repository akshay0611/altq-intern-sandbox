/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#0F172A',
        'primary-gold': '#D4AF37',
        'soft-gold': '#F3E5AB',
        'success-green': '#10B981',
        'error-red': '#EF4444',
        'neutral-gray': '#F1F5F9',
        'border-gray': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
