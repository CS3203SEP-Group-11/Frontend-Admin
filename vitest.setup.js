import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensure DOM is cleaned up and mocks restored after each test to avoid open handles
afterEach(() => {
	cleanup();
	// restore any vi mocks/spies
	try { vi.restoreAllMocks(); } catch (e) { /* vi may be unavailable during static analysis */ }
});
