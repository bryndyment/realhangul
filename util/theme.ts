'use client'

import { PRIMARY, TERTIARY, WHITE } from '@/util/styles'
import { createTheme } from '@mui/material'

// constants

export const THEME = createTheme({
  breakpoints: {
    values: {
      lg: 1280,
      md: 960,
      sm: 610,
      xl: 1920,
      xs: 0
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState: { color, variant } }: any) => ({
          boxShadow: 'none',
          fontWeight: 700,
          padding: '1px 8px',

          ...(color === 'primary' && variant === 'contained' && { backgroundColor: PRIMARY, borderColor: '#db0a1a', color: WHITE }),

          ...(color === 'secondary' && variant !== 'contained' && { color: TERTIARY }),

          '&:hover': {
            boxShadow: 'none',

            ...(color === 'primary' && variant === 'contained' && { backgroundColor: PRIMARY }),

            ...(color === 'secondary' && variant !== 'contained' && { backgroundColor: 'transparent', color: TERTIARY })
          }
        })
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@supports (-moz-appearance: none)': {
          h2: { marginTop: '3.5px !important' }
        },
        'a, div, input, label, span, td': { WebkitTapHighlightColor: 'transparent' },
        body: { backgroundColor: '#f6e7e5', userSelect: 'none' },
        table: { borderSpacing: 0 }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontWeight: 700 }
      }
    }
  },
  typography: {
    fontFamily: 'lucida grande, verdana, sans-serif'
  }
})

export const { breakpoints: BREAKPOINTS } = THEME
