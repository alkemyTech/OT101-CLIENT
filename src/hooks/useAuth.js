import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../features/user/userSlice';
import * as authService from '../services/authService';

export default function useAuth() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLogged, isTokenVerified } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLogged) return;

    setIsLoading(true);
    authService
      .auth()
      .then((data) => {
        dispatch(userActions.login(data));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const logout = () => {
    if (!isLogged) return;

    setIsLoading(true);
    authService.logout();
    dispatch(userActions.logout());
    setIsLoading(false);
  };

  const login = async (data) => {
    if (isLogged) return;

    setIsLoading(true);
    const userData = await authService.login(data);
    dispatch(userActions.login(userData));
    setIsLoading(false);
  };

  return { data, isTokenVerified, isLogged, login, logout, isLoading };
}
