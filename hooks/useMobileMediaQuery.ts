'use client'

import useMediaQuery from '@mui/material/useMediaQuery'

// hooks

export const useMobileMediaQuery = (): boolean => useMediaQuery('(max-width: 609px)', { noSsr: true })
