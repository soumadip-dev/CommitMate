import React from 'react';

const NavBar = () => {
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0">
            <a className="btn btn-ghost px-2 hover:scale-105 active:scale-95 transition-transform">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-xl font-bold tracking-tight">
                <span className="inline-flex items-center">
                  <span className="mr-1">🔥</span>
                  CommitMate
                </span>
              </span>
            </a>
          </div>

          <div className="flex items-center ml-auto">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 active:scale-95 transition-transform"
              >
                <div className="w-9 rounded-full ring-2 ring-primary/80 ring-offset-2 ring-offset-base-100">
                  <img
                    alt="User profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-200/50"
              >
                <li>
                  <a className="justify-between hover:bg-base-200/50 active:bg-base-200 transition-colors">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="hover:bg-base-200/50 active:bg-base-200 transition-colors">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="hover:bg-base-200/50 active:bg-base-200 transition-colors text-error hover:text-error">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
