'use client'

import { Linkedin, Github, FileUser } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function MyStoryPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15,
        delayChildren: isMobile ? 0 : 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.1 : 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.1 : 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,255,255,0.3)",
    },
    tap: { scale: 0.95 },
  }

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: isMobile ? -10 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.15 : 0.6 }}
          className="sticky top-0 px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3 backdrop-blur-md bg-white/5 border-b border-white/10"
        >
          <div className="flex items-center justify-between">
            <motion.a
              href="/"
              className="text-2xl sm:text-3xl font-semibold text-white no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              miron.
            </motion.a>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 max-w-4xl mx-auto w-full">
          <motion.section
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Avatar */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <Image
                src="/img/AI_img.jpeg"
                alt="Profile"
                width={150}
                height={150}
                priority
                className="rounded-full mx-auto border-2 border-white/20 w-24 h-24 sm:w-36 sm:h-36 object-cover"
              />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 sm:mb-10"
            >
              Hey, I&apos;m Davide!
            </motion.h2>

            {/* Story paragraphs */}
            <motion.p
              variants={itemVariants}
              className="text-neutral-300 text-base sm:text-lg md:text-xl text-left mb-4 sm:mb-6 leading-relaxed"
            >
              I started coding at 13 because I wanted to build my own apps and interfaces.
              That curiosity led me into programming and design, where I&apos;ve been experimenting and improving through increasingly ambitious projects.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-neutral-300 text-base sm:text-lg md:text-xl text-left mb-4 sm:mb-6 leading-relaxed"
            >
              At 16, I built{" "}
              <a
                href="https://apps.apple.com/us/app/swipeflow-photo-cleaner/id6755852265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
              >
                SwipeFlow
              </a>
              , a mobile app designed to help users clean their photo gallery faster and more intuitively through simple swipe gestures. The entire app runs fully on-device, keeps privacy first, and works seamlessly on both iOS and Android. It was one of the first moments where I realized: I want to become truly great at building products.
            </motion.p>

            {/* SwipeFlow Image */}
            <motion.div variants={itemVariants} className="my-6 sm:my-8">
              <Image
                src="/img/SwipeFlow.jpg"
                alt="SwipeFlow App"
                width={500}
                height={300}
                className="mx-auto rounded-lg w-full max-w-[280px] sm:max-w-[400px] md:max-w-[50%]"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-neutral-300 text-base sm:text-lg md:text-xl text-left mb-4 sm:mb-6 leading-relaxed"
            >
              Another project I&apos;m particularly proud of is the{" "}
              <a
                href="https://conferintaeuropeana.it/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
              >
                European Youth & Family Conference website
              </a>
              , which I built from scratch with a strong focus on responsive design and smooth user experience. I wanted it to feel modern, accessible, and intuitive on every device — and I pushed hard to make sure it did.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-neutral-300 text-base sm:text-lg md:text-xl text-left mb-4 sm:mb-6 leading-relaxed"
            >
              I&apos;m committed to growing, improving, and building products that genuinely stand out. I&apos;m not just learning to code — I&apos;m working to become exceptional at it.
            </motion.p>

            {/* IMPLICAT Image */}
            <motion.div variants={itemVariants} className="my-6 sm:my-8">
              <Image
                src="/img/IMPLICAT.jpeg"
                alt="IMPLICAT"
                width={800}
                height={400}
                className="mx-auto rounded-lg w-full"
              />
            </motion.div>

            {/* Coming Soon */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-xl text-neutral-500 mt-8 sm:mt-12"
            >
              More projects are on the way…
            </motion.p>

            {/* Social Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
            >
              {[
                { href: "https://www.linkedin.com/in/davide-miron/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://github.com/mirondavide", icon: Github, label: "GitHub" },
                { href: "/curriculum/CV.pdf", icon: FileUser, label: "CV" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <item.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                  <span className="hidden sm:inline font-medium">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isMobile ? 0.1 : 1, duration: isMobile ? 0.15 : 0.6 }}
          className="text-center py-6 sm:py-8 px-4 border-t border-white/10"
        >
          <p className="text-neutral-400 mb-3 sm:mb-4 text-sm sm:text-base">Building something that lasts beyond me.</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/in/davide-miron/"
              className="text-neutral-400 hover:text-white transition-colors text-sm sm:text-base"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/mirondavide"
              className="text-neutral-400 hover:text-white transition-colors text-sm sm:text-base"
            >
              GitHub
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
