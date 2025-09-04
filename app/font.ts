import { Ephesis, Satisfy, Montserrat } from 'next/font/google'

export const ephesis = Ephesis({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-ephesis'
})

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-satisfy'
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat'
})