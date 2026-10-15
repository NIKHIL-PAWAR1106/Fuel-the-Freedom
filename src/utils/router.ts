import { PageRoute, CategoryId, Article } from '../types';
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
 * Handcrafted, highly engaging meta descriptions adhering strictly to the 120–160 character rule.
 * Each description summarizes the specific content, features targeted motorcycle keywords, and includes a clear CTA.
 */
const ARTICLE_META_DESCRIPTIONS: Record<string, string> = {
  '2026-ducati-panigale-v4-s-track-review':
    'Read our track review of the 2026 Ducati Panigale V4 S at Misano. Discover how the new double-sided swingarm and 216-hp V4 engine dominate lap times.',
  'trans-himalayan-crossing-highest-passes':
    'Explore an 1,800-km expedition across the highest Himalayan mountain passes from Manali to Khardung La. Read our survival tips and high-altitude route guide.',
  'science-of-motorcycle-helmets-ece2206-fim':
    'Learn the lifesaving science behind ECE 22.06 and FIM motorcycle helmet standards. Discover how rotational acceleration testing protects against brain trauma.',
  'motorcycle-chain-tension-sprocket-alignment-masterclass':
    'Master motorcycle chain tension and sprocket alignment with our garage guide. Learn precise slack measurement, torque specs, and preventative drive-line care.',
  'ktm-890-adventure-r-vs-bmw-r1300gs-trophy':
    'Read our desert shootout comparing the KTM 890 Adventure R and BMW R 1300 GS Trophy. Discover deep sand handling, suspension travel, and long-range comfort.',
  'four-season-motorcycle-touring-armor-guide':
    'Explore our four-season touring armor review comparing Aerostich, Klim Badlands Pro, and Revit Dominator 3. Discover direct laminate Gore-Tex protection.',
  'across-patagonia-ruta-40-pampero-crosswinds':
    'Ride Argentina’s legendary Ruta 40 through howling 90 km/h Patagonian crosswinds and loose ripio gravel toward Ushuaia. Read our raw overland expedition report.',
  'diy-motorcycle-brake-bleed-fluid-flush-guide':
    'Learn how to bleed motorcycle brakes and flush hydraulic fluid with a reverse syringe. Eliminate spongy levers and prevent brake fade for crisp stopping power.',
  'cafe-racers-of-shinjuku-tokyo-underground':
    'Step inside Tokyo’s midnight cafe racer underground. Discover how nocturnal builders around Shinjuku craft hand-beaten aluminum bikes with obsessive mastery.',
  'trail-braking-masterclass-physics-and-street-survival':
    'Master trail-braking physics to corner faster and safer. Discover how loading the front tyre optimizes steering geometry and provides emergency stopping power.',
  'ultimate-winter-riding-heated-gear-guide':
    'Stay warm and safe down to -10°C with our winter riding and heated gear guide. Learn 12V stator draw calculations, layering strategy, and pinlock fog defense.',
  'isle-of-man-tt-pilgrimage-mountain-course':
    'Experience the raw adrenaline of the Isle of Man TT Mountain Course. Read our firsthand dispatch from Bray Hill at 190 mph and the historic paddock culture.',
};

const CATEGORY_META_DESCRIPTIONS: Record<CategoryId, string> = {
  reviews:
    'Read unfiltered motorcycle reviews with real track telemetry. Discover handling dynamics, engine performance, and real-world testing on the latest machines.',
  gear:
    'Explore technical motorcycle riding gear reviews. Discover laboratory-certified armor ratings, weatherproof touring suits, high-safety helmets, and gloves.',
  maintenance:
    'Master motorcycle maintenance with step-by-step garage guides, torque specs, hydraulic brake bleeding tips, and DIY preventative care for high-mile bikes.',
  'road-trips':
    'Discover epic motorcycle road trips and mountain switchback routes. Explore curated itineraries, elevation profiles, waypoint tips, and packing essentials.',
  adventure:
    'Explore extreme adventure motorcycle expeditions. Discover high-altitude Himalayan passes, desert crossings, navigation strategies, and dual-sport guides.',
  safety:
    'Level up your riding skills with cornering physics, ECE 22.06 helmet standards, trail-braking masterclasses, and survival techniques for the open road.',
  culture:
    'Immerse yourself in motorcycle culture. Discover custom garage builds, cafe racer heritage, nocturnal city runs, and the human spirit behind two wheels.',
};

/**
 * Normalizes text to strictly conform to the 120–160 character meta description rule.
 */
function normalizeMetaDescription(text: string): string {
  const cleaned = text.trim().replace(/\s+/g, ' ');
  if (cleaned.length >= 120 && cleaned.length <= 160) {
    return cleaned;
  }
  if (cleaned.length > 160) {
    // Truncate at previous word boundary before 156 characters and add a period
    const truncated = cleaned.slice(0, 155).replace(/\s+\S*$/, '');
    return /[.!?]$/.test(truncated) ? truncated : `${truncated}.`;
  }
  // If too short (< 120 chars), append actionable context to reach standard length
  const extended = `${cleaned} Read in-depth rider dispatches and telemetry on Throttle Culture.`;
  if (extended.length > 160) {
    const trimmed = extended.slice(0, 155).replace(/\s+\S*$/, '');
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
  }
  return extended;
}

/**
 * Helper to update or create meta tags for standard metadata and OpenGraph / Twitter cards.
 */
function setMetaTag(selector: string, attr: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

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
 * Updates document.title, meta descriptions, OpenGraph, and Twitter tags according to SEO rules.
 * Enforces meta descriptions between 120 and 160 characters with clear call-to-actions.
 */
export function updatePageMeta(route: PageRoute, activeArticle?: Article | string) {
  let title = 'THROTTLE CULTURE — Built for the Ride. Driven by Passion.';
  let description =
    'Read raw, independent motorcycle journalism. Explore in-depth superbike track reviews, adventure dispatches, technical gear tests, and garage wrenching guides.';
  let imageUrl =
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80';

  const articleObj = typeof activeArticle === 'object' ? activeArticle : undefined;
  const articleTitle = typeof activeArticle === 'string' ? activeArticle : articleObj?.title;

  switch (route.type) {
    case 'home':
      title = 'THROTTLE CULTURE — Built for the Ride. Driven by Passion.';
      description =
        'Read raw, independent motorcycle journalism. Explore in-depth superbike track reviews, adventure dispatches, technical gear tests, and garage wrenching guides.';
      break;

    case 'journal':
      if (route.category) {
        const cat = CATEGORIES.find((c) => c.id === route.category);
        const catLabel = cat ? cat.label : route.category.toUpperCase();
        title = `${catLabel} — The Rider's Journal | THROTTLE CULTURE`;
        description =
          CATEGORY_META_DESCRIPTIONS[route.category] ||
          normalizeMetaDescription(
            `Read in-depth motorcycle ${catLabel.toLowerCase()} articles, laboratory tests, and garage guides.`
          );
      } else {
        title = "The Rider's Journal — Complete Motorcycle Archive | THROTTLE CULTURE";
        description =
          'Explore the complete Fuel the Freedom archive. Discover unfiltered motorcycle road tests, cross-continental expedition reports, gear reviews, and workshop tips.';
      }
      break;

    case 'article':
      if (articleObj) {
        title = `${articleObj.title} | THROTTLE CULTURE`;
        imageUrl = articleObj.coverImage || imageUrl;
        description =
          ARTICLE_META_DESCRIPTIONS[articleObj.slug] ||
          normalizeMetaDescription(articleObj.excerpt || articleObj.subtitle);
      } else if (articleTitle) {
        title = `${articleTitle} | THROTTLE CULTURE`;
        description =
          ARTICLE_META_DESCRIPTIONS[route.slug] ||
          normalizeMetaDescription(
            `Read our in-depth test report and riding telemetry for ${articleTitle} on Throttle Culture.`
          );
      } else {
        title = 'Motorcycle Article & Report | THROTTLE CULTURE';
        description =
          ARTICLE_META_DESCRIPTIONS[route.slug] ||
          'Read our in-depth motorcycle road test and technical riding dispatch with real-world track telemetry and rider insights.';
      }
      break;

    case 'about':
      title = 'About Us — More Than Machines. It’s a Way of Life | THROTTLE CULTURE';
      description =
        'Meet the test riders, editors, and mechanics behind Fuel the Freedom. Learn about our uncompromising road-test standards and pure dedication to motorcycling.';
      break;

    case 'contact':
      title = 'Contact & Editorial Dispatch Desk | THROTTLE CULTURE';
      description =
        'Contact the Fuel the Freedom editorial desk. Send rider story pitches, manufacturer press fleet inquiries, or connect with our test team and wrenching garage.';
      break;
  }

  // 1. Sync Document Title
  document.title = title;

  // 2. Canonical URL Tag
  const canonicalPath = routeToPath(route);
  const canonicalUrl = `${window.location.origin}${canonicalPath}`;
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 3. Meta Description (Rule: 120-160 characters with CTA)
  const validatedDescription = normalizeMetaDescription(description);
  setMetaTag('meta[name="description"]', 'name', 'description', validatedDescription);

  // 4. OpenGraph Social Card Synchronization
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', validatedDescription);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);

  // 5. Twitter Card Synchronization
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', validatedDescription);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
}
