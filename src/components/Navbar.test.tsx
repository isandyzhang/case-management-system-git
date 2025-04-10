import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';

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

  it('renders all required elements', async () => {
    renderWithProviders(<Navbar onLogout={mockOnLogout} />);
    
    // 檢查標題
    const title = await screen.findByRole('heading', { name: /個案管理系統/i });
    expect(title).toBeInTheDocument();
    
    // 檢查所有菜單項
    const menuItems = ['儀表板', '個案管理', '新增個案', '活動管理'];
    for (const item of menuItems) {
      const menuItem = await screen.findByText(item);
      expect(menuItem).toBeInTheDocument();
    }
  });
}); 