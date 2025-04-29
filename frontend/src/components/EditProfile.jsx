import { useEffect, useState } from 'react';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    gender: user?.gender || '',
    photoUrl: user?.photoUrl || '',
    about: user?.about || '',
    skills: user?.skills?.join(', ') || '',
  });

  const [previewData, setPreviewData] = useState({
    ...user,
    skills: user?.skills || [],
  });

  // Update preview data whenever form data changes
  useEffect(() => {
    setPreviewData({
      ...previewData,
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
    });
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Card */}
          <div className="lg:w-1/3 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl shadow-lg p-6 border border-base-300 bg-base-200 transition-all duration-300 hover:shadow-xl">
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
                        placeholder="Enter first name"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-base-100 text-base-content"
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
                        placeholder="Enter last name"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-base-100 text-base-content"
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
                        placeholder="Enter age"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-base-100 text-base-content"
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-base-content">
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-base-100 text-base-content"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      Profile Photo URL
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="url"
                        name="photoUrl"
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-base-100 text-base-content"
                        value={formData.photoUrl}
                        onChange={handleChange}
                      />
                      <button
                        className="flex items-center justify-center px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Upload photo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      About Yourself
                    </label>
                    <textarea
                      name="about"
                      placeholder="Tell us about yourself..."
                      className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all min-h-[120px] bg-base-100 text-base-content"
                      value={formData.about}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content">
                      Your Skills
                    </label>
                    <textarea
                      name="skills"
                      placeholder="JavaScript, React, CSS, Node.js, etc."
                      className="block w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all min-h-[120px] bg-base-100 text-base-content"
                      value={formData.skills}
                      onChange={handleChange}
                    ></textarea>
                    <p className="text-xs text-base-content opacity-50 mt-1">
                      Separate skills with commas (e.g., JavaScript, React)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-base-300">
                  <button className="px-6 py-2 text-sm font-medium text-base-content bg-base-100 border border-base-300 rounded-lg hover:bg-base-300 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    Cancel
                  </button>
                  <button className="px-6 py-2 text-sm font-medium text-primary-content bg-primary rounded-lg hover:bg-primary-focus transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md">
                    Save Changes
                  </button>
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
