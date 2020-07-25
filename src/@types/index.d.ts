interface Window {
  ethereum?: {
    isMetaMask?: true;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
  };
  web3?: any;
  ipfs?: any;
}

declare module 'eth-ens-namehash';
declare module 'parcel-sdk';
