'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoBlockProps {
  src: string
  isIframe?: boolean
  iframeProps?: {
    src: string
    title: string
    allow: string
    allowFullScreen: boolean
  }
}

export default function VideoBlock({ src, isIframe, iframeProps }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    if (!isIframe && videoRef.current) {
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
  }, [isIframe, src])

  if (isIframe && iframeProps) {
    return (
      <iframe
        src={iframeProps.src}
        title={iframeProps.title}
        className="w-full"
        style={{ aspectRatio: 'auto', minHeight: '400px' }}
        allow={iframeProps.allow}
        allowFullScreen={iframeProps.allowFullScreen}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={isPortrait ? 'h-full w-auto max-w-full' : 'w-full h-auto max-h-full'}
      style={{ objectFit: 'contain' }}
    >
      Your browser does not support the video tag.
    </video>
  )
}

