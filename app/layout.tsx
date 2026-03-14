import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import SmoothScroll from "./components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sourov | Full-Stack Developer",
  description: "Full-stack developer specializing in scalable web applications, modern interfaces, and clean code.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "Sourov" }],
  icons: {
    icon: [
      { url: '/morse-code.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/morse-code.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Sourov | Full-Stack Developer",
    description: "Full-stack developer specializing in scalable web applications, modern interfaces, and clean code.",
    url: "https://sourov.dev", // Replace with your actual domain
    siteName: "Sourov's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourov | Full-Stack Developer",
    description: "Full-stack developer specializing in scalable web applications, modern interfaces, and clean code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
                  if (!isDark) {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} bg-[#F8FAFC] text-slate-300 antialiased`}>
        <SmoothScroll>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
