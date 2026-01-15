import { useState, useEffect } from 'react'
import ResumePreview from '../ResumePreview'

/**
 * Preview Modal Component
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {Object} resumeData - Resume data object
 * @param {string} selectedTemplate - Currently selected template
 * @param {string} selectedFont - Currently selected font
 * @param {string} selectedColor - Currently selected color scheme
 * @param {string} themeColor - Current theme color
 * @param {Function} onDownloadReady - Callback when download function is ready
 */
export default function PreviewModal({
  isOpen,
  onClose,
  resumeData,
  selectedTemplate,
  selectedFont,
  selectedColor,
  themeColor,
  onDownloadReady,
}) {
  const [scale, setScale] = useState(0.4)
  const [transformOrigin, setTransformOrigin] = useState('top center')

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      const padding = 16 // 8px padding on each side
      
      if (width < 640) {
        // Mobile: scale to fit width
        const availableWidth = width - padding
        const calculatedScale = availableWidth / 816
        setScale(calculatedScale)
        setTransformOrigin('top center')
      } else if (width < 768) {
        // Small tablet
        setScale(0.5)
        setTransformOrigin('center')
      } else if (width < 1024) {
        // Tablet
        setScale(0.6)
        setTransformOrigin('center')
      } else if (width < 1280) {
        // Small desktop
        setScale(0.65)
        setTransformOrigin('center')
      } else {
        // Large desktop
        setScale(0.7)
        setTransformOrigin('center')
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-3 md:p-4">
      <div className="bg-white rounded-none sm:rounded-lg md:rounded-xl shadow-xl w-full h-full sm:w-auto sm:h-auto sm:max-w-4xl sm:max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 sm:p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Resume Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2 sm:p-3 md:p-4 lg:p-6 bg-gray-50 flex items-center justify-center min-h-0">
          <div className="w-full h-full flex justify-center items-start sm:items-center">
            {/* Scaled preview wrapper - responsive scaling for mobile, tablet, and desktop */}
            {/* The ResumePreview component always renders at exact 816x1056px internally */}
            {/* Mobile: scale to fit width, larger screens: use fixed scales */}
            <div 
              className="transform"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: transformOrigin,
              }}
            >
              <ResumePreview
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                selectedColor={selectedColor}
                themeColor={themeColor}
                inModal={true}
                onDownloadReady={onDownloadReady}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
