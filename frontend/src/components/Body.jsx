import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import NavBar from './NavBar';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  // Function to fetch user data
  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(`/api/v1/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      console.log('Please login');
      navigate('/app/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
