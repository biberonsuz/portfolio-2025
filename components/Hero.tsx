import { PortableText, PortableTextBlock, PortableTextComponents } from '@portabletext/react'

interface HeroProps {
  bio?: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{children}</h4>,
    h5: ({ children }) => <h5 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{children}</h5>,
    h6: ({ children }) => <h6 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{children}</h6>,
    normal: ({ children }) => <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <a 
          href={value?.href} 
          target={value?.blank ? '_blank' : undefined} 
          rel={value?.blank ? 'noopener noreferrer' : undefined}
          className="underline"
          style={{ textUnderlineOffset: '0.25em' }}
        >
          {children}
        </a>
      )
    },
  },
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="h-dvh flex items-center snap-start snap-always overflow-y-auto py-8">
      {bio && bio.length > 0 && (
        <div className="hero-greetings text-left lg:text-left w-full" style={{ fontVariationSettings: '"wght" 500' }}>
          <PortableText value={bio} components={components} />
        </div>
      )}
    </section>
  )
}

