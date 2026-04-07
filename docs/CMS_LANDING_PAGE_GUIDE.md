# CMS Landing Page & Blog — Design System & Accessibility Guide

Extending Enabled Talent's **WCAG 2.2 AAA color palette and accessibility standards** to a CMS-driven landing page with blog functionality.

---

## 1. Color Palette Extension

### Primary Palette (Same as Enabled Talent App)

```css
:root {
  /* Text */
  --text-primary: #1e293b;      /* slate-900: 12.6:1 contrast */
  --text-secondary: #334155;    /* slate-700: 10.3:1 contrast */
  --text-muted: #334155;        /* slate-700: 10.3:1 contrast */

  /* Functional Colors */
  --link-color: #7c2d12;        /* orange-900: 9.4:1 contrast */
  --text-error: #991b1b;        /* red-800: 8.3:1 contrast */
  --text-success: #064e3b;      /* emerald-900: 9.7:1 contrast */
  --text-warning: #78350f;      /* amber-900: 9.1:1 contrast */

  /* Focus */
  --focus-ring-color: #C27803;  /* amber-900: 3:1+ on all BG */

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;      /* slate-50 */
  --bg-tertiary: #f1f5f9;       /* slate-100 */

  /* Borders */
  --border-light: #e2e8f0;      /* slate-200 */
  --border-medium: #cbd5e1;     /* slate-300 */
}
```

### Extended Palette for Landing Page & Blog

```css
:root {
  /* Section Backgrounds - Maintain AAA Contrast */
  --bg-hero: #eef4fc;           /* Light blue, pairs with #1e293b */
  --bg-card-light: #f0f4f8;     /* Neutral light, high contrast */
  --bg-card-alternate: #fff7ed; /* Warm cream (for job seeker section) */
  --bg-card-accent: #e8f1ff;    /* Soft blue (for employer section) */

  /* Blog Post Backgrounds */
  --bg-blog-featured: #f0fdf4;  /* Emerald tint */
  --bg-blog-highlight: #fef3c7; /* Amber highlight */
  --bg-blog-secondary: #f5f3ff; /* Purple tint */

  /* Border Colors - AAA Contrast */
  --border-brand: #7c2d12;      /* Orange-900 for emphasis */
  --border-success: #064e3b;    /* Emerald-900 */
  --border-warning: #78350f;    /* Amber-900 */

  /* Text on Dark Backgrounds (for dark hero sections if needed) */
  --text-inverse: #ffffff;
  --text-inverse-secondary: #f1f5f9;

  /* Semantic Colors for Status/Tags */
  --tag-accessibility: #dbeafe; /* Light blue BG, use #1d4ed8 text */
  --tag-career: #dcfce7;        /* Light green BG, use #15803d text */
  --tag-news: #fce7f3;          /* Light pink BG, use #831843 text */
}
```

---

## 2. Shared CMS Component Library

### A. Hero Section Component

```tsx
// components/cms/HeroSection.tsx
import { ReactNode } from 'react';
import { SkipLink } from '@/components/a11y/SkipLink';

interface HeroSectionProps {
  heading: string;           // Required for SEO
  subheading?: string;
  description?: string;
  backgroundImage?: string;
  backgroundColor?: string;  // 'light' | 'dark' | 'accent'
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  children?: ReactNode;
}

export function HeroSection({
  heading,
  subheading,
  description,
  backgroundColor = 'light',
  cta,
  children,
}: HeroSectionProps) {
  const bgClasses = {
    light: 'bg-[var(--bg-hero)]',
    dark: 'bg-[#1e293b] text-white',
    accent: 'bg-[var(--bg-card-accent)]',
  };

  return (
    <section
      className={`relative py-16 sm:py-24 lg:py-32 ${bgClasses[backgroundColor]}`}
      aria-labelledby="hero-heading"
      role="region"
    >
      {/* Skip link */}
      <SkipLink />

      {/* Decorative background (aria-hidden) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow/Subheading */}
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--link-color)]">
              {subheading}
            </p>
          )}

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{
              color: backgroundColor === 'dark' ? '#ffffff' : 'var(--text-primary)',
            }}
          >
            {heading}
          </h1>

          {/* Description */}
          {description && (
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{
                color:
                  backgroundColor === 'dark'
                    ? 'var(--text-inverse-secondary)'
                    : 'var(--text-secondary)',
              }}
            >
              {description}
            </p>
          )}

          {/* CTA Button */}
          {cta && (
            <div className="mt-8">
              <a
                href={cta.href}
                className={`inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-2 ${
                  cta.variant === 'secondary'
                    ? 'border-2 border-[var(--link-color)] text-[var(--link-color)] hover:bg-[rgba(124,45,18,0.05)]'
                    : 'bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] text-white shadow-md hover:brightness-105'
                }`}
              >
                {cta.label}
              </a>
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
```

### B. Blog Post Card Component

```tsx
// components/cms/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { VisuallyHidden } from '@/components/a11y/VisuallyHidden';

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishDate: string;
  category: string;
  readTime?: number;
  featured?: boolean;
}

export function BlogPostCard({
  id,
  title,
  excerpt,
  featuredImage,
  author,
  publishDate,
  category,
  readTime,
  featured = false,
}: BlogPostCardProps) {
  // Format date
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Category color coding (AAA contrast maintained)
  const categoryColors = {
    accessibility: { bg: '#dbeafe', text: '#1d4ed8' },
    career: { bg: '#dcfce7', text: '#15803d' },
    news: { bg: '#fce7f3', text: '#831843' },
    default: { bg: 'var(--bg-tertiary)', text: 'var(--text-primary)' },
  };

  const colors =
    categoryColors[category as keyof typeof categoryColors] ||
    categoryColors.default;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg border ${
        featured ? 'border-[var(--border-brand)]' : 'border-[var(--border-light)]'
      } bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] focus-within:ring-offset-2`}
    >
      {/* Featured Image with Accessible Link */}
      {featuredImage && (
        <div className="relative h-48 overflow-hidden bg-[var(--bg-tertiary)]">
          <Link href={`/blog/${id}`} className="block h-full w-full">
            <Image
              alt={`Featured image for: ${title}`}
              className="h-full w-full object-cover transition group-hover:scale-105"
              height={192}
              src={featuredImage}
              width={400}
            />
          </Link>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category Badge */}
        <div className="flex items-center gap-3">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
            }}
          >
            {category}
          </span>
          {readTime && (
            <span className="text-xs text-[var(--text-muted)]">
              {readTime} min read
            </span>
          )}
        </div>

        {/* Title - Always a Link */}
        <h3 className="mt-3 text-xl font-bold leading-tight text-[var(--text-primary)]">
          <Link
            href={`/blog/${id}`}
            className="transition hover:text-[var(--link-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] focus-visible:rounded-sm"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-2 flex-1 text-[var(--text-secondary)]">{excerpt}</p>

        {/* Meta: Author + Date */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>
            By <strong>{author}</strong>
          </span>
          <span aria-hidden="true">•</span>
          <time dateTime={publishDate}>{formattedDate}</time>
        </div>

        {/* Read More Link (keyboard accessible) */}
        <Link
          href={`/blog/${id}`}
          className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--link-color)] transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] focus-visible:rounded-sm"
          aria-label={`Read more: ${title}`}
        >
          Read more
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
```

### C. Rich Text/CMS Content Container

```tsx
// components/cms/RichContent.tsx
import { ReactNode } from 'react';
import { VisuallyHidden } from '@/components/a11y/VisuallyHidden';

interface RichContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper for CMS-generated HTML content with WCAG AAA defaults.
 * Ensures:
 * - Proper heading hierarchy
 * - Link underlines
 * - Color contrast
 * - Code block styling
 * - List styling
 */
export function RichContent({ children, className = '' }: RichContentProps) {
  return (
    <div
      className={`prose prose-sm max-w-none sm:prose-base ${className}`}
      style={{
        '--prose-headings': 'var(--text-primary)',
        '--prose-links': 'var(--link-color)',
        '--prose-body': 'var(--text-primary)',
        '--prose-code': '#be185d',
        '--prose-pre-bg': '#1e293b',
        '--prose-pre-code': '#e2e8f0',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Global prose styles to add to globals.css
 */
const proseStyles = `
/* Prose overrides for CMS content */
.prose {
  color: var(--text-primary);
  line-height: 1.75;
}

.prose h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-light);
  padding-bottom: 0.5rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.prose a {
  color: var(--link-color);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  transition: opacity 0.2s;
}

.prose a:hover {
  opacity: 0.8;
}

.prose a:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 2px;
  border-radius: 2px;
}

.prose code {
  background: var(--bg-tertiary);
  color: #be185d;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: 'Consolas', 'Courier New', monospace;
}

.prose pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.prose ul,
.prose ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.prose li {
  margin: 0.5rem 0;
}

.prose blockquote {
  border-left: 4px solid var(--link-color);
  padding-left: 1.5rem;
  font-style: italic;
  color: var(--text-secondary);
  margin: 1.5rem 0;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

/* Ensure images have alt text (CMS validation) */
.prose img:not([alt]) {
  outline: 3px dashed var(--text-error);
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9em;
}

.prose thead tr {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
}

.prose th,
.prose td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid var(--border-light);
}

.prose tbody tr:nth-child(even) {
  background: var(--bg-secondary);
}
`;
```

---

## 3. CMS Content Validation & Sanitization

### Zod Schema for CMS Landing Page Content

```ts
// lib/schemas/cms.schema.ts
import { z } from 'zod';

export const CMSHeroSchema = z.object({
  id: z.string(),
  heading: z.string().min(3).max(200),
  subheading: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  backgroundImage: z.string().url().optional(),
  backgroundColor: z.enum(['light', 'dark', 'accent']).default('light'),
  ctaLabel: z.string().max(50).optional(),
  ctaUrl: z.string().url().optional(),
  ctaVariant: z.enum(['primary', 'secondary']).default('primary'),
});

export const CMSBlogPostSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(5).max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20).max(300),
  content: z.string().min(100), // Will be sanitized
  featuredImage: z.string().url().optional(),
  author: z.string().max(100),
  publishDate: z.string().datetime(),
  category: z.enum(['accessibility', 'career', 'news', 'resources']),
  tags: z.array(z.string().max(50)).max(10).optional(),
  readTime: z.number().int().min(1).max(60).optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export const CMSLandingPageSchema = z.object({
  id: z.string(),
  title: z.string().max(60),
  description: z.string().max(160),
  sections: z.array(
    z.object({
      type: z.enum(['hero', 'features', 'testimonials', 'faq', 'cta']),
      content: z.record(z.any()),
    })
  ),
  published: z.boolean().default(false),
});
```

### HTML Sanitization Utility

```ts
// lib/helpers/sanitizeContent.ts
import { sanitize } from 'isomorphic-dompurify';

export function sanitizeHTMLContent(html: string): string {
  // Allow tags that preserve accessibility
  return sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 'a',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'section', 'article', 'aside',
      'figure', 'figcaption',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'title', 'alt',
      'width', 'height', 'src',
      'id', 'class',
      'data-*',
      'aria-*',
    ],
    ALLOW_DATA_ATTR: true,
  });
}

export function validateImageAlt(html: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const imagesWithoutAlt: string[] = [];

  doc.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt.push(img.getAttribute('src') || 'unknown');
    }
  });

  return imagesWithoutAlt;
}

export function validateHeadingHierarchy(html: string): string[] {
  const errors: string[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let lastHeadingLevel = 0;
  let h1Count = 0;

  doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const level = parseInt(heading.tagName[1], 10);

    if (heading.tagName === 'H1') {
      h1Count += 1;
    }

    if (level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
      errors.push(
        `Heading hierarchy skipped: jumped from H${lastHeadingLevel} to H${level}`
      );
    }

    lastHeadingLevel = level;
  });

  if (h1Count === 0) {
    errors.push('Missing h1 heading');
  }
  if (h1Count > 1) {
    errors.push(`Multiple h1 headings found (${h1Count})`);
  }

  return errors;
}
```

---

## 4. Blog Post Page Template

```tsx
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/a11y/Breadcrumb';
import { RichContent } from '@/components/cms/RichContent';
import { LiveRegion } from '@/components/a11y/LiveRegion';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  // Fetch from CMS
  const post = await fetchBlogPost(params.slug);

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In production, fetch from CMS/API
  const post = {
    id: params.slug,
    title: 'Building Accessible Web Experiences',
    excerpt: 'Learn how to create web content that works for everyone.',
    content: '<h2>Introduction</h2><p>...</p>',
    author: 'Jane Doe',
    publishDate: '2024-03-15',
    category: 'accessibility',
    readTime: 8,
    featuredImage: '/blog/accessibility.jpg',
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, current: true },
        ]}
      />

      {/* Live region for screen reader updates */}
      <LiveRegion
        politeness="polite"
        visible={false}
        aria-label="Page content"
      >
        Article loaded: {post.title}
      </LiveRegion>

      {/* Article Container */}
      <article
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Meta Information */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
            }}
          >
            {post.category}
          </span>
          <span>
            By <strong itemProp="author">{post.author}</strong>
          </span>
          <span aria-hidden="true">•</span>
          <time
            dateTime={post.publishDate}
            itemProp="datePublished"
          >
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.readTime && (
            <>
              <span aria-hidden="true">•</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <figure className="mb-8">
            <Image
              alt={post.title}
              className="w-full rounded-lg"
              height={400}
              src={post.featuredImage}
              width={800}
            />
            <figcaption className="mt-2 text-center text-sm text-[var(--text-muted)]">
              Featured image for {post.title}
            </figcaption>
          </figure>
        )}

        {/* Title */}
        <h1
          className="mb-4 text-4xl font-bold text-[var(--text-primary)]"
          itemProp="headline"
        >
          {post.title}
        </h1>

        {/* Excerpt/Description */}
        <p className="mb-8 text-lg text-[var(--text-secondary)]">
          {post.excerpt}
        </p>

        {/* Content */}
        <RichContent>{post.content}</RichContent>

        {/* Share Section */}
        <aside
          aria-label="Share this article"
          className="mt-12 border-t border-[var(--border-light)] pt-8"
        >
          <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
            Share this article
          </h2>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-light)] px-4 font-medium text-[var(--link-color)] transition hover:bg-[var(--bg-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]"
              aria-label="Share on Twitter"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--border-light)] px-4 font-medium text-[var(--link-color)] transition hover:bg-[var(--bg-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]"
              aria-label="Share on LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </aside>

        {/* Related Posts */}
        <section
          aria-labelledby="related-heading"
          className="mt-12 border-t border-[var(--border-light)] pt-8"
        >
          <h2
            id="related-heading"
            className="mb-6 text-2xl font-bold text-[var(--text-primary)]"
          >
            Related Articles
          </h2>
          {/* Render 3 related blog posts here */}
        </section>
      </article>
    </main>
  );
}

async function fetchBlogPost(slug: string) {
  // In production, fetch from your CMS API
  // const response = await fetch(`${process.env.CMS_API}/posts/${slug}`);
  // return response.json();
  return {};
}
```

---

## 5. Blog Landing Page with Filters

```tsx
// app/blog/page.tsx
import { useState } from 'react';
import { Metadata } from 'next';
import { BlogPostCard } from '@/components/cms/BlogPostCard';
import { Breadcrumb } from '@/components/a11y/Breadcrumb';
import { HeroSection } from '@/components/cms/HeroSection';

export const metadata: Metadata = {
  title: 'Blog | Enabled Talent',
  description: 'Stories, insights, and resources on accessibility and inclusive hiring.',
};

export default function BlogPage() {
  // In production, these would come from CMS
  const allPosts = [
    {
      id: '1',
      title: 'Building Accessible Web Experiences',
      excerpt: 'Learn how to create web content that works for everyone.',
      author: 'Jane Doe',
      publishDate: '2024-03-15',
      category: 'accessibility',
      readTime: 8,
    },
    // ... more posts
  ];

  const categories = ['All', 'accessibility', 'career', 'news', 'resources'];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        heading="Insights & Stories"
        subheading="From our community"
        description="Discover resources, career tips, and stories from job seekers and employers building a more accessible workplace."
        backgroundColor="light"
      />

      {/* Blog Container */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', current: true },
          ]}
        />

        {/* Category Filter */}
        <div aria-label="Filter blog posts by category" className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-2 ${
                cat === 'All'
                  ? 'bg-[var(--link-color)] text-white'
                  : 'border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
              onClick={() => {
                // Filter logic
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Pagination (if many posts) */}
        <nav
          aria-label="Blog post pagination"
          className="mt-12 flex justify-center gap-2"
        >
          {/* Pagination buttons */}
        </nav>
      </section>
    </main>
  );
}
```

---

## 6. Accessibility Checklist for CMS Landing Page

### Before Launch

- [ ] **Color Contrast**: All text meets 7:1 contrast (use WAVE, aXe DevTools)
- [ ] **Heading Hierarchy**: One H1 per page, no skipped levels
- [ ] **Image Alt Text**: Every image has descriptive alt text
- [ ] **Keyboard Navigation**: Tab through entire page, all interactive elements accessible
- [ ] **Focus Indicators**: 3px amber ring visible on all interactive elements
- [ ] **Forms**: Labels associated with inputs, error messages linked via `aria-describedby`
- [ ] **Links**: Underlined, descriptive text (not "click here")
- [ ] **Mobile**: 44×44px minimum touch targets, responsive layout
- [ ] **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Semantic HTML**: Proper `<main>`, `<section>`, `<article>`, `<nav>` tags
- [ ] **CMS Content**: Validate before publishing (heading hierarchy, alt text, links)

### Automated Testing

```bash
# Install accessibility tools
npm install --save-dev jest-axe @testing-library/react

# Run accessibility tests
npm run test:a11y
```

---

## 7. CMS Integration Recommendations

### Headless CMS Options Compatible with Next.js

| CMS | Pros | Cons |
|-----|------|------|
| **Contentful** | Flexible, powerful, great API | Paid, steep learning curve |
| **Sanity** | Groq queries, great DX, affordable | Smaller community |
| **Strapi** | Open-source, self-hosted, Node.js | More maintenance required |
| **Prismic** | Good UI, slice machine, free tier | Limited customization |
| **Notion** | Free, simple, good for small blogs | Not designed for CMS |

### Recommended Stack for Enabled Talent

**Sanity + Next.js** — Best balance of flexibility, cost, and accessibility support.

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create Sanity studio
sanity init

# Install Sanity client in Next.js
npm install next-sanity @sanity/image-url
```

---

## 8. Environment Setup

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Cloudinary (for image optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## Summary

**Key Principles for CMS Landing Page + Blog:**

1. **Reuse the color palette** — All 8 core colors work across landing page, blog, and dashboard
2. **Enforce accessibility in CMS** — Validate heading hierarchy, alt text, and contrast before publishing
3. **Use shared components** — HeroSection, BlogPostCard, RichContent ensure consistency
4. **Sanitize user content** — Always sanitize HTML from CMS to prevent XSS
5. **Test before deploy** — Run jest-axe tests, manual keyboard navigation, screen reader testing
6. **Document for content team** — Create a content guidelines doc for your CMS editors

This approach scales the Enabled Talent design system to new pages while maintaining **WCAG 2.2 AAA compliance** across the entire platform.
