'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// types

interface CustomWindow extends Window {
  amp_refreshAllSlots?: () => void
}

declare let window: CustomWindow

// hooks

export const useRefreshOnRouteChange = () => {
  const pathname = usePathname()
  const [isInitial, setIsInitial] = useState(true)

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false)
    } else {
      if (window.amp_refreshAllSlots) {
        window.amp_refreshAllSlots()
      }
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
}
