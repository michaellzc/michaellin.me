const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // Or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ['IBM Plex Serif', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        light: 'var(--color-light)',
        dark: 'var(--color-dark)'
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.50"),
            a: {
              color: "#9ECE6A",
              "&:hover": {
                color: "#9ECE6A",
              },
            },
            "h2 a": {
              color: "#A9B1D6",
            },
            h1: {
              color: "#A9B1D6",
            },
            h2: {
              color: "#A9B1D6",
            },
            h3: {
              color: "#A9B1D6",
            },
            h4: {
              color: "#A9B1D6",
            },
            h5: {
              color: "#A9B1D6",
            },
            h6: {
              color: "#A9B1D6",
            },
            strong: {
              color: "#A9B1D6",
            },
            code: {
              color: "#A9B1D6",
            },
            figcaption: {
              color: theme("colors.gray.500"),
            },
            blockquote: {
              color: theme("colors.gray.50")
            },
            pre: {
              backgroundColor: "#011627"
            },
            "::selection": {
              backgroundColor: "#6f7bb635",
            },
          },
        },
      }),
    }
  },
  variants: {
    extend: {
      typography: ["dark"]
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};
