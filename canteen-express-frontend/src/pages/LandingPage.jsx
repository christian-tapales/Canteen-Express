import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigate('/shops');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background Image - Full canteen background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800)',
          filter: 'brightness(0.5)'
        }}
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(91, 5, 11, 0.3), rgba(140, 52, 58, 0.5))'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Section - Clear Background with Logo */}
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: '#8C343A',
                  border: '3px solid #DFAD13'
                }}
              >
                <span className="text-5xl">🍽️</span>
              </div>
              <div>
                <h1 
                  className="text-7xl font-bold tracking-wide uppercase"
                  style={{ 
                    color: '#DFAD13',
                    textShadow: '3px 3px 8px rgba(0,0,0,0.8)',
                    fontWeight: '700'
                  }}
                >
                  Canteen
                </h1>
                <h1 
                  className="text-7xl font-bold tracking-wide uppercase"
                  style={{ 
                    color: '#DFAD13',
                    textShadow: '3px 3px 8px rgba(0,0,0,0.8)',
                    fontWeight: '700'
                  }}
                >
                  Express
                </h1>
              </div>
            </div>
            <p 
              className="text-2xl font-semibold"
              style={{ 
                color: '#FAE7BF',
                textShadow: '2px 2px 6px rgba(0,0,0,0.7)'
              }}
            >
              Your Campus Food Ordering Solution
            </p>
          </div>
        </div>

        {/* Bottom Section - Transparent Blurry Background */}
        <div className="relative">
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200)',
              filter: 'blur(10px) brightness(0.4)',
              backdropFilter: 'blur(15px)'
            }}
          />
          
          {/* Transparent overlay with border */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(91, 5, 11, 0.75)',
              borderTop: '4px solid #DFAD13'
            }}
          />

          {/* Content */}
          <div className="relative z-10 py-16 px-8 text-center">
            <h2 
              className="text-5xl font-bold mb-4 uppercase"
              style={{ 
                color: '#FAE7BF',
                textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                fontWeight: '700'
              }}
            >
              Welcome to Canteen Express!
            </h2>
            <p 
              className="text-2xl mb-8 font-semibold"
              style={{ 
                color: '#FAE7BF',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}
            >
              Your Campus Food Ordering Solution
            </p>
            
            <button
              onClick={handleGetStarted}
              className="px-12 py-4 rounded text-xl font-bold uppercase tracking-wide transition-all duration-300 hover:opacity-90"
              style={{ 
                backgroundColor: '#8C343A',
                color: '#DFAD13',
                border: '2px solid #DFAD13',
                fontWeight: '700'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DFAD13';
                e.target.style.color = '#5B050B';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#8C343A';
                e.target.style.color = '#DFAD13';
              }}
            >
              Get Started
            </button>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-5 rounded" 
                style={{ 
                  backgroundColor: 'rgba(140, 52, 58, 0.5)',
                  border: '2px solid #DFAD13'
                }}>
                <h3 className="text-xl font-bold uppercase mb-2" style={{ color: '#DFAD13' }}>
                  Multiple Shops
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#FAE7BF' }}>
                  Choose from various campus canteens
                </p>
              </div>
              
              <div className="text-center p-5 rounded" 
                style={{ 
                  backgroundColor: 'rgba(140, 52, 58, 0.5)',
                  border: '2px solid #DFAD13'
                }}>
                <h3 className="text-xl font-bold uppercase mb-2" style={{ color: '#DFAD13' }}>
                  Wide Selection
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#FAE7BF' }}>
                  Browse menus from all canteens
                </p>
              </div>
              
              <div className="text-center p-5 rounded" 
                style={{ 
                  backgroundColor: 'rgba(140, 52, 58, 0.5)',
                  border: '2px solid #DFAD13'
                }}>
                <h3 className="text-xl font-bold uppercase mb-2" style={{ color: '#DFAD13' }}>
                  Quick Ordering
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#FAE7BF' }}>
                  Order ahead and skip the lines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LandingPage;
