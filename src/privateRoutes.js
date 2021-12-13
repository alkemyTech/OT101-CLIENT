import BackofficeHome from './pages/backoffice/BackofficeHome';
import BackofficeActivities from './pages/backoffice/BackofficeActivities';
import BackofficeCategories from './pages/backoffice/BackofficeCategories';
import BackofficeContacts from './pages/BackofficeContacts';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import FeedIcon from '@mui/icons-material/Feed';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';

/*

Routes settings:
  name: Name of the route, if not set will not show
  path: Route pathname
  element: Route Component
  protect: If set true, the Route will be wrapped with a RouteProtection component and will not show in public header
  roles: Array of roles, will be pass to the RouteProtection
  icon: Icon to show in sidebar
*/

const privateRoutes = [
  {
    name: 'Inicio',
    path: '/backoffice',
    element: <BackofficeHome />,
    protect: true,
    roles: ['admin', 'user'],
    icon: <HomeIcon />,
  },
  {
    name: 'Categorías',
    path: 'categories',
    element: <BackofficeCategories />,
    protect: true,
    roles: ['admin'],
    icon: <CategoryIcon />,
  },
  {
    name: 'Contactos',
    path: 'contacts',
    element: <BackofficeContacts />,
    protect: true,
    roles: ['admin'],
    icon: <ContactsIcon />,
  },
  {
    name: 'Miembros',
    path: 'members',
    element: <BackofficeActivities />,
    protect: true,
    roles: ['admin', 'user'],
    icon: <GroupIcon />,
  },
  {
    name: 'Novedades',
    path: 'news',
    element: <BackofficeActivities />,
    protect: true,
    roles: ['admin'],
    icon: <FeedIcon />,
  },
  {
    name: 'Organización',
    path: 'activities',
    element: <BackofficeActivities />,
    protect: true,
    roles: ['admin'],
    icon: <BusinessIcon />,
  },
  {
    name: 'Testimonios',
    path: 'testimonials',
    element: <BackofficeActivities />,
    protect: true,
    roles: ['admin'],
    icon: <MessageIcon />,
  },
  {
    name: 'Usuarios',
    path: 'users',
    element: <BackofficeActivities />,
    protect: true,
    roles: ['admin'],
    icon: <AccountCircleIcon />,
  },
];

export default privateRoutes;