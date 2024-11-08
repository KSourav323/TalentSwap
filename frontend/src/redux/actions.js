export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT'; 
export const SET_ACTIVE_NAV = 'SET_ACTIVE_NAV'; 

export const login = (userData) => ({
    type: LOGIN,
    payload: userData,
});

export const logout = () => ({
    type: LOGOUT,
});

export const setActiveNav  = (navItem) => ({
    type: SET_ACTIVE_NAV,
    payload: navItem
});
