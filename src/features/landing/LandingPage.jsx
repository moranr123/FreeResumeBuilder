import { useState, useEffect, useCallback, useMemo } from 'react'
import Icon from '../../components/common/Icon'
import { templates } from '../../constants/templates'
import logoImage from '../../assets/logo.jpg'

function LandingPage({ onGetStarted }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const defaultPreviewColor = '#D1D5DB' // Default gray for previews

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Render template preview matching template selection screen
  const renderTemplatePreview = (template) => {
    const previewColor = defaultPreviewColor

    if (template.id === 'compact') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
          <div className="text-[7px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
          <div className="text-[4px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
          <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
          <div className="flex gap-1.5 flex-1 mt-0.5">
            <div className="w-[30%] flex flex-col gap-0.5">
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
                <div className="text-[3.5px] text-gray-600">Microservices</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Tools</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] text-gray-600">Git</div>
                <div className="text-[3.5px] text-gray-600">Docker</div>
                <div className="text-[3.5px] text-gray-600">AWS</div>
                <div className="text-[3.5px] text-gray-600">PostgreSQL</div>
                <div className="text-[3.5px] text-gray-600">MongoDB</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Education</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                <div className="text-[3.5px] text-gray-600">State University</div>
                <div className="text-[3.5px] text-gray-600">2016 - 2020</div>
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-0.5">
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Summary</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
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
            </div>
          </div>
        </div>
      )
    }

    if (template.id === 'modern') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
          <div className="text-[7px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
          <div className="text-[4px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
          <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
          <div className="flex gap-1.5 flex-1 mt-0.5">
            <div className="w-[30%] flex flex-col gap-0.5">
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
                <div className="text-[3.5px] text-gray-600">Microservices</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Tools</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] text-gray-600">Git</div>
                <div className="text-[3.5px] text-gray-600">Docker</div>
                <div className="text-[3.5px] text-gray-600">AWS</div>
                <div className="text-[3.5px] text-gray-600">PostgreSQL</div>
                <div className="text-[3.5px] text-gray-600">MongoDB</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Education</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] font-semibold">BS Computer Science</div>
                <div className="text-[3.5px] text-gray-600">State University</div>
                <div className="text-[3.5px] text-gray-600">2016 - 2020</div>
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-0.5">
              <div className="flex flex-col gap-0.5">
                <div className="text-[4px] font-bold uppercase">Summary</div>
                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                <div className="text-[3.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
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
            </div>
          </div>
        </div>
      )
    }

    if (template.id === 'classic') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
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
    }

    if (template.id === 'minimal') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
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
    }

    if (template.id === 'corporate') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
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
    }

    if (template.id === 'with-image') {
      return (
        <div className="w-full h-full flex flex-col text-[5px] leading-[1.15]">
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
    }

    return null
  }

  // Auto-rotate gallery with pause on interaction
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % templates.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused, prefersReducedMotion])

  const handlePrev = useCallback(() => {
    setIsPaused(true)
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length)
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setIsPaused(false), 5000)
  }, [])

  const handleNext = useCallback(() => {
    setIsPaused(true)
    setCurrentIndex((prev) => (prev + 1) % templates.length)
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setIsPaused(false), 5000)
  }, [])

  const handleDotClick = useCallback((index) => {
    setIsPaused(true)
    setCurrentIndex(index)
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setIsPaused(false), 5000)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])


  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-4 lg:h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-6 items-center lg:h-full">
          {/* Circular Gallery Section - First on all screens */}
          <div className="relative order-1 lg:order-1 w-full flex justify-center lg:items-center lg:h-full">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              {/* Circular Gallery Container */}
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full mx-auto">
                {/* Main Center Card */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-white rounded-2xl shadow-2xl transform transition-all duration-500 scale-100 p-2 sm:p-3 lg:p-4">
                    {/* Paper frame - US Letter: 8.5" x 11" (aspect ratio 1:1.294) */}
                    <div 
                      className="relative bg-white shadow-lg"
                      style={{
                        width: 'clamp(180px, 40vw, 256px)',
                        aspectRatio: '8.5 / 11', // US Letter aspect ratio
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      {/* Thin page border lines */}
                      <div className="absolute inset-0 border border-gray-300 pointer-events-none" style={{ borderWidth: '0.5px' }}></div>
                      
                      {/* Resume content - scaled to fit paper frame */}
                      <div className="w-full h-full p-2 sm:p-3 overflow-hidden" style={{ boxSizing: 'border-box' }}>
                        {renderTemplatePreview(templates[currentIndex])}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circular Gallery Items */}
                {templates.map((template, index) => {
                  const angle = (360 / templates.length) * index - (360 / templates.length) * currentIndex
                  // Responsive radius - smaller on mobile, larger on desktop
                  const radius = 150 // Base radius that works well across screen sizes
                  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
                  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius
                  const isActive = index === currentIndex
                  const distance = Math.sqrt(x * x + y * y)
                  const scale = isActive ? 1 : Math.max(0.4, 1 - distance / 400)
                  const opacity = isActive ? 1 : Math.max(0.2, 1 - distance / 300)

                  return (
                    <div
                      key={template.id}
                      className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        zIndex: isActive ? 20 : Math.floor(10 - Math.abs(index - currentIndex)),
                        opacity,
                      }}
                    >
                      <div
                        className={`bg-white rounded-xl shadow-xl cursor-pointer transition-all duration-700 p-1 sm:p-2 ${
                          isActive
                            ? 'ring-2 sm:ring-4 ring-blue-500 ring-opacity-50'
                            : 'hover:ring-2 hover:ring-blue-300'
                        }`}
                        onClick={() => handleDotClick(index)}
                        style={{
                          transform: `scale(${scale})`,
                        }}
                      >
                        {/* Paper frame - US Letter: 8.5" x 11" (aspect ratio 1:1.294) */}
                        <div 
                          className="relative bg-white shadow-md"
                          style={{
                            width: 'clamp(100px, 25vw, 144px)',
                            aspectRatio: '8.5 / 11', // US Letter aspect ratio
                            border: '1px solid #E5E7EB',
                          }}
                        >
                          {/* Thin page border lines */}
                          <div className="absolute inset-0 border border-gray-300 pointer-events-none" style={{ borderWidth: '0.5px' }}></div>
                          
                          {/* Resume content - scaled to fit paper frame */}
                          <div className="w-full h-full p-1 sm:p-2 overflow-hidden" style={{ boxSizing: 'border-box' }}>
                            {renderTemplatePreview(template)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Navigation Controls */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4 sm:mt-6 lg:mt-3 xl:mt-4 flex items-center gap-2 sm:gap-4 lg:gap-3"
                role="group"
                aria-label="Template navigation"
              >
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Previous template"
                  type="button"
                >
                  <Icon name="chevronLeft" className="text-gray-700 text-lg sm:text-xl" aria-hidden="true" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-1.5 sm:gap-2" role="tablist" aria-label="Template selection">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        index === currentIndex
                          ? 'bg-blue-600 w-6 sm:w-8'
                          : 'bg-gray-300 hover:bg-gray-400 w-2'
                      }`}
                      aria-label={`Go to template ${index + 1}`}
                      aria-selected={index === currentIndex}
                      role="tab"
                      type="button"
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Next template"
                  type="button"
                >
                  <Icon name="chevronRight" className="text-gray-700 text-lg sm:text-xl" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Section - Second on mobile, right side on desktop */}
          <div className="text-center lg:text-left order-2 lg:order-2 w-full lg:flex lg:flex-col lg:justify-center lg:h-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-3 xl:mb-4 leading-tight">
              Build Your Perfect
              <span className="text-blue-600 block">Resume in Minutes</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-base xl:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-4 xl:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Create professional, ATS-friendly resumes with our easy-to-use builder. 
              Choose from multiple templates and export your resume as a PDF instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-4 xl:mb-6">
              <button
                onClick={onGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-blue-600 text-white text-base sm:text-lg lg:text-sm xl:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Start building your resume"
                type="button"
              >
                Create your resume now
                <Icon name="arrowRight" className="text-white" aria-hidden="true" />
              </button>
            </div>
            
            {/* Features */}
            <div className="mt-8 sm:mt-12 lg:mt-4 xl:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-3 xl:gap-4">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="file" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">ATS-Friendly</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center lg:text-left">Optimized for tracking systems</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="download" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">PDF Export</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center lg:text-left">Download instantly</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-1.5 xl:mb-2">
                  <Icon name="palette" className="text-blue-600 text-xl sm:text-2xl lg:text-lg xl:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-xs xl:text-sm">Multiple Templates</h3>
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 text-center lg:text-left">Choose your style</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
