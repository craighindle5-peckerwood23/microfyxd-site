// app/layout.tsx
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })

export const metadata = {
  title: 'Microfyxd',
  description: 'AI Operator Console powered by Groq',
}

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="bg-[#05070A] text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
