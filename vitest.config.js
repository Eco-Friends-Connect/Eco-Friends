import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  },
});
