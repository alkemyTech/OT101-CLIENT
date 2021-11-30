import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    isOpen: false,
  },
  reducers: {
    confirm: state => {
      MySwal.fire(
        'Acción confirmada',
        '',
        'success'
    )},
    cancel: state => {
      MySwal.fire(
        'Acción cancelada',
        '',
        'error'
      )},
    }
});

export const { confirm, cancel } = alertSlice.actions;

export const selectAlert = state => state.alerts.value;

export default alertSlice.reducer;
