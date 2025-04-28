import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const NavBar = () => {
  const user = useSelector(store => store.user);

  return (
    <nav className="navbar bg-base-100/95 backdrop-blur-lg sticky top-0 z-50 border-b border-base-300/20 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0">
            <a className="btn btn-ghost px-2 hover:scale-105 active:scale-95 transition-transform duration-200">
              <div className="flex items-center gap-2">
                <div
                  className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 bg-cover bg-center"
                  style={{ backgroundImage: `url(${logo})` }}
                  onError={e => {
                    e.target.style.backgroundImage =
                      'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAxOGMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iIzY4ODZlNiIvPjwvc3ZnPg==)';
                  }}
                >
                  <img
                    src={logo}
                    alt="CommitMate Logo"
                    className="h-6 w-auto object-contain opacity-0"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAxOGMtNC40MTEgMC04LTMuNTg5LTgtOHMzLjU4OS04IDgtOCA4IDMuNTg5IDggOC0zLjU4OSA4LTggOHoiIGZpbGw9IiM2ODg2ZTYiLz48L3N2Zz4=';
                    }}
                  />
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-xl font-bold tracking-tighter hidden sm:inline">
                  CommitMate
                </span>
              </div>
            </a>
          </div>

          {/* User Section */}
          <div className="flex items-center ml-auto">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 btn btn-ghost hover:bg-base-200/50 active:bg-base-300/30 transition-all duration-200 pl-3 pr-3 py-2 rounded-full"
                >
                  <div className="text-right hidden sm:block">
                    <p className="font-medium text-base-content/90 leading-tight">
                      {user.firstName}
                    </p>
                    <p className="text-xs text-base-content/60">
                      Welcome back!
                    </p>
                  </div>
                  <div className="avatar placeholder">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-primary/70 ring-offset-2 ring-offset-base-100">
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300/20 backdrop-blur-lg"
                >
                  <li>
                    <a className="justify-between hover:bg-base-200/50 active:bg-base-300 transition-colors">
                      <span>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a className="hover:bg-base-200/50 active:bg-base-300 transition-colors">
                      <span>Settings</span>
                    </a>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <a className="hover:bg-base-200/50 active:bg-base-300 transition-colors">
                      <span>Help & Support</span>
                    </a>
                  </li>
                  <li>
                    <a className="text-error hover:text-error-content hover:bg-error/10 active:bg-error/20 transition-colors">
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <a className="btn btn-ghost btn-sm rounded-full px-5 border border-base-300/20 hover:border-base-300/50 transition-colors hover:bg-base-200/30">
                  Sign in
                </a>
                <a className="btn btn-primary btn-sm rounded-full px-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Get started
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
