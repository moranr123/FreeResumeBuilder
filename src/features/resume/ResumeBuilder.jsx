import { useState } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { initialResumeData } from '../../constants/resume'

function ResumeBuilder({ selectedTemplate = 'compact' }) {
  const [resumeData, setResumeData] = useState(initialResumeData)

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
        <ResumeForm
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
        />
      </div>
    </div>
  )
}

export default ResumeBuilder
