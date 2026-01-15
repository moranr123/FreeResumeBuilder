/**
 * Image Layout Component
 * Used for with-image template
 */
import { renderSectionHeader, textFlowStyles } from './layoutUtils'

export default function ImageLayout({
  resumeData,
  selectedTemplate,
  colorScheme,
  themeColor,
}) {
  return (
    <div className="flex gap-5 mt-2" style={{ overflow: 'hidden' }}>
      {/* Left Column - Photo and Sidebar Info - Fixed width in print units */}
      <aside className="flex-shrink-0" style={{ width: '28%', minWidth: 0, overflow: 'hidden' }}>
        {/* Profile Photo */}
        {(resumeData.personalInfo.profilePhoto || true) && (
          <div className="mb-3">
            {resumeData.personalInfo.profilePhoto ? (
              <img 
                src={resumeData.personalInfo.profilePhoto} 
                alt="Profile" 
                className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                <span className="text-[8pt] text-gray-400 italic">Profile Photo</span>
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.length > 0 || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Skills', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <ul className="list-none p-0 m-0">
                {resumeData.skills.length > 0 ? (
                  resumeData.skills.map(skill => (
                    <li key={skill.id} className="py-0.5 text-[8.5pt] leading-[1.3]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                      {skill.name}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="py-0.5 text-[8.5pt] leading-[1.3] text-gray-400 italic" style={textFlowStyles}>JavaScript</li>
                    <li className="py-0.5 text-[8.5pt] leading-[1.3] text-gray-400 italic" style={textFlowStyles}>Python</li>
                    <li className="py-0.5 text-[8.5pt] leading-[1.3] text-gray-400 italic" style={textFlowStyles}>React</li>
                    <li className="py-0.5 text-[8.5pt] leading-[1.3] text-gray-400 italic" style={textFlowStyles}>Node.js</li>
                    <li className="py-0.5 text-[8.5pt] leading-[1.3] text-gray-400 italic" style={textFlowStyles}>SQL</li>
                  </>
                )}
              </ul>
            </div>
          </section>
        )}

        {/* Languages */}
        {(resumeData.languages.length > 0 || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Languages', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <ul className="list-none p-0 m-0">
                {resumeData.languages.length > 0 ? (
                  resumeData.languages.map(lang => (
                    <li key={lang.id} className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.3]" style={textFlowStyles}>
                      <span className="font-medium" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>{lang.name}</span>
                      <span className="text-[7.5pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{lang.proficiency}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.3]" style={textFlowStyles}>
                      <span className="font-medium text-gray-400 italic" style={textFlowStyles}>English</span>
                      <span className="text-[7.5pt] text-gray-400 italic" style={textFlowStyles}>Native</span>
                    </li>
                    <li className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.3]" style={textFlowStyles}>
                      <span className="font-medium text-gray-400 italic" style={textFlowStyles}>Spanish</span>
                      <span className="text-[7.5pt] text-gray-400 italic" style={textFlowStyles}>Fluent</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </section>
        )}

        {/* Certifications */}
        {(resumeData.certifications.length > 0 || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Certifications', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <div className="flex flex-col gap-1.5">
                {resumeData.certifications.length > 0 ? (
                  resumeData.certifications.map(cert => (
                    <div key={cert.id} className="leading-[1.3]">
                      <div className="text-[8.5pt] font-semibold mb-0" style={{ color: colorScheme.colors.primary }}>{cert.name}</div>
                      {cert.issuer && <div className="text-[8pt]" style={{ color: colorScheme.colors.tertiary }}>{cert.issuer}</div>}
                      {cert.date && <div className="text-[7.5pt]" style={{ color: colorScheme.colors.muted }}>{cert.date}</div>}
                    </div>
                  ))
                ) : (
                  <div className="leading-[1.3]">
                    <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">AWS Certified</div>
                    <div className="text-[8pt] text-gray-400 italic">Amazon Web Services</div>
                    <div className="text-[7.5pt] text-gray-400 italic">Jan 2023</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </aside>

      {/* Right Column - Main Content - Fixed width in print units */}
      <main className="flex-grow" style={{ width: '72%', minWidth: 0, overflow: 'hidden' }}>
        {/* Professional Summary */}
        {(resumeData.summary || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Professional Summary', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <p className="m-0 text-[9pt] leading-[1.4]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                {resumeData.summary ? (
                  <span>{resumeData.summary}</span>
                ) : (
                  <span className="italic" style={{ color: colorScheme.colors.muted }}>
                    Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users.
                  </span>
                )}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {(resumeData.experience.length > 0 || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Experience', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <div className="flex flex-col gap-2">
                {resumeData.experience.length > 0 ? (
                  resumeData.experience.map(exp => (
                    <div key={exp.id} className="mb-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[10pt] font-bold mb-0 leading-tight" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                            {exp.position || 'Position'}
                          </h3>
                          <div className="text-[9.5pt] font-semibold mb-0 leading-tight" style={{ color: themeColor, ...textFlowStyles }}>
                            {exp.company || 'Company'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {exp.location && <div className="text-[8pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{exp.location}</div>}
                          <div className="text-[8pt] font-medium" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="list-none p-0 m-0 mt-0.5">
                          {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                            <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                              <span className="absolute left-1 font-bold text-[7pt]" style={{ color: colorScheme.colors.light }}>•</span>
                              {line.trim().replace(/^[•\-]\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mb-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[10pt] font-bold text-gray-400 italic mb-0 leading-tight">
                            Senior Software Engineer
                          </h3>
                          <div className="text-[9.5pt] font-semibold text-gray-400 italic mb-0 leading-tight">
                            Tech Company Inc.
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8pt] text-gray-400 italic">San Francisco, CA</div>
                          <div className="text-[8pt] text-gray-400 italic font-medium">
                            Jan 2021 - Present
                          </div>
                        </div>
                      </div>
                      <ul className="list-none p-0 m-0 mt-0.5">
                        <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Led development of microservices architecture serving 2M+ daily active users
                        </li>
                        <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Architected real-time data processing pipeline handling 50K requests/second
                        </li>
                        <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Mentored team of 5 junior engineers, establishing code review practices
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {(resumeData.education.length > 0 || true) && (
          <section className="mb-3" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Education', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <div className="flex flex-col gap-2">
                {resumeData.education.length > 0 ? (
                  resumeData.education.map(edu => (
                    <div key={edu.id} className="mb-0">
                      <h3 className="text-[10pt] font-bold mb-0 leading-tight" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                        {edu.degree || 'Degree'}
                      </h3>
                      <div className="text-[9.5pt] font-semibold mb-0 leading-tight" style={{ color: themeColor, ...textFlowStyles }}>
                        {edu.school || 'School'}
                      </div>
                      {edu.field && <div className="text-[8.5pt] italic" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>{edu.field}</div>}
                      <div className="text-[8pt] mt-0.5" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mb-0">
                    <h3 className="text-[10pt] font-bold text-gray-400 italic mb-0 leading-tight">
                      Bachelor of Science
                    </h3>
                    <div className="text-[9.5pt] font-semibold text-gray-400 italic mb-0 leading-tight">
                      State University
                    </div>
                    <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                    <div className="text-[8pt] text-gray-400 italic mt-0.5">2016 - 2020</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {(resumeData.projects.length > 0 || true) && (
          <section className="mb-0" style={{ padding: 0, margin: 0 }}>
            {renderSectionHeader('Projects', selectedTemplate, colorScheme, themeColor)}
            <div style={{ paddingTop: '7pt', margin: 0 }}>
              <div className="flex flex-col gap-2">
                {resumeData.projects.length > 0 ? (
                  resumeData.projects.map(project => (
                    <div key={project.id} className="mb-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-[10pt] font-bold leading-tight" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                          {project.name || 'Project Name'}
                        </h3>
                        {project.technologies && (
                          <span className="text-[7.5pt] italic" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{project.technologies}</span>
                        )}
                      </div>
                      {project.description && (
                        <ul className="list-none p-0 m-0 mt-0">
                          {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                            <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                              <span className="absolute left-1 font-bold text-[7pt]" style={{ color: colorScheme.colors.light }}>•</span>
                              {line.trim().replace(/^[•\-]\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="mb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[10pt] font-bold text-gray-400 italic leading-tight">
                        E-Commerce Platform
                      </h3>
                      <span className="text-[7.5pt] text-gray-400 italic">React, Node.js</span>
                    </div>
                    <ul className="list-none p-0 m-0 mt-0">
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.35] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Built scalable e-commerce platform with payment integration
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
