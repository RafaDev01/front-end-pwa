import { useEffect, useState } from "react";
import PushNotificationManager from "./PushNotificationManager";

declare global {
    interface BeforeInstallPromptEvent extends Event {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
    }
}

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window));

        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            console.log("✅ beforeinstallprompt disparado!"); // Debugging
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    if (isStandalone) {
        console.log("⏩ App já está instalado, não exibe o botão.");
        return null;
    }

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.log("❌ Nenhum prompt de instalação disponível.");
            return;
        }

        console.log("📢 Exibindo prompt de instalação...");
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`🔹 Usuário escolheu: ${outcome}`);

        setDeferredPrompt(null);
    };

    return (
        <div>
            <h3>Instalar Aplicativo</h3>
            {deferredPrompt && (
                <button onClick={handleInstallClick}>Adicionar à Tela Inicial</button>
            )}
            {isIOS && (
                <p>
                    Para instalar este app no seu iPhone, toque no botão de compartilhamento
                    <span role="img" aria-label="ícone de compartilhamento"> ⎋ </span>
                    e depois em &quot;Adicionar à Tela Inicial&quot;
                    <span role="img" aria-label="ícone de adicionar"> ➕ </span>.
                </p>
            )}
        </div>
    );
}

export default function Page() {
    return (
        <div>
            <PushNotificationManager />
            <InstallPrompt />
        </div>
    );
}
