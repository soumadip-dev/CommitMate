import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const requests = useSelector(store => store.request?.data) || [];
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const reviewRequest = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/connection/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      showToast(
        `Request ${status === 'match' ? 'accepted' : 'declined'} successfully!`,
        'success'
      );
      fetchRequests();
    } catch (err) {
      console.error(err.message);
      showToast('Failed to process request. Please try again.', 'error');
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
    } catch (err) {
      console.error(err.message);
      showToast('Failed to load requests. Please refresh the page.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Toast Notification */}
      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert alert-${toast.type}`}>
            <div>
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Connection Requests
            </h1>
            <p className="text-base-content/70">
              {requests.length} pending requests
            </p>
          </div>

          {/* Requests Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card bg-base-200 shadow-md">
                  <div className="card-body p-6">
                    <div className="flex items-center gap-4">
                      <div className="skeleton w-16 h-16 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-3/4"></div>
                        <div className="skeleton h-4 w-1/2"></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-5/6"></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton h-6 w-16"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : requests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map(request => {
                const user = request.fromUserId || {};
                return (
                  <div
                    key={request._id}
                    className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 border border-base-300/20"
                  >
                    <div className="card-body p-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                            {user?.photoUrl ? (
                              <img
                                src={user.photoUrl}
                                alt={`${user?.firstName || ''} ${
                                  user?.lastName || ''
                                }`}
                                className="w-full h-full object-cover rounded-full"
                                onError={e => {
                                  e.target.onerror = null;
                                  e.target.parentElement.classList.remove(
                                    'from-primary/20',
                                    'to-secondary/20'
                                  );
                                }}
                              />
                            ) : (
                              <span className="text-2xl font-medium text-primary-content/80 flex items-center justify-center w-full h-full">
                                {user?.firstName?.charAt(0)?.toUpperCase()}
                                {user?.lastName?.charAt(0)?.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            {user?.firstName} {user?.lastName}
                          </h3>
                          <p className="text-sm text-base-content/70">
                            {user?.age && `${user.age} years`}{' '}
                            {user?.gender && ` • ${user.gender}`}
                          </p>
                        </div>
                      </div>

                      {user?.about && (
                        <p className="mt-4 text-base-content/80 line-clamp-3">
                          {user.about}
                        </p>
                      )}

                      {user?.skills?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {user.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-outline badge-sm"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.skills.length > 4 && (
                            <span className="badge badge-ghost badge-sm">
                              +{user.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-6 flex gap-3">
                        <button
                          className="btn btn-primary btn-sm flex-1"
                          onClick={() => reviewRequest(request._id, 'match')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-outline btn-sm flex-1"
                          onClick={() => reviewRequest(request._id, 'reject')}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-base-content/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-base-content/80">
                No pending requests
              </h3>
              <p className="mt-1 text-base-content/60">
                When you receive connection requests, they'll appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
