// app/layout.tsx
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })

export const metadata = {
  title: 'Microfyxd',
  description: 'AI Operator Console powered by Groq',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="bg-[#05070A] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
