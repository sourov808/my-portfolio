import About from '../components/about/About';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  );
}
