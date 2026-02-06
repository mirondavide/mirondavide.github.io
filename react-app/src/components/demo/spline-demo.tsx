'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
import { Linkedin, Github, FileUser } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const socialLinks = [
  { href: "https://www.linkedin.com/in/davide-miron/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/mirondavide", icon: Github, label: "GitHub" },
  { href: "/curriculum/CV.pdf", icon: FileUser, label: "CV" },
]

// Spline loader for mobile - loads immediately, fades in when ready
function MobileSpline() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

export function SplineSceneBasic() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show nothing until we know if mobile or desktop (prevents flash)
  if (isMobile === null) {
    return <div className="w-full min-h-screen bg-black" />
  }

  // Mobile version - no animations, Spline loads after content
  if (isMobile) {
    return (
      <div className="w-full min-h-screen bg-black relative overflow-hidden">
        {/* Spline loads after delay so content appears first */}
        <MobileSpline />

        {/* Content */}
        <div className="relative z-10 pointer-events-none min-h-screen flex flex-col">
          {/* Navbar */}
          <nav className="pointer-events-auto sticky top-0 px-4 py-2.5 backdrop-blur-md bg-white/5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-semibold text-white no-underline">
                miron.
              </a>
              <a href="/my-story" className="text-sm text-neutral-300">
                My Story
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="flex-1 flex items-center justify-center px-4">
            <section className="text-center w-full max-w-2xl p-4">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Davide Miron
              </h1>
              <p className="mt-3 text-neutral-300 text-lg font-light tracking-wide px-2">
                Building something that lasts beyond me.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6 pointer-events-auto">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm"
                  >
                    <item.icon size={20} />
                  </a>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }

  // Desktop version - with animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
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
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Spline scene - full screen background */}
      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 pointer-events-none min-h-screen flex flex-col">
        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto sticky top-0 px-6 lg:px-10 py-3 backdrop-blur-md bg-white/5 border-b border-white/10"
        >
          <div className="flex items-center justify-between">
            <motion.a
              href="/"
              className="text-3xl font-semibold text-white no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              miron.
            </motion.a>
            <div className="flex items-center gap-6">
              <motion.a
                href="/my-story"
                className="text-base text-neutral-300 hover:text-white transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                My Story
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-8">
          <motion.section
            className="text-center w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-8">
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
              >
                Davide Miron
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-neutral-300 text-xl md:text-2xl font-light tracking-wide px-2"
              >
                Building something that lasts beyond me.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4 mt-8 pointer-events-auto"
              >
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                  >
                    <item.icon size={22} />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}
