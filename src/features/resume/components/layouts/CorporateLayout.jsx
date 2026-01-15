/**
 * Corporate Layout Component
 * Used for corporate template
 */
import { renderSectionHeader, textFlowStyles, hasContent } from './layoutUtils'

export default function CorporateLayout({
  resumeData,
  selectedTemplate,
  colorScheme,
  themeColor,
}) {
  return (
    <div className="flex gap-6 mt-3" style={{ overflow: 'hidden' }}>
      {/* Left Column - Education and Skills - Fixed width in print units */}
      <aside className="flex-shrink-0" style={{ width: '35%', minWidth: 0, overflow: 'hidden' }}>
        {/* Education */}
        <section className="mb-4" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Education', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-2.5">
              {hasContent.education(resumeData.education) ? (
                  resumeData.education.map(edu => (
                    <div key={edu.id} className="mb-1">
                      <h3 className="text-[10pt] font-semibold mb-0.5 leading-tight text-gray-900" style={textFlowStyles}>
                        {edu.degree || 'Degree'}
                      </h3>
                      <div className="text-[9pt] mb-0.5" style={{ color: themeColor, ...textFlowStyles }}>{edu.school || 'School'}</div>
                      {edu.field && <div className="text-[8.5pt] italic text-gray-600" style={textFlowStyles}>{edu.field}</div>}
                      <div className="text-[8.5pt] mt-0.5 text-gray-600" style={textFlowStyles}>
                        {edu.startDate} - {edu.endDate}
                      </div>
                      {edu.gpa && <div className="text-[8.5pt] text-gray-600" style={textFlowStyles}>GPA: {edu.gpa}</div>}
                    </div>
                  ))
                ) : (
                  <div className="mb-1">
                    <h3 className="text-[10pt] font-semibold text-gray-400 italic mb-0.5 leading-tight">
                      Bachelor of Science
                    </h3>
                    <div className="text-[9pt] text-gray-400 italic mb-0.5">State University</div>
                    <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                    <div className="text-[8.5pt] text-gray-400 italic mt-0.5">2016 - 2020</div>
                  </div>
                )}
              </div>
            </div>
          </section>

        {/* Skills */}
        <section className="mb-4" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Skills', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <ul className="list-none p-0 m-0">
              {hasContent.skills(resumeData.skills) ? (
                  resumeData.skills.map(skill => (
                    <li key={skill.id} className="py-0.5 text-[9pt] leading-[1.4] text-gray-700" style={textFlowStyles}>
                      • {skill.name}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• JavaScript</li>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• Python</li>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• React</li>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• Node.js</li>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• SQL</li>
                    <li className="py-0.5 text-[9pt] leading-[1.4] text-gray-400 italic" style={textFlowStyles}>• System Design</li>
                  </>
                )}
              </ul>
            </div>
          </section>
      </aside>

      {/* Right Column - Summary and Work History - Fixed width in print units */}
      <main className="flex-grow" style={{ width: '65%', minWidth: 0, overflow: 'hidden' }}>
        {/* Professional Summary */}
        <section className="mb-4" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Professional Summary', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <p className="m-0 text-[9.5pt] leading-[1.5] text-gray-700" style={textFlowStyles}>
              {hasContent.summary(resumeData.summary) ? (
                <span>{resumeData.summary}</span>
              ) : (
                <span className="italic text-gray-500">
                  Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.
                </span>
              )}
            </p>
          </div>
        </section>

        {/* Work History */}
        <section className="mb-4" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Work History', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-3">
              {hasContent.experience(resumeData.experience) ? (
                  resumeData.experience.map(exp => (
                    <div key={exp.id} className="mb-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-[10.5pt] font-semibold mb-0.5 text-gray-900" style={textFlowStyles}>
                            {exp.position || 'Position'}
                          </h3>
                          <div className="text-[9.5pt] font-medium" style={{ color: themeColor, ...textFlowStyles }}>
                            {exp.company || 'Company'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {exp.location && <div className="text-[8.5pt] text-gray-600" style={textFlowStyles}>{exp.location}</div>}
                          <div className="text-[8.5pt] font-medium text-gray-600" style={textFlowStyles}>
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="list-none p-0 m-0 mt-1">
                          {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                            <li key={idx} className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-700" style={textFlowStyles}>
                              <span className="absolute left-0" style={{ color: themeColor }}>•</span>
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
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-[10.5pt] font-semibold text-gray-400 italic mb-0.5">
                            Senior Software Engineer
                          </h3>
                          <div className="text-[9.5pt] text-gray-400 italic font-medium">
                            Tech Company Inc.
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8.5pt] text-gray-400 italic">San Francisco, CA</div>
                          <div className="text-[8.5pt] text-gray-400 italic font-medium">
                            Jan 2021 - Present
                          </div>
                        </div>
                      </div>
                      <ul className="list-none p-0 m-0 mt-1">
                        <li className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-400 italic">
                          <span className="absolute left-0 text-gray-400">•</span>
                          Led development of microservices architecture serving 2M+ daily active users
                        </li>
                        <li className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-400 italic">
                          <span className="absolute left-0 text-gray-400">•</span>
                          Architected real-time data processing pipeline handling 50K requests/second
                        </li>
                        <li className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-400 italic">
                          <span className="absolute left-0 text-gray-400">•</span>
                          Mentored team of 5 junior engineers, establishing code review practices
                        </li>
                      </ul>
                    </div>
                    <div className="mb-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-[10.5pt] font-semibold text-gray-400 italic mb-0.5">
                            Software Engineer
                          </h3>
                          <div className="text-[9.5pt] text-gray-400 italic font-medium">
                            Startup Solutions
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8.5pt] text-gray-400 italic">New York, NY</div>
                          <div className="text-[8.5pt] text-gray-400 italic font-medium">
                            Jun 2019 - Dec 2020
                          </div>
                        </div>
                      </div>
                      <ul className="list-none p-0 m-0 mt-1">
                        <li className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-400 italic">
                          <span className="absolute left-0 text-gray-400">•</span>
                          Developed full-stack web applications using React, Node.js, and PostgreSQL
                        </li>
                        <li className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4] text-gray-400 italic">
                          <span className="absolute left-0 text-gray-400">•</span>
                          Built RESTful APIs and GraphQL endpoints supporting mobile and web clients
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
      </main>
    </div>
  )
}
