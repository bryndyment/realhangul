import { THEME } from '@/util/theme'
import { ThemeProvider } from '@mui/material'
import { FC, ReactNode } from 'react'

// types

type _ThemeContextProps = { children: ReactNode }

// components

export const ThemeContext: FC<_ThemeContextProps> = ({ children }) => <ThemeProvider theme={THEME}>{children}</ThemeProvider>
