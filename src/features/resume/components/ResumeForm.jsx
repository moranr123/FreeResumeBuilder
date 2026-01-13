import { useState, useMemo } from 'react'
import Icon from '../../../components/common/Icon'

const allSections = [
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'education', label: 'Education', icon: 'education' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills & More', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'project' },
]

function ResumeForm({
  resumeData,
  currentSection,
  setCurrentSection,
  selectedTemplate = 'modern',
  onFinish,
  onGoBack,
  updatePersonalInfo,
  updateSummary,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addTool,
  updateTool,
  removeTool,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addCertification,
  updateCertification,
  removeCertification,
  addProject,
  updateProject,
  removeProject,
}) {
  const [errors, setErrors] = useState({})
  
  // Filter sections based on template
  const sections = useMemo(() => {
    const baseSections = [
      { id: 'personal', label: 'Personal Info', icon: 'user' },
      { id: 'education', label: 'Education', icon: 'education' },
      { id: 'experience', label: 'Experience', icon: 'briefcase' },
    ]
    
    if (selectedTemplate === 'corporate') {
      // Corporate: Only Personal, Education, Experience, Skills
      return [
        ...baseSections,
        { id: 'skills', label: 'Skills & More', icon: 'skills' },
      ]
    } else {
      // All other templates: Personal, Education, Experience, Skills, Projects
      return [
        ...baseSections,
        { id: 'skills', label: 'Skills & More', icon: 'skills' },
        { id: 'projects', label: 'Projects', icon: 'project' },
      ]
    }
  }, [selectedTemplate])
  
  const currentSectionId = sections[currentSection]?.id

  // Validation functions
  const validatePersonal = () => {
    const newErrors = {}
    if (!resumeData.personalInfo.fullName?.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!resumeData.personalInfo.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!resumeData.personalInfo.phone?.trim()) {
      newErrors.phone = 'Phone is required'
    }
    if (!resumeData.personalInfo.location?.trim()) {
      newErrors.location = 'Location is required'
    }
    return newErrors
  }

  const validateEducation = () => {
    const newErrors = {}
    if (resumeData.education.length === 0) {
      newErrors.education_general = 'At least one education entry is required'
      return newErrors
    }
    resumeData.education.forEach((edu, index) => {
      if (!edu.school?.trim()) {
        newErrors[`education_${edu.id}_school`] = 'School/University is required'
      }
      if (!edu.degree?.trim()) {
        newErrors[`education_${edu.id}_degree`] = 'Degree is required'
      }
      if (!edu.field?.trim()) {
        newErrors[`education_${edu.id}_field`] = 'Field of study is required'
      }
      if (!edu.startDate?.trim()) {
        newErrors[`education_${edu.id}_startDate`] = 'Start date is required'
      }
      if (!edu.endDate?.trim()) {
        newErrors[`education_${edu.id}_endDate`] = 'End date is required'
      }
    })
    return newErrors
  }

  const validateExperience = () => {
    const newErrors = {}
    if (resumeData.experience.length === 0) {
      newErrors.experience_general = 'At least one experience entry is required'
      return newErrors
    }
    resumeData.experience.forEach((exp, index) => {
      if (!exp.company?.trim()) {
        newErrors[`experience_${exp.id}_company`] = 'Company is required'
      }
      if (!exp.position?.trim()) {
        newErrors[`experience_${exp.id}_position`] = 'Position is required'
      }
      if (!exp.startDate?.trim()) {
        newErrors[`experience_${exp.id}_startDate`] = 'Start date is required'
      }
      if (!exp.current && !exp.endDate?.trim()) {
        newErrors[`experience_${exp.id}_endDate`] = 'End date is required (or check "Currently working here")'
      }
      if (!exp.description?.trim()) {
        newErrors[`experience_${exp.id}_description`] = 'Description is required'
      }
    })
    return newErrors
  }

  const validateSkills = () => {
    const newErrors = {}
    
    // Validate Skills
    if (resumeData.skills.length === 0) {
      newErrors.skills_general = 'At least one skill is required'
      return newErrors
    }
    resumeData.skills.forEach((skill) => {
      if (!skill.name?.trim()) {
        newErrors[`skill_${skill.id}`] = 'Skill name is required'
      }
    })
    
    // Validate Tools - if tools exist, each must have a name
    resumeData.tools.forEach((tool) => {
      if (!tool.name?.trim()) {
        newErrors[`tool_${tool.id}`] = 'Tool name is required'
      }
    })
    
    // Validate Languages - if languages exist, each must have a name
    resumeData.languages.forEach((lang) => {
      if (!lang.name?.trim()) {
        newErrors[`language_${lang.id}_name`] = 'Language name is required'
      }
    })
    
    // Validate Certifications - if certifications exist, each must have a name
    resumeData.certifications.forEach((cert) => {
      if (!cert.name?.trim()) {
        newErrors[`certification_${cert.id}_name`] = 'Certification name is required'
      }
    })
    
    return newErrors
  }

  const validateProjects = () => {
    const newErrors = {}
    if (resumeData.projects.length === 0) {
      newErrors.projects_general = 'At least one project is required'
      return newErrors
    }
    resumeData.projects.forEach((project) => {
      if (!project.name?.trim()) {
        newErrors[`project_${project.id}_name`] = 'Project name is required'
      }
      if (!project.description?.trim()) {
        newErrors[`project_${project.id}_description`] = 'Project description is required'
      }
    })
    return newErrors
  }

  const validateCurrentSection = () => {
    let newErrors = {}
    switch (currentSectionId) {
      case 'personal':
        newErrors = validatePersonal()
        break
      case 'education':
        newErrors = validateEducation()
        break
      case 'experience':
        newErrors = validateExperience()
        break
      case 'skills':
        newErrors = validateSkills()
        break
      case 'projects':
        newErrors = validateProjects()
        break
      default:
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate all sections before finishing (only sections in current template)
  const validateAllSections = () => {
    const allErrors = {}
    
    // Validate personal info (always present)
    const personalErrors = validatePersonal()
    Object.assign(allErrors, personalErrors)
    
    // Validate education (always present)
    const educationErrors = validateEducation()
    Object.assign(allErrors, educationErrors)
    
    // Validate experience (always present)
    const experienceErrors = validateExperience()
    Object.assign(allErrors, experienceErrors)
    
    // Validate skills (always present)
    const skillsErrors = validateSkills()
    Object.assign(allErrors, skillsErrors)
    
    // Validate projects (only if in template)
    if (selectedTemplate !== 'corporate') {
      const projectsErrors = validateProjects()
      Object.assign(allErrors, projectsErrors)
    }
    
    return allErrors
  }

  const handleFinish = () => {
    const allErrors = validateAllSections()
    
    if (Object.keys(allErrors).length > 0) {
      // Find the first section with errors and navigate to it
      let sectionToNavigate = -1
      
      // Find section index by matching section ID
      if (allErrors.fullName || allErrors.email || allErrors.phone || allErrors.location) {
        sectionToNavigate = sections.findIndex(s => s.id === 'personal')
      }
      else if (allErrors.education_general || Object.keys(allErrors).some(key => key.startsWith('education_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'education')
      }
      else if (allErrors.experience_general || Object.keys(allErrors).some(key => key.startsWith('experience_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'experience')
      }
      else if (allErrors.skills_general || Object.keys(allErrors).some(key => key.startsWith('skill_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'skills')
      }
      else if (allErrors.projects_general || Object.keys(allErrors).some(key => key.startsWith('project_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'projects')
      }
      
      // Navigate to the section with errors
      if (sectionToNavigate >= 0 && sectionToNavigate !== currentSection) {
        setCurrentSection(sectionToNavigate)
      }
      
      // Show error message
      setErrors(allErrors)
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // All validations passed, proceed to finish
      setErrors({})
      if (onFinish) {
        onFinish()
      }
    }
  }

  const scrollToFirstError = (errors) => {
    // Wait a bit for errors to be set in state and DOM to update
    setTimeout(() => {
      // Find the first input/textarea field with error styling (border-red-500)
      const errorFields = document.querySelectorAll('input.border-red-500, textarea.border-red-500')
      
      if (errorFields.length > 0) {
        // Calculate offset to account for fixed header
        const headerHeight = 57 // Height of fixed header
        const elementTop = errorFields[0].getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementTop - headerHeight - 20 // 20px padding
        
        // Smooth scroll to the field with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Focus the field after a short delay to ensure scroll completes
        setTimeout(() => {
          errorFields[0].focus()
        }, 300)
        return
      }
      
      // Fallback: Find first error message element
      const firstErrorMsg = document.querySelector('.text-red-500, .bg-red-50')
      if (firstErrorMsg) {
        // Try to find the input/textarea near the error message
        const parentContainer = firstErrorMsg.closest('.flex-col, .bg-gray-50, .bg-white')
        if (parentContainer) {
          const inputField = parentContainer.querySelector('input, textarea')
          if (inputField) {
            const headerHeight = 57
            const elementTop = inputField.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementTop - headerHeight - 20
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            
            setTimeout(() => {
              inputField.focus()
            }, 300)
            return
          }
        }
        
        // Scroll to error message
        const headerHeight = 57
        const elementTop = firstErrorMsg.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementTop - headerHeight - 20
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        // Last resort: scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 200)
  }

  const nextSection = () => {
    // Validate current section - this sets errors and returns true/false
    let newErrors = {}
    switch (currentSectionId) {
      case 'personal':
        newErrors = validatePersonal()
        break
      case 'education':
        newErrors = validateEducation()
        break
      case 'experience':
        newErrors = validateExperience()
        break
      case 'skills':
        newErrors = validateSkills()
        break
      case 'projects':
        newErrors = validateProjects()
        break
      default:
        break
    }
    
    // Set errors in state
    setErrors(newErrors)
    
    // Check if there are any errors - if yes, prevent navigation
    const hasErrors = Object.keys(newErrors).length > 0
    
    if (hasErrors) {
      // Scroll to first error field
      scrollToFirstError(newErrors)
      return // Prevent navigation - do not proceed to next section
    }
    
    // Only proceed if no errors (validation passed)
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setErrors({})
      // Scroll to top when moving to next section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setErrors({})
      // Scroll to top when moving to previous section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToSection = (index) => {
    if (setCurrentSection) {
      setCurrentSection(index)
    }
    setErrors({})
  }

  const renderSection = () => {
    switch (currentSectionId) {
      case 'personal':
        return (
          <>
            <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => {
                      updatePersonalInfo('fullName', e.target.value)
                      if (errors.fullName) {
                        setErrors(prev => ({ ...prev, fullName: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Professional Title <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Software Engineer, Marketing Manager, etc."
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {selectedTemplate === 'with-image' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Profile Photo <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              updatePersonalInfo('profilePhoto', reader.result)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {resumeData.personalInfo.profilePhoto && (
                        <img 
                          src={resumeData.personalInfo.profilePhoto} 
                          alt="Profile preview" 
                          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => {
                      updatePersonalInfo('email', e.target.value)
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => {
                      updatePersonalInfo('phone', e.target.value)
                      if (errors.phone) {
                        setErrors(prev => ({ ...prev, phone: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => {
                      updatePersonalInfo('location', e.target.value)
                      if (errors.location) {
                        setErrors(prev => ({ ...prev, location: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors.location
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.location && (
                    <p className="text-xs text-red-500">{errors.location}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="linkedin.com/in/username"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    GitHub <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="github.com/username"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Professional Summary</h2>
              <div className="flex flex-col gap-2">
                <textarea
                  placeholder="Write a brief summary of your professional background and key achievements..."
                  value={resumeData.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  rows="6"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] leading-relaxed"
                />
              </div>
            </div>
          </>
        )

      case 'education':
        return (
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Education</h2>
              <button onClick={addEducation} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                Add Education
              </button>
            </div>
            {errors.education_general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.education_general}</p>
              </div>
            )}
            {resumeData.education.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                <p>No education entries yet. Click "Add Education" to get started.</p>
              </div>
            )}
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      School/University <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="University Name"
                      value={edu.school}
                      onChange={(e) => {
                        updateEducation(edu.id, 'school', e.target.value)
                        if (errors[`education_${edu.id}_school`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_school`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`education_${edu.id}_school`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`education_${edu.id}_school`] && (
                      <p className="text-xs text-red-500">{errors[`education_${edu.id}_school`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Bachelor's, Master's, etc."
                      value={edu.degree}
                      onChange={(e) => {
                        updateEducation(edu.id, 'degree', e.target.value)
                        if (errors[`education_${edu.id}_degree`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_degree`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`education_${edu.id}_degree`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`education_${edu.id}_degree`] && (
                      <p className="text-xs text-red-500">{errors[`education_${edu.id}_degree`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Field of Study <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Computer Science, Business, etc."
                      value={edu.field}
                      onChange={(e) => {
                        updateEducation(edu.id, 'field', e.target.value)
                        if (errors[`education_${edu.id}_field`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_field`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`education_${edu.id}_field`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`education_${edu.id}_field`] && (
                      <p className="text-xs text-red-500">{errors[`education_${edu.id}_field`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Location <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jan 2020"
                      value={edu.startDate}
                      onChange={(e) => {
                        updateEducation(edu.id, 'startDate', e.target.value)
                        if (errors[`education_${edu.id}_startDate`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_startDate`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`education_${edu.id}_startDate`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`education_${edu.id}_startDate`] && (
                      <p className="text-xs text-red-500">{errors[`education_${edu.id}_startDate`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Dec 2023"
                      value={edu.endDate}
                      onChange={(e) => {
                        updateEducation(edu.id, 'endDate', e.target.value)
                        if (errors[`education_${edu.id}_endDate`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_endDate`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`education_${edu.id}_endDate`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`education_${edu.id}_endDate`] && (
                      <p className="text-xs text-red-500">{errors[`education_${edu.id}_endDate`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      GPA/Honors <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="3.8 or High Honors"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button onClick={() => removeEducation(edu.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )

      case 'experience':
        return (
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Experience</h2>
              <button onClick={addExperience} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                Add Experience
              </button>
            </div>
            {errors.experience_general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.experience_general}</p>
              </div>
            )}
            {resumeData.experience.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                <p>No experience entries yet. Click "Add Experience" to get started.</p>
              </div>
            )}
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => {
                        updateExperience(exp.id, 'company', e.target.value)
                        if (errors[`experience_${exp.id}_company`]) {
                          setErrors(prev => ({ ...prev, [`experience_${exp.id}_company`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`experience_${exp.id}_company`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`experience_${exp.id}_company`] && (
                      <p className="text-xs text-red-500">{errors[`experience_${exp.id}_company`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.position}
                      onChange={(e) => {
                        updateExperience(exp.id, 'position', e.target.value)
                        if (errors[`experience_${exp.id}_position`]) {
                          setErrors(prev => ({ ...prev, [`experience_${exp.id}_position`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`experience_${exp.id}_position`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`experience_${exp.id}_position`] && (
                      <p className="text-xs text-red-500">{errors[`experience_${exp.id}_position`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Location <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jan 2020"
                      value={exp.startDate}
                      onChange={(e) => {
                        updateExperience(exp.id, 'startDate', e.target.value)
                        if (errors[`experience_${exp.id}_startDate`]) {
                          setErrors(prev => ({ ...prev, [`experience_${exp.id}_startDate`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`experience_${exp.id}_startDate`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`experience_${exp.id}_startDate`] && (
                      <p className="text-xs text-red-500">{errors[`experience_${exp.id}_startDate`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      End Date {!exp.current && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Dec 2022"
                      value={exp.endDate}
                      onChange={(e) => {
                        updateExperience(exp.id, 'endDate', e.target.value)
                        if (errors[`experience_${exp.id}_endDate`]) {
                          setErrors(prev => ({ ...prev, [`experience_${exp.id}_endDate`]: null }))
                        }
                      }}
                      disabled={exp.current}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
                        errors[`experience_${exp.id}_endDate`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`experience_${exp.id}_endDate`] && (
                      <p className="text-xs text-red-500">{errors[`experience_${exp.id}_endDate`]}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="text-sm text-gray-700 cursor-pointer">Currently working here</label>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => {
                      updateExperience(exp.id, 'description', e.target.value)
                      if (errors[`experience_${exp.id}_description`]) {
                        setErrors(prev => ({ ...prev, [`experience_${exp.id}_description`]: null }))
                      }
                    }}
                    rows="4"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 resize-y min-h-[100px] leading-relaxed ${
                      errors[`experience_${exp.id}_description`]
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors[`experience_${exp.id}_description`] && (
                    <p className="text-xs text-red-500">{errors[`experience_${exp.id}_description`]}</p>
                  )}
                </div>
                <button onClick={() => removeExperience(exp.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )

      case 'skills':
        return (
          <>
            <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Skills</h2>
                <button onClick={addSkill} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                  Add Skill
                </button>
              </div>
              <p className="text-sm text-gray-500 italic mb-4">Add your core technical and professional skills</p>
              {errors.skills_general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.skills_general}</p>
                </div>
              )}
              {resumeData.skills.length === 0 && (
                <div className="py-12 text-center text-gray-400 text-sm">
                  <p>No skills yet. Click "Add Skill" to get started.</p>
                </div>
              )}
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="JavaScript, Python, Project Management, etc."
                      value={skill.name}
                      onChange={(e) => {
                        updateSkill(skill.id, 'name', e.target.value)
                        if (errors[`skill_${skill.id}`]) {
                          setErrors(prev => ({ ...prev, [`skill_${skill.id}`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`skill_${skill.id}`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`skill_${skill.id}`] && (
                      <p className="text-xs text-red-500 mt-1">{errors[`skill_${skill.id}`]}</p>
                    )}
                  </div>
                  <button onClick={() => removeSkill(skill.id)} className="px-3 sm:px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 active:bg-gray-100 transition-colors whitespace-nowrap w-full sm:w-auto">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Tools - Hidden for corporate and with-image templates */}
            {selectedTemplate !== 'corporate' && selectedTemplate !== 'with-image' && (
              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Tools & Technologies</h2>
                  <button onClick={addTool} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                    Add Tool
                  </button>
                </div>
                <p className="text-sm text-gray-500 italic mb-4">Add software, frameworks, or tools you're proficient with</p>
                {resumeData.tools.length === 0 && (
                  <div className="py-12 text-center text-gray-400 text-sm">
                    <p>No tools yet. Click "Add Tool" to get started.</p>
                  </div>
                )}
                {resumeData.tools.map((tool) => (
                  <div key={tool.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="React, Docker, Figma, Git, etc."
                        value={tool.name}
                        onChange={(e) => {
                          updateTool(tool.id, e.target.value)
                          if (errors[`tool_${tool.id}`]) {
                            setErrors(prev => ({ ...prev, [`tool_${tool.id}`]: null }))
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                          errors[`tool_${tool.id}`]
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                        }`}
                      />
                      {errors[`tool_${tool.id}`] && (
                        <p className="text-xs text-red-500 mt-1">{errors[`tool_${tool.id}`]}</p>
                      )}
                    </div>
                    <button onClick={() => removeTool(tool.id)} className="px-3 sm:px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 active:bg-gray-100 transition-colors whitespace-nowrap w-full sm:w-auto">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Languages - Hidden for corporate template */}
            {selectedTemplate !== 'corporate' && (
              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Languages</h2>
                  <button onClick={addLanguage} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                    Add Language
                  </button>
                </div>
                <p className="text-sm text-gray-500 italic mb-4">List languages you speak and your proficiency level</p>
                {resumeData.languages.length === 0 && (
                  <div className="py-12 text-center text-gray-400 text-sm">
                    <p>No languages yet. Click "Add Language" to get started.</p>
                  </div>
                )}
                {resumeData.languages.map((lang) => (
                  <div key={lang.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Language</label>
                        <input
                          type="text"
                          placeholder="English, Spanish, etc."
                          value={lang.name}
                          onChange={(e) => {
                            updateLanguage(lang.id, 'name', e.target.value)
                            if (errors[`language_${lang.id}_name`]) {
                              setErrors(prev => ({ ...prev, [`language_${lang.id}_name`]: null }))
                            }
                          }}
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                            errors[`language_${lang.id}_name`]
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                          }`}
                        />
                        {errors[`language_${lang.id}_name`] && (
                          <p className="text-xs text-red-500">{errors[`language_${lang.id}_name`]}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Proficiency</label>
                        <select
                          value={lang.proficiency}
                          onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        >
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Professional">Professional</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Basic">Basic</option>
                        </select>
                      </div>
                    </div>
                    <button onClick={() => removeLanguage(lang.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications - Hidden for corporate template */}
            {selectedTemplate !== 'corporate' && (
              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Certifications</h2>
                  <button onClick={addCertification} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                    Add Certification
                  </button>
                </div>
                <p className="text-sm text-gray-500 italic mb-4">Add professional certifications and credentials</p>
                {resumeData.certifications.length === 0 && (
                  <div className="py-12 text-center text-gray-400 text-sm">
                    <p>No certifications yet. Click "Add Certification" to get started.</p>
                  </div>
                )}
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Certification Name</label>
                        <input
                          type="text"
                          placeholder="AWS Certified Solutions Architect"
                          value={cert.name}
                          onChange={(e) => {
                            updateCertification(cert.id, 'name', e.target.value)
                            if (errors[`certification_${cert.id}_name`]) {
                              setErrors(prev => ({ ...prev, [`certification_${cert.id}_name`]: null }))
                            }
                          }}
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                            errors[`certification_${cert.id}_name`]
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                          }`}
                        />
                        {errors[`certification_${cert.id}_name`] && (
                          <p className="text-xs text-red-500">{errors[`certification_${cert.id}_name`]}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
                        <input
                          type="text"
                          placeholder="Amazon Web Services"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Date Obtained</label>
                        <input
                          type="text"
                          placeholder="Jan 2023"
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button onClick={() => removeCertification(cert.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )

      case 'projects':
        return (
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Projects</h2>
              <button onClick={addProject} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
                Add Project
              </button>
            </div>
            {errors.projects_general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.projects_general}</p>
              </div>
            )}
            {resumeData.projects.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                <p>No projects yet. Click "Add Project" to get started.</p>
              </div>
            )}
            {resumeData.projects.map((project) => (
              <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => {
                        updateProject(project.id, 'name', e.target.value)
                        if (errors[`project_${project.id}_name`]) {
                          setErrors(prev => ({ ...prev, [`project_${project.id}_name`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                        errors[`project_${project.id}_name`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    />
                    {errors[`project_${project.id}_name`] && (
                      <p className="text-xs text-red-500">{errors[`project_${project.id}_name`]}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Technologies</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB"
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Live Link <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://project.com"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      GitHub <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="github.com/username/project"
                      value={project.github}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe the project, your role, and key features..."
                    value={project.description}
                    onChange={(e) => {
                      updateProject(project.id, 'description', e.target.value)
                      if (errors[`project_${project.id}_description`]) {
                        setErrors(prev => ({ ...prev, [`project_${project.id}_description`]: null }))
                      }
                    }}
                    rows="4"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 resize-y min-h-[100px] leading-relaxed ${
                      errors[`project_${project.id}_description`]
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors[`project_${project.id}_description`] && (
                    <p className="text-xs text-red-500">{errors[`project_${project.id}_description`]}</p>
                  )}
                </div>
                <button onClick={() => removeProject(project.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Current Section Content */}
        <div className="flex-1">
          {renderSection()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-3">
          <button
            onClick={currentSection === 0 ? onGoBack : prevSection}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-black text-white hover:bg-gray-800 active:bg-gray-900"
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden sm:inline">Go Back</span>
            <span className="sm:hidden">Back</span>
          </button>
          {currentSection === sections.length - 1 ? (
            <button
              onClick={handleFinish}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
            >
              <span className="hidden xs:inline">Finish</span>
              <span className="text-base sm:text-lg">✓</span>
            </button>
          ) : (
            <button
              onClick={nextSection}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            >
              <span>Next</span>
              <span className="text-base sm:text-lg">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeForm
