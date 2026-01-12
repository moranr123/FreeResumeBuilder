import { useState, useRef } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { initialResumeData } from '../../constants/resume'
import { templates } from '../../constants/templates'
import logoImage from '../../assets/logo.jpg'
import Icon from '../../components/common/Icon'

const sections = [
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'education', label: 'Education', icon: 'education' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills & More', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'project' },
]

function ResumeBuilder({ selectedTemplate: initialTemplate = 'compact', onBack }) {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const downloadPDFRef = useRef(null)

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
      {/* Header with Back Button and Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-3 z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            <Icon name="arrowLeft" className="text-lg" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          
          {/* Progress Bar - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-md w-full">
              <div className="flex items-center justify-between mb-1.5">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex flex-col items-center gap-0.5 transition-all cursor-default ${
                    index === currentSection
                      ? 'text-gray-900'
                      : index < currentSection
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      index === currentSection
                        ? 'bg-gray-900 text-white border-gray-900'
                        : index < currentSection
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Icon name={section.icon} className="text-[8px]" />
                  </div>
                  <span className="text-[9px] font-medium hidden sm:block">{section.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-0.5">
              <div
                className="bg-blue-600 h-0.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-0.5 text-[9px] text-gray-600">
              Step {currentSection + 1} of {sections.length}: {sections[currentSection].label}
            </div>
            </div>
          </div>

          {/* Change Template Button - Right Corner */}
          <button
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 ml-auto"
          >
            <Icon name="template" className="text-lg" />
            <span className="text-sm font-medium">Change Template</span>
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-57px)] mt-[57px]">
        {/* Mobile Preview Toggle - Show preview button on mobile */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={() => {
              const preview = document.querySelector('[data-resume-preview]')
              if (preview) {
                preview.classList.toggle('hidden')
                preview.classList.toggle('fixed')
                preview.classList.add('inset-0', 'bg-white', 'z-40')
              }
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Icon name="preview" className="text-sm" />
            Preview
          </button>
        </div>
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
          onDownloadReady={(downloadFn) => {
            downloadPDFRef.current = downloadFn
          }}
        />
      </div>

      {/* Template Change Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Change Template</h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Select a different template. Your current data will be preserved.
                </p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                  {/* Preview */}
                  <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center">
                    <div className="w-full h-full bg-white border border-gray-200 rounded p-4 overflow-hidden">
                      {template.id === 'compact' && (
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
                        <div className="w-full h-full flex flex-col text-[6px] leading-tight">
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
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Download Resume</h2>
              <button
                onClick={() => setShowDownloadModal(false)}
                disabled={isGeneratingPDF}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Your resume is ready! Click the button below to download it as a PDF.
            </p>
            <div className="flex gap-3">
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
