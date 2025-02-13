import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TableConfigurator } from '../components/table-configurator/TableConfigurator';

describe('TableConfigurator', () => {
  it('renders without crashing', () => {
    render(<TableConfigurator />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('switches between tableware and meals modes', async () => {
    render(<TableConfigurator />);

    // Wait for loading to complete
    await screen.findByText('Tableware');

    // Test mode switching
    const mealsButton = screen.getByText('Meals');
    fireEvent.click(mealsButton);
    expect(mealsButton).toHaveClass('bg-blue-500');
  });
});
