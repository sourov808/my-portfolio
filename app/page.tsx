import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Playground from './components/Playground';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0812]">
      <Header />
      <Hero />
      <Skills />
      <Timeline />
      <Projects />
      <Playground />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
