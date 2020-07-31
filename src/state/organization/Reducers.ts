import { CREATE_PARCEL_WALLET } from './Constants';

export default function OrganizationReducer(state: any, action: any) {
  console.log('action:', action);
  console.log('state:', state);
  switch (action.type) {
    case CREATE_PARCEL_WALLET:
      return [
        ...state,
        {
          parcelWalletAddress: action.payload,
        },
      ];
  }
}
