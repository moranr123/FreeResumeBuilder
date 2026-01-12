import { useState, lazy, Suspense } from 'react'
import ErrorBoundary from './components/common/ErrorBoundary'
import LandingPage from './features/landing/LandingPage'

// Lazy load heavy components for better performance
const TemplateSelection = lazy(() => import('./features/template/TemplateSelection'))
const ResumeBuilder = lazy(() => import('./features/resume/ResumeBuilder'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateColors, setTemplateColors] = useState({})

  const handleTemplateColorChange = (templateId, color) => {
    setTemplateColors(prev => ({
      ...prev,
      [templateId]: color
    }))
  }

  const getTemplateColor = (templateId) => {
    return templateColors[templateId] || null
  }

  const getTemplateColorWithDefault = (templateId) => {
    return templateColors[templateId] || '#F2F2F2'
  }

  return (
    <ErrorBoundary>
      {showLanding ? (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      ) : !selectedTemplate ? (
        <Suspense fallback={<LoadingSpinner />}>
          <TemplateSelection 
            onSelectTemplate={setSelectedTemplate} 
            templateColors={templateColors}
            onTemplateColorChange={handleTemplateColorChange}
            getTemplateColor={getTemplateColor}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <ResumeBuilder 
            selectedTemplate={selectedTemplate} 
            themeColor={getTemplateColorWithDefault(selectedTemplate)} 
            onBack={() => setSelectedTemplate(null)} 
          />
        </Suspense>
      )}
    </ErrorBoundary>
  )
}

export default App
