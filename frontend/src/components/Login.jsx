import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  // Local state for form fields
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form Login
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/auth/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data.data));
      navigate('/app');
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  // handle for form sign up
  const handleSignUp = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/auth/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
          age: Number(age),
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      setIsLoginForm(true);
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300/30 rounded-2xl overflow-hidden transition-all duration-300">
          <div className="card-body p-6 sm:p-8">
            {/* Header Section */}
            <div className="text-center space-y-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
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
                <h2 className="text-2xl font-bold text-base-content">
                  {isLoginForm ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-sm text-base-content/60">
                  {isLoginForm
                    ? 'Sign in to your account'
                    : 'Get started with CommitMate'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={isLoginForm ? handleLogin : handleSignUp}
              className="space-y-4"
            >
              <div className="space-y-4">
                {!isLoginForm && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm text-base-content/80 font-medium">
                          First Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Firstname"
                        className="input input-sm input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm text-base-content/80 font-medium">
                          Last Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Lastname"
                        className="input input-sm input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Age and Gender */}
                    <div className="form-control col-span-1">
                      <label className="label py-1">
                        <span className="label-text text-sm text-base-content/80 font-medium">
                          Age
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="Age"
                        className="input input-sm input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        min="1"
                        max="120"
                        required
                      />
                    </div>

                    <div className="form-control col-span-1">
                      <label className="label py-1">
                        <span className="label-text text-sm text-base-content/80 font-medium">
                          Gender
                        </span>
                      </label>
                      <select
                        className="select select-sm select-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-sm text-base-content/80 font-medium">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input input-sm input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full"
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-sm text-base-content/80 font-medium">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input input-sm input-bordered bg-base-200/50 border-base-300/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 w-full pr-10"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-base-content/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-base-content/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error p-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-sm w-full mt-2"
              >
                {isLoginForm ? 'Sign in' : 'Create account'}
              </button>
            </form>

            {/* Toggle between login/signup */}
            <div className="text-center mt-4 pt-4 border-t border-base-300/30">
              <p className="text-sm text-base-content/60">
                {isLoginForm
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}
                <button
                  className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer text-sm"
                  onClick={() => {
                    setError('');
                    setIsLoginForm(!isLoginForm);
                  }}
                >
                  {isLoginForm ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-base-content/50">
          <p>© {new Date().getFullYear()} CommitMate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
