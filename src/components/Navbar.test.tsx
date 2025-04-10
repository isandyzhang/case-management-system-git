import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('Navbar', () => {
  const theme = createTheme();

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    );
  };

  const mockOnLogout = jest.fn();

  it('renders navbar title', () => {
    renderWithProviders(<Navbar onLogout={mockOnLogout} />);
    const titleElement = screen.getByRole('heading', { name: /個案管理系統/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    renderWithProviders(<Navbar onLogout={mockOnLogout} />);
    const menuItems = ['儀表板', '個案管理', '新增個案', '活動管理'];
    menuItems.forEach(item => {
      const element = screen.getByText(item);
      expect(element).toBeInTheDocument();
    });
  });

  it('renders navbar with correct menu items', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={mockOnLogout} />
      </BrowserRouter>
    );

    // 檢查標題
    expect(screen.getByText('個案管理系統')).toBeInTheDocument();

    // 檢查菜單項
    expect(screen.getByText('儀表板')).toBeInTheDocument();
    expect(screen.getByText('個案管理')).toBeInTheDocument();
    expect(screen.getByText('新增個案')).toBeInTheDocument();
    expect(screen.getByText('活動管理')).toBeInTheDocument();
  });
});