import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Greeting from './Greeting';

describe('Greeting', () => {
  it('greets the given name', () => {
    render(<Greeting name="Pomo" />);
    expect(
      screen.getByRole('heading', { name: 'Hello, Pomo!     ' })
    ).toBeInTheDocument();
  });
});
