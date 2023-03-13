'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Grid } from '@chakra-ui/react'
import { Footer, Navbar } from '../components'
import './globals.css'

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CacheProvider>
          <ChakraProvider>
            <Grid minH={'100vh'} templateRows={'auto 1fr auto'}>
              <Navbar />
              {children}
              <Footer />
            </Grid>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
