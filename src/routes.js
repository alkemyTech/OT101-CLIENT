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
  protect: If set true, the Route will be wrapped with a RouteProtection component and will not show in public header
  roles: Array of roles, will be pass to the RouteProtection
*/
const routes = [
  { name: 'Inicio', path: '/', element: <Home /> },
  { name: 'Sobre nosotros', path: '/about', element: <About /> },
  { name: 'Actividades', path: '/activities', element: <Activities /> },
  { name: 'Novedades', path: '/news', element: <News /> },
  { name: 'Testimonios', path: '/testimonials', element: <Testimonials /> },
  { name: 'Contacto', path: '/contact', element: <Contact /> },
  { name: 'Contribuir', path: '/contribute', element: <Contribute /> },
  {
    name: 'Backoffice',
    path: '/backoffice/contacts',
    element: <BackofficeContacts />,
    protect: true,
    roles: ['admin'],
  },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Error404 /> },
];

export default routes;
