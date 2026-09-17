import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'DelightPrep — Nigerian Exam Preparation Platform',
    short_name: 'DelightPrep',
    description: 'Smart Preparation for Better Results. Nigerian Exam Preparation for JSS, SSS, BECE, WAEC, NECO, and JAMB/UTME.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0F2042',
    theme_color: '#0F2042',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
