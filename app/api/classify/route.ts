import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { problem } = await request.json();

    if (!problem || problem.length < 50) {
      return NextResponse.json(
        { error: 'El problema debe tener al menos 50 caracteres' },
        { status: 400 }
      );
    }

    // Classify problem and generate questions using Claude
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
3. Generar 3-5 preguntas específicas y relevantes para entender mejor el contexto del usuario

Las preguntas deben ser:
- Específicas al problema descrito
- Ayudar a personalizar la solución
- Prácticas (presupuesto, timeline, herramientas actuales, etc.)

Responde en formato JSON:
{
  "category": "technology",
  "complexity": 3,
  "suggested_price": 29,
  "reasoning": "Breve explicación de por qué esta categoría y complejidad",
  "questions": [
    {
      "id": "q1",
      "question": "¿Texto de la pregunta?",
      "type": "text|textarea|select",
      "options": ["opción1", "opción2"] // solo si type es select
    }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 2000,
      temperature: 0.3,
      messages: [{
        role: 'user',
        content: classificationPrompt,
      }],
    });

    // Parse Claude's response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Extract JSON from response (Claude sometimes wraps it in markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo parsear la respuesta de Claude');
    }

    const classification = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      category: classification.category,
      complexity: classification.complexity,
      suggestedPrice: classification.suggested_price,
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
