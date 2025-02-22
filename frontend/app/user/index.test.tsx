import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserPage from '@/app/user/page';

test('UserPage', () => {
  render(<UserPage />);
  expect(screen.getByRole('heading', { level: 1, name: 'Page' })).toBeDefined();
});
