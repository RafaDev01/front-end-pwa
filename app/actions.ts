'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

let subscription: webpush.PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
    const subJson = sub.toJSON(); // Converte o objeto para JSON

    if (!subJson.keys) {
        throw new Error('Subscription keys are missing')
    }

    subscription = {
        endpoint: sub.endpoint,
        keys: {
            p256dh: subJson.keys.p256dh!,
            auth: subJson.keys.auth!
        }
    } as webpush.PushSubscription; // Força a tipagem correta para web-push

    return { success: true }
}

export async function unsubscribeUser() {
    subscription = null
    return { success: true }
}

export async function sendNotification(message: string) {
    if (!subscription) {
        throw new Error('No subscription available')
    }

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: 'Test Notification',
                body: message,
                icon: '/icon.png',
            })
        )
        return { success: true }
    } catch (error) {
        console.error('Error sending push notification:', error)
        return { success: false, error: 'Failed to send notification' }
    }
}
