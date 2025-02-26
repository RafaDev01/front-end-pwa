"use server";

import webpush from "web-push";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;

webpush.setVapidDetails(
    "mailto:seuemail@exemplo.com",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

// Simula um banco de dados para armazenar inscrições de usuários
const subscriptions: PushSubscription[] = [];

export async function subscribeUser(subscription: PushSubscription) {
    subscriptions.push(subscription);
    console.log("Usuário inscrito:", subscription);
}

export async function unsubscribeUser() {
    console.log("Usuário desinscrito");
}

export async function sendNotification(message: string) {
    for (const sub of subscriptions) {
        await webpush.sendNotification(
            sub,
            JSON.stringify({ title: "Nova Notificação", body: message })
        );
    }
}
