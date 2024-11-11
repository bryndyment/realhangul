'use client'

import { scale, scaleOff } from '@/util/common'
import { Opening } from '@hoologic/use-opening'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { capitalize, startCase } from 'lodash'
import { FC, MouseEvent } from 'react'

// types

type _ConfirmDialogProps = { callback: () => void; heading?: string; noun?: string; opening: Opening; text?: string; verb?: string }

// components

export const ConfirmDialog: FC<_ConfirmDialogProps> = ({ callback, heading, noun = 'high score', opening, text, verb = 'delete' }) => {
  const handleCancel = (event: MouseEvent) => {
    event.stopPropagation()

    opening.close()
  }

  const handleConfirm = (event: MouseEvent) => {
    event.stopPropagation()

    callback()

    opening.close()
  }

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogContent sx={{ pl: 2 }}>
        {heading && (
          <Typography sx={{ mb: 2, textTransform: 'uppercase' }} variant="h3">
            {heading}
          </Typography>
        )}

        <Typography>{text || `${capitalize(verb)} this ${noun}?`}</Typography>
      </DialogContent>

      <DialogActions sx={{ pl: 0, pr: 2, py: 2 }}>
        <Button color="secondary" onClick={handleCancel} onMouseOut={scaleOff} onMouseOver={scale}>
          Cancel
        </Button>

        <Button color="primary" onClick={handleConfirm} onMouseOut={scaleOff} onMouseOver={scale} variant="contained">
          {startCase(verb)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
