# VNR.IAsolutions - Prototipo 48h

Prototipo funcional de la plataforma de soluciones IA automatizada.

## 🚀 Quick Start

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` y añade tu Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Ejecutar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 Cómo Funciona

### Flujo del Usuario

1. **Landing Page** (`/`)
   - Usuario describe su problema (min 50 caracteres)
   - Click en "Obtener Solución Gratis"

2. **Clasificación Automática**
   - Claude API analiza el problema
   - Genera 3-5 preguntas personalizadas
   - Detecta categoría y complejidad

3. **Cuestionario**
   - Usuario responde preguntas
   - Ingresa nombre y email
   - Click en "Generar Mi Solución"

4. **Generación de Solución**
   - Claude API crea agente especializado
   - Genera solución en dos partes:
     - **Gratis:** Resumen ejecutivo (300 palabras)
     - **Premium:** Solución completa paso a paso

5. **Página de Solución** (`/solucion/[id]`)
   - Muestra resumen gratis completo
   - Preview de solución premium con blur
   - CTA para desbloquear por €29

## 🏗️ Arquitectura

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** (estilos)
- **TypeScript**

### API Routes
- `POST /api/classify` - Clasifica problema y genera preguntas
- `POST /api/generate-solution` - Genera solución completa

### Storage (Prototipo)
- Archivo JSON simple en `/data/consultations.json`
- En producción: migrar a Supabase

### IA
- **Claude Opus 4.5** via Anthropic SDK
- Prompts especializados para:
  - Clasificación y preguntas
  - Generación de soluciones

## 📁 Estructura del Proyecto

```
prototipo/
├── app/
│   ├── api/
│   │   ├── classify/route.ts         # Clasifica y genera preguntas
│   │   └── generate-solution/route.ts # Genera solución
│   ├── solucion/[id]/page.tsx         # Página resultado
│   ├── layout.tsx                     # Layout principal
│   ├── page.tsx                       # Landing + formulario
│   └── globals.css                    # Estilos Tailwind
├── data/                               # Almacenamiento JSON (auto-creado)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🧪 Testear el Prototipo

### Problemas de Ejemplo para Probar

**Tecnología:**
```
Necesito automatizar el proceso de atención al cliente de mi e-commerce.
Actualmente recibimos ~200 consultas/día por email y respondemos manualmente.
Queremos una solución que use IA para responder automáticamente las preguntas
frecuentes pero que derive las complejas a humanos.
```

**Negocios:**
```
Quiero lanzar un producto SaaS B2B pero no sé cómo validar la idea antes de
invertir en desarrollo. Tengo €5,000 de presupuesto y 3 meses de runway.
¿Cuál es la mejor estrategia para validar y conseguir los primeros 10 clientes?
```

**Productividad:**
```
Soy freelancer y gestiono 5-8 proyectos simultáneos para diferentes clientes.
Pierdo mucho tiempo cambiando de contexto y se me olvidan tareas. Necesito un
sistema de organización que funcione sin agregar complejidad.
```

## 🎯 Métricas a Observar

Durante el testing, registra:

- ✅ Tiempo de respuesta Claude API (~30-60 segundos normal)
- ✅ Calidad de preguntas generadas (¿son relevantes?)
- ✅ Calidad de solución gratis (¿genera valor?)
- ✅ Calidad de solución premium (¿justifica €29?)
- ✅ Errores o bugs
- ✅ UX: ¿flujo claro y intuitivo?

## 🐛 Troubleshooting

### Error: "ANTHROPIC_API_KEY not found"
- Asegúrate de crear archivo `.env` en la raíz del proyecto
- Verifica que la key empiece con `sk-ant-api03-`

### Error: "Cannot find module @anthropic-ai/sdk"
```bash
npm install
```

### La página está en blanco
- Verifica que `npm run dev` esté corriendo
- Revisa la consola del navegador (F12) por errores
- Revisa la terminal por errores de Next.js

### "No se pudo generar la solución"
- Verifica que la Anthropic API key sea válida
- Revisa los logs en la terminal
- Intenta con un problema más simple primero

## 💰 Costos Estimados

Con Anthropic Claude Opus 4.5:
- Input: $15 per million tokens
- Output: $75 per million tokens

Por consulta (estimado):
- Clasificación: ~1,000 tokens input + 500 output = $0.05
- Solución: ~2,000 tokens input + 3,000 output = $0.26

**Total por consulta: ~$0.31**

Con 50 consultas de testing: ~$15.50

## 🚀 Próximos Pasos

### Para Validación
1. Testear con 10 problemas reales diversos
2. Recopilar feedback de 5-10 usuarios
3. Evaluar si las soluciones valen €29
4. Decidir si proceder a MVP completo

### Para MVP Completo (si valida bien)
1. Migrar storage a Supabase
2. Implementar pagos con Stripe
3. Sistema de emails con Resend
4. Dashboard de usuario
5. Follow-up questions
6. Analytics (Plausible)
7. Deploy a producción en Vercel

## 📞 Soporte

Si tienes problemas, revisa:
1. Logs de la terminal (servidor Next.js)
2. Consola del navegador (F12)
3. Archivo `data/consultations.json` para ver consultas guardadas

## ⚠️ Limitaciones del Prototipo

Este es un prototipo de validación. NO incluye:
- ❌ Pagos reales (Stripe)
- ❌ Emails automáticos
- ❌ Database real (Supabase)
- ❌ Autenticación de usuarios
- ❌ Dashboard
- ❌ Follow-up questions
- ❌ Exportar a PDF
- ❌ Rate limiting
- ❌ Error handling robusto

Para el MVP completo, ver: `PLAN_IMPLEMENTACION_PLATAFORMA_SOLUCIONES.md`

## 🎉 ¿Listo para Testear?

```bash
npm run dev
```

Ve a http://localhost:3000 y empieza a probar!
