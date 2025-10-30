# AgriSight Quick Start Guide 🚀

Get AgriSight up and running in 5 minutes!

## ⚡ Super Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Add your Gemini API key to .env.local
# Get it from: https://makersuite.google.com/app/apikey

# 4. Start the app
npm run dev

# 5. Open http://localhost:3000
```

That's it! 🎉

## 🔑 Get API Keys (2 minutes)

### Gemini API (Required)
1. Visit https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to `.env.local`: `GEMINI_API_KEY=your_key_here`

### Supabase (Optional)
Only needed if you want database features:
1. Visit https://supabase.com
2. Create new project
3. Copy URL and anon key from Settings → API
4. Add to `.env.local`

## 📱 Test the App

### 1. Disease Detection (1 minute)
- Go to http://localhost:3000/detect
- Click upload or drag an image
- See AI analysis in ~3 seconds

### 2. AI Chat (30 seconds)
- Go to http://localhost:3000/chat
- Ask: "Why are my tomato leaves yellow?"
- Get instant AI response

### 3. Dashboard (30 seconds)
- Go to http://localhost:3000/dashboard
- See mock detection history
- View analytics charts

### 4. Learning Hub (30 seconds)
- Go to http://localhost:3000/learn
- Browse disease database
- Read farming best practices

## 🐛 Quick Troubleshooting

### Issue: Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: API not working
- Check `.env.local` exists
- Verify API key is correct
- Restart dev server

### Issue: Can't upload images
- Check file size (< 10MB)
- Use JPG, PNG, or WebP
- Try different browser

### Issue: Styles not loading
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📂 Project Structure at a Glance

```
app/
├── page.tsx          → Landing page
├── detect/           → Disease detection
├── chat/             → AI assistant
├── dashboard/        → User dashboard
└── learn/            → Learning hub

components/
├── Navigation.tsx    → Nav bar
├── UploadBox.tsx     → Image upload
└── ResultCard.tsx    → Results display

lib/
├── gemini.ts         → AI integration
├── modelHandler.ts   → ML model
└── supabase.ts       → Database
```

## 🎯 Key Features to Try

### ✨ Core Features
- [x] Upload plant images
- [x] Get AI disease detection
- [x] Chat with AI assistant
- [x] View detection history
- [x] Learn about diseases
- [x] Multi-language support (EN/ES)

### 🎨 UI Features
- [x] Mobile responsive
- [x] Dark mode ready
- [x] Keyboard accessible
- [x] Loading animations
- [x] Toast notifications

## 🔧 Development Tips

### Hot Reload
Changes to most files auto-reload. If not:
- Press `Ctrl+C` to stop
- Run `npm run dev` again

### View Changes
- Code changes: instant reload
- `.env.local` changes: restart server
- `package.json` changes: run `npm install`

### Debugging
```bash
# Check console for errors
# Open browser DevTools: F12 or Cmd+Option+I

# Check terminal for server errors
# Look for red error messages
```

## 📚 Next Steps

### 1. Customize Content
Edit `app/page.tsx` for home page

### 2. Add Real ML Model
Replace mock detection in `lib/modelHandler.ts`

### 3. Connect Database
Set up Supabase tables from `DATABASE_SCHEMA.sql`

### 4. Enable Authentication
Configure Google OAuth in Supabase dashboard

### 5. Deploy
Follow `DEPLOYMENT.md` to go live

## 🌐 URLs When Running

- **Homepage**: http://localhost:3000
- **Detection**: http://localhost:3000/detect
- **Chat**: http://localhost:3000/chat
- **Dashboard**: http://localhost:3000/dashboard
- **Learn**: http://localhost:3000/learn

## 💡 Tips & Tricks

### Use the Right Images
Best results with:
- Clear, focused leaf images
- Good lighting
- Close-up shots
- Single leaf in frame

### Ask Good Questions
AI chat works best with:
- Specific questions
- Include crop type
- Mention symptoms
- Describe growing conditions

### Explore All Features
Don't miss:
- Example questions in chat
- Disease search in learning hub
- Chart interactions in dashboard
- Language toggle in nav

## 🎓 Learn More

- **README.md**: Full feature documentation
- **SETUP.md**: Detailed setup instructions
- **DEPLOYMENT.md**: Production deployment
- **ACCESSIBILITY.md**: Accessibility features
- **CONTRIBUTING.md**: How to contribute

## ⚠️ Important Notes

### For Demo/Development
- ML model returns mock results
- Database is optional
- Auth is optional
- Some features need API keys

### For Production
- Train real ML model
- Set up database
- Enable authentication
- Add error tracking
- Use environment variables

## 🎉 You're All Set!

AgriSight is now running. Start exploring!

### Quick Test Checklist
- [ ] Home page loads
- [ ] Can navigate to all pages
- [ ] Upload works on detect page
- [ ] Chat responds to questions
- [ ] Dashboard shows charts
- [ ] Learning hub content loads
- [ ] Language switcher works

### Having Issues?
1. Check `SETUP.md` for detailed instructions
2. Review error messages in terminal/console
3. Try the troubleshooting steps above
4. Open an issue on GitHub

---

**Happy Farming! 🌾**

Remember: This is a demo/educational project. For production use with real farmers, you'll need:
- Trained ML model with real dataset
- Production database
- Proper authentication
- Error monitoring
- Performance optimization

Start simple, test thoroughly, then expand!

