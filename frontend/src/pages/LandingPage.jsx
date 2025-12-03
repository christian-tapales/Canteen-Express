import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/shops');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Full canteen background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1600)',
          filter: 'brightness(0.6)'
        }}
      />

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(140, 52, 58, 0.3), rgba(140, 52, 58, 0.6))'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Section - Logo and Branding */}
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-5">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                style={{ 
                  backgroundColor: '#8C343A',
                  border: '4px solid #FBCA30'
                }}
              >
                <span className="text-6xl">🍽️</span>
              </div>
              <div>
                <h1 
                  className="text-8xl font-bold tracking-wider"
                  style={{ 
                    color: '#FBCA30',
                    textShadow: '4px 4px 12px rgba(0,0,0,0.9)',
                    fontWeight: '800',
                    lineHeight: '1'
                  }}
                >
                  Canteen
                </h1>
                <h1 
                  className="text-8xl font-bold tracking-wider"
                  style={{ 
                    color: '#FBCA30',
                    textShadow: '4px 4px 12px rgba(0,0,0,0.9)',
                    fontWeight: '800',
                    lineHeight: '1'
                  }}
                >
                  Express
                </h1>
              </div>
            </div>
            <p 
              className="text-3xl font-semibold"
              style={{ 
                color: '#FFFFFF',
                textShadow: '3px 3px 8px rgba(0,0,0,0.8)'
              }}
            >
              Your Campus Food Ordering Solution
            </p>
          </div>
        </div>

        {/* Bottom Hero Section - Blurred Panel */}
        <div 
          className="relative"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Semi-transparent panel */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderTop: '3px solid #8C343A'
            }}
          />

          {/* Content */}
          <div className="relative z-10 py-20 px-8 text-center">
            <div 
              className="max-w-3xl mx-auto rounded-3xl p-10 shadow-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '3px solid #8C343A'
              }}
            >
              <h2 
                className="text-5xl font-bold mb-4"
                style={{ 
                  color: '#8C343A',
                  fontWeight: '800'
                }}
              >
                Welcome to Canteen Express!
              </h2>
              <p 
                className="text-xl mb-8"
                style={{ 
                  color: '#666666'
                }}
              >
                Order delicious meals from your favorite campus canteens. Fast, easy, and convenient.
              </p>
              
              <button
                onClick={handleGetStarted}
                className="px-16 py-5 rounded-full text-2xl font-bold transition-all duration-300 hover:opacity-90 shadow-xl"
                style={{ 
                  backgroundColor: '#8C343A',
                  color: '#FFFFFF',
                  border: '3px solid #8C343A'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FBCA30';
                  e.target.style.color = '#8C343A';
                  e.target.style.borderColor = '#8C343A';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#8C343A';
                  e.target.style.color = '#FFFFFF';
                  e.target.style.borderColor = '#8C343A';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
