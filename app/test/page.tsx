export default function TestPage() {
  return (
    <div style={{ padding: '50px', background: 'white' }}>
      <h1 style={{ fontSize: '48px', color: 'black' }}>
        ✅ TEST PAGE FUNCIONA
      </h1>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>
        Si ves esto, el servidor está funcionando correctamente.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px' }}>
        <li>✅ HTML rendering: OK</li>
        <li>✅ Next.js: OK</li>
        <li>✅ Deployment: OK</li>
      </ul>
      <a href="/" style={{ display: 'block', marginTop: '30px', color: 'blue', fontSize: '20px' }}>
        ← Volver a home
      </a>
    </div>
  );
}
