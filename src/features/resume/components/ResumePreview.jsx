import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import Icon from '../../../components/common/Icon'

function ResumePreview({ resumeData, selectedTemplate = 'compact' }) {
  const resumeRef = useRef(null)

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgScaledWidth = imgWidth * ratio
      const imgScaledHeight = imgHeight * ratio
      const xOffset = (pdfWidth - imgScaledWidth) / 2
      const yOffset = (pdfHeight - imgScaledHeight) / 2

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgScaledWidth, imgScaledHeight)
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const templateClasses = {
    compact: 'text-[9pt] leading-[1.32]',
    modern: 'text-[9.5pt] leading-[1.4]',
    classic: 'text-[9pt] leading-[1.35]',
    minimal: 'text-[9pt] leading-[1.5]',
  }

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
          className={`bg-white w-[210mm] min-h-[297mm] max-h-[297mm] p-[10mm_12mm] border border-gray-200 shadow-sm font-sans text-gray-900 ${templateClasses[selectedTemplate] || templateClasses.compact}`}
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}
        >
          {/* Header */}
          <header className="text-center mb-2 pb-1.5 border-b border-gray-300">
            <h1 className="text-[17pt] font-bold tracking-wider mb-0.5 text-black uppercase">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-[9.5pt] font-medium mb-1 text-gray-600">{resumeData.personalInfo.title}</p>
            )}
            <div className="flex justify-center flex-wrap gap-1 text-[8pt] text-gray-600">
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
              {resumeData.personalInfo.website && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="inline-block">{resumeData.personalInfo.website}</span>
                </>
              )}
            </div>
          </header>

          {/* Two Column Layout */}
          <div className="flex gap-2.5 mt-2">
            {/* Left Column - 30% */}
            <aside className="w-[30%] flex-shrink-0">
              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Skills
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <ul className="list-none p-0 m-0">
                    {resumeData.skills.map(skill => (
                      <li key={skill.id} className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-700">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tools */}
              {resumeData.tools.length > 0 && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Tools
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <ul className="list-none p-0 m-0">
                    {resumeData.tools.map(tool => (
                      <li key={tool.id} className="py-0.5 text-[8.5pt] leading-[1.28] text-gray-700">
                        {tool.name}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {resumeData.languages.length > 0 && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Languages
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <ul className="list-none p-0 m-0">
                    {resumeData.languages.map(lang => (
                      <li key={lang.id} className="py-0.5 flex justify-between items-center text-[8.5pt] leading-[1.28]">
                        <span className="font-medium text-gray-900">{lang.name}</span>
                        <span className="text-[7.5pt] text-gray-500">{lang.proficiency}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Certifications
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
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
            </aside>

            {/* Right Column - 70% */}
            <main className="w-[70%] flex-grow">
              {/* Professional Summary */}
              {resumeData.summary && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Summary
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <p className="m-0 text-[8.5pt] leading-[1.35] text-gray-700 text-justify">{resumeData.summary}</p>
                </section>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Experience
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <div className="flex flex-col gap-1.5">
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
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Projects
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <div className="flex flex-col gap-1.5">
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
                <section className="mb-2">
                  <h2 className="text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black" style={{ fontVariant: 'small-caps' }}>
                    Education
                  </h2>
                  <div className="h-[0.5px] bg-gray-300 mb-1.5"></div>
                  <div className="flex flex-col gap-1.5">
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
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
