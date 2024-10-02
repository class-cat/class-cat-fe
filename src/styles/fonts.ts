import {
  Mochiy_Pop_P_One,
  Open_Sans,
  Poppins,
  Work_Sans,
} from "next/font/google"

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

export const inter = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"],
})

export const mochiy = Mochiy_Pop_P_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mochiy",
})
