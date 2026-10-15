import React, { useState, useEffect } from 'react';
import { PageRoute, CategoryId } from './types';
import { ARTICLES } from './data/articles';
import { routeToPath, pathToRoute, updatePageMeta } from './utils/router';
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
    return pathToRoute(window.location.pathname, window.location.hash);
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync URL in address bar & update document meta
  useEffect(() => {
    const targetPath = routeToPath(currentRoute);

    // If there was a hash fragment like /#article/slug, clear hash and replace with clean path
    if (window.location.hash) {
      window.history.replaceState(null, '', targetPath);
    } else if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    // Find active article if on article route
    const activeArticle =
      currentRoute.type === 'article'
        ? ARTICLES.find((a) => a.slug === currentRoute.slug)
        : undefined;

    updatePageMeta(currentRoute, activeArticle?.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Handle browser back / forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsedRoute = pathToRoute(window.location.pathname, window.location.hash);
      setCurrentRoute(parsedRoute);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for search (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
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

  const handleSelectCategory = (cat?: CategoryId) => {
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
            onSelectCategory={handleSelectCategory}
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
        onSelectCategory={handleSelectCategory}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
