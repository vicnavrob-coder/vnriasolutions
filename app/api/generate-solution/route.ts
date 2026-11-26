import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const DATA_DIR = path.join(process.cwd(), 'data');
const CONSULTATIONS_FILE = path.join(DATA_DIR, 'consultations.json');

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  if (!existsSync(CONSULTATIONS_FILE)) {
    await writeFile(CONSULTATIONS_FILE, JSON.stringify([], null, 2));
  }
}

async function saveConsultation(consultation: any) {
  await ensureDataDir();
  const consultations = JSON.parse(await readFile(CONSULTATIONS_FILE, 'utf-8'));
  consultations.push(consultation);
  await writeFile(CONSULTATIONS_FILE, JSON.stringify(consultations, null, 2));
}

export async function POST(request: Request) {
  try {
    const { problem, answers, email, name } = await request.json();

    if (!problem || !email || !name) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API no configurada' },
        { status: 500 }
      );
    }

    const consultationId = `consult_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const answerContext = Object.entries(answers)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    const solutionPrompt = `Eres un consultor experto en IA y tecnología. Genera una solución completa y personalizada.

PROBLEMA:
"${problem}"

CONTEXTO:
${answerContext}

Genera una solución en DOS partes separadas por "---SEPARADOR---":

PARTE 1 - RESUMEN (máximo 250 palabras):
- Identificación del problema
- Causa raíz probable
- Recomendación clave
- Preview de la solución

---SEPARADOR---

PARTE 2 - SOLUCIÓN COMPLETA:

### Análisis del Problema
[Análisis detallado]

### Solución Paso a Paso
Paso 1: [Título]
- Qué hacer exactamente
- Timeline: X días
- Resultado esperado

[Más pasos...]

### Herramientas Recomendadas
- **[Herramienta]**: Descripción - €XX/mes

### Plan de Implementación
Semana 1: [Tareas]
Semana 2: [Tareas]

### Próximos Pasos (HOY)
1. [Acción concreta]
2. [Acción concreta]
3. [Acción concreta]

Sé ESPECÍFICO con herramientas reales, precios y tiempos concretos.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: solutionPrompt }],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en API de IA');
    }

    const data = await response.json();
    const fullResponse = data.choices[0]?.message?.content || '';

    const parts = fullResponse.split('---SEPARADOR---');
    const solutionFree = parts[0]?.trim() || fullResponse.slice(0, 500);
    const solutionPremium = parts[1]?.trim() || fullResponse;

    const consultation = {
      id: consultationId,
      userEmail: email,
      userName: name,
      problem,
      answers,
      solutionFree,
      solutionPremium,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    await saveConsultation(consultation);

    return NextResponse.json({
      consultationId,
      message: 'Solución generada exitosamente',
    });

  } catch (error: any) {
    console.error('Error in generate-solution API:', error);
    return NextResponse.json(
      { error: error.message || 'Error al generar la solución' },
      { status: 500 }
    );
  }
}
