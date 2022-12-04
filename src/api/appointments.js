import useFetch from '../hooks/useFetch';

import {BASE_URL} from './client';

export const getMyAppointments = () => {
  const {loading, data, error} = useFetch(
    `${BASE_URL}api/v1/appointments/my-appointments/`,
  );
  return {loading, data, error};
};
