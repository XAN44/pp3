import Provider from '@/components/Provider'
import { Toaster } from '@/components/ui/toaster'
import { getCurrentUser } from '@/lib/session'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { ChakraProvi } from './ChakraProvi'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Navbars from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="relative">
        <Theme>
          <Provider>
            <Providers>
              <ChakraProvi>
                <Navbars userId={user?.id || ''} />
                <main className=" flex h-screen flex-col items-center justify-center">
                  {children}
                  <Toaster />
                </main>
              </ChakraProvi>
            </Providers>
          </Provider>
        </Theme>
      </body>
    </html>
  )
}
