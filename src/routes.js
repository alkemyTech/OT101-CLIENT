import About from './pages/About';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import News from './pages/News';
import Testimonials from './pages/Testimonials';
import Register from './pages/RegisterForm';
import EditOrganization from './pages/EditOrganization';
import BackofficeActivities from './pages/BackofficeActivities';
import Login from './components/LoginForm'

import ActivityDetails from './pages/ActivityDetails';

import BackofficeHome from './pages/backoffice/BackofficeHome';
import BackofficeDummy from './pages/backoffice/BackofficeDummy';
import BackofficeCategories from './pages/BackofficeCategories';
import BackofficeContacts from './pages/BackofficeContacts';
import BackofficeNews from './pages/BackofficeNews';
import BackofficeTestimonials from './pages/BackofficeTestimonials';
import Profile from './pages/Profile';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import FeedIcon from '@mui/icons-material/Feed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import BackofficeMembers from './pages/BackofficeMembers';

/* Routes settings
  name: Name of the route, if not set will not show
  path: Route pathname
  element: Route Component
*/
const publicRoutes = [
  { name: 'Inicio', path: '/', element: <Home /> },
  { name: 'Sobre nosotros', path: '/about', element: <About /> },
  { name: 'Actividades', path: '/Actividades', element: <Activities /> },
  { path: '/Actividades/:id', element: <ActivityDetails /> },
  { name: 'Novedades', path: '/Novedades', element: <News /> },
  { name: 'Testimonios', path: '/testimonials', element: <Testimonials /> },
  { name: 'Contacto', path: '/contact', element: <Contact /> },
  { path: '/profile', element: <Profile /> },
  { name: 'Contribuir', path: '/contribute', element: <Contribute /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login />},
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
    name: 'Inicio',
    path: '/backoffice',
    element: <BackofficeHome />,
    roles: ['admin', 'user'],
    icon: <HomeIcon />,
  },
  {
    name: 'Actividades',
    path: 'activities',
    element: <BackofficeActivities />,
    roles: ['admin'],
    icon: <FormatListBulletedIcon />,
  },
  {
    name: 'Categorías',
    path: 'categories',
    element: <BackofficeCategories />,
    roles: ['admin'],
    icon: <CategoryIcon />,
  },
  {
    name: 'Contactos',
    path: '/backoffice/contacts',
    element: <BackofficeContacts />,
    roles: ['admin'],
    icon: <ContactsIcon />,
  },
  {
    name: 'Miembros',
    path: 'members',
    element: <BackofficeMembers />,
    roles: ['admin'],
    icon: <AccountTreeIcon />,
  },
  {
    name: 'Novedades',
    path: 'news',
    element: <BackofficeNews />,
    roles: ['admin'],
    icon: <FeedIcon />,
  },
  {
    name: 'Organización',
    path: '/backoffice/edit-organization',
    element: <EditOrganization />,
    roles: ['admin'],
    icon: <BusinessIcon />,
  },
  {
    name: 'Testimonios',
    path: 'testimonials',
    element: <BackofficeTestimonials />,
    roles: ['admin'],
    icon: <MessageIcon />,
  },
  {
    name: 'Usuarios',
    path: 'users',
    element: <BackofficeDummy />,
    roles: ['admin'],
    icon: <GroupsIcon />,
  },
  {
    name: 'Mi Perfil',
    path: 'profile',
    element: <BackofficeDummy />,
    roles: ['admin', 'user'],
    icon: <AccountCircleIcon />,
  }
];

export { publicRoutes, backofficeRoutes };
