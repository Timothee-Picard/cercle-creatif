import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/pages/index';

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'Page' })).toBeDefined();
});
