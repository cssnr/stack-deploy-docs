import DefaultTheme, { VPBadge } from 'vitepress/theme'
import './custom.css'
import 'virtual:group-icons.css'

import StackTable from './components/StackTable.vue'
import YouTubeEmbed from './components/YouTubeEmbed.vue'

import CopyButton from '@cssnr/vitepress-plugin-copybutton'
import '@cssnr/vitepress-plugin-copybutton/style.css'

import Contributors from '@cssnr/vitepress-plugin-contributors'
import '@cssnr/vitepress-plugin-contributors/style.css'
import contributors from '../contributors.json'

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols
/** @type {import('vitepress').Theme} */
export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        app.component('Badge', VPBadge)

        app.component('StackTable', StackTable)
        app.component('YouTubeEmbed', YouTubeEmbed)

        app.component('CB', CopyButton)

        app.component('Contributors', Contributors)
        app.config.globalProperties.$contributors = contributors
    },
}
