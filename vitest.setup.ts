import { cleanup } from '@testing-library/react';
import { expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
