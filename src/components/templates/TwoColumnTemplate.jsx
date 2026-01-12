import './TwoColumnTemplate.css'
import profileImage from '../../assets/logo.jpg'

function TwoColumnTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="two-column-template">
      <div className="two-column-left">
        <header className="two-column-header">
          <div className="profile-image-container">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <h1>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.email && <p className="contact-item">{personalInfo.email}</p>}
          {personalInfo.phone && <p className="contact-item">{personalInfo.phone}</p>}
          {personalInfo.location && <p className="contact-item">{personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="contact-item">{personalInfo.linkedin}</p>}
          {personalInfo.github && <p className="contact-item">{personalInfo.github}</p>}
        </header>

        {skills.length > 0 && (
          <section className="two-column-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-row">
                  <span className="skill-name">{skill.name || 'Skill'}</span>
                  <div className="skill-dots">
                    {[...Array(10)].map((_, i) => (
                      <span
                        key={i}
                        className={`skill-dot ${i < skill.level ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="two-column-section">
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="two-column-item">
                <h3>{edu.degree || 'Degree'}</h3>
                <p className="institution">{edu.school || 'School'}</p>
                {edu.field && <p className="field">{edu.field}</p>}
                <p className="date">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="two-column-right">
        {summary && (
          <section className="two-column-section">
            <h2>Profile</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="two-column-section">
            <h2>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="two-column-item">
                <div className="item-header">
                  <h3>{exp.position || 'Position'}</h3>
                  <span className="date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="company">{exp.company || 'Company'}</p>
                {exp.description && (
                  <div className="description">
                    {exp.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="two-column-section">
            <h2>Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="two-column-item">
                <h3>{project.name || 'Project Name'}</h3>
                {project.technologies && (
                  <p className="technologies">{project.technologies}</p>
                )}
                {project.description && <p className="description">{project.description}</p>}
                {(project.link || project.github) && (
                  <p className="links">
                    {project.link && <span>{project.link}</span>}
                    {project.github && <span>{project.github}</span>}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default TwoColumnTemplate
