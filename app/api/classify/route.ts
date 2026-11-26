import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: Request) {
  try {
    const { problem } = await request.json();

    if (!problem || problem.length < 50) {
      return NextResponse.json(
        { error: 'El problema debe tener al menos 50 caracteres' },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API no configurada' },
        { status: 500 }
      );
    }

    const classificationPrompt = `Eres un sistema experto en analizar problemas y generar preguntas de seguimiento relevantes.

Usuario describe su problema:
"${problem}"

Tu tarea:
1. Clasificar el problema en una categoría principal: technology, business, productivity, personal, u other
2. Determinar la complejidad (1-5):
   1 = Pregunta simple con respuesta directa
   2 = Requiere comparación o recomendación
   3 = Requiere análisis y plan de acción
   4 = Requiere estrategia multi-paso
   5 = Requiere consultoría profunda
3. Generar 3-4 preguntas específicas y relevantes para entender mejor el contexto del usuario

Responde SOLO en formato JSON válido (sin markdown):
{
  "category": "technology",
  "complexity": 3,
  "questions": [
    {
      "id": "q1",
      "question": "¿Texto de la pregunta?",
      "type": "text"
    }
  ]
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: classificationPrompt }],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en API de IA');
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || '';

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo procesar la respuesta');
    }

    const classification = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      category: classification.category,
      complexity: classification.complexity,
      questions: classification.questions,
    });

  } catch (error: any) {
    console.error('Error in classify API:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
