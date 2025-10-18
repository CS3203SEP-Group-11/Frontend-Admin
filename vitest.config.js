import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    testTimeout: 10000, // 10 second timeout per test
    hookTimeout: 10000, // 10 second timeout for setup/teardown
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
    }
  }
});
