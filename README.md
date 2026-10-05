# Lazar Bojanić - Portfolio (11ty)

A simple, fast, and lightweight static site generator version of the portfolio built with [Eleventy (11ty)](https://www.11ty.dev/).

## Features

- **Static HTML Generation**: Zero JavaScript runtime needed for content pages, ultra fast load times.
- **Zero Extra Dependencies**: Powered purely by `@11ty/eleventy` with native Node/JS APIs and official plugins.
- **Modern ES Modules**: Standard ECMAScript Modules (`import`/`export`) throughout configuration and data.
- **Dark / Light Mode**: Seamless theme switching with system preference support and `localStorage` persistence.
- **Projects Showcase**: Dynamically loaded from project Markdown files with tags, thumbnails, and repository links.
- **Blog with Markdown**: Full markdown post rendering with syntax-ready styling, reading time, author card, and copyable article links.
- **About Page**: Clean biography, skills overview, and direct social profile links.
- **Responsive & Accessible**: Clean mobile-first layout styled with modern CSS matching Nuxt UI typography and palette.

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm / npm / yarn

### Installation

```bash
cd 11ty-site
pnpm install
```

### Development

To start the local development server with hot-reloading:

```bash
pnpm dev
# or: pnpm start
```

### Production Build

To generate the static site files into the `_site/` directory:

```bash
pnpm build
```

## Project Structure

```text
11ty-site/
├── eleventy.config.js       # Eleventy configuration (plugins, filters, passthrough copies)
├── package.json             # Scripts & dependencies
├── src/
│   ├── _data/               # Global data files (site metadata, about)
│   ├── _includes/
│   │   ├── components/      # Reusable UI components (header, footer)
│   │   └── layouts/         # Page and post layouts (base, post)
│   ├── assets/
│   │   ├── css/             # Stylesheet (style.css)
│   │   └── images/          # Images and assets
│   ├── blog/                # Blog markdown posts & listing page
│   ├── projects/            # Project Markdown source files
│   ├── about.liquid         # About page template
│   ├── index.liquid         # Home / Projects page template
│   ├── favicon.ico
│   └── robots.txt
└── _site/                   # Generated static website output
```
