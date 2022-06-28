import React from 'react';
import { render } from '@testing-library/react';
import Menu from './index';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { getUrlBySite } from '@jest/globals';

describe('<Menu />', () => {
  it('the first link must be home and must have the class defined', () => {
    let { container } = render(<Menu />);
    expect(
      container.firstChild.getElementsByClassName('line pb1 mr2 ')[0]
        .textContent
    ).toBe('INICIO');
  });
  it('check active class in sectionUri by mock test props', () => {
    let { container } = render(<Menu />);
    expect(
      container.firstChild.getElementsByClassName('line pb1 mr2 active')[0]
        .textContent
    ).toBe('DEPORTES');
  });
  it('external links have target ,rel  & have the value property assigned', () => {
    let { container } = render(<Menu />);
    expect(
      container.firstChild.getElementsByTagName('a')[2].hasAttribute('target')
    );
    expect(
      container.firstChild.getElementsByTagName('a')[2].hasAttribute('rel')
    );
    expect(container.firstChild.getElementsByTagName('a')[2].textContent).toBe(
      'VOY DE VIAJE'
    );
  });
  it(' class default', () => {
    let { container } = render(<Menu />);
    expect(container.getElementsByTagName('nav')[0]).toHaveClass(
      'main-navigation ajuste-1440 px2'
    );
  });
});
