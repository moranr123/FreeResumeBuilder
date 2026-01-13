import { useState, useEffect } from 'react'
import Icon from '../../components/common/Icon'
import BounceCards from '../../components/common/BounceCards'
import { templates } from '../../constants/templates'

function LandingPage({ onGetStarted }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive transform styles - smaller translations on mobile
  const getTransformStyles = () => {
    if (windowWidth < 640) {
      // Mobile: smaller translations
      return [
        'rotate(10deg) translate(-100px)',
        'rotate(5deg) translate(-50px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(50px)',
        'rotate(2deg) translate(100px)'
      ]
    } else if (windowWidth < 1024) {
      // Tablet: medium translations
      return [
        'rotate(10deg) translate(-140px)',
        'rotate(5deg) translate(-70px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(70px)',
        'rotate(2deg) translate(140px)'
      ]
    }
    // Desktop: full translations
    return [
      'rotate(10deg) translate(-180px)',
      'rotate(5deg) translate(-90px)',
      'rotate(-3deg)',
      'rotate(-10deg) translate(90px)',
      'rotate(2deg) translate(180px)'
    ]
  }

  // Responsive container dimensions
  const getContainerDimensions = () => {
    if (windowWidth < 640) {
      return { width: 320, height: 350 }
    } else if (windowWidth < 1024) {
      return { width: 450, height: 400 }
    }
    return { width: 600, height: 500 }
  }

  const containerDims = getContainerDimensions()

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-4 lg:h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-6 items-center lg:h-full">
          {/* Title - Mobile: order-1, Desktop: hidden (in content section) */}
          <div className="lg:hidden order-1 w-full text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight px-2">
              Build Your Perfect
              <span className="text-blue-600 block">Resume in Minutes</span>
            </h1>
          </div>

          {/* Subtitle - Mobile: order-2, Desktop: hidden (in content section) */}
          <div className="lg:hidden order-2 w-full text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2 leading-relaxed max-w-2xl mx-auto px-4">
              Create professional, ATS-friendly resumes with our easy-to-use builder. 
              Choose from multiple templates and export your resume as a PDF instantly.
            </p>
          </div>

          {/* Bounce Cards Section - Mobile: order-3, Desktop: order-1 */}
          <div className="relative order-3 lg:order-1 w-full flex justify-center lg:items-center lg:h-full pt-0 pb-1 sm:pt-0 sm:pb-2 md:py-4 lg:py-0">
            <div className="w-full max-w-full overflow-visible">
              <BounceCards
                templates={templates}
                transformStyles={getTransformStyles()}
                containerWidth={containerDims.width}
                containerHeight={containerDims.height}
                enableHover={windowWidth >= 640}
                onCardClick={onGetStarted}
                className="custom-bounceCards"
              />
            </div>
          </div>

          {/* Create Button - Mobile: order-4, Desktop: hidden (in content section) */}
          <div className="lg:hidden order-4 w-full flex justify-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={onGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Start building your resume"
                type="button"
              >
                Create your resume now
                <Icon name="arrowRight" className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Content Section - Mobile: order-5 (features only), Desktop: order-2 (all content) */}
          <div className="text-center lg:text-left order-5 lg:order-2 w-full lg:flex lg:flex-col lg:justify-center lg:h-full">
            {/* Title & Subtitle - Desktop only */}
            <div className="hidden lg:block">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-3 xl:mb-4 leading-tight px-2">
                Build Your Perfect
                <span className="text-blue-600 block">Resume in Minutes</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray-600 mb-5 sm:mb-6 lg:mb-4 xl:mb-6 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                Create professional, ATS-friendly resumes with our easy-to-use builder. 
                Choose from multiple templates and export your resume as a PDF instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 lg:mb-4 xl:mb-6 px-4 sm:px-0">
                <button
                  onClick={onGetStarted}
                  className="px-6 sm:px-8 py-3 sm:py-4 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-blue-600 text-white text-sm sm:text-base lg:text-sm xl:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Start building your resume"
                  type="button"
                >
                  Create your resume now
                  <Icon name="arrowRight" className="text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-6 sm:mt-8 lg:mt-4 xl:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-3 xl:gap-4 px-4 sm:px-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="file" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">ATS-Friendly</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center">Optimized for tracking systems</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="download" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">PDF Export</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center">Download instantly</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="palette" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">Multiple Templates</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center">Choose your style</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
