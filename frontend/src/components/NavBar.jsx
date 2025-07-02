import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { removeUser } from '../utils/userSlice';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const NavBar = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/v1/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/app/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar bg-base-100/95 backdrop-blur-lg sticky top-0 z-50 border-b border-base-300/20 shadow-sm px-4 sm:px-8 py-2">
      <div className="flex-1">
        {/* Logo/Brand */}
        <Link
          to="/app"
          className="btn btn-ghost px-2 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <div className="flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 bg-cover bg-center"
              style={{ backgroundImage: `url(${logo})` }}
              onError={e => {
                e.target.style.backgroundImage =
                  'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAxOGMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iIzY4ODZlNiIvPjwvc3ZnPg==)';
              }}
            ></div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-xl font-bold tracking-tighter hidden sm:inline">
              CommitMate
            </span>
          </div>
        </Link>
      </div>

      {/* GitHub Link */}
      <div className="flex-none">
        <a
          href="https://github.com/soumadip-dev/CommitMate.git"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-square hover:bg-base-200/50"
          aria-label="GitHub repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* User Section */}
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 btn btn-ghost hover:bg-base-200/50 pl-3 pr-3 py-2 rounded-full transition-all duration-200"
            >
              <div className="text-right hidden sm:block">
                <p className="font-medium text-base-content/90">{user.firstName}</p>
                <p className="text-xs text-base-content/60">Welcome back!</p>
              </div>
              <div className="avatar placeholder">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-primary/70 ring-offset-2 ring-offset-base-100">
                  {user.photoUrl ? (
                    <img
                      alt="User profile"
                      src={user.photoUrl}
                      className="w-full h-full object-cover rounded-full"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = '';
                      }}
                    />
                  ) : (
                    <span className="text-primary-content/80 font-medium text-lg">
                      {user.firstName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300/20"
            >
              <li>
                <Link to="/app/profile" className="hover:bg-base-200/50 active:bg-base-300/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/app/connections" className="hover:bg-base-200/50 active:bg-base-300/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/app/requests" className="hover:bg-base-200/50 active:bg-base-300/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Requests
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  className="text-error hover:text-error-content hover:bg-error/10 flex items-center"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
