import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                order: 'order.html',
                contact: 'contact.html',
                about: 'about.html',
                review: 'review.html',
                integrity: 'integrity.html'
            }
        }
    }
})