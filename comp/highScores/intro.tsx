import { seconds, useHighScoresContext } from '@/comp/highScores'
import { LINK } from '@/util/styles'
import { Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// types

type _HighScoresIntroProps = { count: number }

// components

export const HighScoresIntro: FC<_HighScoresIntroProps> = ({ count }) => {
  const { areHighScoresEnabled, highScore } = useHighScoresContext()

  if (!areHighScoresEnabled) return null

  if (!highScore.score) {
    return (
      <Typography>
        <Link component={RouterLink} href="/extra" sx={LINK.plain}>
          High scores
        </Link>

        <> are enabled.</>
      </Typography>
    )
  }

  if (highScore.time || count === 1) {
    return (
      <Typography>
        <>Perfect </>

        <Link component={RouterLink} href="/extra" sx={LINK.plain}>
          high score
        </Link>

        <> {`for this set.${count === 1 ? '' : ` Your best time is ${seconds(highScore.time)} seconds.`}`}</>
      </Typography>
    )
  }

  return (
    <Typography>
      <>Your </>

      <Link component={RouterLink} href="/extra" sx={LINK.plain}>
        high score
      </Link>

      {` for this set is ${highScore.score}/${highScore.total}.`}
    </Typography>
  )
}
