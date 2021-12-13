import About from './pages/About';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import News from './pages/News';
import Testimonials from './pages/Testimonials';
import BackofficeContacts from './pages/BackofficeContacts';
import Register from './pages/Register';

/* Routes settings
  name: Name of the route, if not set will not show
  path: Route pathname
  element: Route Component
*/
const publicRoutes = [
  { name: 'Inicio', path: '/', element: <Home /> },
  { name: 'Sobre nosotros', path: '/about', element: <About /> },
  { name: 'Actividades', path: '/activities', element: <Activities /> },
  { name: 'Novedades', path: '/news', element: <News /> },
  { name: 'Testimonios', path: '/testimonials', element: <Testimonials /> },
  { name: 'Contacto', path: '/contact', element: <Contact /> },
  { name: 'Contribuir', path: '/contribute', element: <Contribute /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Error404 /> },
];

/* Routes settings
  name: Name of the route, if not set will not show
  path: Route pathname
  element: Route Component
  roles: Array of roles, will pass to the RouteProtection
*/
// Siempre protegidas con <RouteProtection/>
const backofficeRoutes = [
  {
    name: 'Backoffice',
    path: '/backoffice/contacts',
    element: <BackofficeContacts />,
    roles: ['admin'],
  },
  {
    name: 'Activities List',
    path: '/backoffice/activities',
    element: <BackofficeActivities />,
    roles: ['admin'],
  },
];

export { publicRoutes, backofficeRoutes };
