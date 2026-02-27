import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Playground from './components/Playground';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0812]">
      <Header />
      <Hero />
      <Stats />
      <Timeline />
      <Skills />
      <Playground />
      <Testimonials />
      <Footer />
    </main>
  );
}
