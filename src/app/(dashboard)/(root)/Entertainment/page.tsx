'use client'
import { Image } from '@nextui-org/react'
import React from 'react'
import HeaderImage from './components/headerImage'
import MainContent from './components/mainContent'
import ImageArticle from './components/ImageArticle'
import MainContact from './components/mainContact'
import FooterEn from './components/fotteren'
import { motion, useScroll, useSpring } from 'framer-motion'
export default function Page() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-3 origin-left bg-white"
        style={{ scaleX }}
      />
      <div className="h-full max-h-screen w-full bg-black animate-out">
        <div className="flex flex-col items-center justify-center bg-black ">
          <HeaderImage />
          <MainContent />
          <MainContact />
          <ImageArticle />
          <FooterEn />
        </div>
      </div>
    </>
  )
}
