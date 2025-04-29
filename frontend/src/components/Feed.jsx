import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed, removeUserFromFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
      setHasLoaded(true);
    } catch (error) {
      console.error('Failed to fetch feed:', error.message);
      setHasLoaded(true);
    }
  };

  const handleSendRequest = async (status, userId) => {
    if (isAnimating) return;

    setAnimationType(status);
    setIsAnimating(true);

    try {
      await axios.post(
        `${BASE_URL}/connection/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      setTimeout(() => {
        dispatch(removeUserFromFeed(userId));
        setIsAnimating(false);
        // Reset to first profile if we've reached the end
        if (currentIndex >= feed.length - 1) {
          setCurrentIndex(0);
        }
      }, 300);
    } catch (error) {
      console.error('Failed to send request:', error.message);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // No users to show (after loading)
  if (hasLoaded && (!feed || feed.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-center p-6 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No profiles to show
          </h2>
          <p className="text-base-content/70 mb-6">
            We've run out of potential matches in your area. Try adjusting your
            preferences or check back later!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (!hasLoaded) {
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

      {/* Main Profile Card with Animation */}
      <div
        className={`relative w-full max-w-md ${
          isAnimating
            ? animationType === 'like'
              ? 'animate-like'
              : 'animate-pass'
            : ''
        }`}
      >
        <UserCard profile={currentProfile} />
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-10 z-10">
        <button
          className={`btn btn-circle btn-outline w-16 h-16 text-2xl shadow-lg border-2 border-error hover:bg-error/20 hover:border-error text-error transition-all duration-200 ${
            isAnimating ? 'opacity-70 scale-90' : 'hover:scale-105'
          } active:scale-95`}
          aria-label="Pass"
          onClick={() => handleSendRequest('pass', currentProfile._id)}
          disabled={isAnimating}
        >
          ✕
        </button>
        <button
          className={`btn btn-circle w-16 h-16 text-2xl shadow-lg border-2 border-primary bg-primary hover:bg-primary/90 hover:border-primary text-primary-content transition-all duration-200 ${
            isAnimating ? 'opacity-70 scale-90' : 'hover:scale-105'
          } active:scale-95`}
          aria-label="Like"
          onClick={() => handleSendRequest('like', currentProfile._id)}
          disabled={isAnimating}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default Feed;
