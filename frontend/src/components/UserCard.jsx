const UserCard = ({ profile }) => {
  return (
    <div className="relative w-full max-w-md h-[580px] mb-16">
      <div className="absolute inset-0 rounded-3xl shadow-xl overflow-hidden border border-base-300 bg-base-100 transform transition-all duration-300 hover:shadow-2xl">
        {/* Profile Image Section */}
        <div className="h-[75%] relative">
          <img
            src={
              profile.photoUrl ||
              'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?ga=GA1.1.503780687.1745858245&semt=ais_hybrid&w=740'
            }
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Profile Header Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="backdrop-blur-sm bg-black/10 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  {profile.firstName} {profile.lastName}
                </h2>
                <span className="text-xl font-medium text-white/90">
                  {profile.age}
                </span>
              </div>

              <div className="flex items-center mt-2 gap-2">
                <span className="text-white/90 drop-shadow-sm">
                  {profile.gender}
                </span>
                <div className="flex-1 flex flex-wrap gap-1 justify-end">
                  {profile.skills?.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-primary/50 text-white rounded-full backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[25%] p-4 overflow-y-auto bg-gradient-to-br from-base-200 to-base-300">
          {/* About Section - Single Line */}
          <div className="mb-2">
            <h3 className="font-semibold text-info text-xs uppercase tracking-wider mb-1">
              About
            </h3>
            <p className="text-base-content/90 text-xs line-clamp-2">
              {profile.about || 'No bio provided yet'}
            </p>
          </div>

          {/* Additional Details - Icon Grid */}
          <div className="grid grid-cols-3 gap-1">
            {profile.location && (
              <div className="flex flex-col items-center">
                <div className="p-1 rounded-md bg-base-100/80 shadow-xs mb-1">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs text-base-content/80 text-center truncate w-full px-1">
                  {profile.location}
                </span>
              </div>
            )}

            {profile.education && (
              <div className="flex flex-col items-center">
                <div className="p-1 rounded-md bg-base-100/80 shadow-xs mb-1">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <span className="text-xs text-base-content/80 text-center truncate w-full px-1">
                  {profile.education}
                </span>
              </div>
            )}

            {profile.work && (
              <div className="flex flex-col items-center">
                <div className="p-1 rounded-md bg-base-100/80 shadow-xs mb-1">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs text-base-content/80 text-center truncate w-full px-1">
                  {profile.work}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
