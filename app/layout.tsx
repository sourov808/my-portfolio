import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

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

export const metadata: Metadata = {
  title: "Sourov | Full-Stack Developer",
  description: "Full-stack developer specializing in scalable web applications, modern interfaces, and clean code.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "Sourov" }],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-[#F8FAFC] text-slate-300 antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
