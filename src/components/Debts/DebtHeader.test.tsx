import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DebtHeader from './DebtHeader';

const mockSetPhrase = vi.fn();
const mockSetClickSearch = vi.fn();

describe('DebtHeader Component', () => {
  beforeEach(() => {
    mockSetPhrase.mockClear();
    mockSetClickSearch.mockClear();
    render(<DebtHeader setPhrase={mockSetPhrase} setClickSearch={mockSetClickSearch} />);
  });

  it('renders the search input and label', () => {
    expect(screen.getByLabelText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Minimum 3 znaki')).toBeInTheDocument();
  });

  it('updates the search query and calls setPhrase on input change', () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(mockSetPhrase).toHaveBeenCalledWith('test');
  });

  it('calls setClickSearch when the search button is clicked and input has 3+ chars', async () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    await userEvent.type(inputElement, 'test123');
    fireEvent.click(screen.getByText('SZUKAJ'));
    expect(mockSetClickSearch).toHaveBeenCalledWith(true);
  });

  it('does not call setClickSearch when the search button is clicked and input has less than 3 chars', async () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    await userEvent.type(inputElement, 'te');
    fireEvent.click(screen.getByText('SZUKAJ'));
    expect(mockSetClickSearch).not.toHaveBeenCalled();
  });

  it('calls setPhrase with empty string and clears input when clear button is clicked', async () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    await userEvent.type(inputElement, 'test');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(mockSetPhrase).toHaveBeenCalledWith('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(inputElement.value).toBe('');
  });

  it('calls handleSearch on Enter key press when input has 3+ chars', async () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    await userEvent.type(inputElement, 'test123');
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(mockSetClickSearch).toHaveBeenCalledWith(true);
  });

  it('does not call handleSearch on Enter key press when input has less than 3 chars', async () => {
    const inputElement = screen.getByPlaceholderText('Minimum 3 znaki');
    await userEvent.type(inputElement, 'te');
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(mockSetClickSearch).not.toHaveBeenCalled();
  });
});