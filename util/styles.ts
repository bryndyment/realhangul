import { common, grey } from '@mui/material/colors'
import { SxProps } from '@mui/system'

// types

export type _Sx = { [key: string]: SxProps }

// constants

export const zMobileMediaQuery = '@media (max-width: 609px)'

export const BLACK = common.black
export const GRAY = grey
export const PRIMARY = '#db0a1a'
export const SCALE = 1.025
export const SCALE_OFF = 1.001
export const SECONDARY = '#5d8cdf'
export const SECONDARY_DARKER = '#4066b3'
export const SECONDARY_DARKEST = '#039'
export const TERTIARY = BLACK
export const TRANSFORM = 'transform 0.05s'
export const WHITE = common.white

export const BOTTOM = {
  buttons: {
    '& > li': { '&:first-of-type': { ml: 0 }, display: 'inline', ml: 1.5, p: 0 },
    listStyleType: 'none',
    m: 0,
    pb: 0,
    pt: 0.125,
    px: 0,
    [zMobileMediaQuery]: { '& > li': { ml: 1 } }
  },
  main: {
    alignItems: 'flex-end',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    mb: -2,
    mx: -2,
    pb: 2,
    px: 2,
    [zMobileMediaQuery]: { background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.95))', mb: -1, mx: -1, pb: 1, px: 1 }
  }
}

export const EXAMPLE = { display: 'block', mb: 1, mt: 0.75 }

const LINK_MAIN = {
  color: SECONDARY_DARKEST,
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: 14,
  fontWeight: 700,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: TRANSFORM,
  whiteSpace: 'nowrap'
}

export const LINK = {
  main: LINK_MAIN,
  mainButton: { ...LINK_MAIN, bgcolor: SECONDARY_DARKER, borderRadius: 1, color: WHITE, lineHeight: 1.7, px: 1, py: 0.125 },
  mainButtonDisabled: { ...LINK_MAIN, color: GRAY[400], cursor: 'default', lineHeight: 1.7, px: 1, py: 0.125, transition: 'none' },
  mainButtonRed: { ...LINK_MAIN, bgcolor: PRIMARY, borderRadius: 1, color: WHITE, lineHeight: 1.7, px: 1, py: 0.125 },
  mainButtonWhite: {
    ...LINK_MAIN,
    bgcolor: WHITE,
    border: `1px solid ${GRAY[400]}`,
    borderRadius: 1,
    color: GRAY[600],
    lineHeight: 1.7,
    px: 0.875
  },
  plain: {
    '&:hover': { borderBottomStyle: 'solid' },
    borderBottom: `1px dotted ${GRAY[600]}`,
    color: BLACK,
    fontWeight: 'normal',
    pb: 0.25,
    textDecoration: 'none',
    textTransform: 'none',
    [zMobileMediaQuery]: { borderBottomWidth: 0 }
  },
  raw: { color: BLACK, textDecoration: 'none' }
}

export const TOP = {
  item: { display: 'list-item', mb: 0.375, p: 0 },
  list: { listStyleType: 'disc', mb: 1, ml: 3, py: 0 },
  main: {
    background:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.95) 64px, rgba(255, 255, 255, 0.95) 50.5%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0)), linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.95) 64px, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0))',
    mt: -2,
    mx: -2,
    pb: 9,
    pt: 2,
    px: 2,
    transition: 'opacity 0.1s ease-in-out',
    [zMobileMediaQuery]: { mt: -1, mx: -1, pb: 2, pt: 1, px: 1 }
  }
}
