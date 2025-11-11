'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      
      const handleLoadedMetadata = () => {
        if (video.videoWidth && video.videoHeight) {
          setIsPortrait(video.videoHeight > video.videoWidth)
        }
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      
      // Check if already loaded
      if (video.readyState >= 1) {
        handleLoadedMetadata()
      }

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      className={isPortrait ? 'h-full w-auto max-w-full max-h-full' : 'w-full h-auto max-w-full max-h-full'}
      style={{ objectFit: 'contain' }}
    >
      Your browser does not support the video tag.
    </video>
  )
}
