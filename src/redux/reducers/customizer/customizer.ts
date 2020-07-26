import themeConfig from '../../../configs/themeConfig';

const customizerReducer = (state = themeConfig, action: any) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, theme: action.mode };
    case 'COLLAPSE_SIDEBAR':
      return { ...state, sidebarCollapsed: action.value };
    case 'CHANGE_NAVBAR_TYPE':
      return { ...state, navbarType: action.style };

    default:
      return state;
  }
};

export default customizerReducer;
