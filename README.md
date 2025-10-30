# AgriSight 🌱

**AI-Powered Plant Disease Detection Platform**

AgriSight is a comprehensive agricultural technology platform that uses AI to help farmers and agricultural students detect, prevent, and understand crop diseases. Built with Next.js, Gemini AI, and Supabase.

![AgriSight](https://img.shields.io/badge/AgriSight-v1.0-green)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔬 Disease Detection
- **Specialized ML Model**: Trained on PlantVillage dataset (38+ diseases)
- **Gemini Vision AI**: Dual-verification system for accurate diagnosis
- **Instant Analysis**: Real-time disease detection with 75-95% confidence
- **Treatment Recommendations**: Both organic and chemical solutions
- **Save & Track**: Store detection history in your dashboard

### 💬 AI Chat Assistant
- **ChatGPT-Style Interface**: Full-screen streaming chat experience
- **Image Analysis**: Upload plant images for instant diagnosis
- **Markdown & LaTeX Support**: Beautiful formatting with math notation
- **Pre-Question Buttons**: Quick-start suggestions for common issues
- **Expert Advice**: In-depth agricultural guidance powered by Gemini

### 👥 Farmer Community
- **Share Issues**: Post plant problems and get community help
- **Find Solutions**: Browse solved cases from other farmers
- **Upvote System**: Community-driven content ranking
- **Search & Filter**: Find specific diseases or crops quickly
- **Learn Together**: Connect with farmers facing similar challenges

### 📊 Dashboard & Analytics
- **Detection History**: Track all your plant health scans
- **Visual Analytics**: Charts showing disease distribution and trends
- **Health Scores**: Monitor your farm's overall plant health
- **AI Insights**: Personalized recommendations based on your data
- **Export Data**: Download your detection history

### 🔐 Authentication
- **Secure Sign-In**: Email/password authentication via Supabase
- **Email Verification**: Verify your account before accessing features
- **User Profiles**: Personalized experience for each user
- **Protected Routes**: Secure access to dashboard and saved data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- Gemini API key (free tier available)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/amir-eftekhar/agriSight.git
cd agriSight
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create `.env.local` in the root directory:

```env
# Gemini AI API Key
# Get from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
# Get from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. **Set up Supabase database:**

Go to your Supabase project's SQL Editor and run:
```sql
-- Copy and paste the contents of DATABASE_SCHEMA.sql
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
```
http://localhost:3000
```

## 📖 Documentation

- **[Setup Guide](SETUP.md)** - Detailed setup instructions
- **[Quick Start](QUICK_START.md)** - Get up and running quickly
- **[Implementation Guide](IMPLEMENTATION_GUIDE.md)** - Technical documentation
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[Database Schema](DATABASE_SCHEMA.sql)** - Database structure

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### AI & ML
- **Gemini AI** - Vision and language models
- **TensorFlow.js** - Client-side ML processing
- **React Markdown** - Markdown rendering with LaTeX

### Backend & Database
- **Supabase** - Authentication and PostgreSQL database
- **Row-Level Security** - Secure data access
- **Edge Functions** - Serverless API endpoints

### Visualization
- **Recharts** - Beautiful data visualizations
- **KaTeX** - Math formula rendering
- **Syntax Highlighter** - Code block highlighting

## 📱 Pages

- **`/`** - Landing page with feature overview
- **`/chat`** - AI chat assistant with image analysis
- **`/detect`** - Disease detection tool
- **`/dashboard`** - Personal analytics and history
- **`/community`** - Farmer community platform
- **`/learn`** - Educational resources

## 🔑 Key Features Explained

### Disease Detection System

The platform uses a **dual-verification approach**:

1. **Specialized Detection Model**
   - Trained on PlantVillage dataset
   - Analyzes 38+ plant diseases
   - Uses TensorFlow.js for image processing
   - Generates 75-95% confidence predictions

2. **Gemini Vision AI**
   - Analyzes the actual plant image
   - Verifies and enhances detection results
   - Provides detailed treatment plans
   - Explains findings in natural language

### Streaming Chat Interface

- **Real-time streaming**: Responses appear token-by-token
- **Image upload**: Attach plant images for analysis
- **Markdown support**: Tables, lists, and formatting
- **LaTeX rendering**: Mathematical formulas display perfectly
- **Floating input bar**: Modern ChatGPT-style design

### Community Platform

- **Post & Share**: Create posts about plant issues
- **Get Help**: Receive advice from other farmers
- **Mark Solutions**: Identify helpful answers
- **Search & Filter**: Find relevant discussions
- **Upvote Content**: Community-driven ranking

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Gemini AI API key | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `GEMINI_API_KEY`
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Other Platforms

- **Netlify**: Full support with environment variables
- **Railway**: Works with Docker deployment
- **Cloudflare Pages**: Compatible with edge runtime

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📊 Project Structure

```
agriSight/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes (chat, detect)
│   ├── chat/            # AI chat interface
│   ├── dashboard/       # User dashboard
│   ├── detect/          # Disease detection
│   ├── community/       # Community platform
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── ui/              # UI primitives
│   ├── Navigation.tsx   # Header navigation
│   ├── AuthModal.tsx    # Authentication modal
│   └── MarkdownRenderer.tsx
├── lib/                 # Utilities and services
│   ├── gemini.ts        # Gemini AI integration
│   ├── supabase.ts      # Database functions
│   ├── modelHandler.ts  # ML model logic
│   └── auth-context.tsx # Auth state management
├── public/              # Static assets
└── DATABASE_SCHEMA.sql  # Database structure
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amir Eftekhar**
- GitHub: [@amir-eftekhar](https://github.com/amir-eftekhar)

## 🙏 Acknowledgments

- **PlantVillage Dataset** - Disease classification data
- **Google Gemini** - AI capabilities
- **Supabase** - Backend infrastructure
- **Vercel** - Hosting platform
- **Next.js Team** - Amazing framework

## 📧 Support

For support, email [your-email] or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline mode with cached model
- [ ] Multi-language support
- [ ] Weather integration
- [ ] Soil analysis features
- [ ] Marketplace for agricultural products
- [ ] Expert consultation booking
- [ ] Push notifications

## ⭐ Star this repo

If you find AgriSight helpful, please give it a star! ⭐

---

Built with ❤️ for farmers and agricultural students worldwide
