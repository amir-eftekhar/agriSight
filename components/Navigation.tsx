"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, Globe, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "./AuthModal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: language === 'en' ? 'Home' : 'Inicio', href: '/' },
    { name: language === 'en' ? 'Detect' : 'Detectar', href: '/detect' },
    { name: language === 'en' ? 'Dashboard' : 'Panel', href: '/dashboard' },
    { name: language === 'en' ? 'Community' : 'Comunidad', href: '/community' },
    { name: language === 'en' ? 'Learn' : 'Aprender', href: '/learn' },
    { name: language === 'en' ? 'AI Chat' : 'Chat IA', href: '/chat' },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="bg-white border-b-4 border-green-600 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center h-20 gap-8">
          {/* Logo - Left aligned */}
          <Link href="/" className="flex items-center space-x-3 transform hover:scale-105 transition-transform flex-shrink-0">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-3 rounded-2xl shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgriSight
            </span>
          </Link>

          {/* Desktop Navigation - Centered with flex-grow */}
          <div className="hidden md:flex items-center justify-center space-x-3 flex-grow">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-base font-bold rounded-2xl px-5 transition-all transform hover:scale-105",
                    pathname === item.href 
                      ? "bg-green-600 text-white shadow-lg" 
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Language Toggle & Auth - Right aligned */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              className="text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl"
            >
              <Globe className="h-6 w-6" />
            </Button>
            <span className="text-lg font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-xl">
              {language.toUpperCase()}
            </span>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="border-2 border-gray-300 font-bold rounded-2xl px-4 hover:bg-red-50 hover:border-red-300 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {language === 'en' ? 'Sign Out' : 'Salir'}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 text-white hover:bg-green-700 font-bold text-lg rounded-2xl px-6 shadow-lg transform hover:scale-110 transition-all flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 hover:bg-green-50 rounded-xl"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-gray-50 rounded-2xl m-2 p-4 border-2 border-green-200">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-lg font-bold rounded-xl transition-all",
                    pathname === item.href 
                      ? "bg-green-600 text-white shadow-lg" 
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t-2 border-green-200">
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-700 hover:bg-green-50 rounded-xl font-bold"
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'en' ? 'Español' : 'English'}</span>
              </Button>
              {user ? (
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="border-2 font-bold rounded-xl flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {language === 'en' ? 'Sign Out' : 'Salir'}
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-green-600 text-white hover:bg-green-700 font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {language === 'en' ? 'Sign In' : 'Iniciar'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}
