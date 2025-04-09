import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  const mockOnLogout = jest.fn();

  it('renders navbar title', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={mockOnLogout} />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/個案管理系統/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={mockOnLogout} />
      </BrowserRouter>
    );
    const menuItems = ['儀表板', '個案管理', '新增個案', '活動管理'];
    menuItems.forEach(item => {
      const element = screen.getByText(item);
      expect(element).toBeInTheDocument();
    });
  });
}); 