import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState('sneha@example.com');
  const [password, setPassword] = useState('Sneha@1234');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(addUser(response.data.data));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300/30 rounded-2xl overflow-hidden">
          <div className="card-body p-8 sm:p-10">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-base-content">
                  Welcome back
                </h2>
                <p className="text-base-content/60">
                  Sign in to your CommitMate account
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                {/* Email Field */}
                <div className="form-control">
                  <label className="label" htmlFor="emailId">
                    <span className="label-text text-base-content/80 font-medium">
                      Email address
                    </span>
                  </label>
                  <input
                    id="emailId"
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="form-control space-y-2">
                  <label className="label" htmlFor="password">
                    <span className="label-text text-base-content/80 font-medium">
                      Password
                    </span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex justify-end -mt-1">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <button type="submit" className={`btn btn-primary w-full mt-2`}>
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-4 border-t border-base-300/30">
              <p className="text-base-content/60">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-base-content/50">
          <p>© {new Date().getFullYear()} CommitMate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
