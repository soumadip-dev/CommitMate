import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed, removeUserFromFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (error) {
      console.error('Failed to fetch feed:', error.message);
    }
  };

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/connection/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      // Move to next profile if available
      if (currentIndex < feed.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to send request:', error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-center">
          <div className="loading loading-spinner text-primary w-16 h-16"></div>
          <p className="mt-4 text-lg text-base-content">Loading profiles...</p>
        </div>
      </div>
    );
  }

  const currentProfile = feed[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100">
      {/* Card Stack Indicator */}
      <div className="mb-4 text-base-content/70">
        {currentIndex + 1} of {feed.length}
      </div>

      {/* Main Profile Card */}
      <UserCard profile={currentProfile} />

      {/* Action Buttons */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-10 z-10">
        <button
          className="btn btn-circle btn-outline w-16 h-16 text-2xl shadow-lg border-2 border-error hover:bg-error/20 hover:border-error text-error transition-transform hover:scale-105 active:scale-95"
          aria-label="Pass"
          onClick={() => handleSendRequest('pass', currentProfile._id)}
        >
          ✕
        </button>
        <button
          className="btn btn-circle w-16 h-16 text-2xl shadow-lg border-2 border-primary bg-primary hover:bg-primary/90 hover:border-primary text-primary-content transition-transform hover:scale-105 active:scale-95"
          aria-label="Like"
          onClick={() => handleSendRequest('like', currentProfile._id)}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default Feed;
