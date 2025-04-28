import React from 'react';
import heroIllustration from '../assets/hero-illustration.png'; 
import Footer from './Footer';
import NavBar from './NavBar';

const Hero = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        {/* Main Hero Section */}
        <div className="hero min-h-[90vh] bg-gradient-to-br from-base-100 via-base-100 to-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-24 px-4 sm:px-8 w-full max-w-7xl mx-auto">
            {/* Visual Element - Enhanced with better animation and styling */}
            <div className="relative w-full max-w-2xl flex-1">
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <img
                  src={heroIllustration}
                  alt="Developers collaborating"
                  className="absolute w-full h-full object-contain animate-float"
                  style={{
                    animationDuration: '8s',
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
                  }}
                />
                {/* Animated decorative elements */}
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-pulse"
                  style={{ animationDuration: '4s' }}
                ></div>
                <div
                  className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-secondary/20 blur-xl animate-pulse"
                  style={{ animationDuration: '5s' }}
                ></div>
                <div
                  className="absolute top-1/4 -left-10 w-16 h-16 rounded-full bg-accent/15 blur-lg animate-pulse"
                  style={{ animationDuration: '7s' }}
                ></div>
              </div>
            </div>

            {/* Content Section - Improved typography and spacing */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full flex-1 max-w-2xl">
              {/* Badge - More prominent */}
              <div className="badge badge-outline badge-lg mb-6 border-primary/50 text-primary/90 hover:bg-primary/10 transition-all duration-300 animate-pulse hover:animate-none">
                <span className="text-primary">Developers Network</span>{' '}
                <span className="text-secondary ml-1">v1.0</span>
              </div>

              {/* Main Headline - Better gradient and spacing */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Build Together,
                </span>
                <br />
                <span className="text-base-content">Ship Faster</span>
              </h1>

              {/* Description - Improved readability */}
              <p className="text-xl text-base-content/90 mb-8 max-w-lg leading-relaxed">
                CommitMate connects you with skilled developers for meaningful
                collaborations. Find your perfect coding partner or exciting
                projects today.
              </p>

              {/* CTA + Stats Container - Better organization */}
              <div className="w-full">
                {/* CTA Buttons - Enhanced hover effects */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <button className="btn btn-primary btn-lg px-8 gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                    Find Partners
                  </button>
                  <button className="btn btn-outline btn-lg px-8 gap-2 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 hover:bg-base-200/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Browse Projects
                  </button>
                </div>

                {/* Stats - More polished look */}
                <div className="bg-base-100/70 rounded-box p-6 backdrop-blur-md border border-base-300/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-wrap justify-between gap-6">
                    <div className="text-center flex-1 min-w-[120px]">
                      <div className="text-3xl font-bold text-primary">
                        10K+
                      </div>
                      <div className="text-sm opacity-80 mt-1">Developers</div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div className="text-3xl font-bold text-secondary">
                        5K+
                      </div>
                      <div className="text-sm opacity-80 mt-1">Projects</div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div className="text-3xl font-bold text-accent">1K+</div>
                      <div className="text-sm opacity-80 mt-1">
                        Collaborations
                      </div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div className="text-3xl font-bold text-info">24/7</div>
                      <div className="text-sm opacity-80 mt-1">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section - More refined */}
        <div className="py-20 bg-base-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">About CommitMate</h2>
            <p className="text-xl text-base-content/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              CommitMate is a platform designed to foster meaningful
              collaboration among developers. Our mission is to transform how
              coding projects are created by connecting talented developers and
              facilitating productive partnerships.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>
          </div>
        </div>

        {/* Features Section - Enhanced card design */}
        <div className="py-20 bg-base-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-xl text-base-content/80 mb-12 max-w-2xl mx-auto">
              Everything you need to find the perfect collaboration
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Find Partners',
                  description:
                    'Connect with skilled developers matching your tech stack and interests.',
                  icon: '👥',
                  color: 'primary',
                },
                {
                  title: 'Browse Projects',
                  description:
                    'Discover exciting projects or showcase your own to attract collaborators.',
                  icon: '🔍',
                  color: 'secondary',
                },
                {
                  title: 'Track Progress',
                  description:
                    'Manage milestones, deadlines, and task completion seamlessly.',
                  icon: '📊',
                  color: 'accent',
                },
                {
                  title: 'Real-time Chat',
                  description: 'Communicate instantly with your team members.',
                  icon: '💬',
                  color: 'info',
                },
                {
                  title: 'Code Sharing',
                  description:
                    'Share code snippets and collaborate directly in the platform.',
                  icon: '💻',
                  color: 'success',
                },
                {
                  title: 'Version Control',
                  description:
                    'Integrated Git support for smooth collaboration.',
                  icon: '🔄',
                  color: 'warning',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-${feature.color} hover:-translate-y-2`}
                >
                  <div className="card-body items-center text-center">
                    <div className={`text-4xl mb-4 text-${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-base-content/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - More engaging */}
        <div className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Collaborating?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers already building amazing projects
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-accent btn-lg px-8 text-lg hover:shadow-lg hover:shadow-accent/30">
                Get Started - It's Free
              </button>
              <button className="btn btn-outline btn-lg px-8 text-lg btn-primary-content hover:bg-primary-content/10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
