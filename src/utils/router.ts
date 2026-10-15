import { PageRoute, CategoryId } from '../types';
import { CATEGORIES } from '../data/articles';

const VALID_CATEGORIES: CategoryId[] = [
  'reviews',
  'gear',
  'maintenance',
  'road-trips',
  'adventure',
  'culture',
  'safety',
];

/**
 * Converts a typed PageRoute into a clean, canonical URL path.
 * Follows good URL rules: lowercase, kebab-case, semantic hierarchy, no trailing slashes.
 */
export function routeToPath(route: PageRoute): string {
  switch (route.type) {
    case 'home':
      return '/';
    case 'journal':
      return route.category ? `/journal/${route.category}` : '/journal';
    case 'article':
      return `/article/${route.slug}`;
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
}

/**
 * Parses current window.location into a PageRoute.
 * Supports clean paths like /journal/reviews, /article/slug, as well as legacy hash links for fallback.
 */
export function pathToRoute(pathname: string = window.location.pathname, hash: string = window.location.hash): PageRoute {
  // Normalize pathname: remove trailing slash except root
  let cleanPath = pathname.replace(/\/+$/, '') || '/';

  // Support legacy hash if someone arrives with /#article/slug or #journal
  if (cleanPath === '/' && hash && hash.length > 1) {
    const raw = hash.replace(/^#\/?/, '');
    if (raw.startsWith('article/')) {
      return { type: 'article', slug: raw.replace('article/', '').trim() };
    }
    if (raw.startsWith('journal/')) {
      const cat = raw.replace('journal/', '').trim() as CategoryId;
      if (VALID_CATEGORIES.includes(cat)) {
        return { type: 'journal', category: cat };
      }
      return { type: 'journal' };
    }
    if (raw.startsWith('journal')) {
      const params = new URLSearchParams(raw.split('?')[1] || '');
      const cat = params.get('category') as CategoryId | null;
      if (cat && VALID_CATEGORIES.includes(cat)) {
        return { type: 'journal', category: cat };
      }
      return { type: 'journal' };
    }
    if (raw === 'about') return { type: 'about' };
    if (raw === 'contact') return { type: 'contact' };
  }

  // 1. Root Homepage: /
  if (cleanPath === '/' || cleanPath === '') {
    return { type: 'home' };
  }

  // 2. Article Detail: /article/:slug
  if (cleanPath.startsWith('/article/')) {
    const slug = cleanPath.replace('/article/', '').trim();
    if (slug) {
      return { type: 'article', slug };
    }
  }

  // 3. Category Filtered Journal: /journal/:category
  if (cleanPath.startsWith('/journal/')) {
    const cat = cleanPath.replace('/journal/', '').trim() as CategoryId;
    if (VALID_CATEGORIES.includes(cat)) {
      return { type: 'journal', category: cat };
    }
    return { type: 'journal' };
  }

  // 4. General Journal: /journal (with optional ?category= query parameter)
  if (cleanPath === '/journal') {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') as CategoryId | null;
    if (cat && VALID_CATEGORIES.includes(cat)) {
      return { type: 'journal', category: cat };
    }
    return { type: 'journal' };
  }

  // 5. About: /about
  if (cleanPath === '/about') {
    return { type: 'about' };
  }

  // 6. Contact: /contact
  if (cleanPath === '/contact') {
    return { type: 'contact' };
  }

  return { type: 'home' };
}

/**
 * Updates document.title and canonical link tag for SEO and browser history.
 */
export function updatePageMeta(route: PageRoute, articleTitle?: string) {
  let title = 'THROTTLE CULTURE — Built for the Ride. Driven by Passion.';
  let description =
    'A premium motorcycle lifestyle publication covering in-depth reviews, riding gear, maintenance guides, road trips, and rider culture.';

  switch (route.type) {
    case 'home':
      title = 'THROTTLE CULTURE — Built for the Ride. Driven by Passion.';
      break;
    case 'journal':
      if (route.category) {
        const cat = CATEGORIES.find((c) => c.id === route.category);
        const catLabel = cat ? cat.label : route.category.toUpperCase();
        title = `${catLabel} — The Rider's Journal | THROTTLE CULTURE`;
        description = `Browse the latest ${catLabel.toLowerCase()} articles, tests, and guides on Throttle Culture.`;
      } else {
        title = "The Rider's Journal — Complete Motorcycle Archive | THROTTLE CULTURE";
        description =
          'Browse in-depth superbike telemetry, brutal adventure dispatches, and garage maintenance blueprints.';
      }
      break;
    case 'article':
      if (articleTitle) {
        title = `${articleTitle} | THROTTLE CULTURE`;
      } else {
        title = 'Motorcycle Article & Report | THROTTLE CULTURE';
      }
      break;
    case 'about':
      title = 'About Us — More Than Machines. It’s a Way of Life | THROTTLE CULTURE';
      description =
        'Discover the mission, editorial standards, and test team behind Throttle Culture magazine.';
      break;
    case 'contact':
      title = 'Contact & Editorial Dispatch Desk | THROTTLE CULTURE';
      description =
        'Send story pitches, manufacturer press fleet inquiries, or connect with our editorial garage.';
      break;
  }

  document.title = title;

  // Update canonical link tag
  const canonicalPath = routeToPath(route);
  const canonicalUrl = `${window.location.origin}${canonicalPath}`;
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
}
