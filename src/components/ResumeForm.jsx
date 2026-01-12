import './ResumeForm.css'

function ResumeForm({
  activeStep,
  resumeData,
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
  addProject,
  updateProject,
  removeProject,
}) {
  const renderStepContent = () => {
    switch (activeStep) {
      case 'personal':
        return (
          <>
            <div className="form-card">
              <h2 className="card-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Professional Title <span className="optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="Software Engineer, Marketing Manager, etc."
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>LinkedIn <span className="optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="linkedin.com/in/username"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>GitHub <span className="optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="github.com/username"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-card">
              <h2 className="card-title">Professional Summary</h2>
              <div className="form-field">
                <textarea
                  placeholder="Write a brief summary of your professional background and key achievements..."
                  value={resumeData.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  rows="6"
                />
              </div>
            </div>
          </>
        )
      
      case 'education':
        return (
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Education</h2>
              <button onClick={addEducation} className="btn-primary">Add Education</button>
            </div>
            {resumeData.education.length === 0 && (
              <div className="empty-state">
                <p>No education entries yet. Click "Add Education" to get started.</p>
              </div>
            )}
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="form-item-card">
                <div className="form-grid">
                  <div className="form-field">
                    <label>School/University</label>
                    <input
                      type="text"
                      placeholder="University Name"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Degree</label>
                    <input
                      type="text"
                      placeholder="Bachelor's, Master's, etc."
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      placeholder="Computer Science, Business, etc."
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Location <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Start Date</label>
                    <input
                      type="text"
                      placeholder="Jan 2020"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>End Date</label>
                    <input
                      type="text"
                      placeholder="Dec 2023"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>GPA/Honors <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="3.8 or High Honors"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    />
                  </div>
                </div>
                <button onClick={() => removeEducation(edu.id)} className="btn-secondary">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'experience':
        return (
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Experience</h2>
              <button onClick={addExperience} className="btn-primary">Add Experience</button>
            </div>
            {resumeData.experience.length === 0 && (
              <div className="empty-state">
                <p>No experience entries yet. Click "Add Experience" to get started.</p>
              </div>
            )}
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="form-item-card">
                <div className="form-grid">
                  <div className="form-field">
                    <label>Company</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Position</label>
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Location <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Start Date</label>
                    <input
                      type="text"
                      placeholder="Jan 2020"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>End Date</label>
                    <input
                      type="text"
                      placeholder="Dec 2022"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="form-field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    <span>Currently working here</span>
                  </label>
                </div>
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows="4"
                  />
                </div>
                <button onClick={() => removeExperience(exp.id)} className="btn-secondary">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'skills':
        return (
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Skills</h2>
              <button onClick={addSkill} className="btn-primary">Add Skill</button>
            </div>
            {resumeData.skills.length === 0 && (
              <div className="empty-state">
                <p>No skills yet. Click "Add Skill" to get started.</p>
              </div>
            )}
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="form-item-card">
                <div className="form-grid">
                  <div className="form-field">
                    <label>Skill Name</label>
                    <input
                      type="text"
                      placeholder="JavaScript, Python, etc."
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Proficiency Level: {skill.level}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                      className="range-input"
                    />
                  </div>
                </div>
                <button onClick={() => removeSkill(skill.id)} className="btn-secondary">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return (
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Projects</h2>
              <button onClick={addProject} className="btn-primary">Add Project</button>
            </div>
            {resumeData.projects.length === 0 && (
              <div className="empty-state">
                <p>No projects yet. Click "Add Project" to get started.</p>
              </div>
            )}
            {resumeData.projects.map((project) => (
              <div key={project.id} className="form-item-card">
                <div className="form-grid">
                  <div className="form-field">
                    <label>Project Name</label>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Technologies</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB"
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Live Link <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="https://project.com"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>GitHub <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="github.com/username/project"
                      value={project.github}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the project, your role, and key features..."
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows="4"
                  />
                </div>
                <button onClick={() => removeProject(project.id)} className="btn-secondary">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'preview':
        return null
      
      default:
        return null
    }
  }

  return (
    <div className="resume-form">
      <div className="form-content">
        {renderStepContent()}
      </div>
    </div>
  )
}

export default ResumeForm
