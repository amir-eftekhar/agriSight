# Deployment Guide for AgriSight

This guide covers deploying AgriSight to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables:
   ```
   GEMINI_API_KEY=your_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

#### Custom Domain (Optional)
- Go to Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### Option 2: Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   Add the same environment variables as Vercel

3. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify init
   netlify deploy --prod
   ```

### Option 3: AWS Amplify

1. **Connect Repository**
   - Open AWS Amplify Console
   - Connect your GitHub repo
   - Select branch

2. **Build Settings** (`amplify.yml`)
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add in Amplify Console → Environment Variables

### Option 4: DigitalOcean App Platform

1. **Create New App**
   - Connect GitHub repository
   - Choose branch

2. **Configure Build**
   ```
   Build Command: npm run build
   Run Command: npm start
   ```

3. **Add Environment Variables**
   In App → Settings → Environment

4. **Deploy**
   DigitalOcean will build and deploy automatically

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile` in root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  agrisight:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t agrisight .

# Run container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  agrisight

# Or use docker-compose
docker-compose up -d
```

## ☸️ Kubernetes Deployment

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: agrisight
spec:
  replicas: 3
  selector:
    matchLabels:
      app: agrisight
  template:
    metadata:
      labels:
        app: agrisight
    spec:
      containers:
      - name: agrisight
        image: your-registry/agrisight:latest
        ports:
        - containerPort: 3000
        env:
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: agrisight-secrets
              key: gemini-api-key
        - name: NEXT_PUBLIC_SUPABASE_URL
          valueFrom:
            configMapKeyRef:
              name: agrisight-config
              key: supabase-url
---
apiVersion: v1
kind: Service
metadata:
  name: agrisight-service
spec:
  selector:
    app: agrisight
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 🔧 Configuration

### next.config.js for Production

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
    unoptimized: false,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
```

## 🌍 Environment Variables

### Required for Production

```env
# AI Services
GEMINI_API_KEY=your_gemini_api_key

# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
OPENWEATHER_API_KEY=your_weather_api_key
NODE_ENV=production
```

## 📊 Performance Optimization

### Before Deployment:

1. **Optimize Images**
   - Use WebP format
   - Compress with tools like TinyPNG
   - Use Next.js Image component

2. **Enable Caching**
   ```javascript
   // next.config.js
   async headers() {
     return [
       {
         source: '/images/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ];
   }
   ```

3. **Analyze Bundle**
   ```bash
   npm install -g @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

## 🔒 Security Checklist

Before going live:

- [ ] All API keys in environment variables
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] CORS properly configured
- [ ] SQL injection prevention
- [ ] XSS protection enabled

## 📈 Monitoring

### Recommended Tools:

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics** for user tracking
3. **Sentry** for error tracking
4. **LogRocket** for session replay
5. **Uptime Robot** for uptime monitoring

### Add Sentry (Optional)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors
- Ensure environment variables are set

### 500 Errors
- Check server logs
- Verify API keys are correct
- Check database connection
- Review error monitoring tools

### Slow Performance
- Enable compression
- Optimize images
- Use CDN for static assets
- Enable browser caching
- Consider server-side caching

## 📱 Mobile Considerations

- Test on real devices
- Verify touch targets (44x44px minimum)
- Test with slow 3G connection
- Ensure offline fallbacks work
- Test camera access permissions

## ✅ Pre-Launch Checklist

- [ ] Production environment variables set
- [ ] Database migrations run
- [ ] SSL certificate configured
- [ ] Custom domain configured
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] SEO metadata added
- [ ] Social media cards configured
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

## 🎉 Post-Deployment

1. **Test Everything**
   - All pages load correctly
   - Images upload and detect properly
   - Chat functionality works
   - Dashboard displays data
   - Mobile experience is smooth

2. **Monitor**
   - Check error rates
   - Monitor response times
   - Review user analytics
   - Watch server resources

3. **Optimize**
   - Review performance metrics
   - Optimize slow queries
   - Reduce bundle size if needed
   - Improve Core Web Vitals

---

Need help? Check the [SETUP.md](./SETUP.md) or open an issue on GitHub.

