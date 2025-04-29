import React from 'react';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {
  const user = useSelector(store => store.user);
  // console.log(user);

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
