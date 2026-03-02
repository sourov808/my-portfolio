import Projects from '../components/Projects';

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        <h1 className="text-4xl font-black mb-8">All Projects</h1>
        <p className="text-lg text-gray-500 mb-12">Browse all my work below.</p>
        <Projects />
      </div>
    </main>
  );
}
