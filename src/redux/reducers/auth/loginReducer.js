export const login = (state = { userRole: 'admin' }, action) => {
  switch (action.type) {
    case 'CHANGE_ROLE': {
      return { ...state, userRole: action.userRole };
    }
    default: {
      return state;
    }
  }
};
