import PushNotificationManager from "../components/PushNotificationManager";

export default function Home() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Notificações Push no PWA</h1>
      <p>Gerencie sua inscrição e envie notificações push.</p>
      <PushNotificationManager />
    </main>
  );
}
