import { ButtonLink } from '@/comp/buttonLink'
import { LINK } from '@/util/styles'
import { Box } from '@mui/material'
import { FC } from 'react'

// types

type _ConditionalLinkProps = { label: string; link?: string }

// components

export const ConditionalLink: FC<_ConditionalLinkProps> = ({ label, link }) => {
  if (link) {
    return (
      <ButtonLink href={link} sx={LINK.mainButton}>
        {label}
      </ButtonLink>
    )
  }

  return (
    <Box component="span" sx={LINK.mainButtonDisabled}>
      {label}
    </Box>
  )
}
