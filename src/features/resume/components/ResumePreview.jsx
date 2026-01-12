import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import Icon from '../../../components/common/Icon'

function ResumePreview({ resumeData, selectedTemplate = 'compact' }) {
  const resumeRef = useRef(null)

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      // Wait a bit for fonts to load
      await new Promise(resolve => setTimeout(resolve, 300))

      const canvas = await html2canvas(resumeRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123, // A4 height in pixels at 96 DPI
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        allowTaint: true,
        foreignObjectRendering: false,
      })

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Add image to fill the entire page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const getTemplateClasses = () => {
    const base = "bg-white w-[210mm] min-h-[297mm] max-h-[297mm] border border-gray-200 shadow-sm font-sans text-gray-900"
    const styles = {
      compact: `${base} text-[9pt] leading-[1.32] p-[10mm_12mm]`,
      modern: `${base} text-[9.5pt] leading-[1.4] p-[12mm_14mm]`,
      classic: `${base} text-[9pt] leading-[1.35] p-[12mm_15mm]`,
      minimal: `${base} text-[9pt] leading-[1.5] p-[10mm_12mm]`,
    }
    return styles[selectedTemplate] || styles.compact
  }

  const renderHeader = () => {
    const headerStyles = {
      compact: 'text-center mb-2 pb-1.5 border-b border-gray-300',
      modern: 'text-center mb-3 pb-2 border-b-2 border-gray-400',
      classic: 'text-center mb-3 pb-2 border-b border-gray-300',
      minimal: 'text-center mb-2 pb-1 border-b border-gray-200',
    }
    const nameStyles = {
      compact: 'text-[17pt] font-bold tracking-wider mb-0.5 text-black uppercase',
      modern: 'text-[18pt] font-bold tracking-wide mb-1 text-black',
      classic: 'text-[18pt] font-bold tracking-normal mb-1 text-black',
      minimal: 'text-[16pt] font-semibold tracking-wide mb-0.5 text-black',
    }
    const titleStyles = {
      compact: 'text-[9.5pt] font-medium mb-1 text-gray-600',
      modern: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      classic: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      minimal: 'text-[9pt] font-normal mb-1 text-gray-500',
    }
    const contactStyles = {
      compact: 'flex justify-center flex-wrap gap-1 text-[8pt] text-gray-600',
      modern: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      classic: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      minimal: 'flex justify-center flex-wrap gap-1 text-[7.5pt] text-gray-500',
    }

    return (
      <header className={headerStyles[selectedTemplate] || headerStyles.compact}>
        <h1 className={nameStyles[selectedTemplate] || nameStyles.compact}>
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        {resumeData.personalInfo.title && (
          <p className={titleStyles[selectedTemplate] || titleStyles.compact}>
            {resumeData.personalInfo.title}
          </p>
        )}
        <div className={contactStyles[selectedTemplate] || contactStyles.compact}>
          {resumeData.personalInfo.email && (
            <span className="inline-block">{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.phone}</span>
            </>
          )}
          {resumeData.personalInfo.location && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.location}</span>
            </>
          )}
          {resumeData.personalInfo.linkedin && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.linkedin}</span>
            </>
          )}
          {resumeData.personalInfo.github && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.github}</span>
            </>
          )}
        </div>
      </header>
    )
  }

  const renderSectionHeader = (title) => {
    const headerStyles = {
      compact: 'text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black',
      modern: 'text-[10pt] font-bold uppercase tracking-wide mb-1 text-black',
      classic: 'text-[10pt] font-bold uppercase tracking-wide mb-1 text-black',
      minimal: 'text-[9pt] font-semibold uppercase tracking-wide mb-0.5 text-gray-800',
    }
    const dividerStyles = {
      compact: 'h-[0.5px] bg-gray-300 mb-1.5',
      modern: 'h-[1px] bg-gray-400 mb-2',
      classic: 'h-[1px] bg-gray-300 mb-2',
      minimal: 'h-[0.5px] bg-gray-200 mb-1',
    }
    return (
      <>
        <h2 className={headerStyles[selectedTemplate] || headerStyles.compact} style={{ fontVariant: 'small-caps' }}>
          {title}
        </h2>
        <div className={dividerStyles[selectedTemplate] || dividerStyles.compact}></div>
      </>
    )
  }

  const renderTwoColumnLayout = () => (
    <div className={`flex gap-2.5 mt-2`}>
            {/* Left Column - 30% */}
            <aside className="w-[30%] flex-shrink-0">
              {/* Skills */}
              {(resumeData.skills.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Skills')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.skills.length > 0 ? (
                      resumeData.skills.map(skill => (
                        <li key={skill.id} className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-700">
                          {skill.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">JavaScript</li>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">Python</li>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">Problem Solving</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Tools */}
              {(resumeData.tools.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Tools')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.tools.length > 0 ? (
                      resumeData.tools.map(tool => (
                        <li key={tool.id} className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-700">
                          {tool.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">React</li>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">Node.js</li>
                        <li className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-400 italic">Git</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {(resumeData.languages.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Languages')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.languages.length > 0 ? (
                      resumeData.languages.map(lang => (
                        <li key={lang.id} className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.28]">
                          <span className="font-medium text-gray-900">{lang.name}</span>
                          <span className="text-[7.5pt] text-gray-500">{lang.proficiency}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.28]">
                          <span className="font-medium text-gray-400 italic">English</span>
                          <span className="text-[7.5pt] text-gray-400 italic">Native</span>
                        </li>
                        <li className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.28]">
                          <span className="font-medium text-gray-400 italic">Spanish</span>
                          <span className="text-[7.5pt] text-gray-400 italic">Fluent</span>
                        </li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Certifications */}
              {(resumeData.certifications.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Certifications')}
                  <div className="flex flex-col gap-1.5">
                    {resumeData.certifications.length > 0 ? (
                      resumeData.certifications.map(cert => (
                        <div key={cert.id} className="leading-[1.28]">
                          <div className="text-[8.5pt] font-semibold text-gray-900 mb-0.5">{cert.name}</div>
                          {cert.issuer && <div className="text-[8pt] text-gray-600">{cert.issuer}</div>}
                          {cert.date && <div className="text-[7.5pt] text-gray-500">{cert.date}</div>}
                        </div>
                      ))
                    ) : (
                      <div className="leading-[1.28]">
                        <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0.5">AWS Certified</div>
                        <div className="text-[8pt] text-gray-400 italic">Amazon Web Services</div>
                        <div className="text-[7.5pt] text-gray-400 italic">Jan 2023</div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </aside>

            {/* Right Column - 70% */}
            <main className="w-[70%] flex-grow">
              {/* Professional Summary */}
              {(resumeData.summary || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Summary')}
                  <p className="m-0 text-[8.5pt] leading-[1.35] text-justify">
                    {resumeData.summary ? (
                      <span className="text-gray-700">{resumeData.summary}</span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Write a brief summary of your professional background, key skills, and career objectives. 
                        Highlight your most relevant experience and what makes you unique as a candidate.
                      </span>
                    )}
                  </p>
                </section>
              )}

              {/* Experience */}
              {(resumeData.experience.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Experience')}
                  <div className="flex flex-col gap-1.5">
                    {resumeData.experience.length > 0 ? (
                      resumeData.experience.map(exp => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between mb-0.5">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-black leading-[1.25]">
                              {exp.position || 'Position'}
                            </h3>
                            <div className="text-[9pt] font-semibold text-blue-600 mb-0.5 leading-[1.25]">
                              {exp.company || 'Company'}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {exp.location && <div className="text-[8pt] text-gray-500">{exp.location}</div>}
                            <div className="text-[8pt] text-gray-600 font-medium">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <ul className="list-none p-0 m-0.5 mt-0">
                            {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <li key={idx} className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-700">
                                <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                                {line.trim().replace(/^[•\-]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="break-inside-avoid">
                      <div className="flex justify-between mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-gray-400 italic leading-[1.25]">
                            Job Title / Position
                          </h3>
                          <div className="text-[9pt] font-semibold text-gray-400 italic mb-0.5 leading-[1.25]">
                            Company Name
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8pt] text-gray-400 italic">City, State</div>
                          <div className="text-[8pt] text-gray-400 italic font-medium">
                            Jan 2020 - Present
                          </div>
                        </div>
                      </div>
                      <ul className="list-none p-0 m-0.5 mt-0">
                        <li className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Describe your key responsibilities and achievements
                        </li>
                        <li className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Include specific metrics and results when possible
                        </li>
                      </ul>
                    </div>
                  )}
                  </div>
                </section>
              )}

              {/* Projects */}
              {(resumeData.projects.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Projects')}
                  <div className="flex flex-col gap-1.5">
                    {resumeData.projects.length > 0 ? (
                      resumeData.projects.map(project => (
                      <div key={project.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-[9.5pt] font-bold m-0 text-black leading-[1.25]">
                            {project.name || 'Project Name'}
                          </h3>
                          {project.technologies && (
                            <span className="text-[7.5pt] text-gray-500 italic">{project.technologies}</span>
                          )}
                        </div>
                        {project.description && (
                          <ul className="list-none p-0 m-0.5 mt-0">
                            {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <li key={idx} className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-700">
                                <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                                {line.trim().replace(/^[•\-]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex gap-2.5 mt-0.5 text-[7.5pt] text-blue-600">
                          {project.link && <span>{project.link}</span>}
                          {project.github && <span>{project.github}</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.25]">
                          Project Name
                        </h3>
                        <span className="text-[7.5pt] text-gray-400 italic">React, Node.js</span>
                      </div>
                      <ul className="list-none p-0 m-0.5 mt-0">
                        <li className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Brief description of the project and your role
                        </li>
                        <li className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-400 italic">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          Key features or outcomes achieved
                        </li>
                      </ul>
                      <div className="flex gap-2.5 mt-0.5 text-[7.5pt] text-gray-400 italic">
                        <span>github.com/username/project</span>
                      </div>
                    </div>
                  )}
                  </div>
                </section>
              )}

              {/* Education */}
              {(resumeData.education.length > 0 || true) && (
                <section className="mb-2">
                  {renderSectionHeader('Education')}
                  <div className="flex flex-col gap-1.5">
                    {resumeData.education.length > 0 ? (
                      resumeData.education.map(edu => (
                      <div key={edu.id} className="break-inside-avoid">
                        <div className="flex justify-between mb-0.5">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-black leading-[1.25]">
                              {edu.degree || 'Degree'}
                            </h3>
                            <div className="text-[9pt] font-semibold text-blue-600 mb-0.5 leading-[1.25]">
                              {edu.school || 'School'}
                            </div>
                            {edu.field && <div className="text-[8.5pt] text-gray-600 italic">{edu.field}</div>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            {edu.location && <div className="text-[8pt] text-gray-500">{edu.location}</div>}
                            <div className="text-[8pt] text-gray-600 font-medium">
                              {edu.startDate} - {edu.endDate}
                            </div>
                            {edu.gpa && <div className="text-[8pt] text-gray-600 mt-0.5">GPA: {edu.gpa}</div>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="break-inside-avoid">
                      <div className="flex justify-between mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-gray-400 italic leading-[1.25]">
                            Bachelor's Degree
                          </h3>
                          <div className="text-[9pt] font-semibold text-gray-400 italic mb-0.5 leading-[1.25]">
                            University Name
                          </div>
                          <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8pt] text-gray-400 italic">City, State</div>
                          <div className="text-[8pt] text-gray-400 italic font-medium">
                            Aug 2016 - May 2020
                          </div>
                          <div className="text-[8pt] text-gray-400 italic mt-0.5">GPA: 3.8</div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </section>
              )}
            </main>
          </div>
  )

  const renderSingleColumnLayout = () => (
    <div className="mt-2">
      {/* Professional Summary */}
      {resumeData.summary && (
        <section className="mb-3">
          {renderSectionHeader('Summary')}
          <p className="m-0 text-[8.5pt] leading-[1.35] text-gray-700 text-justify">{resumeData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Experience')}
          <div className="flex flex-col gap-2">
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between mb-0.5">
                  <div className="flex-1">
                    <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-black leading-[1.25]">
                      {exp.position || 'Position'}
                    </h3>
                    <div className="text-[9pt] font-semibold text-blue-600 mb-0.5 leading-[1.25]">
                      {exp.company || 'Company'}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {exp.location && <div className="text-[8pt] text-gray-500">{exp.location}</div>}
                    <div className="text-[8pt] text-gray-600 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                </div>
                {exp.description && (
                  <ul className="list-none p-0 m-0.5 mt-0">
                    {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-700">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        {line.trim().replace(/^[•\-]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Projects')}
          <div className="flex flex-col gap-2">
            {resumeData.projects.map(project => (
              <div key={project.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[9.5pt] font-bold m-0 text-black leading-[1.25]">
                    {project.name || 'Project Name'}
                  </h3>
                  {project.technologies && (
                    <span className="text-[7.5pt] text-gray-500 italic">{project.technologies}</span>
                  )}
                </div>
                {project.description && (
                  <ul className="list-none p-0 m-0.5 mt-0">
                    {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="relative pl-3 mb-0.5 text-[8.5pt] leading-[1.32] text-gray-700">
                        <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                        {line.trim().replace(/^[•\-]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2.5 mt-0.5 text-[7.5pt] text-blue-600">
                  {project.link && <span>{project.link}</span>}
                  {project.github && <span>{project.github}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Education')}
          <div className="flex flex-col gap-2">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between mb-0.5">
                  <div className="flex-1">
                    <h3 className="text-[9.5pt] font-bold m-0 mb-0.5 text-black leading-[1.25]">
                      {edu.degree || 'Degree'}
                    </h3>
                    <div className="text-[9pt] font-semibold text-blue-600 mb-0.5 leading-[1.25]">
                      {edu.school || 'School'}
                    </div>
                    {edu.field && <div className="text-[8.5pt] text-gray-600 italic">{edu.field}</div>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {edu.location && <div className="text-[8pt] text-gray-500">{edu.location}</div>}
                    <div className="text-[8pt] text-gray-600 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-[8pt] text-gray-600 mt-0.5">GPA: {edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Skills')}
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(skill => (
              <span key={skill.id} className="text-[8.5pt] text-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {resumeData.tools.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Tools')}
          <div className="flex flex-wrap gap-2">
            {resumeData.tools.map(tool => (
              <span key={tool.id} className="text-[8.5pt] text-gray-700">
                {tool.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {resumeData.languages.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Languages')}
          <div className="flex flex-wrap gap-3">
            {resumeData.languages.map(lang => (
              <span key={lang.id} className="text-[8.5pt] text-gray-700">
                {lang.name} <span className="text-[7.5pt] text-gray-500">({lang.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {resumeData.certifications.length > 0 && (
        <section className="mb-3">
          {renderSectionHeader('Certifications')}
          <div className="flex flex-col gap-1.5">
            {resumeData.certifications.map(cert => (
              <div key={cert.id} className="leading-[1.28]">
                <div className="text-[8.5pt] font-semibold text-gray-900 mb-0.5">{cert.name}</div>
                {cert.issuer && <div className="text-[8pt] text-gray-600">{cert.issuer}</div>}
                {cert.date && <div className="text-[7.5pt] text-gray-500">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )

  return (
    <div className="bg-white border-l border-gray-200 p-10 sticky top-0 h-screen overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Preview</h2>
        <button 
          onClick={downloadPDF} 
          className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Icon name="download" className="text-base" />
          Download PDF
        </button>
      </div>
      <div className="flex-1 bg-gray-50 p-8 rounded-lg flex justify-center overflow-y-auto">
        <div 
          ref={resumeRef} 
          className={getTemplateClasses()}
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}
        >
          {renderHeader()}
          {selectedTemplate === 'classic' ? renderSingleColumnLayout() : renderTwoColumnLayout()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
