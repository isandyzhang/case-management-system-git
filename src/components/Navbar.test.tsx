import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('Navbar', () => {
  const theme = createTheme();
  const mockOnLogout = jest.fn();

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    );
  };

  it('renders all required elements', () => {
    renderWithProviders(<Navbar onLogout={mockOnLogout} />);
    
    // 檢查標題
    expect(screen.getByRole('heading', { name: /個案管理系統/i })).toBeInTheDocument();
    
    // 檢查所有菜單項
    const menuItems = ['儀表板', '個案管理', '新增個案', '活動管理'];
    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});