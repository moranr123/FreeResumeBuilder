/**
 * Single Column Layout Component
 * Used for classic template
 */
import { renderSectionHeader, textFlowStyles } from './layoutUtils'

export default function SingleColumnLayout({
  resumeData,
  selectedTemplate,
  colorScheme,
  themeColor,
}) {
  return (
    <div className="mt-1.5" style={{ overflow: 'hidden' }}>
      {/* Professional Summary */}
      {(resumeData.summary || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Summary', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <p className="m-0 text-[8.5pt] leading-[1.3]" style={{ whiteSpace: 'normal', wordBreak: 'normal', overflowWrap: 'break-word' }}>
              {resumeData.summary ? (
                <span style={{ color: colorScheme.colors.secondary }}>{resumeData.summary}</span>
              ) : (
                <span className="text-gray-400 italic">
                  Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.
                </span>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {(resumeData.experience.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Experience', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-1">
              {resumeData.experience.length > 0 ? (
                resumeData.experience.map(exp => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between mb-0.5">
                      <div className="flex-1">
                        <h3 className="text-[9.5pt] font-bold m-0 mb-0 leading-[1.2]" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                          {exp.position || 'Position'}
                        </h3>
                        <div className="text-[9pt] font-semibold mb-0 leading-[1.2]" style={{ color: themeColor, ...textFlowStyles }}>
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
                      <ul className="list-none p-0 m-0 mt-0">
                        {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
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
                  <div className="break-inside-avoid">
                    <div className="flex justify-between mb-0.5">
                      <div className="flex-1">
                        <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                          Senior Software Engineer
                        </h3>
                        <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
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
                    <ul className="list-none p-0 m-0 mt-0">
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Architected and implemented real-time data processing pipeline handling 50K requests/second
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Mentored team of 5 junior engineers, establishing code review practices and technical standards
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Optimized database queries and caching strategies, improving API response time by 60%
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Collaborated with product and design teams to deliver features increasing user engagement by 25%
                      </li>
                    </ul>
                  </div>
                  <div className="break-inside-avoid">
                    <div className="flex justify-between mb-0.5">
                      <div className="flex-1">
                        <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                          Software Engineer
                        </h3>
                        <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                          Startup Solutions
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[8pt] text-gray-400 italic">New York, NY</div>
                        <div className="text-[8pt] text-gray-400 italic font-medium">
                          Jun 2019 - Dec 2020
                        </div>
                      </div>
                    </div>
                    <ul className="list-none p-0 m-0 mt-0">
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Developed full-stack web applications using React, Node.js, and PostgreSQL
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Built RESTful APIs and GraphQL endpoints supporting mobile and web clients
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {(resumeData.projects.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Projects', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-1">
              {resumeData.projects.length > 0 ? (
                resumeData.projects.map(project => (
                  <div key={project.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[9.5pt] font-bold m-0 leading-[1.2]" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                        {project.name || 'Project Name'}
                      </h3>
                      {project.technologies && (
                        <span className="text-[7.5pt] italic" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{project.technologies}</span>
                      )}
                    </div>
                    {project.description && (
                      <ul className="list-none p-0 m-0 mt-0">
                        {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                            <span className="absolute left-1 font-bold text-[7pt]" style={{ color: colorScheme.colors.light }}>•</span>
                            {line.trim().replace(/^[•\-]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2.5 mt-0 text-[7.5pt]" style={{ color: themeColor }}>
                      {project.link && <span>{project.link}</span>}
                      {project.github && <span>{project.github}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                        E-Commerce Platform
                      </h3>
                      <span className="text-[7.5pt] text-gray-400 italic">React, Node.js, MongoDB</span>
                    </div>
                    <ul className="list-none p-0 m-0 mt-0">
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Built scalable e-commerce platform with payment integration and inventory management
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Implemented real-time order tracking and notification system using WebSockets
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Optimized database queries and caching, reducing page load time by 45%
                      </li>
                    </ul>
                    <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                      <span>github.com/username/ecommerce</span>
                    </div>
                  </div>
                  <div className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                        Task Management App
                      </h3>
                      <span className="text-[7.5pt] text-gray-400 italic">Vue.js, Express, PostgreSQL</span>
                    </div>
                    <ul className="list-none p-0 m-0 mt-0">
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Developed collaborative task management application with real-time updates
                      </li>
                      <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        Designed RESTful API architecture supporting 10K+ concurrent users
                      </li>
                    </ul>
                    <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                      <span>github.com/username/taskapp</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {(resumeData.education.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Education', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-1">
              {resumeData.education.length > 0 ? (
                resumeData.education.map(edu => (
                  <div key={edu.id} className="break-inside-avoid">
                    <div className="flex justify-between mb-0">
                      <div className="flex-1">
                        <h3 className="text-[9.5pt] font-bold m-0 mb-0 leading-[1.2]" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                          {edu.degree || 'Degree'}
                        </h3>
                        <div className="text-[9pt] font-semibold mb-0 leading-[1.2]" style={{ color: themeColor, ...textFlowStyles }}>
                          {edu.school || 'School'}
                        </div>
                        {edu.field && <div className="text-[8.5pt] italic" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>{edu.field}</div>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        {edu.location && <div className="text-[8pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{edu.location}</div>}
                        <div className="text-[8pt] font-medium" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>
                          {edu.startDate} - {edu.endDate}
                        </div>
                        {edu.gpa && <div className="text-[8pt] mt-0" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="break-inside-avoid">
                  <div className="flex justify-between mb-0">
                    <div className="flex-1">
                      <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                        Bachelor of Science in Computer Science
                      </h3>
                      <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                        State University
                      </div>
                      <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[8pt] text-gray-400 italic">City, State</div>
                      <div className="text-[8pt] text-gray-400 italic font-medium">
                        Aug 2016 - May 2020
                      </div>
                      <div className="text-[8pt] text-gray-400 italic mt-0">GPA: 3.8</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {(resumeData.skills.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Skills', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.length > 0 ? (
                resumeData.skills.map(skill => (
                  <span key={skill.id} className="text-[8.5pt]" style={{ color: colorScheme.colors.secondary }}>
                    {skill.name}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-[8.5pt] text-gray-400 italic">JavaScript</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Python</span>
                  <span className="text-[8.5pt] text-gray-400 italic">TypeScript</span>
                  <span className="text-[8.5pt] text-gray-400 italic">React</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Node.js</span>
                  <span className="text-[8.5pt] text-gray-400 italic">SQL</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Problem Solving</span>
                  <span className="text-[8.5pt] text-gray-400 italic">System Design</span>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      {(resumeData.tools.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Tools', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.tools.length > 0 ? (
                resumeData.tools.map(tool => (
                  <span key={tool.id} className="text-[8.5pt]" style={{ color: colorScheme.colors.secondary }}>
                    {tool.name}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-[8.5pt] text-gray-400 italic">Git</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Docker</span>
                  <span className="text-[8.5pt] text-gray-400 italic">AWS</span>
                  <span className="text-[8.5pt] text-gray-400 italic">PostgreSQL</span>
                  <span className="text-[8.5pt] text-gray-400 italic">MongoDB</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Jest</span>
                  <span className="text-[8.5pt] text-gray-400 italic">Webpack</span>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Languages */}
      {(resumeData.languages.length > 0 || true) && (
        <section className="mb-1.5" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Languages', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-wrap gap-2">
              {resumeData.languages.length > 0 ? (
                resumeData.languages.map(lang => (
                  <span key={lang.id} className="text-[8.5pt]" style={{ color: colorScheme.colors.secondary }}>
                    {lang.name} <span className="text-[7.5pt]" style={{ color: colorScheme.colors.muted }}>({lang.proficiency})</span>
                  </span>
                ))
              ) : (
                <>
                  <span className="text-[8.5pt] text-gray-400 italic">English <span className="text-[7.5pt] text-gray-400 italic">(Native)</span></span>
                  <span className="text-[8.5pt] text-gray-400 italic">Spanish <span className="text-[7.5pt] text-gray-400 italic">(Fluent)</span></span>
                  <span className="text-[8.5pt] text-gray-400 italic">French <span className="text-[7.5pt] text-gray-400 italic">(Intermediate)</span></span>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {(resumeData.certifications.length > 0 || true) && (
        <section className="mb-0" style={{ padding: 0, margin: 0 }}>
          {renderSectionHeader('Certifications', selectedTemplate, colorScheme, themeColor)}
          <div style={{ paddingTop: '7pt', margin: 0 }}>
            <div className="flex flex-col gap-1">
              {resumeData.certifications.length > 0 ? (
                resumeData.certifications.map(cert => (
                  <div key={cert.id} className="leading-[1.25]">
                    <div className="text-[8.5pt] font-semibold mb-0" style={{ color: colorScheme.colors.primary }}>{cert.name}</div>
                    {cert.issuer && <div className="text-[8pt]" style={{ color: colorScheme.colors.tertiary }}>{cert.issuer}</div>}
                    {cert.date && <div className="text-[7.5pt]" style={{ color: colorScheme.colors.muted }}>{cert.date}</div>}
                  </div>
                ))
              ) : (
                <>
                  <div className="leading-[1.25]">
                    <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">AWS Certified Solutions Architect</div>
                    <div className="text-[8pt] text-gray-400 italic">Amazon Web Services</div>
                    <div className="text-[7.5pt] text-gray-400 italic">Jan 2023</div>
                  </div>
                  <div className="leading-[1.25]">
                    <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">Google Cloud Professional</div>
                    <div className="text-[8pt] text-gray-400 italic">Google Cloud Platform</div>
                    <div className="text-[7.5pt] text-gray-400 italic">Mar 2022</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
