import Header from './components/Header';
import Hero from './components/Hero';
import FadeInSection from './components/FadeInSection';
import Projects from './components/Projects';
import Playground from './components/Playground';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
