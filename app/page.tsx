import Header from './components/layout/Header';
import Hero from './components/hero/Hero';
import FadeInSection from './components/ui/FadeInSection';
import Projects from './components/projects/Projects';
import Playground from './components/playground/Playground';
import Timeline from './components/timeline/Timeline';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />

      <FadeInSection variant="scale-in" delay={0.15}>
        <Projects />
      </FadeInSection>

      <FadeInSection variant="fade-up" delay={0.2}>
        <Playground />
      </FadeInSection>

      <FadeInSection variant="fade-up" delay={0.2}>
        <Timeline />
      </FadeInSection>

      <FadeInSection variant="fade-up" delay={0.25}>
        <Contact />
      </FadeInSection>

      <FadeInSection variant="fade-in" delay={0.3}>
        <Footer />
      </FadeInSection>
    </main>
  );
}
