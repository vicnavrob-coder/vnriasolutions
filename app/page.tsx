'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const tools = [
  { name: 'ChatGPT', category: 'Chat IA', rating: 4.8, link: '/blog/chatgpt-vs-claude-comparativa-2026' },
  { name: 'Claude', category: 'Chat IA', rating: 4.9, link: '/blog/tutorial-claude-espanol-guia-completa-2026' },
  { name: 'Midjourney', category: 'Imágenes', rating: 4.7, link: '/blog/mejores-herramientas-ia-gratis-2026' },
  { name: 'Notion AI', category: 'Productividad', rating: 4.6, link: '/blog/mejores-herramientas-ia-gratis-2026' },
];

const articles = [
  {
    slug: 'chatgpt-vs-claude-comparativa-2026',
    title: 'ChatGPT vs Claude 2026',
    excerpt: 'Comparativa completa de los dos mejores asistentes IA',
    category: 'Comparativas',
  },
  {
    slug: 'mejores-herramientas-ia-gratis-2026',
    title: 'Top 50 Herramientas IA Gratis',
    excerpt: 'Las mejores herramientas de IA sin pagar nada',
    category: 'Recursos',
  },
  {
    slug: 'claude-programacion-tutorial-2026',
    title: 'Claude para Programación',
    excerpt: 'Guía completa para programar con Claude',
    category: 'Tutoriales',
  },
];

export default function Home() {
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'hero' | 'form' | 'questions' | 'processing'>('hero');
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleAnalyze = async () => {
    if (problem.length < 50) {
      alert('Describe tu problema con más detalle (mínimo 50 caracteres)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setQuestions(data.questions || []);
      setStep('questions');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswers = async () => {
    if (!email || !name) {
      alert('Por favor ingresa tu nombre y email');
      return;
    }

    setStep('processing');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, answers, email, name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      router.push(`/solucion/${data.consultationId}`);
    } catch (error: any) {
      alert('Error: ' + error.message);
      setStep('questions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            VNR IA Solutions
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/blog" className="text-gray-600 hover:text-purple-600 font-medium transition">
              Blog
            </Link>
            <Link href="#herramientas" className="text-gray-600 hover:text-purple-600 font-medium transition">
              Herramientas
            </Link>
            <button
              onClick={() => setStep('form')}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition"
            >
              Resolver Problema
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {step === 'hero' && (
        <>
          <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-2 bg-purple-500/20 rounded-full">
                <span className="text-purple-300 text-sm font-medium">Potenciado por IA de última generación</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Domina la <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Inteligencia Artificial</span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Tutoriales, comparativas y herramientas para aprovechar el poder de la IA en tu trabajo y proyectos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setStep('form')}
                  className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  Resolver Mi Problema con IA
                </button>
                <Link
                  href="/blog"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition"
                >
                  Ver Artículos
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-sm">Herramientas IA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1.2K+</div>
                  <div className="text-gray-400 text-sm">Problemas Resueltos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-gray-400 text-sm">Valoración</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Articles */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Artículos Destacados</h2>
                <p className="text-gray-600">Guías y tutoriales para dominar las herramientas de IA</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition group"
                  >
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2 group-hover:text-purple-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <span className="text-purple-600 font-medium group-hover:translate-x-2 inline-block transition-transform">
                      Leer más →
                    </span>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/blog"
                  className="text-purple-600 font-semibold hover:text-purple-700 text-lg"
                >
                  Ver todos los artículos →
                </Link>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section id="herramientas" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Herramientas IA Recomendadas</h2>
                <p className="text-gray-600">Las mejores herramientas de IA analizadas y comparadas</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.link}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">{tool.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                        {tool.rating}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.category}</p>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/blog/mejores-herramientas-ia-gratis-2026"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
                >
                  Ver Top 50 Herramientas IA Gratis
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Tienes un problema que la IA puede resolver?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Describe tu problema y recibe una solución personalizada en minutos. Gratis.
              </p>
              <button
                onClick={() => setStep('form')}
                className="bg-white text-purple-700 px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                Obtener Mi Solución
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 md:mb-0">
                  VNR IA Solutions
                </div>
                <div className="flex gap-6">
                  <Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
                  <Link href="#herramientas" className="text-gray-400 hover:text-white transition">Herramientas</Link>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                © 2026 VNR IA Solutions. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Problem Form */}
      {step === 'form' && (
        <section className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setStep('hero')}
              className="text-white/70 hover:text-white mb-8 flex items-center gap-2"
            >
              ← Volver
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Describe tu problema</h2>
              <p className="text-gray-600 mb-6">Cuanto más detalle, mejor será la solución.</p>

              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Ejemplo: Necesito automatizar las respuestas de atención al cliente de mi tienda online. Recibo unas 50 consultas diarias y quiero que la IA responda las preguntas frecuentes..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-800"
                disabled={isLoading}
              />

              <div className="flex justify-between items-center mt-4 mb-6">
                <span className="text-sm text-gray-500">{problem.length}/500 caracteres (mín. 50)</span>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading || problem.length < 50}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analizando...' : 'Analizar Mi Problema'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Gratis • Sin tarjeta • Respuesta en 2 minutos
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Questions Step */}
      {step === 'questions' && (
        <section className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setStep('form')}
              className="text-white/70 hover:text-white mb-8 flex items-center gap-2"
            >
              ← Volver
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Personaliza tu solución</h2>
              <p className="text-gray-600 mb-6">Unas preguntas rápidas para darte la mejor respuesta.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tu nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tu email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="tu@email.com"
                  />
                </div>

                {questions.map((q, i) => (
                  <div key={q.id || i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {i + 1}. {q.question}
                    </label>
                    <input
                      type="text"
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmitAnswers}
                disabled={isLoading || !email || !name}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Generando...' : 'Generar Mi Solución'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <section className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <h2 className="text-2xl font-bold text-white mb-4">Generando tu solución...</h2>
            <p className="text-gray-300">Esto puede tomar hasta 2 minutos. Estamos analizando tu problema y creando una solución personalizada.</p>
          </div>
        </section>
      )}
    </div>
  );
}
