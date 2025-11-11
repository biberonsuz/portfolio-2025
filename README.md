# Portfolio Website

A modern portfolio website built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Frontend**: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity Studio v3
- **Hosting**: Vercel (frontend), Sanity Cloud (CMS)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Create a new Sanity project:
   ```bash
   npm create sanity@latest
   ```

2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Fill in your Sanity credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Access Sanity Studio

Visit [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio CMS.

## Project Structure

```
portfolio-2025/
├── app/                      # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx             # Homepage
│   ├── projects/
│   │   ├── page.tsx         # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx     # Individual project
│   ├── about/
│   │   └── page.tsx
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx     # Sanity Studio
├── components/
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   └── ContactForm.tsx
├── sanity/
│   ├── lib/
│   │   ├── client.ts        # Sanity client config
│   │   ├── queries.ts       # GROQ queries
│   │   └── image.ts         # Image URL builder
│   └── schemas/
│       ├── project.ts
│       ├── blogPost.ts
│       └── settings.ts
└── sanity.config.ts         # Sanity Studio config
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (optional, for preview mode)

### Set Up Sanity Webhook

1. Go to Sanity Dashboard → Settings → API → Webhooks
2. Add a new webhook pointing to your Vercel deploy hook
3. This will trigger a rebuild on content changes

## Features

- ✅ Homepage with featured projects
- ✅ Projects listing and detail pages
- ✅ About page with contact form
- ✅ Responsive design
- ✅ Sanity Studio integration
- ✅ Image optimization with Next.js Image
- ✅ TypeScript support
- ✅ Dark mode support (via Tailwind)

## Next Steps

- Add blog functionality
- Implement dark mode toggle
- Add SEO metadata
- Set up analytics
- Add live preview mode
- Implement search functionality
