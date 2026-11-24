import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Article metadata
const articlesData: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string;
}> = {
  'chatgpt-vs-claude-comparativa-2026': {
    title: 'ChatGPT vs Claude: Comparativa Completa 2026',
    description: 'Análisis detallado comparando ChatGPT y Claude. Descubre cuál es mejor para programación, escritura, análisis y más.',
    date: '2026-11-08',
    readTime: '12 min',
    category: 'Comparativas',
    keywords: 'chatgpt vs claude, comparativa chatgpt claude, mejor ia 2026, claude vs gpt',
  },
  'claude-programacion-tutorial-2026': {
    title: 'Cómo Usar Claude para Programación: Tutorial Paso a Paso',
    description: 'Guía completa para usar Claude en programación. Ejemplos prácticos, prompts optimizados y trucos de expertos.',
    date: '2026-11-23',
    readTime: '10 min',
    category: 'Tutoriales',
    keywords: 'claude programación, claude código, tutorial claude, anthropic programación',
  },
  'mejores-herramientas-ia-gratis-2026': {
    title: 'Mejores Herramientas IA Gratis 2026 (Top 50)',
    description: 'Las 50 mejores herramientas de inteligencia artificial gratuitas. Categorizado por uso: texto, imagen, video, productividad y más.',
    date: '2026-11-23',
    readTime: '15 min',
    category: 'Recursos',
    keywords: 'herramientas ia gratis, mejores ia 2026, alternativas chatgpt gratis, ia gratuita',
  },
  'tutorial-claude-espanol-guia-completa-2026': {
    title: 'Tutorial Claude en Español: Guía Completa 2026',
    description: 'Todo lo que necesitas saber sobre Claude de Anthropic. Desde principiante hasta avanzado, con ejemplos prácticos.',
    date: '2026-11-08',
    readTime: '14 min',
    category: 'Tutoriales',
    keywords: 'tutorial claude español, guía claude, claude anthropic tutorial, como usar claude',
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    return { title: 'Artículo no encontrado' };
  }

  return {
    title: `${article.title} | VNR IA Solutions`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['VNR IA Solutions'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Remove metadata block if exists
  html = html.replace(/^---[\s\S]*?---\n/m, '');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-800 mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-brand-purple mt-10 mb-6 pb-2 border-b-2 border-gray-200">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-brand-purple hover:underline" target="_blank" rel="noopener">$1</a>');

  // Code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm text-red-600">$1</code>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal">$1</li>');

  // Wrap consecutive list items
  html = html.replace(/(<li.*<\/li>\n)+/g, '<ul class="my-4 space-y-1">$&</ul>');

  // Paragraphs - wrap lines that aren't already HTML tags
  const lines = html.split('\n');
  html = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('<') && !trimmed.startsWith('|')) {
      return `<p class="text-gray-700 leading-relaxed mb-4">${trimmed}</p>`;
    }
    return line;
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p class="[^"]*"><\/p>/g, '');

  return html;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  // Read markdown file
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    notFound();
  }

  const htmlContent = markdownToHtml(content);

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'VNR IA Solutions',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VNR IA Solutions',
    },
    keywords: article.keywords,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen py-12 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/" className="text-white/70 hover:text-white">
              Inicio
            </Link>
            <span className="text-white/50 mx-2">→</span>
            <Link href="/blog" className="text-white/70 hover:text-white">
              Blog
            </Link>
            <span className="text-white/50 mx-2">→</span>
            <span className="text-white/90">{article.category}</span>
          </nav>

          {/* Header */}
          <header className="card mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">
                {article.readTime} lectura
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-4">
              {article.description}
            </p>

            <div className="text-sm text-gray-500">
              Publicado el {new Date(article.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} por VNR IA Solutions
            </div>
          </header>

          {/* Content */}
          <div className="card">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* CTA */}
          <div className="card mt-8 bg-gradient-to-r from-brand-purple to-purple-600 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Te gustó este artículo?
            </h2>
            <p className="mb-6 text-white/90">
              Resuelve cualquier problema con IA en minutos. Solución personalizada gratis.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-brand-purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Obtener Mi Solución →
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(articlesData)
                .filter(([s]) => s !== slug)
                .slice(0, 2)
                .map(([s, a]) => (
                  <Link
                    key={s}
                    href={`/blog/${s}`}
                    className="card hover:shadow-lg transition-shadow"
                  >
                    <span className="text-xs font-medium text-brand-purple">
                      {a.category}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-2 hover:text-brand-purple">
                      {a.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="text-white hover:text-white/80 font-medium"
            >
              ← Ver todos los artículos
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
