import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport: Viewport = {
  themeColor: '#0F2042',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'DelightPrep — Nigerian Exam Preparation Platform',
  description: "Smart Preparation for Better Results. Nigeria's modern exam preparation platform for JSS, SSS, BECE, WAEC, NECO, and JAMB/UTME.",
  applicationName: 'DelightPrep',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DelightPrep',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'DelightPrep — Smart Preparation for Better Results',
    description: "Nigeria's modern exam preparation platform for JSS, SSS, BECE, WAEC, NECO, and JAMB/UTME. A Product of Delight Tech Network.",
    type: 'website',
    locale: 'en_NG',
    siteName: 'DelightPrep',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DelightPrep — Smart Preparation for Better Results',
    description: "Nigeria's modern exam preparation platform for JSS, SSS, BECE, WAEC, NECO, and JAMB/UTME.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('delightprep_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-150" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

