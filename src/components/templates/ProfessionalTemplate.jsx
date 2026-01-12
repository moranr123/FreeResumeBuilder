import './ProfessionalTemplate.css'
import profileImage from '../../assets/logo.jpg'

function ProfessionalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="professional-template">
      <div className="professional-left">
        <header className="professional-header">
          <div className="profile-image-container">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <h1>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.title && (
            <p className="professional-title">{personalInfo.title.toUpperCase()}</p>
          )}
        </header>

        <section className="professional-section">
          <h2>Details</h2>
          <div className="details-list">
            {personalInfo.location && (
              <p className="detail-item">{personalInfo.location}</p>
            )}
            {personalInfo.phone && (
              <p className="detail-item">{personalInfo.phone}</p>
            )}
            {personalInfo.email && (
              <p className="detail-item">{personalInfo.email}</p>
            )}
            {personalInfo.linkedin && (
              <p className="detail-item">{personalInfo.linkedin}</p>
            )}
            {personalInfo.github && (
              <p className="detail-item">{personalInfo.github}</p>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="professional-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span className="skill-text">{skill.name || 'Skill'}</span>
                  <div className="skill-line"></div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="professional-right">
        {summary && (
          <section className="professional-section">
            <h2>Profile</h2>
            <p className="summary-text">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="professional-section">
            <h2>Employment History</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="professional-item">
                <div className="item-header">
                  <div>
                    <h3>{exp.position || 'Position'}</h3>
                    <span className="item-company">{exp.company || 'Company'}</span>
                    {exp.location && <span className="item-location">{exp.location}</span>}
                  </div>
                  <span className="item-date">
                    {(exp.startDate || '').toUpperCase()} - {exp.current ? 'PRESENT' : (exp.endDate || '').toUpperCase()}
                  </span>
                </div>
                {exp.description && (
                  <ul className="item-bullets">
                    {exp.description.split('\n').map((line, idx) => (
                      line.trim() && (
                        <li key={idx}>{line.trim()}</li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="professional-section">
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="professional-item">
                <div className="item-header">
                  <div>
                    <h3>{edu.degree || 'Degree'}</h3>
                    <span className="item-company">{edu.school || 'School'}</span>
                    {edu.location && <span className="item-location">{edu.location}</span>}
                  </div>
                  <span className="item-date">
                    {(edu.startDate || '').toUpperCase()} - {(edu.endDate || '').toUpperCase()}
                  </span>
                </div>
                {edu.gpa && <div className="item-meta">Graduated with {edu.gpa}</div>}
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="professional-section">
            <h2>Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="professional-item">
                <div className="item-header">
                  <div>
                    <h3>{project.name || 'Project Name'}</h3>
                    {project.technologies && (
                      <span className="item-tech">{project.technologies}</span>
                    )}
                  </div>
                </div>
                {project.description && (
                  <ul className="item-bullets">
                    {project.description.split('\n').map((line, idx) => (
                      line.trim() && (
                        <li key={idx}>{line.trim()}</li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default ProfessionalTemplate
