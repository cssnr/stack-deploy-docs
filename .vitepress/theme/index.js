import DefaultTheme from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'

import YouTubeEmbed from './components/YouTubeEmbed.vue'

// noinspection JSUnusedGlobalSymbols
export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        app.component('YouTubeEmbed', YouTubeEmbed)
    },
}
