import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../assets/hero-illustration.png';
import Footer from './Footer';
import NavBar from './NavBar';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        {/* Main Hero Section - Enhanced with modern gradient and subtle patterns */}
        <div className="hero min-h-[90vh] bg-gradient-to-br from-base-100 via-base-100 to-base-200 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary blur-[100px]"></div>
              <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary blur-[120px]"></div>
              <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-accent blur-[90px]"></div>
            </div>
          </div>

          <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-24 px-4 sm:px-8 w-full max-w-7xl mx-auto relative z-10">
            {/* Visual Element - Modern 3D effect with floating animation */}
            <div className="relative w-full max-w-2xl flex-1">
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-base-300/30 shadow-2xl"></div>
                <img
                  src={heroIllustration}
                  alt="Developers collaborating"
                  className="absolute w-full h-full object-contain animate-float"
                  style={{
                    animationDuration: '8s',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
                  }}
                />
                {/* Animated decorative elements with glassmorphism effect */}
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-pulse backdrop-filter backdrop-blur-sm"
                  style={{ animationDuration: '4s' }}
                ></div>
                <div
                  className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-secondary/20 blur-xl animate-pulse backdrop-filter backdrop-blur-sm"
                  style={{ animationDuration: '5s' }}
                ></div>
                <div
                  className="absolute top-1/4 -left-10 w-16 h-16 rounded-full bg-accent/15 blur-lg animate-pulse backdrop-filter backdrop-blur-sm"
                  style={{ animationDuration: '7s' }}
                ></div>
              </div>
            </div>

            {/* Content Section - Modern typography and spacing */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full flex-1 max-w-2xl">
              {/* Badge - Modern with subtle animation */}
              <div className="relative inline-block mb-6 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                <div className="badge badge-lg px-4 py-3 relative bg-base-100/80 backdrop-blur-sm border border-base-300/50 text-primary font-medium group-hover:bg-base-100 transition-all duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Developers Network
                  </span>{' '}
                  <span className="text-secondary ml-1">v1.0</span>
                </div>
              </div>

              {/* Main Headline - Modern gradient with better hierarchy */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-300%">
                  Build Together,
                </span>
                <br />
                <span className="text-base-content relative">
                  <span className="relative inline-block">
                    Ship Faster
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                  </span>
                </span>
              </h1>

              {/* Description - Improved readability with modern font treatment */}
              <p className="text-xl text-base-content/90 mb-8 max-w-lg leading-relaxed font-medium">
                CommitMate connects you with skilled developers for meaningful
                collaborations. Find your perfect coding partner or exciting
                projects today.
              </p>

              {/* CTA + Stats Container - Modern layout */}
              <div className="w-full">
                {/* CTA Buttons - Modern hover effects */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <button
                    className="btn btn-primary btn-lg px-8 gap-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 group"
                    onClick={() => navigate('/app/')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 group-hover:scale-110 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                    Find Partners
                  </button>
                </div>

                {/* Stats - Modern glassmorphism effect */}
                <div className="bg-base-100/70 rounded-2xl p-6 backdrop-blur-md border border-base-300/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-wrap justify-between gap-6">
                    <div className="text-center flex-1 min-w-[120px]">
                      <div
                        className="text-3xl font-bold text-primary animate-countup"
                        data-target="10000"
                      >
                        10K+
                      </div>
                      <div className="text-sm opacity-80 mt-1">Developers</div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div
                        className="text-3xl font-bold text-secondary animate-countup"
                        data-target="5000"
                      >
                        5K+
                      </div>
                      <div className="text-sm opacity-80 mt-1">Projects</div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div
                        className="text-3xl font-bold text-accent animate-countup"
                        data-target="1000"
                      >
                        1K+
                      </div>
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

        {/* About Section - Modern design */}
        <div className="py-20 bg-base-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')]"></div>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">About CommitMate</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10 transform translate-y-1"></span>
            </h2>
            <p className="text-xl text-base-content/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              CommitMate is a platform designed to foster meaningful
              collaboration among developers. Our mission is to transform how
              coding projects are created by connecting talented developers and
              facilitating productive partnerships.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>
          </div>
        </div>

        {/* Features Section - Modern card design */}
        <div className="py-20 bg-base-100 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary blur-[100px]"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">Powerful Features</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10 transform translate-y-1"></span>
              </h2>
              <p className="text-xl text-base-content/80 mb-12 max-w-2xl mx-auto font-medium">
                Everything you need to find the perfect collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Secure Authentication',
                  description:
                    'Advanced security measures to ensure your account and data are always protected.',
                  icon: '🔒',
                  color: 'primary',
                },
                {
                  title: 'Matching with Developers',
                  description:
                    ' Connect with developers with similar interests and skills.',
                  icon: '🤝',
                  color: 'secondary',
                },
                {
                  title: 'Real-time Chat',
                  description:
                    'Integrated messaging with code snippets for seamless communication.',
                  icon: '💬',
                  color: 'accent',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-base-200/50 backdrop-blur-sm border border-base-300/30 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-base-200 to-base-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 p-8 h-full">
                    <div
                      className={`text-5xl mb-6 text-${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-base-content/80 mb-6">
                      {feature.description}
                    </p>
                    <div className="mt-auto">
                      <div
                        className={`w-12 h-1 bg-${feature.color} rounded-full opacity-80 group-hover:w-20 transition-all duration-300`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - Modern gradient with animation */}
        <div className="py-20 relative overflow-hidden bg-base-200">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-70"></div>

          {/* Animated dots background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')]"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Collaborating?
            </h2>
            <p className="text-xl mb-8 opacity-90 text-base-content/90">
              Join thousands of developers already building amazing projects
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-primary btn-lg px-8 text-lg hover:shadow-lg hover:shadow-primary/30 transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/app/')}
              >
                Get Started - It's Free
              </button>
              <button
                className="btn btn-outline btn-lg px-8 text-lg border-base-content/30 hover:border-base-content/50 hover:bg-base-content/10 transform transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/app/')}
              >
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
