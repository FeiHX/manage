import React from 'react';
import  App  from './App';
import NewsSandBox from './views/sandbox/NewsSandBox.js'
import Login from './views/login/Login';
import News from './views/news/News';
import Detail from './views/news/Detail';
import { render } from './test/test-utils';
import { screen } from "@testing-library/react";
import IndexRouter from './router/IndexRouter';


jest.mock('./views/sandbox/NewsSandBox.js');
jest.mock('./views/login/Login');
jest.mock('./views/news/News');
jest.mock('./views/news/Detail');

describe('<IndexRouter />', () => {
  test('renders NewsSandBox page on default route', () => {
    // Arrange
    (NewsSandBox).mockImplementation(() => <div>NewsSandBoxMock</div>);

    // Act
    render(<IndexRouter />);

    // Assert
    expect(screen.getByText('NewsSandBoxMock')).toBeTruthy();
  });


  test('renders login page for login route', () => {
    // Arrange
    (Login).mockImplementation(() => (
      <div>LoginMock</div>
    ));

    // Act
    render(<IndexRouter />, { initialRoute: '/login' });

    // Assert
    expect(screen.getByText('LoginMock')).toBeTruthy();
  });
  test('renders otherlogin page for otherlogin route', () => {
    // Arrange
    (Login).mockImplementation(() => (
      <div>OtherloginMock</div>
    ));

    // Act
    render(<IndexRouter />, { initialRoute: '/otherlogin' });

    // Assert
    expect(screen.queryByText('OtherloginMock')).toBeTruthy();
  });
  test('renders News page for News route', () => {
    // Arrange


    (News).mockImplementation(() => (
      <div>NewsMock</div>
    ));

    // Act
    render(<IndexRouter />, { initialRoute: '/news' });

    // Assert
    expect(screen.getByText('NewsMock')).toBeTruthy();
  });
  test('renders the Detail page for Detail route', () => {
    // Arrange
    (Detail).mockImplementation(() => (
      <div>DetailMock</div>
    ));

    // Act
    render(<IndexRouter />, { initialRoute: '/detail/:id' });

    // Assert
    expect(screen.queryByText('DetailMock')).toBeTruthy();
  });


});

