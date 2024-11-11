import { ButtonLink } from '@/comp/buttonLink'
import { ConditionalLink } from '@/comp/conditionalLink'
import { BOTTOM, LINK, TOP } from '@/util/styles'
import { Box, List, ListItem } from '@mui/material'
import { FC, ReactNode } from 'react'

// types

type _AllPostsLinkProps = { post: boolean }
type _BottomProps = { next?: string; post?: boolean; previous?: string }
type _TopProps = { children: ReactNode }

// components

const AllPostsLink: FC<_AllPostsLinkProps> = ({ post }) => {
  if (!post) return null

  return (
    <ButtonLink href="/blog" sx={LINK.mainButtonWhite}>
      All Posts
    </ButtonLink>
  )
}

export const Bottom: FC<_BottomProps> = ({ next, post = true, previous }) => (
  <Box sx={BOTTOM.main}>
    <AllPostsLink post={post} />

    <List sx={BOTTOM.buttons}>
      <ListItem>
        <ConditionalLink label="Previous" link={previous} />
      </ListItem>

      <ListItem>
        <ConditionalLink label="Next" link={next} />
      </ListItem>
    </List>
  </Box>
)

export const Top: FC<_TopProps> = ({ children }) => (
  <Box id="top" sx={TOP.main}>
    {children}
  </Box>
)
