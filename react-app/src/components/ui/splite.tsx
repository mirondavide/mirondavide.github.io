'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Delay Spline loading to prioritize main content
    const timer = requestIdleCallback ?
      requestIdleCallback(() => setShouldLoad(true)) :
      setTimeout(() => setShouldLoad(true), 100)

    return () => {
      if (typeof timer === 'number') {
        clearTimeout(timer)
      }
    }
  }, [])

  if (!shouldLoad) {
    return <div className="w-full h-full bg-black" />
  }

  return (
    <Suspense
      fallback={<div className="w-full h-full bg-black" />}
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  )
}
