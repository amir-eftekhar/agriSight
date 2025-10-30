# AgriSight Setup Guide

Complete setup instructions for getting AgriSight running on your machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

## 🔑 API Keys Required

### 1. Gemini API Key (Required for AI features)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Supabase (Optional, for database features)

1. Visit [Supabase](https://supabase.com)
2. Create a new account or sign in
3. Create a new project
4. Go to Project Settings > API
5. Copy the Project URL and anon/public key

## 🚀 Installation Steps

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd congressionalappproj-plantdetect

# Install dependencies
npm install
```

### Step 2: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Gemini API Key (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Weather API
OPENWEATHER_API_KEY=your_openweather_api_key
```

### Step 3: Database Setup (Optional)

If you want to use database features:

1. **Create Supabase Tables**

   Run these SQL commands in your Supabase SQL Editor:

   ```sql
   -- Create user profiles table
   CREATE TABLE user_profiles (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     region TEXT,
     primary_crops TEXT[],
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create detection results table
   CREATE TABLE detection_results (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES user_profiles(id),
     image_url TEXT NOT NULL,
     disease TEXT NOT NULL,
     confidence DECIMAL(5,2),
     ai_analysis TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create index for faster queries
   CREATE INDEX idx_detection_user ON detection_results(user_id);
   CREATE INDEX idx_detection_date ON detection_results(created_at DESC);
   ```

2. **Create Storage Bucket**

   In Supabase Dashboard:
   - Go to Storage
   - Create a new bucket named `plant-images`
   - Set it to public if you want images to be accessible

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🧪 Testing the Application

### Test Disease Detection
1. Navigate to `/detect`
2. Upload a plant leaf image
3. Wait for AI analysis
4. Review results and recommendations

### Test AI Chat
1. Navigate to `/chat`
2. Ask agriculture-related questions
3. Review AI responses

### Test Dashboard
1. Navigate to `/dashboard`
2. View analytics and trends
3. Check detection history

## 🔧 Troubleshooting

### Common Issues

**Issue: API calls failing**
- Verify your `.env.local` file has correct API keys
- Restart the development server after adding environment variables
- Check API key permissions and quotas

**Issue: Images not uploading**
- Check file size (should be under 10MB)
- Verify supported formats: JPG, PNG, WebP
- Check browser console for errors

**Issue: Tailwind styles not loading**
- Clear `.next` folder: `rm -rf .next`
- Restart development server
- Check `tailwind.config.ts` configuration

**Issue: TypeScript errors**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration
- Restart your IDE/editor

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Try clearing `.next` folder and node_modules:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run dev
   ```

## 📱 Mobile Development

To test on mobile devices:

1. Find your local IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Access from mobile device:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Deploy to Other Platforms

AgriSight can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

Refer to Next.js deployment documentation for platform-specific instructions.

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Keep API keys secure and rotate regularly
- Use environment variables for all sensitive data
- Enable RLS (Row Level Security) in Supabase
- Validate all user inputs on the server side

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)

## ✅ Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed successfully
- [ ] `.env.local` created with API keys
- [ ] Development server runs without errors
- [ ] Can access homepage at localhost:3000
- [ ] Can upload and analyze images
- [ ] AI chat responds correctly
- [ ] Dashboard displays properly
- [ ] Learning hub content loads

---

If you've completed all steps successfully, you're ready to start using AgriSight! 🎉

