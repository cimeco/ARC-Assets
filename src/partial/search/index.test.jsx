import React from 'react';
import { render } from '@testing-library/react';
import Search from './index';

it('Search: should have defined default classes and className.', () => {
  const { container } = render(<Search className="flex" />);
  expect(container.firstChild).toHaveClass('justify-center');
});

it('Input :should have defined default classes and className.', () => {
  const { container } = render(<input className='p1'/>);
  expect(container.firstChild).toHaveClass('p1');
});
it('Button :should have defined default classes and className.', () => {
  const { container } = render(<button className='btn'/>);
  console.log('CTER',container);
  expect(container.firstChild).toHaveClass('btn');
});