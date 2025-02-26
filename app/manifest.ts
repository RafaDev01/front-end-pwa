import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Next.js PWA', // Nome completo do app
        short_name: 'NextPWA', // Nome curto (aparece na tela inicial)
        description: 'A Progressive Web App built with Next.js', // Descrição do app
        start_url: '/', // Página inicial quando aberto como PWA
        display: 'standalone', // Modo de exibição ('standalone' faz parecer um app nativo)
        background_color: '#ffffff', // Cor de fundo do splash screen
        theme_color: '#000000', // Cor do tema (usada na barra de status do navegador)
        icons: [
            {
                src: '/icon-192x192.png', // Ícone de 192x192px
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png', // Ícone de 512x512px
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
