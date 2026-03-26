import { jwtDecode } from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setToken, logoutUser, fetchCurrentUser } from '../../redux/actions';
import store from '../../redux/store';
import history from '../../utils/history';

export default () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwtDecode(localStorage.jwtToken);
    store.dispatch(setToken(decoded));
    store.dispatch(fetchCurrentUser());
    // store.dispatch(setCurrentUser(user));
    // check if token is expired
    // if so, redirect to login
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser(history));
      window.location.href = '/';
    }
  }
};
