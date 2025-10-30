"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Sprout, BookOpen, Users, TrendingDown, Globe, Zap, Heart, DollarSign, MapPin, Clock, Shield, Target, Sparkles, ArrowRight, CheckCircle2, Bug, Cloud, Droplets, Camera, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const dangerStats = [
    {
      icon: <Sprout className="h-16 w-16" />,
      number: "40%",
      label: "Global Crop Losses",
      description: "Nearly half of all crops are lost to diseases annually",
      color: "danger",
      iconColor: "text-red-600"
    },
    {
      icon: <DollarSign className="h-16 w-16" />,
      number: "$220B",
      label: "Economic Impact",
      description: "Annual worldwide losses from plant diseases",
      color: "warning",
      iconColor: "text-amber-600"
    },
    {
      icon: <Users className="h-16 w-16" />,
      number: "820M",
      label: "People Affected",
      description: "People suffering from hunger due to crop failures",
      color: "danger",
      iconColor: "text-red-600"
    },
    {
      icon: <AlertTriangle className="h-16 w-16" />,
      number: "70%",
      label: "Too Late Detection",
      description: "Most farmers detect diseases after significant damage",
      color: "warning",
      iconColor: "text-amber-600"
    }
  ];

  const commonDiseases = [
    {
      name: "Late Blight",
      icon: <Bug className="h-20 w-20" />,
      damage: "Can destroy entire fields in weeks",
      affected: "Potatoes, Tomatoes",
      color: "from-red-500 to-red-700"
    },
    {
      name: "Powdery Mildew",
      icon: <Cloud className="h-20 w-20" />,
      damage: "Reduces yield by 30-50%",
      affected: "Grapes, Wheat, Cucumbers",
      color: "from-slate-500 to-slate-700"
    },
    {
      name: "Rust Diseases",
      icon: <Droplets className="h-20 w-20" />,
      damage: "Caused $7B+ in losses in 2020",
      affected: "Wheat, Coffee, Beans",
      color: "from-orange-500 to-orange-700"
    }
  ];

  const knowledgeGap = [
    {
      stat: "78%",
      text: "of small-scale farmers lack access to agricultural experts",
      icon: <Users className="h-12 w-12" />
    },
    {
      stat: "3-5 Days",
      text: "average time to get disease diagnosis traditionally",
      icon: <TrendingDown className="h-12 w-12" />
    },
    {
      stat: "Limited",
      text: "disease knowledge in native languages for farmers",
      icon: <Globe className="h-12 w-12" />
    }
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section with Alarm */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 blob opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 blob opacity-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 blob opacity-20" style={{animationDelay: '4s'}}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Alert Badge */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-2xl"
            >
              <AlertTriangle className="h-6 w-6 animate-wiggle" />
              URGENT: Plant Disease Crisis
            </motion.div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-6 leading-tight text-shadow-fun">
              Your Crops Are
              <span className="block text-red-600 animate-pulse-grow">Under Attack!</span>
            </h1>

            <p className="text-2xl sm:text-3xl text-gray-700 mb-8 font-medium">
              But we have the <span className="text-green-600 font-bold">AI-powered solution</span> to fight back! 🛡️
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/detect">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-7 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2">
                  <Camera className="h-6 w-6" />
                  Scan Your Plants Now!
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="border-4 border-green-600 text-green-600 hover:bg-green-50 text-xl px-10 py-7 rounded-full font-bold flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gray-500 mt-12"
            >
              <p className="text-lg font-medium mb-2">See the shocking stats below ⬇️</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Danger Statistics Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun"
            >
              The Scary Truth 😱
            </motion.h2>
            <p className="text-2xl text-gray-600 font-medium">Plant diseases are destroying our world's food supply</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {dangerStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`card-${stat.color} p-6 transform transition-all cursor-pointer`}
              >
                <div className={`mb-4 animate-bounce-slow ${stat.iconColor}`}>{stat.icon}</div>
                <div className="text-5xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-xl font-bold text-gray-800 mb-2">{stat.label}</div>
                <p className="text-gray-700 font-medium">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-danger p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="h-12 w-12 text-red-600 animate-wiggle" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              Without early detection, we're losing the battle against plant diseases!
            </p>
            <p className="text-xl text-gray-700 font-medium">But AgriSight is changing that story...</p>
          </motion.div>
        </div>
      </section>

      {/* Common Diseases Showcase */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
              Meet The Villains 👾
            </h2>
            <p className="text-2xl text-gray-600 font-medium">The most devastating plant diseases affecting farmers today</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commonDiseases.map((disease, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${disease.color} rounded-3xl p-8 text-white shadow-2xl transform transition-all`}>
                  <div className="mb-4 text-center animate-wiggle flex justify-center">{disease.icon}</div>
                  <h3 className="text-3xl font-black mb-3 text-center">{disease.name}</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p className="text-lg font-bold">Damage:</p>
                    </div>
                    <p className="text-xl">{disease.damage}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5" />
                      <p className="text-lg font-bold">Targets:</p>
                    </div>
                    <p className="text-xl">{disease.affected}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Gap Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
              The Knowledge Gap 📉
            </h2>
            <p className="text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              Farmers are fighting blind - without the right tools and information to protect their crops
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {knowledgeGap.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-indigo-300 hover:border-indigo-500 transition-all transform hover:scale-105"
              >
                <div className="text-indigo-600 mb-4 flex justify-center animate-bounce-slow">
                  {item.icon}
                </div>
                <div className="text-5xl font-black text-indigo-600 mb-4 text-center">{item.stat}</div>
                <p className="text-xl text-gray-700 font-medium text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution Intro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-success p-12 text-center"
          >
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-wiggle">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              That's Where AgriSight Comes In!
            </h3>
            <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
              We're bridging this gap with AI-powered technology that puts expert-level plant disease detection in YOUR hands - instantly, accurately, and completely FREE!
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white rounded-2xl p-6 flex-1 min-w-[200px] shadow-lg border-2 border-green-300">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">Instant Results</p>
                <p className="text-gray-600 font-medium">Seconds, not days</p>
              </div>
              <div className="bg-white rounded-2xl p-6 flex-1 min-w-[200px] shadow-lg border-2 border-green-300">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">95% Accurate</p>
                <p className="text-gray-600 font-medium">AI-powered detection</p>
              </div>
              <div className="bg-white rounded-2xl p-6 flex-1 min-w-[200px] shadow-lg border-2 border-green-300">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">English & Spanish</p>
                <p className="text-gray-600 font-medium">For everyone</p>
              </div>
              <div className="bg-white rounded-2xl p-6 flex-1 min-w-[200px] shadow-lg border-2 border-green-300">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">100% Free</p>
                <p className="text-gray-600 font-medium">Always will be</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
              Super Simple To Use! 🎮
            </h2>
            <p className="text-2xl text-gray-600 font-medium">Just 3 easy steps to save your crops</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Camera className="h-20 w-20" />, title: "Snap A Photo", desc: "Take a picture of your plant's leaves with your phone", bgColor: "bg-green-100", iconColor: "text-green-600", borderColor: "border-green-400" },
              { icon: <Sparkles className="h-20 w-20" />, title: "AI Analyzes", desc: "Our smart AI scans for diseases in seconds", bgColor: "bg-purple-100", iconColor: "text-purple-600", borderColor: "border-purple-400" },
              { icon: <CheckCircle2 className="h-20 w-20" />, title: "Get Solutions", desc: "Receive instant treatment recommendations", bgColor: "bg-emerald-100", iconColor: "text-emerald-600", borderColor: "border-emerald-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-3xl p-8 shadow-2xl transform transition-all border-4 ${item.borderColor}`}
              >
                <div className={`${item.bgColor} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow ${item.iconColor}`}>
                  {item.icon}
                </div>
                <div className={`text-6xl font-black mb-4 text-center ${item.iconColor}`}>{index + 1}</div>
                <h3 className="text-3xl font-black mb-4 text-center text-gray-900">{item.title}</h3>
                <p className="text-xl font-medium text-center text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/detect">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-2xl px-12 py-8 rounded-full font-black shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 mx-auto">
                <Sparkles className="h-8 w-8" />
                Try It Right Now - It's Free!
                <ArrowRight className="h-8 w-8" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-20 w-20 text-red-500 mx-auto mb-8 animate-pulse-grow" />
          <h2 className="text-5xl font-black text-gray-900 mb-6 text-shadow-fun">
            Our Mission 🌱
          </h2>
          <p className="text-2xl text-gray-800 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
            We believe every farmer deserves access to the same technology that big agricultural corporations use. AgriSight makes expert-level plant disease detection available to EVERYONE, for FREE, because food security is a human right, not a luxury.
          </p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Built by students, for farmers. Powered by AI, driven by compassion. 💚
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                <Sprout className="h-6 w-6" /> AgriSight
              </h3>
              <p className="text-gray-400 font-medium">
                Free AI-powered plant disease detection for farmers worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Tools</h4>
              <ul className="space-y-2">
                <li><Link href="/detect" className="text-gray-400 hover:text-white font-medium flex items-center gap-2"><Camera className="h-4 w-4" /> Disease Detection</Link></li>
                <li><Link href="/chat" className="text-gray-400 hover:text-white font-medium flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Assistant</Link></li>
                <li><Link href="/learn" className="text-gray-400 hover:text-white font-medium flex items-center gap-2"><BookOpen className="h-4 w-4" /> Learning Hub</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white font-medium flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">About</h4>
              <p className="text-gray-400 font-medium mb-2">
                Developed by Amir Eftekhar and Shashank Shankar
              </p>
              <p className="text-gray-400 font-medium">
                100% Free • Always Will Be • Open Source
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 font-medium">
              © 2025 AgriSight • Fighting crop diseases with AI • Made with 💚 for farmers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
