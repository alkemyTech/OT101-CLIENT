import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { MenuItem, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearData } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { logout as doLogout } from '../services/authService';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(clearData());
    doLogout();
    handleClose();
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt={`user ${user.data.id} image`} src={user.data.image} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to={'/backoffice'} sx={{ color: '#DB5752', fontFamily: 'Signika' }}>Administracion del sitio</MenuItem>
        <MenuItem component={Link} to={'/profile'} sx={{ color: '#FAFA88', fontFamily: 'Signika' }}>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: '#9AC9FB', fontFamily: 'Signika' }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}