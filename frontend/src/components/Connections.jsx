import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  // Get connections directly from Redux store
  const connections = useSelector(store => store.connection) || [];

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const filteredConnections = connections.filter(connection =>
    `${connection.firstName} ${connection.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Your Connections
            </h1>
            <p className="text-base-content/70">{connections.length} professional connections</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search connections..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-3.5 text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Connections Grid */}
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
          ) : filteredConnections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map(connection => (
                <div
                  key={connection._id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 border border-base-300/20"
                >
                  <div className="card-body p-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                          {connection.photoUrl ? (
                            <img
                              src={connection.photoUrl}
                              alt={`${connection.firstName} ${connection.lastName}`}
                              className="w-full h-full object-cover rounded-full"
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = '';
                              }}
                            />
                          ) : (
                            <span className="text-2xl font-medium text-primary-content/80 flex items-center justify-center w-full h-full">
                              {connection.firstName?.charAt(0).toUpperCase()}
                              {connection.lastName?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {connection.firstName} {connection.lastName}
                        </h3>
                        <p className="text-sm text-base-content/70">
                          {connection.age && `${connection.age} years`}{' '}
                          {connection.gender && ` • ${connection.gender}`}
                        </p>
                      </div>
                    </div>

                    {connection.about && (
                      <p className="mt-4 text-base-content/80 line-clamp-3">{connection.about}</p>
                    )}

                    {connection.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {connection.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="badge badge-outline badge-sm">
                            {skill}
                          </span>
                        ))}
                        {connection.skills.length > 4 && (
                          <span className="badge badge-ghost badge-sm">
                            +{connection.skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
                {searchTerm ? 'No connections match your search' : 'No connections yet'}
              </h3>
              <p className="mt-1 text-base-content/60">
                {searchTerm
                  ? 'Try adjusting your search or filter'
                  : 'Start building your network by connecting with others'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
