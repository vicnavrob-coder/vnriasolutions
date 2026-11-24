'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<'problem' | 'questions' | 'processing'>('problem');
  const [problem, setProblem] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const placeholders = [
    "Ejemplo: Necesito automatizar las respuestas de mi servicio al cliente...",
    "Ejemplo: Quiero crear una estrategia de contenido para Instagram...",
    "Ejemplo: No sé qué herramienta de IA usar para mi negocio...",
    "Ejemplo: Cómo puedo mejorar la conversión de mi landing page...",
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  // Rotate placeholder every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleSubmitProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.length < 50) {
      alert('Por favor describe tu problema con más detalle (mínimo 50 caracteres)');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Analizando tu problema...');

    try {
      // Call API to classify problem and generate questions
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al analizar el problema');
      }

      setQuestions(data.questions);
      setStep('questions');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswers = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all questions answered
    if (questions.some(q => !answers[q.id])) {
      alert('Por favor responde todas las preguntas');
      return;
    }

    if (!email || !name) {
      alert('Por favor ingresa tu nombre y email');
      return;
    }

    setIsLoading(true);
    setStep('processing');

    const loadingMessages = [
      'Analizando tu problema...',
      'Creando agente especializado...',
      'Investigando mejores soluciones...',
      'Generando tu plan personalizado...',
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 3000);

    try {
      const response = await fetch('/api/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem,
          answers,
          email,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar la solución');
      }

      clearInterval(messageInterval);

      // Redirect to solution page
      router.push(`/solucion/${data.consultationId}`);
    } catch (error: any) {
      clearInterval(messageInterval);
      alert('Error: ' + error.message);
      setStep('questions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <nav className="flex justify-center gap-6 mb-6">
            <Link href="/blog" className="text-white/80 hover:text-white font-medium">
              Blog IA
            </Link>
          </nav>
          <h1 className="text-5xl font-bold text-white mb-4">
            VNR IA Solutions
          </h1>
          <p className="text-xl text-white/90">
            Resuelve cualquier problema con IA en minutos
          </p>
        </header>

        {/* Step 1: Problem Description */}
        {step === 'problem' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-purple mb-4">
              Describe tu problema
            </h2>
            <p className="text-gray-600 mb-6">
              Sé específico. Cuanto más detalle proporciones, mejor será la solución que generemos para ti.
            </p>

            <form onSubmit={handleSubmitProblem}>
              <textarea
                className="textarea h-48 mb-4"
                placeholder={placeholders[currentPlaceholder]}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                disabled={isLoading}
              />

              <div className="text-sm text-gray-500 mb-6">
                {problem.length}/500 caracteres (mínimo 50)
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-sm mb-2">💡 Tips para una mejor solución:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Sé específico (evita "necesito ayuda con mi negocio")</li>
                  <li>✓ Menciona tu contexto (industria, tamaño, presupuesto si relevante)</li>
                  <li>✓ Describe el resultado que buscas</li>
                </ul>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading || problem.length < 50}
              >
                {isLoading ? 'Analizando...' : 'Obtener Solución Gratis →'}
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>✓ Solución básica gratis</p>
                <p>✓ Sin tarjeta de crédito</p>
                <p>✓ Respuesta en 2-5 minutos</p>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Questions */}
        {step === 'questions' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-purple mb-4">
              Ayúdanos a personalizar tu solución
            </h2>
            <p className="text-gray-600 mb-6">
              Hemos analizado tu problema. Unas preguntas rápidas para crear el mejor agente especializado para ti.
            </p>

            <form onSubmit={handleSubmitAnswers} className="space-y-6">
              {/* User info */}
              <div>
                <label className="block text-sm font-medium mb-2">Tu nombre</label>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tu email (para enviarte la solución)</label>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Dynamic questions */}
              {questions.map((q, index) => (
                <div key={q.id}>
                  <label className="block text-sm font-medium mb-2">
                    {index + 1}. {q.question}
                  </label>

                  {q.type === 'text' && (
                    <input
                      type="text"
                      className="input"
                      value={answers[q.id] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, [q.id]: e.target.value })
                      }
                      required
                    />
                  )}

                  {q.type === 'textarea' && (
                    <textarea
                      className="textarea h-24"
                      value={answers[q.id] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, [q.id]: e.target.value })
                      }
                      required
                    />
                  )}

                  {q.type === 'select' && (
                    <select
                      className="input"
                      value={answers[q.id] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, [q.id]: e.target.value })
                      }
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      {q.options.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Generando...' : 'Generar Mi Solución →'}
              </button>

              <div className="text-center text-sm text-gray-500">
                🔒 Tu información es privada y segura
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="card max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-purple mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-brand-purple mb-2">
                {loadingMessage}
              </h2>
              <p className="text-gray-600">
                Esto toma entre 30 segundos y 2 minutos
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                💡 Mientras esperas, sabías que...
              </p>
              <p className="text-sm text-gray-700">
                Nuestros agentes IA analizan miles de soluciones en tiempo real para encontrar la mejor respuesta para tu caso específico.
              </p>
            </div>
          </div>
        )}

        {/* Social Proof */}
        {step === 'problem' && (
          <div className="mt-16 text-center">
            <p className="text-white/80 mb-6">
              Ya ayudamos a resolver +1,234 problemas
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 mb-2">
                  "Me ahorró 2 semanas de investigación"
                </p>
                <p className="text-white/60 text-sm">- María S.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 mb-2">
                  "La solución valió 10x lo que pagué"
                </p>
                <p className="text-white/60 text-sm">- Carlos R.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 mb-2">
                  "Increíblemente específico y accionable"
                </p>
                <p className="text-white/60 text-sm">- Ana G.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
