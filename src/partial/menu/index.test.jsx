import React from 'react';
import { render } from '@testing-library/react';
import Menu from './index';

describe('<Menu />', () => {
  it(' class default', () => {
    let { container } = render(<Menu />);
    expect(container.getElementsByTagName('nav')[0]).toHaveClass(
      'main-navigation ajuste-1440 px2'
    );
  });
  it('if receive props  from globalContent sectionSlug add the class defined', () => {
    let { container } = render(<Menu />);
    expect(container.getElementsByTagName('nav')[0]).toHaveClass(
      'main-navigation ajuste-1440 px2 section-deportes'
    );
  });
  it('the first link must be home and must have the class defined', () => {
    let { container } = render(<Menu />);
    expect(
      container.firstChild.getElementsByClassName('line pb1 mr2 ')[0]
        .textContent
    ).toBe('FUTBOL');
  });
  it('check active class in sectionUri by mock test props', () => {
    let { container } = render(<Menu />);
    let activeLink = container.firstChild.getElementsByClassName(
      'line pb1  active'
    )[0];
    expect(activeLink.textContent).toBe('TALLERES');
  });
  it('external links have target ,rel  & have the value property assigned', () => {
    let { container,debug } = render(<Menu />);
    let externalLink = container.firstChild.getElementsByTagName('a')[3];
    expect(externalLink.hasAttribute('target'));
    expect(externalLink.hasAttribute('rel'));
    let externalName = container.firstChild.getElementsByClassName('line pb1')[2];
    expect(externalName.textContent).toBe('VOY DE VIAJE');
    // debug(container)
  });
});
