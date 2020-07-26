export const changeMode = (mode: any) => {
  return (dispatch: any) => dispatch({ type: 'CHANGE_MODE', mode });
};

export const collapseSidebar = (value: any) => {
  return (dispatch: any) => dispatch({ type: 'COLLAPSE_SIDEBAR', value });
};

export const changeNavbarType = (style: any) => {
  return (dispatch: any) => dispatch({ type: 'CHANGE_NAVBAR_TYPE', style });
};

export const changeMenuColor = (style: any) => {
  return (dispatch: any) => dispatch({ type: 'CHANGE_MENU_COLOR', style });
};
