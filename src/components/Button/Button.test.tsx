import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Hello Siklo</Button>);
    expect(screen.getByRole('button', { name: 'Hello Siklo' })).toBeInTheDocument();
  });
});
