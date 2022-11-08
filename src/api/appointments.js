import useFetch from '../hooks/useFetch';

const url = 'https://check-me-backend.herokuapp.com/api/v1/appointments';

export const getMyAppointments = () => {
  const {loading, data, error} = useFetch(`${url}/my-appointments/`);
  return {loading, data, error};
};
