import { LOGIN, LOGOUT, SET_ACTIVE_NAV } from './actions';

const initialState = {
    isLoggedIn: false,
    user: null,
};

const initialPage = {
    activeNavItem: 'learner',
  };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};

export const navReducer = (state = initialPage, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_NAV':
        return {
          ...state,
          activeNavItem: action.payload,
        };
      default:
        return state;
    }
  };
