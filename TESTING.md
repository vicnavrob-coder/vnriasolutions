# Plan de Testing del Prototipo

## 🎯 Objetivo del Testing

Validar si el concepto de "Plataforma de Soluciones IA" tiene potencial antes de invertir 3 semanas en el MVP completo.

## ✅ Criterios de Éxito

### Mínimo Viable (proceder a MVP)
- [ ] 7/10 usuarios dicen que pagarían €29 por la solución premium
- [ ] Rating promedio de soluciones: 4+/5
- [ ] 8/10 soluciones son específicas y accionables (no genéricas)
- [ ] Tiempo generación <90 segundos
- [ ] 0 errores críticos en 10 consultas

### Objetivo Optimista (MVP prioritario)
- [ ] 9/10 usuarios pagarían
- [ ] Rating promedio: 4.5+/5
- [ ] 100% soluciones específicas
- [ ] Tiempo generación <60 segundos
- [ ] Usuarios piden features adicionales espontáneamente

## 📋 Test Cases

### Test 1: Problema Tecnología (Simple)
**Problema:**
```
¿Qué herramienta de gestión de proyectos es mejor para un equipo
de desarrollo de 5 personas que trabaja remoto?
```

**Complejidad esperada:** 1-2
**Precio sugerido:** €19
**Evaluar:**
- [ ] Preguntas generadas son relevantes
- [ ] Solución menciona herramientas reales (Asana, Linear, Jira, etc.)
- [ ] Incluye comparación con pros/cons
- [ ] Justifica recomendación

---

### Test 2: Problema Tecnología (Medio)
**Problema:**
```
Necesito automatizar el proceso de atención al cliente de mi e-commerce.
Recibimos ~200 consultas/día por email y respondemos manualmente.
Quiero usar IA para responder automáticamente las preguntas frecuentes
pero derivar las complejas a humanos. Presupuesto: €500/mes.
```

**Complejidad esperada:** 3
**Precio sugerido:** €29
**Evaluar:**
- [ ] Preguntas profundizan en contexto (volumen, tipos de consultas, etc.)
- [ ] Solución incluye herramientas específicas con precios
- [ ] Plan de implementación paso a paso
- [ ] Considera presupuesto mencionado

---

### Test 3: Problema Negocios (Complejo)
**Problema:**
```
Quiero lanzar un SaaS B2B de gestión de inventarios para restaurantes.
Tengo €10,000 de presupuesto y 6 meses de runway. No sé si empezar
construyendo el producto o primero validar con landing page.
Necesito estrategia completa desde cero hasta primeros 10 clientes.
```

**Complejidad esperada:** 4-5
**Precio sugerido:** €39-49
**Evaluar:**
- [ ] Preguntas sobre experiencia previa, target market, competencia
- [ ] Solución incluye estrategia de validación
- [ ] Timeline realista semana a semana
- [ ] Menciona métricas de éxito
- [ ] Presupuesto desglosado

---

### Test 4: Problema Productividad (Simple)
**Problema:**
```
Soy freelancer con 5-8 proyectos simultáneos. Pierdo tiempo cambiando
de contexto y olvido tareas. Necesito sistema de organización simple.
```

**Complejidad esperada:** 2
**Precio sugerido:** €19-29
**Evaluar:**
- [ ] Preguntas sobre herramientas actuales, tipo de proyectos
- [ ] Solución práctica y fácil de implementar
- [ ] Herramientas recomendadas con razón específica
- [ ] No over-engineering (no recomendar Notion si Excel basta)

---

### Test 5: Problema Personal (Medio)
**Problema:**
```
Quiero cambiar de carrera de marketing tradicional a UX design.
Tengo 35 años, no puedo dejar mi trabajo actual. ¿Cómo hago la
transición en 12 meses trabajando 10h/semana en aprender?
```

**Complejidad esperada:** 3-4
**Precio sugerido:** €29-39
**Evaluar:**
- [ ] Preguntas sobre experiencia actual, presupuesto para cursos
- [ ] Plan de aprendizaje estructurado
- [ ] Recursos específicos (cursos, libros, comunidades)
- [ ] Realista sobre timeline y esfuerzo
- [ ] Incluye plan para conseguir primer trabajo

---

### Test 6: Problema Business (Estratégico)
**Problema:**
```
Mi startup SaaS tiene 100 usuarios pagando €29/mes pero churn rate
es 15%/mes. Necesito estrategia para reducir churn y aumentar LTV.
```

**Complejidad esperada:** 4
**Precio sugerido:** €39
**Evaluar:**
- [ ] Preguntas sobre razones de churn, onboarding, features, support
- [ ] Análisis de causas raíz del churn
- [ ] Estrategias específicas priorizadas
- [ ] Métricas para medir mejora
- [ ] Timeline de implementación

---

### Test 7: Problema Tech (Específico)
**Problema:**
```
Necesito migrar mi app de WordPress a Next.js. Tengo 500 artículos,
50 páginas custom, y ~10K visitas/mes. ¿Cuál es el mejor approach
para migrar sin perder SEO y minimizando downtime?
```

**Complejidad esperada:** 4
**Precio sugerido:** €29-39
**Evaluar:**
- [ ] Preguntas técnicas (hosting actual, plugins, custom code)
- [ ] Estrategia de migración paso a paso
- [ ] Consideraciones SEO específicas
- [ ] Plan de testing y rollback
- [ ] Estimación realista de tiempo y esfuerzo

---

### Test 8: Problema Marketing (Táctico)
**Problema:**
```
Lanzamos producto hace 3 meses. Tenemos 50 usuarios pero adquisición
es lenta (2-3 nuevos/semana). Presupuesto ads: €1,000/mes. ¿Cuál es
la mejor estrategia de growth para llegar a 500 usuarios en 6 meses?
```

**Complejidad esperada:** 4
**Precio sugerido:** €39
**Evaluar:**
- [ ] Preguntas sobre producto, target audience, canales actuales
- [ ] Análisis de unit economics (CAC, LTV)
- [ ] Estrategia multi-canal
- [ ] Priorización basada en data
- [ ] Plan de experimentación

---

### Test 9: Problema Genérico (Validar que NO sea demasiado genérico)
**Problema:**
```
Quiero ganar más dinero con mi negocio. Ayúdame.
```

**Complejidad esperada:** N/A (debería rechazar o pedir más info)
**Evaluar:**
- [ ] Sistema detecta que problema es demasiado vago
- [ ] Preguntas son MUY específicas para entender contexto
- [ ] O alternativamente: mensaje pidiendo más detalles

---

### Test 10: Problema Edge Case (Multilenguaje)
**Problema:**
```
I need to build a chatbot for customer support but I want the solution
in Spanish. Budget is €5,000. Timeline: 2 months.
```

**Evaluar:**
- [ ] Sistema maneja input en inglés
- [ ] Solución se genera en español (o detecta idioma y pregunta)
- [ ] Contenido es relevante independiente del idioma

---

## 📊 Métricas a Registrar

Para cada test, registrar en tabla:

| # | Categoría | Complejidad Real | Tiempo Gen. | Rating Usuario | ¿Pagaría? | Notas |
|---|-----------|------------------|-------------|----------------|-----------|-------|
| 1 | Tech | 2 | 45s | 4/5 | Sí | Comparación tools clara |
| 2 | Tech | 3 | 67s | 5/5 | Sí | Muy específico |
| ... | ... | ... | ... | ... | ... | ... |

## 🎤 Preguntas Post-Test a Usuarios

Después de ver su solución, preguntar:

1. **Del 1 al 5, ¿qué tan útil fue la solución gratis?**
   - 1 = Inútil, muy genérica
   - 5 = Muy útil, me dio clarity inmediata

2. **¿Pagarías €29 por la solución completa?**
   - Sí / No / Tal vez

3. **Si NO pagarías, ¿por qué?**
   - Ya tengo suficiente con lo gratis
   - Muy caro para lo que ofrece
   - No confío en que lo premium agregue mucho valor
   - Prefiero googlear yo mismo

4. **Si SÍ pagarías, ¿qué es lo más valioso?**
   - Plan paso a paso
   - Herramientas específicas recomendadas
   - Ahorro de tiempo investigando
   - Otro: _____

5. **¿Qué mejorarías de la solución?**
   - Más específica
   - Más ejemplos prácticos
   - Mejor formato/diseño
   - Más corta y al punto
   - Otro: _____

6. **¿Volverías a usar esta plataforma para otro problema?**
   - Definitivamente sí
   - Probablemente sí
   - Tal vez
   - Probablemente no
   - Definitivamente no

## 📈 Análisis de Resultados

### Después de 10 Tests

**Métricas Cuantitativas:**
```
- Conversión potencial (pagarían): X/10
- Rating promedio: X.X/5
- Tiempo generación promedio: XXs
- Errores encontrados: X
```

**Métricas Cualitativas:**
```
- Calidad soluciones: X/10 específicas y accionables
- Herramientas reales mencionadas: X/10
- Timeline realista: X/10
- Consideró contexto usuario: X/10
```

### Decisión

**SI métricas > criterios mínimos:**
→ Proceder a implementación MVP completo (3 semanas)
→ Prioridad ALTA

**SI métricas cercanas pero no alcanzan:**
→ Iterar prompts de Claude
→ Re-testear con 5 casos más
→ Decidir después

**SI métricas muy por debajo:**
→ Pivotar a Job Board o Directorio IA
→ Este modelo no funciona

## 🚀 Cómo Ejecutar el Testing

### Setup
```bash
cd prototipo
npm install
cp .env.example .env
# Añadir ANTHROPIC_API_KEY al .env
npm run dev
```

### Proceso por Test
1. Abrir http://localhost:3000
2. Copiar/pegar problema de test
3. Responder preguntas generadas
4. Esperar solución
5. Evaluar calidad
6. Registrar métricas en tabla
7. (Opcional) Mostrar a usuario real y recoger feedback

### Timeline
- Test 1-5: Día 1 (4-5 horas)
- Test 6-10: Día 2 (4-5 horas)
- Análisis: Día 2 tarde (2 horas)
- Decisión: Día 3

**Total: 48 horas** ✓

## 💡 Tips para Testing Efectivo

1. **No edites las respuestas de Claude** - Si la solución es mala, es información útil
2. **Usa problemas REALES** - No inventados, usa casos reales de conocidos
3. **Sé honesto en la evaluación** - Mejor descubrir problemas ahora que después
4. **Testea edge cases** - Problemas vagos, muy complejos, multilenguaje
5. **Involucra a otros** - Pide a 3-5 personas que prueben y den feedback

¿Listo para empezar el testing?
