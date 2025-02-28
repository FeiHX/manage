import React from 'react';
import { render } from '@testing-library/react';
import NoPermission from '../sandbox/nopermission/NoPermission';
describe('NoPermission Test', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<NoPermission />);
    expect(asFragment()).toMatchSnapshot();
  });
});
