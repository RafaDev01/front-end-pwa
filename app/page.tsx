import PushNotificationManager from "../components/PushNotificationManager";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.error('Erro ao registrar SW:', err))
  })
}

export default function Home() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Notificações Push no PWA</h1>
      <p>Gerencie sua inscrição e envie notificações push.</p>
      <PushNotificationManager />
    </main>
  );
}
