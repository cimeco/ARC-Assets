import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

jest.mock('./content');
jest.mock('./image');
jest.mock('./icon');

describe('<Card />', () => {
  it('must be an article HTML tag', () => {
    const { queryByRole } = render(<Card />);
    expect(queryByRole('article')).toBeDefined();
  });

  it('should have defined default classes and className.', () => {
    const { container } = render(<Card className="great-class" />);
    expect(container.firstChild).toHaveClass('article great-class');
  });

  it('should have overlay if imagePosition is back.', () => {
    const { container, queryByText } = render(<Card imagePosition="back" />);
    expect(container.firstChild).toHaveClass('relative has-overlay');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'absolute bottom-0 white'
    );
    expect(queryByText('Link')).toHaveClass('white');
  });

  it('should be vertical if imagePosition is top, bottom or back or horizontal if right, left or none.', () => {
    const { container, rerender } = render(<Card imagePosition="top" />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'card-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'card-image'
    );
    rerender(<Card imagePosition="right" />);
    expect(container.firstChild).toHaveClass('media');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'media-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'media-right'
    );
    rerender(<Card imagePosition="bottom" />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'card-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'card-image'
    );
    rerender(<Card imagePosition="left" />);
    expect(container.firstChild).toHaveClass('media');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'media-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'media-left'
    );
    rerender(<Card imagePosition="back" />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'card-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'card-image'
    );
    rerender(<Card imagePosition="none" />);
    expect(container.firstChild).toHaveClass('media');
    expect(container.getElementsByClassName('content')[0]).toHaveClass(
      'media-content'
    );
    expect(container.getElementsByClassName('article-image')[0]).toHaveClass(
      'media-none'
    );
  });

  it('should have full-card-link class if fullCardLink is true.', () => {
    const { container, rerender } = render(<Card fullCardLink={true} />);
    expect(container.firstChild).toHaveClass('full-card-link');
    rerender(<Card fullCardLink={false} />);
    expect(container.firstChild).not.toHaveClass('full-card-link');
  });

  it('should add class subtype if story.subtype is defined.', () => {
    const { container } = render(<Card story={{ subtype: 'test' }} />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should not have class premium and premium-article-tag if story is not premium.', () => {
    const premiumStory = { taxonomy: { tags: [{ slug: 'no-exclusivo' }] } };
    const { container } = render(<Card story={premiumStory} />);
    expect(container.firstChild).not.toHaveClass('premium');
    expect(
      container.getElementsByClassName('premium-article-tag')[0]
    ).not.toBeDefined();
  });

  it('should add class premium and premium article tag if story is premium.', () => {
    const premiumStory = { taxonomy: { tags: [{ slug: 'exclusivo' }] } };
    const { container } = render(<Card story={premiumStory} />);
    expect(container.firstChild).toHaveClass('premium');
    expect(
      container.getElementsByClassName('premium-article-tag')[0]
    ).toBeDefined();
  });

  it('should have inner container no-height when imagePosition is back.', () => {
    const { container } = render(<Card imagePosition="back" />);
    expect(container.getElementsByClassName('article-inner')[0]).toHaveClass(
      'no-height'
    );
  });

  it('should order partials image-content-icon when imagePosition is top, left, back or none', () => {
    const { container, rerender } = render(<Card imagePosition="top" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
    rerender(<Card imagePosition="left" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
    rerender(<Card imagePosition="back" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
    rerender(<Card imagePosition="none" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
  });
  it('should order partials content-image-icon when imagePosition is right or bottom', () => {
    const { container, rerender } = render(<Card imagePosition="right" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
    rerender(<Card imagePosition="bottom" />);
    expect(
      container.getElementsByClassName('article-inner')[0].children[0]
    ).toHaveClass('content');
    expect(
      container.getElementsByClassName('article-inner')[0].children[1]
    ).toHaveClass('image');
    expect(
      container.getElementsByClassName('article-inner')[0].children[2]
    ).toHaveClass('icon');
  });
  it('send icon properties to Icon', () => {
    const { queryByText } = render(
      <Card imagePosition="top" showIcon={true} />
    );
    expect(queryByText('Icon: showIcon: true')).toBeDefined();
    expect(queryByText('Icon: imagePosition: top')).toBeNull();
  });
});
