import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Simple file-based storage for prototype (replace with Supabase later)
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

    // Generate unique consultation ID
    const consultationId = `consult_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Build context from answers
    const answerContext = Object.entries(answers)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    // Generate solution with Claude
    const solutionPrompt = `Eres un consultor experto que genera soluciones específicas y accionables para problemas descritos por usuarios.

PROBLEMA DEL USUARIO:
"${problem}"

CONTEXTO ADICIONAL:
${answerContext}

Tu tarea es generar una solución completa y personalizada. La respuesta debe tener DOS secciones:

## RESUMEN EJECUTIVO (GRATIS)
[Máximo 300 palabras]

Un resumen ejecutivo que incluya:
- Identificación del problema principal
- Causa raíz más probable
- Recomendación clave #1
- Un párrafo de overview de la solución

Importante: Este resumen debe ser valioso por sí solo, pero dejar claro que hay mucho más detalle en la solución completa.

---SEPARADOR---

## SOLUCIÓN COMPLETA (PREMIUM)

### 1. Análisis Detallado del Problema
[Análisis profundo de la situación, causas raíz, contexto]

### 2. Solución Paso a Paso
[Pasos numerados concretos con timeline estimado]

Paso 1: [Título]
- Descripción específica
- Timeline: X días/semanas
- Recursos necesarios
- Resultado esperado

[Continuar con más pasos...]

### 3. Herramientas y Recursos Específicos
[Lista de herramientas reales con links y precios]

- **[Nombre herramienta]** - Descripción breve
  - Precio: €XX/mes
  - Por qué recomendada
  - Link: [URL real]

### 4. Plan de Implementación
[Timeline semana a semana concreto]

Semana 1:
- [Tareas específicas]

Semana 2:
- [Tareas específicas]

### 5. Posibles Obstáculos y Soluciones
[Anticipar 3-5 problemas comunes y cómo resolverlos]

### 6. Métricas de Éxito
[Cómo medir si la solución funciona]

### 7. Próximos Pasos Inmediatos
[3-5 acciones concretas para empezar HOY]

IMPORTANTE:
- Sé ULTRA específico - menciona herramientas reales, precios reales, timelines realistas
- No seas genérico - adapta TODO al contexto del usuario
- Incluye links reales a herramientas (no inventes URLs)
- Números concretos (presupuestos, tiempos, métricas)
- Ejemplos prácticos cuando sea relevante
- Si no estás seguro de algo, dilo claramente

FORMATO:
Separa las dos secciones con exactamente: "---SEPARADOR---"`;

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: solutionPrompt,
      }],
    });

    const fullResponse = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Split response into free and premium parts
    const parts = fullResponse.split('---SEPARADOR---');
    const solutionFree = parts[0]?.replace(/^## RESUMEN EJECUTIVO \(GRATIS\)\s*/i, '').trim() || fullResponse.slice(0, 500);
    const solutionPremium = parts[1]?.replace(/^## SOLUCIÓN COMPLETA \(PREMIUM\)\s*/i, '').trim() || fullResponse;

    // Save consultation to file
    const consultation = {
      id: consultationId,
      userEmail: email,
      userName: name,
      problem,
      answers,
      solutionFree,
      solutionPremium,
      status: 'completed',
      paymentStatus: null,
      createdAt: new Date().toISOString(),
    };

    await saveConsultation(consultation);

    // In production, send email here with Resend
    console.log(`[EMAIL] Sending solution to ${email}`);
    console.log(`Consultation ID: ${consultationId}`);

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
