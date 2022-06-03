import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

it('must be an article HTML tag', () => {
  const { getByRole } = render(<Card />);
  expect(getByRole('article')).toBeDefined();
});

it('should have defined default classes and className.', () => {
  const { container } = render(<Card className="great-class" />);
  expect(container.firstChild).toHaveClass('article great-class');
});

it('should have overlay if imagePosition is back.', () => {
  const { container } = render(<Card imagePosition="back" />);
  expect(container.firstChild).toHaveClass('relative has-overlay');
});

it('should be vertical if imagePosition is top, bottom or back or horizontal if right, left or none.', () => {
  const { container, rerender } = render(<Card imagePosition="top" />);
  expect(container.firstChild).toHaveClass('card');
  rerender(<Card imagePosition="right" />);
  expect(container.firstChild).toHaveClass('media');
  rerender(<Card imagePosition="bottom" />);
  expect(container.firstChild).toHaveClass('card');
  rerender(<Card imagePosition="left" />);
  expect(container.firstChild).toHaveClass('media');
  rerender(<Card imagePosition="back" />);
  expect(container.firstChild).toHaveClass('card');
  rerender(<Card imagePosition="none" />);
  expect(container.firstChild).toHaveClass('media');
});

it('should have fullcard-link class if fullcardLink is true.', () => {
  const { container, rerender } = render(<Card fullCardLink={true} />);
  expect(container.firstChild).toHaveClass('full-card-link');
  rerender(<Card fullCardLink={false} />);
  expect(container.firstChild).not.toHaveClass('full-card-link');
});

it('should add class subtype if story.subtype is defined.', () => {
  const { container } = render(<Card story={{ subtype: 'test' }} />);
  expect(container.firstChild).toHaveClass('test');
});

it('should add class premium if story is premium.', () => {
  const premiumStory = { taxonomy: { tags: [{ slug: 'exclusivo' }] } };
  const { container } = render(<Card story={premiumStory} />);
  expect(container.firstChild).toHaveClass('premium');
});

it('inner container should have no-height when imagePosition is back.', () => {
  const { container } = render(<Card imagePosition="back" />);
  expect(container.getElementsByClassName('article-inner')[0]).toHaveClass(
    'no-height'
  );
});
