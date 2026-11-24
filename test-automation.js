// Script automatizado para testing del prototipo
// Ejecuta los 10 casos de prueba y registra resultados

const testCases = [
  {
    id: 1,
    categoria: "Tech",
    complejidad_esperada: "1-2",
    precio_esperado: "€19",
    problema: "¿Qué herramienta de gestión de proyectos es mejor para un equipo de desarrollo de 5 personas que trabaja remoto?"
  },
  {
    id: 2,
    categoria: "Tech",
    complejidad_esperada: "3",
    precio_esperado: "€29",
    problema: "Necesito automatizar el proceso de atención al cliente de mi e-commerce. Recibimos ~200 consultas/día por email y respondemos manualmente. Quiero usar IA para responder automáticamente las preguntas frecuentes pero derivar las complejas a humanos. Presupuesto: €500/mes."
  },
  {
    id: 3,
    categoria: "Business",
    complejidad_esperada: "4-5",
    precio_esperado: "€39-49",
    problema: "Quiero lanzar un SaaS B2B de gestión de inventarios para restaurantes. Tengo €10,000 de presupuesto y 6 meses de runway. No sé si empezar construyendo el producto o primero validar con landing page. Necesito estrategia completa desde cero hasta primeros 10 clientes."
  },
  {
    id: 4,
    categoria: "Productividad",
    complejidad_esperada: "2",
    precio_esperado: "€19-29",
    problema: "Soy freelancer con 5-8 proyectos simultáneos. Pierdo tiempo cambiando de contexto y olvido tareas. Necesito sistema de organización simple."
  },
  {
    id: 5,
    categoria: "Personal",
    complejidad_esperada: "3-4",
    precio_esperado: "€29-39",
    problema: "Quiero cambiar de carrera de marketing tradicional a UX design. Tengo 35 años, no puedo dejar mi trabajo actual. ¿Cómo hago la transición en 12 meses trabajando 10h/semana en aprender?"
  },
  {
    id: 6,
    categoria: "Business",
    complejidad_esperada: "4",
    precio_esperado: "€39",
    problema: "Mi startup SaaS tiene 100 usuarios pagando €29/mes pero churn rate es 15%/mes. Necesito estrategia para reducir churn y aumentar LTV."
  },
  {
    id: 7,
    categoria: "Tech",
    complejidad_esperada: "4",
    precio_esperado: "€29-39",
    problema: "Necesito migrar mi app de WordPress a Next.js. Tengo 500 artículos, 50 páginas custom, y ~10K visitas/mes. ¿Cuál es el mejor approach para migrar sin perder SEO y minimizando downtime?"
  },
  {
    id: 8,
    categoria: "Marketing",
    complejidad_esperada: "4",
    precio_esperado: "€39",
    problema: "Lanzamos producto hace 3 meses. Tenemos 50 usuarios pero adquisición es lenta (2-3 nuevos/semana). Presupuesto ads: €1,000/mes. ¿Cuál es la mejor estrategia de growth para llegar a 500 usuarios en 6 meses?"
  },
  {
    id: 9,
    categoria: "Edge Case",
    complejidad_esperada: "N/A",
    precio_esperado: "N/A",
    problema: "Quiero ganar más dinero con mi negocio. Ayúdame."
  },
  {
    id: 10,
    categoria: "Multilenguaje",
    complejidad_esperada: "3",
    precio_esperado: "€29",
    problema: "I need to build a chatbot for customer support but I want the solution in Spanish. Budget is €5,000. Timeline: 2 months."
  }
];

async function runTest(testCase) {
  console.log(`\n========================================`);
  console.log(`Test #${testCase.id}: ${testCase.categoria}`);
  console.log(`========================================`);
  console.log(`Problema: ${testCase.problema}`);

  const startTime = Date.now();

  try {
    // Paso 1: Clasificar problema
    console.log('\n[1/3] Clasificando problema...');
    const classifyResponse = await fetch('http://localhost:3000/api/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem: testCase.problema })
    });

    if (!classifyResponse.ok) {
      throw new Error(`Classify API error: ${classifyResponse.status}`);
    }

    const classifyData = await classifyResponse.json();
    console.log(`   Categoría: ${classifyData.category}`);
    console.log(`   Complejidad: ${classifyData.complexity}/5`);
    console.log(`   Precio sugerido: €${classifyData.suggestedPrice}`);
    console.log(`   Preguntas generadas: ${classifyData.questions.length}`);

    // Paso 2: Generar respuestas simuladas para las preguntas
    console.log('\n[2/3] Generando respuestas simuladas...');
    const answers = {};
    classifyData.questions.forEach((q, idx) => {
      // Respuestas genéricas pero realistas
      if (q.type === 'select') {
        answers[q.id] = q.options[0];
      } else if (q.type === 'textarea') {
        answers[q.id] = "Respuesta detallada de prueba para testing automatizado.";
      } else {
        answers[q.id] = "Respuesta de prueba";
      }
    });

    // Paso 3: Generar solución
    console.log('\n[3/3] Generando solución completa...');
    const solutionResponse = await fetch('http://localhost:3000/api/generate-solution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problem: testCase.problema,
        category: classifyData.category,
        complexity: classifyData.complexity,
        answers: answers
      })
    });

    if (!solutionResponse.ok) {
      throw new Error(`Generate API error: ${solutionResponse.status}`);
    }

    const solutionData = await solutionResponse.json();
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    console.log(`\n✅ TEST COMPLETADO en ${duration}s`);
    console.log(`\nSolución Gratis (${solutionData.freeSolution.length} chars):`);
    console.log(solutionData.freeSolution.substring(0, 200) + '...');
    console.log(`\nSolución Premium (${solutionData.premiumSolution.length} chars):`);
    console.log(solutionData.premiumSolution.substring(0, 200) + '...');

    return {
      id: testCase.id,
      categoria: testCase.categoria,
      success: true,
      complejidad_detectada: classifyData.complexity,
      precio_sugerido: classifyData.suggestedPrice,
      num_preguntas: classifyData.questions.length,
      tiempo_generacion: duration,
      longitud_gratis: solutionData.freeSolution.length,
      longitud_premium: solutionData.premiumSolution.length,
      solucion_id: solutionData.id
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    console.log(`\n❌ TEST FALLIDO después de ${duration}s`);
    console.log(`Error: ${error.message}`);

    return {
      id: testCase.id,
      categoria: testCase.categoria,
      success: false,
      error: error.message,
      tiempo_generacion: duration
    };
  }
}

async function runAllTests() {
  console.log('='.repeat(60));
  console.log('TESTING AUTOMATIZADO - VNR.IASOLUTIONS PROTOTIPO');
  console.log('='.repeat(60));
  console.log(`Fecha: ${new Date().toLocaleString('es-ES')}`);
  console.log(`Total de tests: ${testCases.length}`);

  const results = [];

  for (const testCase of testCases) {
    const result = await runTest(testCase);
    results.push(result);

    // Pausa entre tests para no sobrecargar la API
    if (testCase.id < testCases.length) {
      console.log('\nEsperando 3s antes del siguiente test...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('RESUMEN DE RESULTADOS');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\nTests exitosos: ${successful.length}/${testCases.length}`);
  console.log(`Tests fallidos: ${failed.length}/${testCases.length}`);

  if (successful.length > 0) {
    const avgTime = (successful.reduce((sum, r) => sum + parseFloat(r.tiempo_generacion), 0) / successful.length).toFixed(1);
    const avgComplexity = (successful.reduce((sum, r) => sum + r.complejidad_detectada, 0) / successful.length).toFixed(1);

    console.log(`\nTiempo promedio generación: ${avgTime}s`);
    console.log(`Complejidad promedio detectada: ${avgComplexity}/5`);
    console.log(`Precio mínimo sugerido: €${Math.min(...successful.map(r => r.precio_sugerido))}`);
    console.log(`Precio máximo sugerido: €${Math.max(...successful.map(r => r.precio_sugerido))}`);
  }

  // Tabla de resultados
  console.log('\n\nTABLA DE RESULTADOS:');
  console.log('-'.repeat(100));
  console.log('ID | Categoría      | Complejidad | Precio | Tiempo | Preguntas | Status');
  console.log('-'.repeat(100));

  results.forEach(r => {
    if (r.success) {
      console.log(
        `${r.id.toString().padEnd(2)} | ${r.categoria.padEnd(14)} | ${r.complejidad_detectada}/5         | €${r.precio_sugerido.toString().padEnd(4)} | ${r.tiempo_generacion}s    | ${r.num_preguntas}         | ✅`
      );
    } else {
      console.log(
        `${r.id.toString().padEnd(2)} | ${r.categoria.padEnd(14)} | -           | -      | ${r.tiempo_generacion}s    | -         | ❌`
      );
    }
  });
  console.log('-'.repeat(100));

  // Guardar resultados en JSON
  const fs = require('fs');
  const resultsPath = './test-results.json';
  fs.writeFileSync(resultsPath, JSON.stringify({
    fecha: new Date().toISOString(),
    total_tests: testCases.length,
    exitosos: successful.length,
    fallidos: failed.length,
    resultados: results
  }, null, 2));

  console.log(`\n✅ Resultados guardados en: ${resultsPath}`);

  // Evaluación final
  console.log('\n' + '='.repeat(60));
  console.log('EVALUACIÓN FINAL');
  console.log('='.repeat(60));

  const criteriosMinimos = {
    exitosos: 10,
    tiempoMax: 90,
    complejidadMin: 1
  };

  const cumple = successful.length >= criteriosMinimos.exitosos;

  if (cumple) {
    console.log('✅ PROTOTIPO VALIDADO - Proceder a MVP completo');
    console.log('\nSiguientes pasos:');
    console.log('1. Implementar sistema de pagos (Stripe)');
    console.log('2. Migrar storage a Supabase');
    console.log('3. Sistema de autenticación');
    console.log('4. Dashboard de usuario');
    console.log('5. Email notifications');
  } else {
    console.log('⚠️  PROTOTIPO REQUIERE MEJORAS');
    console.log('\nProblemas detectados:');
    console.log(`- ${failed.length} tests fallidos`);
    console.log('\nOpciones:');
    console.log('1. Ajustar prompts de Claude y re-testear');
    console.log('2. Pivotar a Job Board o Directorio IA');
  }

  console.log('\n' + '='.repeat(60));
}

// Ejecutar
runAllTests().catch(console.error);
