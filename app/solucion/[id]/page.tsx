import { readFile } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONSULTATIONS_FILE = path.join(DATA_DIR, 'consultations.json');

async function getConsultation(id: string) {
  try {
    const data = await readFile(CONSULTATIONS_FILE, 'utf-8');
    const consultations = JSON.parse(data);
    return consultations.find((c: any) => c.id === id);
  } catch {
    return null;
  }
}

export default async function SolutionPage({
  params,
}: {
  params: { id: string };
}) {
  const consultation = await getConsultation(params.id);

  if (!consultation) {
    notFound();
  }

  const isPremium = consultation.paymentStatus === 'completed';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ✅ ¡Tu Solución Está Lista!
          </h1>
          <p className="text-white/80">
            Hola {consultation.userName}, aquí está tu solución personalizada
          </p>
        </div>

        {/* Free Solution */}
        <div className="card mb-8">
          <div className="border-b-4 border-brand-purple pb-4 mb-6">
            <h2 className="text-2xl font-bold text-brand-purple">
              RESUMEN EJECUTIVO
            </h2>
            <p className="text-sm text-gray-500">Incluido gratis</p>
          </div>

          <div className="prose max-w-none">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(consultation.solutionFree) }}
            />
          </div>
        </div>

        {/* Premium Solution Preview/Full */}
        <div className="card relative">
          <div className="border-b-4 border-amber-500 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-amber-600">
                  SOLUCIÓN COMPLETA
                </h2>
                <p className="text-sm text-gray-500">
                  {isPremium ? 'Desbloqueada' : 'Premium - €29'}
                </p>
              </div>
              {isPremium && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ Pagado
                </span>
              )}
            </div>
          </div>

          {!isPremium ? (
            <>
              {/* Premium Preview with Blur */}
              <div className="relative">
                <div className="prose max-w-none">
                  <div
                    className="whitespace-pre-wrap blur-sm select-none pointer-events-none"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(consultation.solutionPremium.slice(0, 800))
                    }}
                  />
                </div>

                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white flex items-end justify-center pb-12">
                  <div className="text-center">
                    <button className="bg-gradient-brand text-white font-bold px-12 py-6 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                      Desbloquear Solución Completa - €29 →
                    </button>

                    <div className="mt-6 space-y-2 text-sm text-gray-600">
                      <p>✓ Plan detallado paso a paso</p>
                      <p>✓ Herramientas específicas con links</p>
                      <p>✓ Timeline de implementación</p>
                      <p>✓ 3 consultas de seguimiento incluidas</p>
                      <p>✓ Exportar a PDF</p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                      <p className="text-sm font-medium text-blue-900">
                        ¿Por qué €29?
                      </p>
                      <p className="text-xs text-blue-700 mt-2">
                        Agente especializado creado solo para ti • Te ahorramos 5-10 horas de investigación • 10x más específico que Google
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Full Premium Solution */}
              <div className="prose max-w-none">
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(consultation.solutionPremium)
                  }}
                />
              </div>

              {/* Actions for Premium Users */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex gap-4">
                  <button className="btn-primary flex-1">
                    📥 Descargar PDF
                  </button>
                  <button className="btn-secondary flex-1">
                    📧 Enviar por Email
                  </button>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-4">¿Necesitas más ayuda?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Tienes 3 preguntas de seguimiento incluidas. Recibirás respuesta en máximo 48h.
                  </p>

                  <textarea
                    className="textarea mb-4"
                    placeholder="Escribe tu pregunta de seguimiento..."
                    rows={3}
                  />

                  <button className="btn-primary">
                    Enviar Pregunta (3 restantes)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Testimonials */}
        {!isPremium && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Lo que dicen otros usuarios
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-white/90 mb-2">
                  "Exactamente lo que necesitaba. El plan paso a paso me ahorró semanas de investigación."
                </p>
                <p className="text-white/60 text-sm">- Laura M., Emprendedora</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-white/90 mb-2">
                  "Valió cada euro. Las herramientas recomendadas fueron perfectas para mi caso."
                </p>
                <p className="text-white/60 text-sm">- Pedro R., Developer</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-white/90 mb-2">
                  "Increíble nivel de detalle. Mejor que contratar un consultor por 10x el precio."
                </p>
                <p className="text-white/60 text-sm">- Ana G., Marketing Manager</p>
              </div>
            </div>
          </div>
        )}

        {/* Back to home */}
        <div className="mt-12 text-center">
          <a href="/" className="text-white/80 hover:text-white underline">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

// Simple markdown formatter (basic version for prototype)
function formatMarkdown(text: string): string {
  return text
    // Headers
    .replace(/### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
    // Line breaks
    .replace(/\n/gim, '<br />');
}
