import { Client } from '@/comp/client'
import { FC, ReactNode } from 'react'

// types

type _RootLayoutProps = { children: ReactNode }

// metadata

export const metadata = {
  metadataBase: new URL('https://realkana.com')
}

// components

const RootLayout: FC<_RootLayoutProps> = ({ children }) => (
  <html lang="en-US">
    <body>
      <Client>{children}</Client>
    </body>
  </html>
)

export default RootLayout
