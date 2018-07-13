import React from 'react';

export const Aux = ({children}) => children;

export default ({children}) => {
  return children.split(' ').reduce((ac, next) => <Aux>{ac}&nbsp;{next}</Aux>);
}
