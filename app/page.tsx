import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Playground from './components/Playground';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FadeInSection from './components/FadeInSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />
      <FadeInSection variant="fade-up">
        <Hero />
      </FadeInSection>
      <FadeInSection variant="scale-in" delay={0.1}>
        <div className="lg:hidden">
          <Skills />
        </div>
      </FadeInSection>
      <FadeInSection variant="fade-up" delay={0.15}>
        <Timeline />
      </FadeInSection>
      <FadeInSection variant="scale-in" delay={0.2}>
        <Projects />
      </FadeInSection>
      <FadeInSection variant="fade-up" delay={0.25}>
        <Playground />
      </FadeInSection>
      <FadeInSection variant="scale-in" delay={0.3}>
        <About />
      </FadeInSection>
      <FadeInSection variant="fade-up" delay={0.35}>
        <Contact />
      </FadeInSection>
      <FadeInSection variant="fade-in" delay={0.4}>
        <Footer />
      </FadeInSection>
    </main>
  );
}
