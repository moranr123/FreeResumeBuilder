import { useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import StepNavigation from './StepNavigation'
import TemplateSelector from './TemplateSelector'
import './ResumeBuilder.css'

const initialResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [activeStep, setActiveStep] = useState('template')

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

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    setActiveStep('personal')
  }

  const handleSkipTemplate = () => {
    if (!selectedTemplate) {
      setSelectedTemplate('minimal')
    }
    setActiveStep('personal')
  }

  const handleTemplateStepClick = () => {
    setActiveStep('template')
  }

  if (activeStep === 'template') {
    return (
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleTemplateSelect}
        onSkip={handleSkipTemplate}
      />
    )
  }

  return (
    <div className="resume-builder">
      <div className="builder-layout">
        <StepNavigation
          activeStep={activeStep}
          onStepChange={setActiveStep}
          selectedTemplate={selectedTemplate}
          onTemplateStepClick={handleTemplateStepClick}
        />
        <div className={`builder-content ${activeStep === 'preview' ? 'preview-only' : ''}`}>
          {activeStep === 'preview' ? (
            <ResumePreview
              resumeData={resumeData}
              template={selectedTemplate || 'minimal'}
            />
          ) : (
            <>
              <ResumeForm
                activeStep={activeStep}
                resumeData={resumeData}
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
                addProject={addProject}
                updateProject={updateProject}
                removeProject={removeProject}
              />
              <ResumePreview
                resumeData={resumeData}
                template={selectedTemplate || 'minimal'}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
