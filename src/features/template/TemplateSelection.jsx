import { useState } from 'react'
import Icon from '../../components/common/Icon'
import { templates } from '../../constants/templates'
import logoImage from '../../assets/logo.jpg'

const themeColors = [
  { id: 'light-gray', hex: '#F2F2F2' },
  { id: 'dark-gray', hex: '#333333' },
  { id: 'navy-blue', hex: '#345271' },
  { id: 'sky-blue', hex: '#4B9AB8' },
  { id: 'teal', hex: '#68C2AD' },
]

function TemplateSelection({ onSelectTemplate, templateColors, onTemplateColorChange, getTemplateColor }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  
  const getPreviewColor = (templateId) => {
    const color = getTemplateColor(templateId)
    return color || '#D1D5DB' // Default gray if no color selected
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 tracking-tight px-2">
            Choose Your Resume Template
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Select a professionally designed template. All templates are ATS-friendly and optimized for one-page resumes.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className="relative bg-white border-2 rounded-lg sm:rounded-xl overflow-visible transition-all duration-200 border-gray-200 hover:border-blue-300 hover:shadow-md group"
            >
              {/* Preview - US Letter aspect ratio (1:1.294) with padding for shadow breathing room */}
              <div 
                className="relative bg-gray-50 p-3 sm:p-4 md:p-5 flex items-center justify-center"
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Hover Overlay with Use Template Button */}
                {hoveredTemplate === template.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-t-lg sm:rounded-t-xl transition-opacity duration-200">
                    <button
                      onClick={() => onSelectTemplate(template.id)}
                      className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 shadow-lg text-sm sm:text-base"
                    >
                      Use Template
                      <Icon name="briefcase" className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
                {/* Paper frame - US Letter: 8.5" x 11" (aspect ratio 1:1.294) - True physical paper representation */}
                <div 
                  className="relative bg-white w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
                  style={{
                    aspectRatio: '8.5 / 11', // US Letter aspect ratio (exact)
                    border: '0.5px solid #D1D5DB', // Thin light-gray page border
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Soft subtle shadow for paper lift
                  }}
                >
                  {/* Resume content - scaled to fit paper frame and fill vertically */}
                  <div className="w-full h-full p-1.5 sm:p-2 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
                  {template.id === 'modern' && (() => {
                    const previewColor = getPreviewColor(template.id)
                    return (
                      <div className="w-full h-full flex flex-col text-[5.5px] leading-[1.2] flex-1">
                        <div className="text-[8px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                        <div className="text-[4.5px] text-gray-600 text-center mb-1">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                        <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
                        <div className="flex gap-1.5 flex-1 mt-0.5">
                          <div className="w-[30%] flex flex-col gap-1">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4.5px] font-bold uppercase">Skills</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[4px] text-gray-600">JavaScript</div>
                              <div className="text-[4px] text-gray-600">Python</div>
                              <div className="text-[4px] text-gray-600">React</div>
                              <div className="text-[4px] text-gray-600">Node.js</div>
                              <div className="text-[4px] text-gray-600">TypeScript</div>
                              <div className="text-[4px] text-gray-600">SQL</div>
                              <div className="text-[4px] text-gray-600">System Design</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4.5px] font-bold uppercase">Tools</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[4px] text-gray-600">Git</div>
                              <div className="text-[4px] text-gray-600">Docker</div>
                              <div className="text-[4px] text-gray-600">AWS</div>
                              <div className="text-[4px] text-gray-600">PostgreSQL</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4.5px] font-bold uppercase">Education</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[4px] font-semibold">BS Computer Science</div>
                              <div className="text-[4px] text-gray-600">State University</div>
                              <div className="text-[4px] text-gray-600">2016 - 2020</div>
                            </div>
                          </div>
                          <div className="w-[70%] flex flex-col gap-1">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4.5px] font-bold uppercase">Summary</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[4px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4.5px] font-bold uppercase">Experience</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[4px] font-semibold">Senior Software Engineer</div>
                              <div className="text-[4px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                              <div className="text-[4px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                              <div className="text-[4px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                              <div className="text-[4px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices</div>
                              <div className="text-[4px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                              <div className="text-[4px] text-gray-600">• Collaborated with product teams to deliver features increasing user engagement by 25%</div>
                              <div className="text-[4px] font-semibold mt-0.5">Software Engineer</div>
                              <div className="text-[4px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                              <div className="text-[4px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                              <div className="text-[4px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                              <div className="text-[4px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  {template.id === 'classic' && (() => {
                    const previewColor = getPreviewColor(template.id)
                    return (
                      <div className="w-full h-full flex flex-col text-[5px] leading-[1.15] flex-1">
                        <div className="text-[7px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                        <div className="text-[4px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                        <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
                        <div className="flex flex-col gap-0.5 flex-1 mt-0.5">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[4px] font-bold uppercase">Summary</div>
                            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                            <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[4px] font-bold uppercase">Skills</div>
                            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                            <div className="text-[3.5px] text-gray-600">JavaScript, Python, React, Node.js, TypeScript, SQL, System Design, Microservices, Git, Docker, AWS, PostgreSQL</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[4px] font-bold uppercase">Experience</div>
                            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                            <div className="text-[3.5px] font-semibold">Senior Software Engineer</div>
                            <div className="text-[3.5px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                            <div className="text-[3.5px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                            <div className="text-[3.5px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                            <div className="text-[3.5px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                            <div className="text-[3.5px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                            <div className="text-[3.5px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                            <div className="text-[3.5px] font-semibold mt-0.5">Software Engineer</div>
                            <div className="text-[3.5px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                            <div className="text-[3.5px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                            <div className="text-[3.5px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                            <div className="text-[3.5px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%</div>
                            <div className="text-[3.5px] text-gray-600">• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[4px] font-bold uppercase">Education</div>
                            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                            <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                            <div className="text-[3.5px] text-gray-600">State University | 2016 - 2020</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  {template.id === 'minimal' && (() => {
                    const previewColor = getPreviewColor(template.id)
                    return (
                      <div className="w-full h-full flex flex-col text-[5px] leading-[1.15] flex-1">
                        <div className="text-[7px] font-semibold text-center mb-0.5">Ronald Moran Jr</div>
                        <div className="text-[4px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                        <div className="h-0.5 my-0.5" style={{ backgroundColor: previewColor }}></div>
                        <div className="flex gap-1.5 flex-1 mt-0.5">
                          <div className="w-[30%] flex flex-col gap-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-semibold uppercase">Skills</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">JavaScript</div>
                              <div className="text-[3.5px] text-gray-600">Python</div>
                              <div className="text-[3.5px] text-gray-600">React</div>
                              <div className="text-[3.5px] text-gray-600">Node.js</div>
                              <div className="text-[3.5px] text-gray-600">TypeScript</div>
                              <div className="text-[3.5px] text-gray-600">SQL</div>
                              <div className="text-[3.5px] text-gray-600">System Design</div>
                              <div className="text-[3.5px] text-gray-600">Microservices</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-semibold uppercase">Tools</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">Git</div>
                              <div className="text-[3.5px] text-gray-600">Docker</div>
                              <div className="text-[3.5px] text-gray-600">AWS</div>
                              <div className="text-[3.5px] text-gray-600">PostgreSQL</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-semibold uppercase">Education</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                              <div className="text-[3.5px] text-gray-600">State University</div>
                              <div className="text-[3.5px] text-gray-600">2016 - 2020</div>
                            </div>
                          </div>
                          <div className="w-[70%] flex flex-col gap-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-semibold uppercase">Summary</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-semibold uppercase">Experience</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">Senior Software Engineer</div>
                              <div className="text-[3.5px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                              <div className="text-[3.5px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                              <div className="text-[3.5px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                              <div className="text-[3.5px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices</div>
                              <div className="text-[3.5px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                              <div className="text-[3.5px] text-gray-600">• Collaborated with product teams to deliver features increasing user engagement by 25%</div>
                              <div className="text-[3.5px] font-semibold mt-0.5">Software Engineer</div>
                              <div className="text-[3.5px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                              <div className="text-[3.5px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                              <div className="text-[3.5px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                              <div className="text-[3.5px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  {template.id === 'corporate' && (() => {
                    const previewColor = getPreviewColor(template.id)
                    return (
                      <div className="w-full h-full flex flex-col text-[5px] leading-[1.15] flex-1">
                        <div className="text-[8px] font-bold mb-0.5">Ronald Moran Jr</div>
                        <div className="text-[4.5px] text-gray-700 mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                        <div className="h-0.5 w-1/4 mb-0.5" style={{ backgroundColor: previewColor }}></div>
                        <div className="flex gap-1.5 flex-1">
                          <div className="w-[35%] flex flex-col gap-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase text-blue-600">Education</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                              <div className="text-[3.5px] text-gray-600">State University</div>
                              <div className="text-[3.5px] text-gray-500">2016 - 2020</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase text-blue-600">Skills</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">• JavaScript</div>
                              <div className="text-[3.5px] text-gray-600">• Python</div>
                              <div className="text-[3.5px] text-gray-600">• React</div>
                              <div className="text-[3.5px] text-gray-600">• Node.js</div>
                              <div className="text-[3.5px] text-gray-600">• TypeScript</div>
                              <div className="text-[3.5px] text-gray-600">• SQL</div>
                              <div className="text-[3.5px] text-gray-600">• System Design</div>
                              <div className="text-[3.5px] text-gray-600">• Microservices</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase text-blue-600">Tools</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">• Git</div>
                              <div className="text-[3.5px] text-gray-600">• Docker</div>
                              <div className="text-[3.5px] text-gray-600">• AWS</div>
                              <div className="text-[3.5px] text-gray-600">• PostgreSQL</div>
                            </div>
                          </div>
                          <div className="w-[65%] flex flex-col gap-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase text-blue-600">Summary</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase text-blue-600">Work History</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">Senior Software Engineer</div>
                              <div className="text-[3.5px] text-blue-600">Tech Company Inc. | Jan 2021 - Present</div>
                              <div className="text-[3.5px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                              <div className="text-[3.5px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                              <div className="text-[3.5px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                              <div className="text-[3.5px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                              <div className="text-[3.5px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                              <div className="text-[3.5px] font-semibold mt-0.5">Software Engineer</div>
                              <div className="text-[3.5px] text-blue-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                              <div className="text-[3.5px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                              <div className="text-[3.5px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                              <div className="text-[3.5px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  {template.id === 'with-image' && (() => {
                    const previewColor = getPreviewColor(template.id)
                    return (
                      <div className="w-full h-full flex flex-col text-[5px] leading-[1.15] flex-1">
                        <div className="mb-1 pb-0.5 border-b" style={{ borderColor: previewColor }}>
                          <div className="text-[7px] font-bold mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[4px] text-gray-600 mb-0.5">Software Engineer</div>
                          <div className="text-[3.5px] text-gray-500">email@example.com | +1 (555) 000-0000</div>
                        </div>
                        <div className="flex gap-1.5 flex-1">
                          <div className="w-[28%] flex flex-col gap-0.5">
                            <img 
                              src={logoImage} 
                              alt="Profile" 
                              className="w-full aspect-square object-cover rounded border border-gray-200 mb-0.5"
                            />
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase">Skills</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">JavaScript</div>
                              <div className="text-[3.5px] text-gray-600">Python</div>
                              <div className="text-[3.5px] text-gray-600">React</div>
                              <div className="text-[3.5px] text-gray-600">Node.js</div>
                              <div className="text-[3.5px] text-gray-600">TypeScript</div>
                              <div className="text-[3.5px] text-gray-600">SQL</div>
                              <div className="text-[3.5px] text-gray-600">System Design</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase">Tools</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">Git</div>
                              <div className="text-[3.5px] text-gray-600">Docker</div>
                              <div className="text-[3.5px] text-gray-600">AWS</div>
                              <div className="text-[3.5px] text-gray-600">PostgreSQL</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase">Education</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                              <div className="text-[3.5px] text-gray-600">State University</div>
                              <div className="text-[3.5px] text-gray-600">2016 - 2020</div>
                            </div>
                          </div>
                          <div className="w-[72%] flex flex-col gap-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase">Summary</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[4px] font-bold uppercase">Experience</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[3.5px] font-semibold">Senior Software Engineer</div>
                              <div className="text-[3.5px] text-blue-600">Tech Company Inc. | Jan 2021 - Present</div>
                              <div className="text-[3.5px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                              <div className="text-[3.5px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                              <div className="text-[3.5px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                              <div className="text-[3.5px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                              <div className="text-[3.5px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                              <div className="text-[3.5px] font-semibold mt-0.5">Software Engineer</div>
                              <div className="text-[3.5px] text-blue-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                              <div className="text-[3.5px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                              <div className="text-[3.5px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                              <div className="text-[3.5px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div 
                className="p-3 sm:p-4 md:p-5"
                onMouseEnter={() => setHoveredTemplate(null)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-center">{template.name}</h3>
                
                {/* Color Palette Picker */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {themeColors.map((color) => {
                    const templateColor = getTemplateColor(template.id)
                    const isSelected = templateColor !== null && templateColor === color.hex
                    return (
                      <button
                        key={color.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onTemplateColorChange(template.id, color.hex)
                        }}
                        className={`relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-offset-1'
                            : 'ring-1 ring-transparent hover:ring-gray-300'
                        }`}
                        style={{
                          backgroundColor: color.hex,
                          ringColor: isSelected ? '#E5E7EB' : 'transparent',
                        }}
                        title={`Select ${color.hex}`}
                        aria-label={`Select ${color.hex}`}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80"></div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                
                {/* Mobile-friendly Use Template Button */}
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="mt-3 sm:mt-4 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md sm:hidden"
                >
                  Use Template
                  <Icon name="briefcase" className="text-white w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mx-2 sm:mx-0">
          <i className="fi fi-rr-info text-blue-500 text-base sm:text-lg"></i>
          <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            You can switch templates anytime. Your content will be preserved.
          </span>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection
