'use client';

import Link from 'next/link';

// Noticias trending de IA (actualizar diariamente)
const trendingNews = [
  {
    id: 1,
    title: 'GPT-5 se filtra: OpenAI prepara el modelo más potente de la historia',
    category: 'OpenAI',
    hot: true,
    time: 'Hace 2 horas',
    link: '/blog/chatgpt-vs-claude-comparativa-2026',
  },
  {
    id: 2,
    title: 'Claude 4 supera a GPT-4 en razonamiento matemático',
    category: 'Anthropic',
    hot: true,
    time: 'Hace 4 horas',
    link: '/blog/tutorial-claude-espanol-guia-completa-2026',
  },
  {
    id: 3,
    title: 'Midjourney V7: imágenes fotorrealistas indistinguibles de fotos reales',
    category: 'Imágenes IA',
    hot: false,
    time: 'Hace 6 horas',
    link: '/blog/mejores-herramientas-ia-gratis-2026',
  },
  {
    id: 4,
    title: 'Google Gemini 2.0 ya disponible gratis para todos',
    category: 'Google',
    hot: true,
    time: 'Hace 8 horas',
    link: '/blog/mejores-herramientas-ia-gratis-2026',
  },
  {
    id: 5,
    title: 'Sora de OpenAI genera videos de 1 minuto en calidad 4K',
    category: 'Video IA',
    hot: false,
    time: 'Hace 10 horas',
    link: '/blog/mejores-herramientas-ia-gratis-2026',
  },
  {
    id: 6,
    title: 'Europa aprueba regulación IA: lo que cambia para usuarios',
    category: 'Regulación',
    hot: false,
    time: 'Hace 12 horas',
    link: '/blog/mejores-herramientas-ia-gratis-2026',
  },
];

const articles = [
  {
    slug: 'chatgpt-vs-claude-comparativa-2026',
    title: 'ChatGPT vs Claude 2026: ¿Cuál elegir?',
    excerpt: 'Comparativa completa actualizada de los dos gigantes de la IA',
    category: 'Comparativas',
    readTime: '8 min',
  },
  {
    slug: 'mejores-herramientas-ia-gratis-2026',
    title: 'Top 50 Herramientas IA Gratis',
    excerpt: 'Las mejores herramientas de IA sin pagar un euro',
    category: 'Recursos',
    readTime: '12 min',
  },
  {
    slug: 'claude-programacion-tutorial-2026',
    title: 'Programar con Claude: Guía Completa',
    excerpt: 'Aprende a usar Claude para código como un pro',
    category: 'Tutoriales',
    readTime: '10 min',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-white">
            VNR<span className="text-purple-500">IA</span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/blog" className="text-gray-400 hover:text-white font-medium transition">
              Artículos
            </Link>
            <Link href="#trending" className="text-gray-400 hover:text-white font-medium transition">
              Trending
            </Link>
            <a
              href="https://kick.com/hablosinsaber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2"
            >
              <span>🎮</span> KICK Live
            </a>
          </div>
          <a
            href="https://kick.com/hablosinsaber"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden bg-green-500 text-black px-3 py-1.5 rounded-lg font-bold text-sm"
          >
            🎮 KICK
          </a>
        </div>
      </nav>

      {/* Hero - Noticia Principal */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-gray-950 to-blue-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Story */}
            <div className="lg:col-span-3">
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded mb-4 animate-pulse">
                🔥 ÚLTIMA HORA
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                La IA revoluciona 2026: Todo lo que necesitas saber hoy
              </h1>
              <p className="text-xl text-gray-400 mb-6">
                Las últimas novedades en inteligencia artificial, herramientas gratis y tutoriales para aprovechar la tecnología que está cambiando el mundo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Ver Artículos
                </Link>
                <a
                  href="https://kick.com/hablosinsaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
                >
                  🎮 Ver en KICK
                </a>
              </div>
            </div>

            {/* Kick Promo Card */}
            <div className="lg:col-span-2">
              <a
                href="https://kick.com/hablosinsaber"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 hover:scale-[1.02] transition-transform"
              >
                <div className="text-black">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl">🎮</span>
                    <span className="font-black text-xl">hablosinsaber</span>
                  </div>
                  <p className="font-bold text-lg mb-4">
                    Streams de tecnología, gaming y más. ¡Únete a la comunidad!
                  </p>
                  <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2 w-fit">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="font-bold">SÍGUENOS EN KICK</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trending News */}
      <section id="trending" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>📈</span> Trending en IA
            </h2>
            <span className="text-gray-500 text-sm">Actualizado cada hora</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingNews.map((news) => (
              <Link
                key={news.id}
                href={news.link}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-5 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                    {news.category}
                  </span>
                  {news.hot && (
                    <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-1 rounded animate-pulse">
                      🔥 HOT
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <span className="text-sm text-gray-500">{news.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HispanosEnSuiza Banner */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <a
            href="https://hispanosensuiza.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-2xl p-1 hover:scale-[1.01] transition-transform"
          >
            <div className="bg-gray-950 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="text-4xl">🇪🇸🇨🇭</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      Hispanos en Suiza
                    </h3>
                  </div>
                  <p className="text-gray-400 text-lg max-w-xl">
                    La comunidad más grande de hispanohablantes en Suiza. Guías, recursos y una comunidad que te ayuda.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <span className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-center hover:bg-gray-100 transition">
                    Visitar Web →
                  </span>
                  <a
                    href="https://instagram.com/hispanosensuiza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @hispanosensuiza
                  </a>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>📚</span> Guías y Tutoriales
            </h2>
            <Link href="/blog" className="text-purple-400 hover:text-purple-300 font-bold transition">
              Ver todos →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-2xl p-6 transition group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <span className="text-purple-400 font-bold group-hover:translate-x-2 inline-block transition-transform">
                  Leer artículo →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-8">Síguenos en redes</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://kick.com/hablosinsaber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition flex items-center gap-3"
            >
              <span className="text-2xl">🎮</span>
              <div className="text-left">
                <div className="text-xs opacity-80">KICK</div>
                <div>hablosinsaber</div>
              </div>
            </a>
            <a
              href="https://hispanosensuiza.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-500 to-yellow-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition flex items-center gap-3"
            >
              <span className="text-2xl">🇪🇸🇨🇭</span>
              <div className="text-left">
                <div className="text-xs opacity-80">Web</div>
                <div>HispanosEnSuiza</div>
              </div>
            </a>
            <a
              href="https://instagram.com/hispanosensuiza"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition flex items-center gap-3"
            >
              <span className="text-2xl">📸</span>
              <div className="text-left">
                <div className="text-xs opacity-80">Instagram</div>
                <div>@hispanosensuiza</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-black text-white mb-4">
                VNR<span className="text-purple-500">IA</span>
              </h3>
              <p className="text-gray-500 text-sm">
                Tu fuente diaria de noticias, tutoriales y herramientas de Inteligencia Artificial.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contenido</h4>
              <div className="space-y-2">
                <Link href="/blog" className="block text-gray-400 hover:text-white transition text-sm">
                  Artículos
                </Link>
                <Link href="/blog/mejores-herramientas-ia-gratis-2026" className="block text-gray-400 hover:text-white transition text-sm">
                  Herramientas IA
                </Link>
                <Link href="/blog/chatgpt-vs-claude-comparativa-2026" className="block text-gray-400 hover:text-white transition text-sm">
                  Comparativas
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Proyectos</h4>
              <div className="space-y-2">
                <a href="https://kick.com/hablosinsaber" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition text-sm">
                  🎮 Kick - hablosinsaber
                </a>
                <a href="https://hispanosensuiza.ch" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition text-sm">
                  🇪🇸🇨🇭 Hispanos en Suiza
                </a>
                <a href="https://instagram.com/hispanosensuiza" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition text-sm">
                  📸 Instagram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <p className="text-gray-500 text-sm mb-4">
                Recibe las noticias de IA más importantes cada semana.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm flex-1 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2026 VNR IA Solutions. Hecho con ❤️ para la comunidad hispanohablante.
          </div>
        </div>
      </footer>
    </div>
  );
}
