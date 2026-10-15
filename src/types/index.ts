export type CategoryId =
  | 'reviews'
  | 'gear'
  | 'maintenance'
  | 'road-trips'
  | 'adventure'
  | 'culture'
  | 'safety';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  description: string;
  accent: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  bike: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  pullQuote?: string;
  callout?: {
    type: 'safety' | 'wrench-tip' | 'pro-tip' | 'note';
    title: string;
    text: string;
  };
  image?: {
    url: string;
    caption: string;
  };
}

export interface ArticleSpec {
  label: string;
  value: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategoryId;
  categoryLabel: string;
  author: Author;
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  editorsPick?: boolean;
  specs?: ArticleSpec[];
  keyTakeaways?: string[];
  sections: ArticleSection[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  bike: string;
  rider: string;
  imageUrl: string;
  likes: number;
  caption: string;
  date: string;
}

export type PageRoute =
  | { type: 'home' }
  | { type: 'journal'; category?: CategoryId }
  | { type: 'article'; slug: string }
  | { type: 'about' }
  | { type: 'contact' };
