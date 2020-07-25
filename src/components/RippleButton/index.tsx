import React from 'react';
import { Button } from 'reactstrap';
import Ripples from 'react-ripples';

export const RippleButton = ({ rippleColor, during, block, ...rest }: any) => (
  <Ripples
    color={rippleColor ? rippleColor : 'rgba(255, 255, 255, .5)'}
    during={during}
    className={`${block ? 'd-block' : ''}`}
  >
    <Button {...rest} />
  </Ripples>
);
