import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    photoUrl: '',
    about: '',
    skills: '',
  });

  const [previewData, setPreviewData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    photoUrl: '',
    about: '',
    skills: [],
  });

  const [isLoading, setIsLoading] = useState(!user);
  const [toast, setToast] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: '',
  });
  const dispatch = useDispatch();

  // Show toast function
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 5000); // Hide after 5 seconds
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age || '',
        gender: user.gender || '',
        photoUrl: user.photoUrl || '',
        about: user.about || '',
        skills: user.skills?.join(', ') || '',
      });
      setPreviewData({
        ...user,
        skills: user.skills || [],
      });
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      setPreviewData(prev => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        photoUrl: formData.photoUrl,
        about: formData.about,
        skills: formData.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill),
      }));
    }
  }, [formData, isLoading]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          photoUrl: formData.photoUrl,
          about: formData.about,
          skills: formData.skills
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill),
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      showToast('success', 'Profile saved successfully!');
    } catch (err) {
      showToast(
        'error',
        err.response?.data?.message || err.message || 'Failed to save profile'
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced Toast Notification */}
      {toast.show && (
        <div className="toast toast-top toast-center z-50 animate-fade-in">
          <div
            className={`alert ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            } shadow-lg rounded-box`}
          >
            <div className="flex items-center">
              {toast.type === 'success' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Card */}
          <div className="lg:w-1/3 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl shadow-lg p-6 border border-base-300 bg-base-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-base-content">
                  Profile Preview
                </h2>
                <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-content rounded-full animate-pulse">
                  Live
                </span>
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <UserCard profile={previewData} />
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:w-2/3">
            <div className="rounded-xl shadow-lg overflow-hidden border border-base-300 bg-base-200">
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-base-content">
                    Edit Profile Details
                  </h2>
                  <p className="text-base-content opacity-70 mt-2">
                    Update your personal information and preferences
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-base-content">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-base-content">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-base-content">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-base-content">
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      name="photoUrl"
                      className="block w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100"
                      value={formData.photoUrl}
                      onChange={handleChange}
                    />
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      About Yourself
                    </label>
                    <textarea
                      name="about"
                      className="block w-full px-4 py-2 border border-base-300 rounded-lg min-h-[120px] bg-base-100"
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      Your Skills
                    </label>
                    <textarea
                      name="skills"
                      className="block w-full px-4 py-2 border border-base-300 rounded-lg min-h-[120px] bg-base-100"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-base-300">
                    <button
                      type="button"
                      className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-focus transition-colors"
                      onClick={saveProfile}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
