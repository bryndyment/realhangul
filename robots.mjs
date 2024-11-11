import { copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const destinationFile = join(__dirname, 'app', 'robots.txt')
const environment = process.env.VERCEL_ENV

if (environment === 'preview') {
  console.log('This is a preview build.')
  copyFileSync('robots-demo.txt', destinationFile)
} else if (environment === 'production') {
  console.log('This is a production build.')
  copyFileSync('robots-release.txt', destinationFile)
} else {
  console.log('This is a development build.')
}
