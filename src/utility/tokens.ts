import { useMemo } from 'react';
import { ChainId, WETH, Token } from '@uniswap/sdk';

export const DEFAULT_TOKENS = [
  ...Object.values(WETH),

  new Token(
    ChainId.RINKEBY,
    '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
    18,
    'DAI',
    'Dai Stablecoin'
  ),
  new Token(
    ChainId.RINKEBY,
    '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    18,
    'USDC',
    'Usdc Stablecoin'
  ),
];

export function useTokens() {
  return [
    useMemo(() => {
      return DEFAULT_TOKENS;
    }, []),
  ];
}
