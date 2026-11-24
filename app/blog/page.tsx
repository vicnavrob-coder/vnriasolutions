import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de IA | VNR IA Solutions',
  description: 'Artículos, tutoriales y guías sobre inteligencia artificial, ChatGPT, Claude y las mejores herramientas de IA en español.',
  keywords: 'blog ia, inteligencia artificial, chatgpt, claude, tutoriales ia, herramientas ia',
};

const articles = [
  {
    slug: 'chatgpt-vs-claude-comparativa-2026',
    title: 'ChatGPT vs Claude: Comparativa Completa 2026',
    description: 'Análisis detallado comparando ChatGPT y Claude. Descubre cuál es mejor para programación, escritura, análisis y más.',
    date: '2026-11-08',
    readTime: '12 min',
    category: 'Comparativas',
  },
  {
    slug: 'claude-programacion-tutorial-2026',
    title: 'Cómo Usar Claude para Programación: Tutorial Paso a Paso',
    description: 'Guía completa para usar Claude en programación. Ejemplos prácticos, prompts optimizados y trucos de expertos.',
    date: '2026-11-23',
    readTime: '10 min',
    category: 'Tutoriales',
  },
  {
    slug: 'mejores-herramientas-ia-gratis-2026',
    title: 'Mejores Herramientas IA Gratis 2026 (Top 50)',
    description: 'Las 50 mejores herramientas de inteligencia artificial gratuitas. Categorizado por uso: texto, imagen, video, productividad y más.',
    date: '2026-11-23',
    readTime: '15 min',
    category: 'Recursos',
  },
  {
    slug: 'tutorial-claude-espanol-guia-completa-2026',
    title: 'Tutorial Claude en Español: Guía Completa 2026',
    description: 'Todo lo que necesitas saber sobre Claude de Anthropic. Desde principiante hasta avanzado, con ejemplos prácticos.',
    date: '2026-11-08',
    readTime: '14 min',
    category: 'Tutoriales',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <Link href="/" className="text-white/80 hover:text-white mb-4 inline-block">
            ← Volver a VNR IA Solutions
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            Blog de Inteligencia Artificial
          </h1>
          <p className="text-xl text-white/90">
            Tutoriales, comparativas y guías sobre IA en español
          </p>
        </header>

        {/* Articles Grid */}
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="card hover:shadow-xl transition-shadow group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {article.readTime} lectura
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-brand-purple transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {article.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="text-brand-purple font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Leer artículo →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card bg-gradient-to-r from-brand-purple to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-4">
              ¿Tienes un problema que la IA puede resolver?
            </h2>
            <p className="mb-6 text-white/90">
              Describe tu problema y recibe una solución personalizada en minutos.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-brand-purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Obtener Solución Gratis →
            </Link>
          </div>
        </div>

        {/* SEO Footer */}
        <footer className="mt-16 text-center text-white/60 text-sm">
          <p>© 2026 VNR IA Solutions - Blog de Inteligencia Artificial en Español</p>
          <p className="mt-2">
            Tutoriales ChatGPT | Guías Claude | Herramientas IA | Comparativas
          </p>
        </footer>
      </div>
    </div>
  );
}
