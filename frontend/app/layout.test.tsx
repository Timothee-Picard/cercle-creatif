import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

vi.mock('next/font/google', () => ({
  Geist: vi.fn(() => ({ variable: '--font-geist-sans' })),
  Geist_Mono: vi.fn(() => ({ variable: '--font-geist-mono' })),
}))

test('rendered', () => {
  render(
    <RootLayout>
      <div>Test Content</div>
    </RootLayout>
  )

  const body = document.querySelector('body')

  expect(body).not.toBeNull()
  expect(body?.classList).toContain('--font-geist-sans')
  expect(body?.classList).toContain('--font-geist-mono')
  expect(body?.className).toContain('antialiased')

  expect(screen.getByText('Test Content')).toBeDefined()
})
