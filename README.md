# MineClash Store

A modern Next.js + TypeScript + Tailwind CSS storefront for the MineClash Minecraft server, supporting USD and INR payments with Stripe integration placeholders.

## Features

- 🛍️ **Product Shop** – Browse and view detailed product pages
- 💳 **Multi-Currency** – Support for USD ($) and INR (₹)
- 🔐 **Stripe Ready** – Placeholder configuration for Stripe payments (USD & INR)
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile
- ⚡ **Fast & Modern** – Built with Next.js 13, React 18, TypeScript, Tailwind CSS
- 🎯 **SEO Friendly** – Optimized for search engines

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Copy environment template and add your Stripe keys when ready:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the store.

## Configuration

### Environment Variables

When you're ready to enable Stripe payments, add your keys to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_USD=pk_test_...
STRIPE_SECRET_KEY_USD=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_INR=pk_test_...
STRIPE_SECRET_KEY_INR=sk_test_...
```

Get your keys from the [Stripe Dashboard](https://dashboard.stripe.com).

### Logo & Branding

Placeholder logos are included in `public/images/`:

- `logo.svg` — primary dark banner logo
- `logo-light.svg` — light-background variant
- `logo-monogram.svg` — small square monogram (used as favicon)

Replace any of these files with your final SVG/PNG. The header uses the `Logo` component (`components/Logo.tsx`).

## Project Structure

```
pages/
  ├── index.tsx          # Home page
  ├── shop.tsx           # Product listing
  ├── product/[id].tsx   # Product detail page
  ├── cart.tsx           # Shopping cart (placeholder)
  ├── checkout.tsx       # Stripe checkout
  └── api/
      └── products.ts    # API endpoint for products

components/
  ├── Header.tsx         # Navigation & currency selector
  ├── Footer.tsx         # Footer with links
  └── ProductCard.tsx    # Product grid card

lib/
  └── products.ts        # Mock product data

styles/
  └── globals.css        # Global Tailwind styles

public/images/
  └── placeholder.txt    # Replace with logo.png
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel auto-detects Next.js settings
5. Add environment variables in **Settings > Environment Variables**
6. Click "Deploy"

### GitHub Actions (Automated Deploy)

A basic GitHub Actions workflow is available in `.github/workflows/deploy.yml` for automated deployments to Vercel.

### Manual Deployment

```bash
# Build
npm run build

# Deploy using your hosting provider (Netlify, AWS, etc.)
```

## API Routes

### GET `/api/products`

Returns all products with USD and INR pricing.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Diamond Rank",
    "priceUSD": 9.99,
    "priceINR": 799,
    "description": "Diamond rank package"
  }
]
```

## Stripe Integration (Not Yet Active)

Stripe configuration is a placeholder. The checkout page includes form fields and environment variable references, but money won't actually transfer until you:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add them to `.env.local`
4. Implement the Stripe SDK in `pages/checkout.tsx`

See [Stripe Docs](https://stripe.com/docs) for implementation details.

## Customization

### Add More Products

Edit `lib/products.ts` and `pages/api/products.ts`:

```typescript
{ 
  id: 6, 
  name: 'Your Item', 
  priceUSD: 19.99, 
  priceINR: 1599, 
  description: 'Your item description' 
}
```

### Customize Styling

Tailwind CSS is configured in `tailwind.config.js`. Edit `styles/globals.css` for global styles or use Tailwind classes in components.

### Change Colors

Edit the color classes in `Header.tsx` (currently blue gradient) and `Footer.tsx`.

## License

MIT

## Support

For questions or issues, contact: support@mineclash.com

---

**Logo Note:** A placeholder "MC" logo is currently used. Upload your official MineClash logo to `public/images/logo.png` and update the Header component to display it.

