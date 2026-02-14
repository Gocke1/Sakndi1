import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.skandioutlet.se';
const siteName = 'Skandioutlet';
const defaultTitle = 'Skandioutlet | Skandinavisk e-handel med smarta priser';
const defaultDescription =
  'Skandioutlet erbjuder noga utvalda produkter för hem och livsstil med snabba leveranser i hela Sverige.';
const defaultKeywords = [
  'skandioutlet',
  'e-handel sverige',
  'skandinavisk design',
  'onlinebutik',
  'hem och livsstil',
];

export const seoConfig = {
  siteUrl,
  siteName,
  defaultTitle,
  defaultDescription,
  defaultKeywords,
};

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description = defaultDescription,
  path = '/',
  keywords,
}: MetadataInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(canonicalPath, siteUrl).toString();
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;

  return {
    title: pageTitle,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      locale: 'sv_SE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  };
}
