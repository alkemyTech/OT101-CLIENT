import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export default function RouteProtection({ children, roles }) {
  const { data, isLogged } = useSelector((state) => state.user);

  if (isLogged && (!roles || roles?.includes(data?.role?.name))) {
    return children;
  }

  return <Navigate to="/" replace={true} />;
}
