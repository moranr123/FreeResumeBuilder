import Icon from '../../components/common/Icon'
import BounceCards from '../../components/common/BounceCards'
import { templates } from '../../constants/templates'

function LandingPage({ onGetStarted }) {
  const transformStyles = [
    'rotate(10deg) translate(-180px)',
    'rotate(5deg) translate(-90px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(90px)',
    'rotate(2deg) translate(180px)'
  ]

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-4 lg:h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-6 items-center lg:h-full">
          {/* Bounce Cards Section */}
          <div className="relative order-1 lg:order-1 w-full flex justify-center lg:items-center lg:h-full">
            <BounceCards
              templates={templates}
              transformStyles={transformStyles}
              containerWidth={600}
              containerHeight={500}
              enableHover
              onCardClick={onGetStarted}
              className="custom-bounceCards"
            />
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left order-2 lg:order-2 w-full lg:flex lg:flex-col lg:justify-center lg:h-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-3 xl:mb-4 leading-tight">
              Build Your Perfect
              <span className="text-blue-600 block">Resume in Minutes</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-base xl:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-4 xl:mb-6 leading-relaxed max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with our easy-to-use builder. 
              Choose from multiple templates and export your resume as a PDF instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-4 xl:mb-6">
              <button
                onClick={onGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-blue-600 text-white text-base sm:text-lg lg:text-sm xl:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Start building your resume"
                type="button"
              >
                Create your resume now
                <Icon name="arrowRight" className="text-white" aria-hidden="true" />
              </button>
            </div>
            
            {/* Features */}
            <div className="mt-8 sm:mt-12 lg:mt-4 xl:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-3 xl:gap-4">
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
