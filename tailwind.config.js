/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F5E6C8',
          300: '#EDD29C',
          400: '#E2BA68',
          500: '#D49B35', // soft honey gold
          600: '#B87E22',
          700: '#946117',
          800: '#754B13',
          900: '#5A380E',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // muted amber
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        ivory: {
          50: '#FCFBF9',
          100: '#FAF7F2', // warm ivory / off-white
          200: '#F3EDE2',
          300: '#EAE1D2',
          400: '#D9CDB9',
          500: '#C2B198',
        },
        chocolate: {
          50: '#F8F6F4',
          100: '#EDE7E1',
          200: '#D7C7BB',
          300: '#B89F8D',
          400: '#91725D',
          500: '#6E513F',
          600: '#543D30',
          700: '#3D2B22',
          800: '#2C1D16', // deep chocolate brown
          900: '#1D120D',
          950: '#130B07',
        },
        charcoal: {
          800: '#1F1A16',
          900: '#16120E', // dark mode background
          950: '#0E0B08',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(36, 22, 12, 0.05), 0 4px 6px -2px rgba(36, 22, 12, 0.02)',
        'card': '0 4px 20px -2px rgba(36, 22, 12, 0.06), 0 2px 6px -1px rgba(36, 22, 12, 0.03)',
        'glow-amber': '0 0 25px -5px rgba(217, 119, 6, 0.25)',
      }
    },
  },
  plugins: [],
}
