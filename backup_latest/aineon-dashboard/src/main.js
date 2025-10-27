import { createApp } from 'vue'
import App from './App.vue'

// Hide loading screen when app is mounted
const loading = document.getElementById('loading')
const app = createApp(App)

app.mount('#app').$nextTick(() => {
    setTimeout(() => {
        loading.style.display = 'none'
    }, 1000)
})
