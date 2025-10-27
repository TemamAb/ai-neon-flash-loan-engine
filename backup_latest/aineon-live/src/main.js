import { createApp } from 'vue'
import App from './App.vue'

// Production initialization
const loading = document.getElementById('loading')
const app = createApp(App)

// Mount with production error handling
app.mount('#app').$nextTick(() => {
    setTimeout(() => {
        loading.style.display = 'none'
    }, 1500)
})

// Global error handler for production
app.config.errorHandler = (err, instance, info) => {
    console.error('Production Error:', err, info)
    // In production, this would send to error monitoring service
}
