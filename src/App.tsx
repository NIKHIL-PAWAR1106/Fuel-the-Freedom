import React, { useState, useEffect } from 'react';
import { PageRoute, CategoryId } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { BlogListingPage } from './pages/BlogListingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    // Parse initial route from URL hash if available
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('article/')) {
      return { type: 'article', slug: hash.replace('article/', '') };
    }
    if (hash.startsWith('journal')) {
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const cat = params.get('category') as CategoryId | null;
      return { type: 'journal', category: cat || undefined };
    }
    if (hash === 'about') return { type: 'about' };
    if (hash === 'contact') return { type: 'contact' };
    return { type: 'home' };
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route with window.location.hash
  useEffect(() => {
    let hash = '';
    if (currentRoute.type === 'home') {
      hash = '';
    } else if (currentRoute.type === 'journal') {
      hash = currentRoute.category ? `journal?category=${currentRoute.category}` : 'journal';
    } else if (currentRoute.type === 'article') {
      hash = `article/${currentRoute.slug}`;
    } else if (currentRoute.type === 'about') {
      hash = 'about';
    } else if (currentRoute.type === 'contact') {
      hash = 'contact';
    }

    if (hash) {
      window.location.hash = hash;
    } else if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Listen to hash change from back/forward browser buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('article/')) {
        setCurrentRoute({ type: 'article', slug: hash.replace('article/', '') });
      } else if (hash.startsWith('journal')) {
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const cat = params.get('category') as CategoryId | null;
        setCurrentRoute({ type: 'journal', category: cat || undefined });
      } else if (hash === 'about') {
        setCurrentRoute({ type: 'about' });
      } else if (hash === 'contact') {
        setCurrentRoute({ type: 'contact' });
      } else {
        setCurrentRoute({ type: 'home' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for search (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  const handleSelectArticle = (slug: string) => {
    setCurrentRoute({ type: 'article', slug });
  };

  const handleSelectCategoryFromSearch = (cat: CategoryId) => {
    setCurrentRoute({ type: 'journal', category: cat });
    setSearchOpen(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#FF5A1F] selection:text-black">
      {/* 1. Announcement Strip */}
      <AnnouncementBar
        onExploreIssue={() =>
          navigateTo({
            type: 'article',
            slug: 'trans-himalayan-crossing-highest-passes',
          })
        }
      />

      {/* 2 & 3. Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentRoute.type === 'home' && (
          <HomePage
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
            onToast={showToast}
          />
        )}

        {currentRoute.type === 'journal' && (
          <BlogListingPage
            initialCategory={currentRoute.category}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentRoute.type === 'article' && (
          <ArticleDetailPage
            slug={currentRoute.slug}
            onBackToBlog={() => navigateTo({ type: 'journal' })}
            onSelectArticle={handleSelectArticle}
            onToast={showToast}
          />
        )}

        {currentRoute.type === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentRoute.type === 'contact' && <ContactPage onToast={showToast} />}
      </main>

      {/* 16. Premium Footer */}
      <Footer onNavigate={navigateTo} onToast={showToast} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
        onSelectCategory={handleSelectCategoryFromSearch}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
