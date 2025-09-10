import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specify the content paths
  theme: {
    extend: {
      colors: {
        neon: '#39FF14', // Custom neon green color
        gradient: {
          'from': '#6B21A8', // Custom gradient from purple
          'via': '#DB2777',  // Custom gradient through pink
          'to': '#E11D48',   // Custom gradient to red
        },
      },
      borderImage: {
        'gradient': 'linear-gradient(90deg, #ff00cc, #3333ff, #00ffcc, #ff0000) 1', // Custom border gradient
      },
      animation: {
        'border-move': 'borderMove 3s linear infinite', // Custom animation for moving borders
        'slide-up': 'slideUp 1s ease-out', // Slide-up animation
        'draw-line': 'drawLine 2s ease-out forwards', // Animation for vertical line
        'spin-slow': 'spin 4s linear infinite', // slower than default
      },
      keyframes: {
        borderMove: {
          '0%': { backgroundPosition: '0% 50%' }, // Start position of the animation
          '100%': { backgroundPosition: '200% 50%' }, // End position of the animation
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' }, // Start of the slide-up animation
          '100%': { opacity: '1', transform: 'translateY(0)' },  // End of the slide-up animation
        },
        drawLine: {
          '0%': { height: '0' }, // Start the vertical line with no height
          '100%': { height: '100%' }, // Animate the height to full
        },
      },
    },
  },
  plugins: [scrollbar],
};
