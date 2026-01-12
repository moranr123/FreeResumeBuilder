import { useState, useRef } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { initialResumeData } from '../../constants/resume'
import Icon from '../../components/common/Icon'

const sections = [
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'education', label: 'Education', icon: 'education' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills & More', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'project' },
]

function ResumeBuilder({ selectedTemplate = 'compact', onBack }) {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [currentSection, setCurrentSection] = useState(0)
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Back Button and Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-3 z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            <Icon name="arrowLeft" className="text-lg" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          
          {/* Progress Bar */}
          <div className="flex-1 max-w-md mx-auto">
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

          <button 
            onClick={() => {
              if (downloadPDFRef.current && currentSection === sections.length - 1) {
                downloadPDFRef.current()
              }
            }}
            disabled={currentSection !== sections.length - 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors flex-shrink-0 ${
              currentSection === sections.length - 1
                ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Icon name="download" className="text-sm" />
            Download PDF
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
    </div>
  )
}

export default ResumeBuilder
