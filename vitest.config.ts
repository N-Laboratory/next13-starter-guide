/* eslint-disable @typescript-eslint/no-unsafe-call */
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    // setupFiles: './src/unit-test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{tsx,js,ts}'],
      all: true,
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
})