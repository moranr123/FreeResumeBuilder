import { useState, useRef, useEffect } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { initialResumeData } from '../../constants/resume'
import { templates } from '../../constants/templates'
import { fonts } from '../../constants/fonts'
import { textColors, getColorScheme } from '../../constants/colors'
import logoImage from '../../assets/logo.jpg'
import Icon from '../../components/common/Icon'

// Sections will be filtered in ResumeForm based on template
// This is just for the progress bar - actual sections come from ResumeForm
const getSectionsForTemplate = (template) => {
  const baseSections = [
    { id: 'personal', label: 'Personal Info', icon: 'user' },
    { id: 'education', label: 'Education', icon: 'education' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
  ]
  
  if (template === 'corporate') {
    return [
      ...baseSections,
      { id: 'skills', label: 'Skills & More', icon: 'skills' },
    ]
  } else {
    return [
      ...baseSections,
      { id: 'skills', label: 'Skills & More', icon: 'skills' },
      { id: 'projects', label: 'Projects', icon: 'project' },
    ]
  }
}

function ResumeBuilder({ selectedTemplate: initialTemplate = 'compact', themeColor = '#F2F2F2', onBack }) {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate)
  const [selectedFont, setSelectedFont] = useState('inter')
  const [selectedColor, setSelectedColor] = useState('black')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showFontModal, setShowFontModal] = useState(false)
  const [showColorModal, setShowColorModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const downloadPDFRef = useRef(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Reset current section when template changes to prevent out-of-bounds
  useEffect(() => {
    const sections = getSectionsForTemplate(selectedTemplate)
    if (currentSection >= sections.length) {
      setCurrentSection(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate])

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 5 }]
    }))
  }

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
      }]
    }))
  }

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }

  const addTool = () => {
    setResumeData(prev => ({
      ...prev,
      tools: [...prev.tools, { id: Date.now(), name: '' }]
    }))
  }

  const updateTool = (id, value) => {
    setResumeData(prev => ({
      ...prev,
      tools: prev.tools.map(tool =>
        tool.id === id ? { ...tool, name: value } : tool
      )
    }))
  }

  const removeTool = (id) => {
    setResumeData(prev => ({
      ...prev,
      tools: prev.tools.filter(tool => tool.id !== id)
    }))
  }

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now(), name: '', proficiency: 'Fluent' }]
    }))
  }

  const updateLanguage = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const removeLanguage = (id) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), name: '', issuer: '', date: '' }]
    }))
  }

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }

  const sections = getSectionsForTemplate(selectedTemplate)
  const progress = ((currentSection + 1) / sections.length) * 100

  const goToSection = (index) => {
    setCurrentSection(index)
  }

  // Check if form has any input data
  const hasFormData = () => {
    // Check personal info
    const hasPersonalInfo = Object.values(resumeData.personalInfo).some(value => 
      value && value.toString().trim() !== ''
    )
    
    // Check summary
    const hasSummary = resumeData.summary && resumeData.summary.trim() !== ''
    
    // Check arrays
    const hasArrays = 
      resumeData.experience.length > 0 ||
      resumeData.education.length > 0 ||
      resumeData.skills.length > 0 ||
      resumeData.tools.length > 0 ||
      resumeData.languages.length > 0 ||
      resumeData.certifications.length > 0 ||
      resumeData.projects.length > 0
    
    return hasPersonalInfo || hasSummary || hasArrays
  }

  // Handle go back with confirmation
  const handleGoBack = () => {
    if (hasFormData()) {
      const confirmed = window.confirm(
        'You have unsaved changes in your form. Going back will reset all your input.\n\nDo you want to continue?'
      )
      if (confirmed) {
        onBack()
      }
    } else {
      onBack()
    }
  }

  // Handle finish button click
  const handleFinish = () => {
    setShowDownloadModal(true)
  }

  // Handle download PDF with loading state
  const handleDownloadPDF = async () => {
    if (!downloadPDFRef.current) return
    
    setIsGeneratingPDF(true)
    try {
      await downloadPDFRef.current()
      // Close modal after successful download
      setShowDownloadModal(false)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Handle template change
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    setShowTemplateModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 z-10">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setShowSidebar(true)}
            className="lg:hidden flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 p-1.5"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Progress Bar - Centered */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="max-w-[200px] sm:max-w-[280px] md:max-w-md w-full">
              <div className="flex items-center justify-between mb-1 sm:mb-1.5 gap-1">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex flex-col items-center gap-0.5 transition-all cursor-default flex-shrink-0 ${
                    index === currentSection
                      ? 'text-gray-900'
                      : index < currentSection
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      index === currentSection
                        ? 'bg-gray-900 text-white border-gray-900'
                        : index < currentSection
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Icon name={section.icon} className="text-[7px] sm:text-[8px]" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-medium hidden sm:block">{section.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-0.5">
              <div
                className="bg-blue-600 h-0.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-0.5 text-[8px] sm:text-[9px] text-gray-600 px-1">
              Step {currentSection + 1} of {sections.length}: {sections[currentSection].label}
            </div>
            </div>
          </div>

          {/* Preview Button - Mobile Only */}
          <button
            onClick={() => setShowPreviewModal(true)}
            className="lg:hidden flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 p-1.5"
            aria-label="Show preview"
          >
            <Icon name="preview" className="text-base" />
            <span className="text-xs font-medium hidden sm:inline">Preview</span>
          </button>

          {/* Font, Color and Template Buttons - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0">
            <button
              onClick={() => setShowFontModal(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
              title="Change Font"
            >
              <Icon name="font" className="text-lg" />
              <span className="text-sm font-medium">Font</span>
            </button>
            <button
              onClick={() => setShowColorModal(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
              title="Change Text Color"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="text-sm font-medium">Color</span>
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
            >
              <Icon name="template" className="text-lg" />
              <span className="text-sm font-medium">Template</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
            showSidebar ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setShowSidebar(false)}
        />
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowFontModal(true)
                    setShowSidebar(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: showSidebar ? '0.1s' : '0s' }}
                >
                  <Icon name="font" className="text-xl text-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Change Font</span>
                    <span className="text-xs text-gray-500">Select font style</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowColorModal(true)
                    setShowSidebar(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: showSidebar ? '0.15s' : '0s' }}
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-medium">Change Color</span>
                    <span className="text-xs text-gray-500">Select text color scheme</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowTemplateModal(true)
                    setShowSidebar(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: showSidebar ? '0.2s' : '0s' }}
                >
                  <Icon name="template" className="text-xl text-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Change Template</span>
                    <span className="text-xs text-gray-500">Select resume template</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-65px)] mt-[57px] sm:mt-[65px]">
        <ResumeForm
          resumeData={resumeData}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          selectedTemplate={selectedTemplate}
          onFinish={handleFinish}
          updatePersonalInfo={updatePersonalInfo}
          updateSummary={updateSummary}
          addExperience={addExperience}
          updateExperience={updateExperience}
          removeExperience={removeExperience}
          addEducation={addEducation}
          updateEducation={updateEducation}
          removeEducation={removeEducation}
          addSkill={addSkill}
          updateSkill={updateSkill}
          removeSkill={removeSkill}
          addTool={addTool}
          updateTool={updateTool}
          removeTool={removeTool}
          addLanguage={addLanguage}
          updateLanguage={updateLanguage}
          removeLanguage={removeLanguage}
          addCertification={addCertification}
          updateCertification={updateCertification}
          removeCertification={removeCertification}
          addProject={addProject}
          updateProject={updateProject}
          removeProject={removeProject}
        />
        <ResumePreview
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
          selectedFont={selectedFont}
          selectedColor={selectedColor}
          themeColor={themeColor}
          onDownloadReady={(downloadFn) => {
            downloadPDFRef.current = downloadFn
          }}
        />
      </div>

      {/* Template Change Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 tracking-tight">Change Template</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
                  Select a different template. Your current data will be preserved.
                </p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 self-end sm:self-auto"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateChange(template.id)}
                  className={`relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* Preview - True Paper Representation */}
                  <div className="relative bg-gray-50 p-4 sm:p-5 md:p-6 flex items-center justify-center">
                    {/* Paper frame - US Letter: 8.5" x 11" (aspect ratio 1:1.294) - True physical paper */}
                    <div 
                      className="relative bg-white w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]"
                      style={{
                        aspectRatio: '8.5 / 11', // US Letter aspect ratio (exact)
                        border: '0.5px solid #D1D5DB', // Thin light-gray page border
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Soft subtle shadow for paper lift
                      }}
                    >
                      <div className="w-full h-full p-2 sm:p-2.5 md:p-3 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
                      {template.id === 'compact' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="text-[8px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[5px] text-gray-600 text-center mb-1">Software Engineer</div>
                          <div className="h-px bg-gray-300 my-1"></div>
                          <div className="flex gap-2 flex-1 mt-0.5">
                            <div className="w-[30%] flex flex-col gap-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Skills</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[4px] text-gray-600">Python</div>
                                <div className="text-[4px] text-gray-600">React</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Tools</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Git</div>
                                <div className="text-[4px] text-gray-600">Docker</div>
                              </div>
                            </div>
                            <div className="w-[70%] flex flex-col gap-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Summary</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Experience</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] font-semibold">Senior Engineer</div>
                                <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.id === 'modern' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="text-[9px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[5px] text-gray-600 text-center mb-2">Software Engineer</div>
                          <div className="h-px bg-gray-300 my-1"></div>
                          <div className="flex gap-2 flex-1 mt-1">
                            <div className="w-[30%] flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <div className="text-[5px] font-bold uppercase">Skills</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[4px] text-gray-600">Python</div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="text-[5px] font-bold uppercase">Tools</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Git</div>
                              </div>
                            </div>
                            <div className="w-[70%] flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <div className="text-[5px] font-bold uppercase">Summary</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                                <div className="text-[4px] text-gray-600">with expertise in...</div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="text-[5px] font-bold uppercase">Experience</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] font-semibold">Senior Engineer</div>
                                <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.id === 'classic' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="text-[9px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[5px] text-gray-600 text-center mb-2">Software Engineer</div>
                          <div className="h-px bg-gray-300 my-1"></div>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                              <div className="text-[5px] font-bold uppercase">Summary</div>
                              <div className="h-px bg-gray-300 mb-0.5"></div>
                              <div className="text-[4px] text-gray-600">Experienced software engineer with expertise...</div>
                              <div className="text-[4px] text-gray-600">in modern web technologies...</div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="text-[5px] font-bold uppercase">Experience</div>
                              <div className="h-px bg-gray-300 mb-0.5"></div>
                              <div className="text-[4px] font-semibold">Senior Engineer</div>
                              <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                              <div className="text-[4px] text-gray-600">• Led development projects</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.id === 'minimal' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="text-[8px] font-semibold text-center mb-1">Ronald Moran Jr</div>
                          <div className="h-0.5 bg-gray-300 my-1"></div>
                          <div className="flex gap-2 flex-1 mt-0.5">
                            <div className="w-[30%] flex flex-col gap-3">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-semibold uppercase">Skills</div>
                                <div className="h-px bg-gray-200 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[4px] text-gray-600">Python</div>
                              </div>
                            </div>
                            <div className="w-[70%] flex flex-col gap-3">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-semibold uppercase">Summary</div>
                                <div className="h-px bg-gray-200 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Experienced engineer...</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-semibold uppercase">Experience</div>
                                <div className="h-px bg-gray-200 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Senior Engineer at Tech Co.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.id === 'corporate' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="text-[10px] font-bold mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[6px] text-gray-700 mb-1">Software Engineer</div>
                          <div className="h-0.5 bg-blue-500 w-1/4 mb-1"></div>
                          <div className="flex gap-2 flex-1">
                            <div className="w-[35%] flex flex-col gap-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase text-blue-600">Education</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] font-semibold">Bachelor of Science</div>
                                <div className="text-[4px] text-gray-600">State University</div>
                                <div className="text-[4px] text-gray-500">2016 - 2020</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase text-blue-600">Skills</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">• JavaScript</div>
                                <div className="text-[4px] text-gray-600">• Python</div>
                              </div>
                            </div>
                            <div className="w-[65%] flex flex-col gap-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase text-blue-600">Summary</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase text-blue-600">Work History</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] font-semibold">Senior Engineer</div>
                                <div className="text-[4px] text-blue-600">Tech Company Inc.</div>
                                <div className="text-[4px] text-gray-600">• Led development projects</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.id === 'with-image' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight flex-1">
                          <div className="mb-1.5 pb-1 border-b border-gray-300">
                            <div className="text-[7px] font-bold mb-0.5">Ronald Moran Jr</div>
                            <div className="text-[5px] text-gray-600 mb-0.5">Software Engineer</div>
                            <div className="text-[4px] text-gray-500">email@example.com | +1 (555) 000-0000</div>
                          </div>
                          <div className="flex gap-1.5 flex-1">
                            <div className="w-[28%] flex flex-col gap-2">
                              <img 
                                src={logoImage} 
                                alt="Profile" 
                                className="w-full aspect-square object-cover rounded border border-gray-200"
                              />
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Skills</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[4px] text-gray-600">Python</div>
                              </div>
                            </div>
                            <div className="w-[72%] flex flex-col gap-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Summary</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[5px] font-bold uppercase">Experience</div>
                                <div className="h-px bg-gray-300 mb-0.5"></div>
                                <div className="text-[4px] font-semibold">Senior Engineer</div>
                                <div className="text-[4px] text-blue-600">Tech Company Inc.</div>
                                <div className="text-[4px] text-gray-600">• Led development projects</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        <i className="fi fi-rr-check text-sm"></i>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">{template.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] sm:text-xs px-2 py-1 rounded font-medium ${
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
          </div>
        </div>
      )}

      {/* Font Selection Modal */}
      {showFontModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Font Style</h2>
              <button
                onClick={() => setShowFontModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Choose a font style for your resume. The selected font will be applied to all text elements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {fonts.map((font) => (
                <button
                  key={font.id}
                  onClick={() => {
                    setSelectedFont(font.id)
                    setShowFontModal(false)
                  }}
                  className={`relative p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    selectedFont === font.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: font.family }}>
                      {font.name}
                    </h3>
                    {selectedFont === font.id && (
                      <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: font.family }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Color Selection Modal */}
      {showColorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Text Color Scheme</h2>
              <button
                onClick={() => setShowColorModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Choose a color scheme for your resume. The selected colors will be applied to all text elements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {textColors.map((colorScheme) => (
                <button
                  key={colorScheme.id}
                  onClick={() => {
                    setSelectedColor(colorScheme.id)
                    setShowColorModal(false)
                  }}
                  className={`relative p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    selectedColor === colorScheme.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{colorScheme.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{colorScheme.description}</p>
                    </div>
                    {selectedColor === colorScheme.id && (
                      <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: colorScheme.colors.primary }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">Primary</div>
                        <div className="text-xs font-mono text-gray-500">{colorScheme.colors.primary}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: colorScheme.colors.secondary }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">Secondary</div>
                        <div className="text-xs font-mono text-gray-500">{colorScheme.colors.secondary}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: colorScheme.colors.tertiary }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">Tertiary</div>
                        <div className="text-xs font-mono text-gray-500">{colorScheme.colors.tertiary}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Resume Preview</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6 bg-gray-50 flex items-center justify-center min-h-0">
              <div className="w-full h-full flex justify-center items-center">
                {/* Scaled preview wrapper - maintains true US Letter aspect ratio (8.5:11) */}
                {/* Scale calculated to fit perfectly within modal without scrolling */}
                <div className="transform scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.65] xl:scale-[0.7] origin-center">
                  {/* Actual resume content - true physical dimensions (215.9mm x 279.4mm = US Letter) */}
                  <ResumePreview
                    resumeData={resumeData}
                    selectedTemplate={selectedTemplate}
                    selectedFont={selectedFont}
                    selectedColor={selectedColor}
                    themeColor={themeColor}
                    inModal={true}
                    onDownloadReady={(downloadFn) => {
                      downloadPDFRef.current = downloadFn
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Download Resume</h2>
              <button
                onClick={() => setShowDownloadModal(false)}
                disabled={isGeneratingPDF}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Your resume is ready! Click the button below to download it as a PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                disabled={isGeneratingPDF}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Icon name="download" className="text-sm" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder
