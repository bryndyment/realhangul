import { ButtonLink } from '@/comp/buttonLink'
import { LINK } from '@/util/styles'
import { FC } from 'react'

// types

type _PostLinkProps = { label: string; link?: string; linkLabel?: string }

// components

export const PostLink: FC<_PostLinkProps> = ({ label, link, linkLabel }) => {
  if (link) {
    if (linkLabel) {
      return (
        <>
          <>{label} </>

          <ButtonLink href={`/blog${link}`} sx={LINK.plain}>
            {linkLabel}
          </ButtonLink>
        </>
      )
    }

    return (
      <ButtonLink href={`/blog${link}`} sx={LINK.plain}>
        {label}
      </ButtonLink>
    )
  }

  return <>{label}</>
}
