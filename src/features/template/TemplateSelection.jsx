import { useState } from 'react'
import Icon from '../../components/common/Icon'
import { templates } from '../../constants/templates'

function TemplateSelection({ onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState('compact')

  const handleContinue = () => {
    onSelectTemplate(selectedTemplate)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professionally designed template. All templates are ATS-friendly and optimized for one-page resumes.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Preview */}
              <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center">
                <div className="w-full h-full bg-white border border-gray-200 rounded p-4 overflow-hidden">
                  {template.id === 'compact' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="h-3 bg-gray-900 rounded mb-1"></div>
                      <div className="h-2 bg-gray-500 rounded w-3/5 mb-2"></div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="flex gap-3 flex-1 mt-1">
                        <div className="w-[30%] flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'modern' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="h-3 bg-gray-900 rounded mb-1"></div>
                      <div className="h-2 bg-gray-500 rounded w-3/5 mb-3"></div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="flex gap-3 flex-1 mt-2">
                        <div className="w-[30%] flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'classic' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="h-3 bg-gray-900 rounded mb-1"></div>
                      <div className="h-2 bg-gray-500 rounded w-3/5 mb-3"></div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-400 rounded"></div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-400 rounded"></div>
                          <div className="h-1 bg-gray-400 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'minimal' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="h-3 bg-gray-900 rounded mb-2"></div>
                      <div className="h-0.5 bg-gray-300 my-2"></div>
                      <div className="flex gap-3 flex-1 mt-1">
                        <div className="w-[30%] flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded"></div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="h-1.5 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fi fi-rr-check text-sm"></i>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        selectedTemplate === template.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-3 bg-gray-50 rounded-lg p-6 mb-8">
          <i className="fi fi-rr-info text-blue-500"></i>
          <span className="text-sm text-gray-600">
            You can switch templates anytime. Your content will be preserved.
          </span>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 shadow-lg"
          >
            Continue with {templates.find(t => t.id === selectedTemplate)?.name}
            <Icon name="briefcase" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection
