import DefaultTheme, { VPBadge } from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'

import Contributors from './components/Contributors.vue'
import YouTubeEmbed from './components/YouTubeEmbed.vue'

// noinspection JSUnusedGlobalSymbols
export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        app.component('Badge', VPBadge)
        app.component('Contributors', Contributors)
        app.component('YouTubeEmbed', YouTubeEmbed)
    },
}
