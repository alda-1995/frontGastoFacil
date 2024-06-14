import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { myCustomLightTheme } from '@/theme/CustomTheme'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme
        }
    },
    defaults: {
        VBtn: {},
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            rounded: 'lg'
        },
        VTooltip: {
            // set v-tooltip default location to top
            location: 'top'
        }
    }
})