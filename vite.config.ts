import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/note-taking-CRUD-filtering-tags-with-CI-CD/', // Update this to match your repository name
  plugins: [react()],
  test: {
    globals : true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts']
  }
})