/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#080810',
        ink: '#0e0e1a',
        surface: '#14141f',
        panel: '#1a1a28',
        border: '#252538',
        muted: '#3a3a55',
        purple: {
          dim: '#5b21b6',
          base: '#7c3aed',
          glow: '#9f67ff',
          bright: '#c084fc',
          faint: '#1e1030',
        },
        accent: {
          cyan: '#22d3ee',
          green: '#4ade80',
          amber: '#fbbf24',
          red: '#f87171',
        }
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.35)',
        'glow-sm': '0 0 10px rgba(124, 58, 237, 0.2)',
        'panel': '0 4px 24px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
