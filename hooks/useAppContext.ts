import { APP_CONTEXT } from '@/comp/appContext'
import { useContext } from 'react'

// hooks

export const useAppContext = () => {
  const context = useContext(APP_CONTEXT)

  if (context === null) {
    throw new Error('App context error.')
  }

  return context
}
