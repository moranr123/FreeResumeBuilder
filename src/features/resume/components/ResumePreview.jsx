import { useRef, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import Icon from '../../../components/common/Icon'
import { fonts } from '../../../constants/fonts'
import { getColorScheme } from '../../../constants/colors'

function ResumePreview({ resumeData, selectedTemplate = 'compact', selectedFont = 'inter', selectedColor = 'black', themeColor = '#F2F2F2', onDownloadReady, inModal = false }) {
  const resumeRef = useRef(null)
  const colorScheme = getColorScheme(selectedColor)

  // Text flow normalization styles - match Word/Google Docs rendering
  const textFlowStyles = {
    whiteSpace: 'normal',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    letterSpacing: 'normal',
    textAlign: 'left'
  }

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      // Wait for fonts to fully load
      await document.fonts.ready
      await new Promise(resolve => setTimeout(resolve, 500))

      const element = resumeRef.current
      
      // US Letter dimensions in mm: 215.9mm x 279.4mm
      // Convert to pixels at 96 DPI: 1mm = 3.779527559px
      const mmToPx = 3.779527559
      const targetWidthPx = 215.9 * mmToPx  // ~816px
      const targetHeightPx = 279.4 * mmToPx // ~1056px
      
      // Use high scale for pixel-perfect quality
      const scale = 3

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: targetWidthPx,
        height: targetHeightPx,
        windowWidth: targetWidthPx,
        windowHeight: targetHeightPx,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        allowTaint: true,
        foreignObjectRendering: false,
        removeContainer: false,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Find the cloned resume element
          const clonedElement = clonedDoc.querySelector('[data-resume-content]')
          if (clonedElement) {
            // Get the parent wrapper (the scaled div)
            const clonedParent = clonedElement.parentElement
            
            // Remove all scaling transforms from the parent
            if (clonedParent) {
              clonedParent.style.transform = 'none'
              clonedParent.style.scale = 'none'
              clonedParent.className = ''
            }
            
            // Get computed styles from original element to preserve padding/margins
            const originalElement = resumeRef.current
            const computedStyle = window.getComputedStyle(originalElement)
            
            // Ensure the element has exact dimensions
            clonedElement.style.width = `${targetWidthPx}px`
            clonedElement.style.height = `${targetHeightPx}px`
            clonedElement.style.minWidth = `${targetWidthPx}px`
            clonedElement.style.minHeight = `${targetHeightPx}px`
            clonedElement.style.maxWidth = `${targetWidthPx}px`
            clonedElement.style.maxHeight = `${targetHeightPx}px`
            clonedElement.style.margin = '0'
            // Preserve padding from computed styles (from Tailwind classes)
            clonedElement.style.padding = computedStyle.padding
            clonedElement.style.boxSizing = computedStyle.boxSizing || 'border-box'
            clonedElement.style.overflow = 'hidden'
            clonedElement.style.display = 'block'
            clonedElement.style.position = 'relative'
            clonedElement.style.backgroundColor = computedStyle.backgroundColor || '#ffffff'
            
            // Ensure all images are loaded and visible
            const images = clonedElement.querySelectorAll('img')
            images.forEach(img => {
              if (img.src) {
                img.style.display = 'block'
                img.style.maxWidth = '100%'
                img.style.height = 'auto'
              }
            })
          }
        }
      })

      // Create PDF with exact US Letter dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [215.9, 279.4], // Exact US Letter dimensions in mm
        compress: false, // Disable compression for pixel-perfect quality
        precision: 16 // High precision for exact dimensions
      })

      const pdfWidth = 215.9 // mm
      const pdfHeight = 279.4 // mm

      // Add image at exact position with exact dimensions - 1:1 mapping
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      )

      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error // Re-throw so loading state can be handled
    }
  }

  useEffect(() => {
    if (onDownloadReady) {
      onDownloadReady(downloadPDF)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTemplateClasses = () => {
    // US Letter: 8.5" x 11" = 215.9mm x 279.4mm (aspect ratio 1:1.294)
    // Maintaining true physical dimensions for PDF export
    // Reduced padding to maximize content density
    // For modal display, use pixel-based dimensions that scale better
    const base = inModal 
      ? "bg-white font-sans text-gray-900 overflow-hidden"
      : "bg-white w-[215.9mm] h-[279.4mm] font-sans text-gray-900 overflow-hidden"
    const styles = {
      compact: `${base} text-[9pt] leading-[1.28] p-[8mm_10mm]`,
      modern: `${base} text-[9.5pt] leading-[1.35] p-[9mm_11mm]`,
      classic: `${base} text-[9pt] leading-[1.32] p-[9mm_12mm]`,
      minimal: `${base} text-[9pt] leading-[1.4] p-[8mm_10mm]`,
      corporate: `${base} text-[10pt] leading-[1.5] p-[12mm_15mm]`,
      'with-image': `${base} text-[9.5pt] leading-[1.4] p-[10mm_12mm]`,
    }
    return styles[selectedTemplate] || styles.compact
  }

  // Standardized divider element for PDF-safe rendering
  const renderDivider = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '0.75pt',
          backgroundColor: themeColor,
          marginTop: '8pt',
          marginBottom: '8pt',
          border: 'none',
          padding: 0,
        }}
      />
    )
  }

  const renderHeader = () => {
    const headerStyles = {
      compact: 'text-center mb-1.5 pb-1',
      modern: 'text-center mb-2 pb-1.5',
      classic: 'text-center mb-2 pb-1.5',
      minimal: 'text-center mb-1.5 pb-0.5',
      corporate: 'mb-3 pb-2',
      'with-image': 'mb-3 pb-2',
    }
    const nameStyles = {
      compact: 'text-[17pt] font-bold mb-0.5 text-black uppercase',
      modern: 'text-[18pt] font-bold mb-1 text-black',
      classic: 'text-[18pt] font-bold mb-1 text-black',
      minimal: 'text-[16pt] font-semibold mb-0.5 text-black',
      corporate: 'text-[22pt] font-bold mb-1 text-black',
      'with-image': 'text-[20pt] font-bold mb-1 text-black',
    }
    const titleStyles = {
      compact: 'text-[9.5pt] font-medium mb-1 text-gray-600',
      modern: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      classic: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      minimal: 'text-[9pt] font-normal mb-1 text-gray-500',
      corporate: 'text-[11pt] font-medium mb-2 text-gray-700',
      'with-image': 'text-[10pt] font-medium mb-1.5 text-gray-600',
    }
    const contactStyles = {
      compact: 'flex justify-center flex-wrap gap-1 text-[8pt] text-gray-600',
      modern: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      classic: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      minimal: 'flex justify-center flex-wrap gap-1 text-[7.5pt] text-gray-500',
      corporate: 'flex flex-wrap gap-2 text-[9pt] text-gray-600',
      'with-image': 'flex flex-wrap gap-2 text-[8.5pt] text-gray-600',
    }


    return (
      <header className={headerStyles[selectedTemplate] || headerStyles.compact}>
        <h1 
          className={nameStyles[selectedTemplate] || nameStyles.compact}
          style={{ 
            color: colorScheme.colors.primary,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: 'normal',
            textAlign: 'left'
          }}
        >
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        {resumeData.personalInfo.title && (
          <p 
            className={titleStyles[selectedTemplate] || titleStyles.compact}
            style={{ 
              color: colorScheme.colors.tertiary,
              whiteSpace: 'normal',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              letterSpacing: 'normal',
              textAlign: 'left'
            }}
          >
            {resumeData.personalInfo.title}
          </p>
        )}
        <div 
          className={contactStyles[selectedTemplate] || contactStyles.compact}
          style={{ 
            color: colorScheme.colors.tertiary,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: 'normal',
            textAlign: 'left'
          }}
        >
          {resumeData.personalInfo.email && (
            <span className="inline-block">{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.phone}</span>
            </>
          )}
          {resumeData.personalInfo.location && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.location}</span>
            </>
          )}
          {resumeData.personalInfo.linkedin && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.linkedin}</span>
            </>
          )}
          {resumeData.personalInfo.github && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.github}</span>
            </>
          )}
        </div>
        {renderDivider()}
      </header>
    )
  }

  const renderSectionHeader = (title) => {
    const headerStyles = {
      compact: 'text-[9.5pt] font-bold uppercase mb-0.5',
      modern: 'text-[10pt] font-bold uppercase mb-0.5',
      classic: 'text-[10pt] font-bold uppercase mb-0.5',
      minimal: 'text-[9pt] font-semibold uppercase mb-0.5',
      corporate: 'text-[10pt] font-bold uppercase mb-1.5',
      'with-image': 'text-[10pt] font-bold uppercase mb-1',
    }
    const headerColor = selectedTemplate === 'corporate' 
      ? themeColor 
      : colorScheme.colors.primary
    return (
      <>
        <h2 
          className={headerStyles[selectedTemplate] || headerStyles.compact} 
          style={{ 
            fontVariant: 'small-caps', 
            color: headerColor,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: 'normal',
            textAlign: 'left'
          }}
        >
          {title}
        </h2>
        {renderDivider()}
      </>
    )
  }

  const renderTwoColumnLayout = () => (
    <div className={`flex gap-2.5 mt-2`} style={{ overflow: 'hidden' }}>
            {/* Left Column - 30% - Fixed width in print units */}
            <aside className="flex-shrink-0" style={{ width: '30%', minWidth: 0, overflow: 'hidden' }}>
              {/* Skills */}
              {(resumeData.skills.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Skills')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.skills.length > 0 ? (
                      resumeData.skills.map(skill => (
                        <li key={skill.id} className="py-0 text-[8.5pt] leading-[1.25]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                          {skill.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>JavaScript</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Python</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>TypeScript</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>React</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Node.js</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>SQL</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Problem Solving</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>System Design</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Tools */}
              {(resumeData.tools.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Tools')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.tools.length > 0 ? (
                      resumeData.tools.map(tool => (
                        <li key={tool.id} className="py-0 text-[8.5pt] leading-[1.25]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
                          {tool.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Git</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Docker</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>AWS</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>PostgreSQL</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>MongoDB</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Jest</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic" style={textFlowStyles}>Webpack</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {(resumeData.languages.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Languages')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.languages.length > 0 ? (
                      resumeData.languages.map(lang => (
                        <li key={lang.id} className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]" style={textFlowStyles}>
                          <span className="font-medium" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>{lang.name}</span>
                          <span className="text-[7.5pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{lang.proficiency}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]" style={textFlowStyles}>
                          <span className="font-medium text-gray-400 italic" style={textFlowStyles}>English</span>
                          <span className="text-[7.5pt] text-gray-400 italic" style={textFlowStyles}>Native</span>
                        </li>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]" style={textFlowStyles}>
                          <span className="font-medium text-gray-400 italic" style={textFlowStyles}>Spanish</span>
                          <span className="text-[7.5pt] text-gray-400 italic" style={textFlowStyles}>Fluent</span>
                        </li>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]" style={textFlowStyles}>
                          <span className="font-medium text-gray-400 italic" style={textFlowStyles}>French</span>
                          <span className="text-[7.5pt] text-gray-400 italic" style={textFlowStyles}>Intermediate</span>
                        </li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Certifications */}
              {(resumeData.certifications.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Certifications')}
                  <div className="flex flex-col gap-1">
                    {resumeData.certifications.length > 0 ? (
                      resumeData.certifications.map(cert => (
                        <div key={cert.id} className="leading-[1.25]">
                          <div className="text-[8.5pt] font-semibold mb-0" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>{cert.name}</div>
                          {cert.issuer && <div className="text-[8pt]" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>{cert.issuer}</div>}
                          {cert.date && <div className="text-[7.5pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{cert.date}</div>}
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
                </section>
              )}
            </aside>

            {/* Right Column - 70% - Fixed width in print units */}
            <main className="flex-grow" style={{ width: '70%', minWidth: 0, overflow: 'hidden' }}>
              {/* Professional Summary */}
              {(resumeData.summary || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Summary')}
                  <p className="m-0 text-[8.5pt] leading-[1.3]" style={{ whiteSpace: 'normal', wordBreak: 'normal', overflowWrap: 'break-word' }}>
                    {resumeData.summary ? (
                      <span style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>{resumeData.summary}</span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.
                      </span>
                    )}
                  </p>
                </section>
              )}

              {/* Experience */}
              {(resumeData.experience.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Experience')}
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
                              <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-700">
                                <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
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
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Architected and implemented real-time data processing pipeline handling 50K requests/second
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Mentored team of 5 junior engineers, establishing code review practices and technical standards
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Optimized database queries and caching strategies, improving API response time by 60%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
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
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Developed full-stack web applications using React, Node.js, and PostgreSQL
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Built RESTful APIs and GraphQL endpoints supporting mobile and web clients
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                  </div>
                </section>
              )}

              {/* Projects */}
              {(resumeData.projects.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Projects')}
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
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Built scalable e-commerce platform with payment integration and inventory management
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Implemented real-time order tracking and notification system using WebSockets
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
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
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Developed collaborative task management application with real-time updates
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic" style={textFlowStyles}>
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
                </section>
              )}

              {/* Education */}
              {(resumeData.education.length > 0 || true) && (
                <section className="mb-0">
                  {renderSectionHeader('Education')}
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
                </section>
              )}
            </main>
          </div>
  )

  const renderSingleColumnLayout = () => (
    <div className="mt-1.5" style={{ overflow: 'hidden' }}>
      {/* Professional Summary */}
      {(resumeData.summary || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Summary')}
          <p className="m-0 text-[8.5pt] leading-[1.3]" style={{ whiteSpace: 'normal', wordBreak: 'normal', overflowWrap: 'break-word' }}>
            {resumeData.summary ? (
              <span style={{ color: colorScheme.colors.secondary }}>{resumeData.summary}</span>
            ) : (
              <span className="text-gray-400 italic">
                Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.
              </span>
            )}
          </p>
        </section>
      )}

      {/* Experience */}
      {(resumeData.experience.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Experience')}
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
        </section>
      )}

      {/* Projects */}
      {(resumeData.projects.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Projects')}
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
        </section>
      )}

      {/* Education */}
      {(resumeData.education.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Education')}
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
        </section>
      )}

      {/* Skills */}
      {(resumeData.skills.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Skills')}
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
        </section>
      )}

      {/* Tools */}
      {(resumeData.tools.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Tools')}
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
        </section>
      )}

      {/* Languages */}
      {(resumeData.languages.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Languages')}
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
        </section>
      )}

      {/* Certifications */}
      {(resumeData.certifications.length > 0 || true) && (
        <section className="mb-0">
          {renderSectionHeader('Certifications')}
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
        </section>
      )}
    </div>
  )

  const renderCorporateLayout = () => (
    <div className="flex gap-6 mt-3" style={{ overflow: 'hidden' }}>
      {/* Left Column - Education and Skills - Fixed width in print units */}
      <aside className="flex-shrink-0" style={{ width: '35%', minWidth: 0, overflow: 'hidden' }}>
        {/* Education */}
        {(resumeData.education.length > 0 || true) && (
          <section className="mb-4">
            {renderSectionHeader('Education')}
            <div className="flex flex-col gap-2.5">
              {resumeData.education.length > 0 ? (
                resumeData.education.map(edu => (
                  <div key={edu.id} className="mb-1">
                    <h3 className="text-[10pt] font-semibold mb-0.5 leading-tight" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                      {edu.degree || 'Degree'}
                    </h3>
                    <div className="text-[9pt] mb-0.5" style={{ color: themeColor, ...textFlowStyles }}>{edu.school || 'School'}</div>
                    {edu.field && <div className="text-[8.5pt] italic" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>{edu.field}</div>}
                    <div className="text-[8.5pt] mt-0.5" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-[8.5pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>GPA: {edu.gpa}</div>}
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
          </section>
        )}

        {/* Skills */}
        {(resumeData.skills.length > 0 || true) && (
          <section className="mb-4">
            {renderSectionHeader('Skills')}
            <ul className="list-none p-0 m-0">
              {resumeData.skills.length > 0 ? (
                resumeData.skills.map(skill => (
                  <li key={skill.id} className="py-0.5 text-[9pt] leading-[1.4]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
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
          </section>
        )}
      </aside>

      {/* Right Column - Summary and Work History - Fixed width in print units */}
      <main className="flex-grow" style={{ width: '65%', minWidth: 0, overflow: 'hidden' }}>
        {/* Professional Summary */}
        {(resumeData.summary || true) && (
          <section className="mb-4">
            {renderSectionHeader('Professional Summary')}
            <p className="m-0 text-[9.5pt] leading-[1.5]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
              {resumeData.summary ? (
                <span>{resumeData.summary}</span>
              ) : (
                <span className="italic" style={{ color: colorScheme.colors.muted }}>
                  Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.
                </span>
              )}
            </p>
          </section>
        )}

        {/* Work History */}
        {(resumeData.experience.length > 0 || true) && (
          <section className="mb-4">
            {renderSectionHeader('Work History')}
            <div className="flex flex-col gap-3">
              {resumeData.experience.length > 0 ? (
                resumeData.experience.map(exp => (
                  <div key={exp.id} className="mb-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3 className="text-[10.5pt] font-semibold mb-0.5" style={{ color: colorScheme.colors.primary, ...textFlowStyles }}>
                          {exp.position || 'Position'}
                        </h3>
                        <div className="text-[9.5pt] font-medium" style={{ color: themeColor, ...textFlowStyles }}>
                          {exp.company || 'Company'}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {exp.location && <div className="text-[8.5pt]" style={{ color: colorScheme.colors.muted, ...textFlowStyles }}>{exp.location}</div>}
                        <div className="text-[8.5pt] font-medium" style={{ color: colorScheme.colors.tertiary, ...textFlowStyles }}>
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="list-none p-0 m-0 mt-1">
                        {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} className="relative pl-4 mb-0.5 text-[9pt] leading-[1.4]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
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
          </section>
        )}
      </main>
    </div>
  )

  const renderImageLayout = () => (
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
          <section className="mb-3">
            {renderSectionHeader('Skills')}
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
          </section>
        )}

        {/* Languages */}
        {(resumeData.languages.length > 0 || true) && (
          <section className="mb-3">
            {renderSectionHeader('Languages')}
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
          </section>
        )}

        {/* Certifications */}
        {(resumeData.certifications.length > 0 || true) && (
          <section className="mb-3">
            {renderSectionHeader('Certifications')}
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
          </section>
        )}
      </aside>

      {/* Right Column - Main Content - Fixed width in print units */}
      <main className="flex-grow" style={{ width: '72%', minWidth: 0, overflow: 'hidden' }}>
        {/* Professional Summary */}
        {(resumeData.summary || true) && (
          <section className="mb-3">
            {renderSectionHeader('Professional Summary')}
            <p className="m-0 text-[9pt] leading-[1.4]" style={{ color: colorScheme.colors.secondary, ...textFlowStyles }}>
              {resumeData.summary ? (
                <span>{resumeData.summary}</span>
              ) : (
                <span className="italic" style={{ color: colorScheme.colors.muted }}>
                  Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users.
                </span>
              )}
            </p>
          </section>
        )}

        {/* Experience */}
        {(resumeData.experience.length > 0 || true) && (
          <section className="mb-3">
            {renderSectionHeader('Experience')}
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
          </section>
        )}

        {/* Education */}
        {(resumeData.education.length > 0 || true) && (
          <section className="mb-3">
            {renderSectionHeader('Education')}
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
          </section>
        )}

        {/* Projects */}
        {(resumeData.projects.length > 0 || true) && (
          <section className="mb-0">
            {renderSectionHeader('Projects')}
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
          </section>
        )}
      </main>
    </div>
  )

  const resumeContent = (
    <div 
      ref={resumeRef} 
      data-resume-content
      className={getTemplateClasses()}
      style={{ 
        fontFamily: fonts.find(f => f.id === selectedFont)?.family || fonts[0].family,
        boxSizing: 'border-box',
        margin: 0,
        width: inModal ? '816px' : undefined, // US Letter width in pixels at 96 DPI
        height: inModal ? '1056px' : undefined, // US Letter height in pixels at 96 DPI
        aspectRatio: inModal ? '8.5 / 11' : undefined,
        // Text flow normalization - match Word/Google Docs rendering
        whiteSpace: 'normal',
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        letterSpacing: 'normal',
        textAlign: 'left',
        // Prevent column overflow
        overflow: 'hidden',
        '--color-primary': colorScheme.colors.primary,
        '--color-secondary': colorScheme.colors.secondary,
        '--color-tertiary': colorScheme.colors.tertiary,
        '--color-accent': themeColor,
        '--color-muted': colorScheme.colors.muted,
        '--color-light': colorScheme.colors.light,
      }}
    >
      {renderHeader()}
      {selectedTemplate === 'classic' 
        ? renderSingleColumnLayout() 
        : selectedTemplate === 'corporate'
        ? renderCorporateLayout()
        : selectedTemplate === 'with-image'
        ? renderImageLayout()
        : renderTwoColumnLayout()}
    </div>
  )

  if (inModal) {
    return resumeContent
  }

  return (
    <div className="h-full min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-65px)] overflow-hidden flex flex-col justify-start items-center pt-6 sm:pt-8 md:pt-10 hidden lg:flex" data-resume-preview>
      {/* Scaled preview wrapper - maintains true US Letter aspect ratio (8.5:11) */}
      <div 
        className="scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.75] origin-top"
      >
        {resumeContent}
      </div>
    </div>
  )
}

export default ResumePreview
