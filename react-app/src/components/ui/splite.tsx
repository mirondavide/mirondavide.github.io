'use client'

import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (app: Application) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={onLoad}
    />
  )
}
