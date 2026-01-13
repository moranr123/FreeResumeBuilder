import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';
import logoImage from '../../assets/logo.jpg';

const getPreviewColor = (templateId) => {
  const colors = {
    modern: '#D1D5DB',
    classic: '#D1D5DB',
    minimal: '#D1D5DB',
    corporate: '#2563eb',
    'with-image': '#D1D5DB'
  };
  return colors[templateId] || '#D1D5DB';
};

const getResponsiveFontSize = (baseSize, isMobile = false) => {
  if (isMobile) {
    // Scale up font sizes for mobile to maintain readability
    return `${baseSize * 1.4}px`;
  }
  return `${baseSize}px`;
};

const renderTemplatePreview = (template, isMobile = false) => {
  const previewColor = getPreviewColor(template.id);
  
  // Responsive font sizes - larger on mobile for readability
  const getSize = (base) => getResponsiveFontSize(base, isMobile);

  if (template.id === 'modern') {
    return (
      <div className="w-full h-full flex flex-col leading-[1.25] flex-1" style={{ padding: '2px', fontSize: getSize(3.5) }}>
        <div className="font-bold text-center mb-0.5" style={{ fontSize: getSize(5.5) }}>Ronald Moran Jr</div>
        <div className="text-gray-600 text-center mb-0.5" style={{ fontSize: getSize(3) }}>Software Engineer | email@example.com | +1 (555) 000-0000</div>
        <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
        <div className="flex gap-0.5 flex-1 mt-0.5">
          <div className="w-[30%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Skills</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>JavaScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Python</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>React</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Node.js</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>TypeScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>SQL</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>System Design</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Microservices</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Tools</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Git</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Docker</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>AWS</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>PostgreSQL</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>MongoDB</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Education</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>BS Computer Science</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>State University</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>2016 - 2020</div>
            </div>
          </div>
          <div className="w-[70%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Summary</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users with high availability and performance. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Experience</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>Senior Software Engineer</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Tech Company Inc. | Jan 2021 - Present</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40% through optimized caching and load balancing strategies</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Architected real-time data processing pipeline handling 50K requests/second with 99.9% uptime and sub-100ms response times</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Mentored team of 5 junior engineers, establishing code review practices, technical standards, and career development programs</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Optimized database queries and caching strategies, improving API response time by 60% and reducing infrastructure costs by 30%</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with product and design teams to deliver features increasing user engagement by 25% and revenue by 15%</div>
              <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Software Engineer</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Startup Solutions | Jun 2019 - Dec 2020</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Developed full-stack web applications using React, Node.js, and PostgreSQL serving 100K+ users with responsive design and mobile optimization</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients, handling 10K+ requests per day</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50% and improving code quality</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and implementing monitoring and alerting systems</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === 'classic') {
    return (
      <div className="w-full h-full flex flex-col leading-[1.2] flex-1" style={{ padding: '2px', fontSize: getSize(3.5) }}>
        <div className="font-bold text-center mb-0.5" style={{ fontSize: getSize(5.5) }}>Ronald Moran Jr</div>
        <div className="text-gray-600 text-center mb-0.5" style={{ fontSize: getSize(3) }}>Software Engineer | email@example.com | +1 (555) 000-0000</div>
        <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
        <div className="flex flex-col gap-0.5 flex-1 mt-0.5">
          <div className="flex flex-col gap-0.5">
            <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Summary</div>
            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users with high availability and performance. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to achieve technical excellence and career growth.</div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Skills</div>
            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>JavaScript, Python, React, Node.js, TypeScript, SQL, System Design, Microservices, GraphQL, Git, Docker, AWS, PostgreSQL, MongoDB, Kubernetes</div>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Experience</div>
            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
            <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>Senior Software Engineer</div>
            <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Tech Company Inc. | Jan 2021 - Present</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40% through optimized caching and load balancing strategies</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Architected real-time data processing pipeline handling 50K requests/second with 99.9% uptime and sub-100ms response times</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Mentored team of 5 junior engineers, establishing code review practices, technical standards, and career development programs</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Optimized database queries and caching strategies, improving API response time by 60% and reducing infrastructure costs by 30%</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with product and design teams to deliver features increasing user engagement by 25% and revenue by 15%</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes, improving team productivity</div>
            <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Software Engineer</div>
            <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Startup Solutions | Jun 2019 - Dec 2020</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Developed full-stack web applications using React, Node.js, and PostgreSQL serving 100K+ users with responsive design and mobile optimization</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients, handling 10K+ requests per day</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50% and improving code quality</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and implementing monitoring and alerting systems</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Designed and implemented payment processing system handling $5M+ in transactions monthly with PCI compliance and fraud detection</div>
            <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Junior Software Engineer</div>
            <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Tech Startup | Aug 2018 - May 2019</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built responsive web interfaces using React and Redux, improving user experience and page load times by 35%</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with cross-functional teams to implement new features and fix critical bugs in production systems</div>
            <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Participated in code reviews and contributed to improving team coding standards and best practices</div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Education</div>
            <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
            <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>BS Computer Science</div>
            <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>State University | 2016 - 2020</div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === 'minimal') {
    return (
      <div className="w-full h-full flex flex-col leading-[1.2] flex-1" style={{ padding: '2px', fontSize: getSize(3.5) }}>
        <div className="font-semibold text-center mb-0.5" style={{ fontSize: getSize(5.5) }}>Ronald Moran Jr</div>
        <div className="text-gray-600 text-center mb-0.5" style={{ fontSize: getSize(3) }}>Software Engineer | email@example.com | +1 (555) 000-0000</div>
        <div className="h-0.5 my-0.5" style={{ backgroundColor: previewColor }}></div>
        <div className="flex gap-0.5 flex-1 mt-0.5">
          <div className="w-[30%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold uppercase" style={{ fontSize: getSize(3) }}>Skills</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>JavaScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Python</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>React</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Node.js</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>TypeScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>SQL</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>System Design</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Microservices</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold uppercase" style={{ fontSize: getSize(3) }}>Tools</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Git</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Docker</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>AWS</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>PostgreSQL</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold uppercase" style={{ fontSize: getSize(3) }}>Education</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>BS Computer Science</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>State University</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>2016 - 2020</div>
            </div>
          </div>
          <div className="w-[70%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold uppercase" style={{ fontSize: getSize(3) }}>Summary</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users with high availability and performance. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="font-semibold uppercase" style={{ fontSize: getSize(3) }}>Experience</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>Senior Software Engineer</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Tech Company Inc. | Jan 2021 - Present</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40% through optimized caching and load balancing strategies</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Architected real-time data processing pipeline handling 50K requests/second with 99.9% uptime and sub-100ms response times</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Mentored team of 5 junior engineers, establishing code review practices, technical standards, and career development programs</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Optimized database queries and caching strategies, improving API response time by 60% and reducing infrastructure costs by 30%</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with product and design teams to deliver features increasing user engagement by 25% and revenue by 15%</div>
              <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Software Engineer</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Startup Solutions | Jun 2019 - Dec 2020</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Developed full-stack web applications using React, Node.js, and PostgreSQL serving 100K+ users with responsive design and mobile optimization</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients, handling 10K+ requests per day</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50% and improving code quality</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and implementing monitoring and alerting systems</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === 'corporate') {
    return (
      <div className="w-full h-full flex flex-col leading-[1.2] flex-1" style={{ padding: '2px', fontSize: getSize(3.5) }}>
        <div className="font-bold mb-0.5" style={{ fontSize: getSize(6) }}>Ronald Moran Jr</div>
        <div className="text-gray-700 mb-0.5" style={{ fontSize: getSize(3) }}>Software Engineer | email@example.com | +1 (555) 000-0000</div>
        <div className="h-0.5 w-1/4 mb-0.5" style={{ backgroundColor: previewColor }}></div>
        <div className="flex gap-0.5 flex-1">
          <div className="w-[35%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase text-blue-600" style={{ fontSize: getSize(3) }}>Education</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>BS Computer Science</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>State University</div>
              <div className="text-gray-500" style={{ fontSize: getSize(2.5) }}>2016 - 2020</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase text-blue-600" style={{ fontSize: getSize(3) }}>Skills</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• JavaScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• Python</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• React</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• Node.js</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• TypeScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• SQL</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• System Design</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• Microservices</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase text-blue-600" style={{ fontSize: getSize(3) }}>Tools</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• Git</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• Docker</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• AWS</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>• PostgreSQL</div>
            </div>
          </div>
          <div className="w-[65%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase text-blue-600" style={{ fontSize: getSize(3) }}>Summary</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users with high availability and performance. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="font-bold uppercase text-blue-600" style={{ fontSize: getSize(3) }}>Work History</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>Senior Software Engineer</div>
              <div className="text-blue-600" style={{ fontSize: getSize(2.5) }}>Tech Company Inc. | Jan 2021 - Present</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40% through optimized caching and load balancing strategies</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Architected real-time data processing pipeline handling 50K requests/second with 99.9% uptime and sub-100ms response times</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Mentored team of 5 junior engineers, establishing code review practices, technical standards, and career development programs</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Optimized database queries and caching strategies, improving API response time by 60% and reducing infrastructure costs by 30%</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with product and design teams to deliver features increasing user engagement by 25% and revenue by 15%</div>
              <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Software Engineer</div>
              <div className="text-blue-600" style={{ fontSize: getSize(2.5) }}>Startup Solutions | Jun 2019 - Dec 2020</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Developed full-stack web applications using React, Node.js, and PostgreSQL serving 100K+ users with responsive design and mobile optimization</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients, handling 10K+ requests per day</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50% and improving code quality</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and implementing monitoring and alerting systems</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === 'with-image') {
    return (
      <div className="w-full h-full flex flex-col leading-[1.2] flex-1" style={{ padding: '2px', fontSize: getSize(3.5) }}>
        <div className="mb-0.5 pb-0.5 border-b" style={{ borderColor: previewColor }}>
          <div className="font-bold mb-0.5" style={{ fontSize: getSize(5.5) }}>Ronald Moran Jr</div>
          <div className="text-gray-600 mb-0.5" style={{ fontSize: getSize(3) }}>Software Engineer</div>
          <div className="text-gray-500" style={{ fontSize: getSize(2.5) }}>email@example.com | +1 (555) 000-0000</div>
        </div>
        <div className="flex gap-0.5 flex-1">
          <div className="w-[28%] flex flex-col gap-0.5">
            <img 
              src={logoImage} 
              alt="Profile" 
              className="w-full aspect-square object-cover rounded border border-gray-200 mb-0.5"
            />
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Skills</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>JavaScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Python</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>React</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Node.js</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>TypeScript</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>SQL</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>System Design</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Tools</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Git</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>Docker</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>AWS</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>PostgreSQL</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Education</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>BS Computer Science</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>State University</div>
              <div className="text-gray-600" style={{ fontSize: getSize(2.5) }}>2016 - 2020</div>
            </div>
          </div>
          <div className="w-[72%] flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Summary</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users with high availability and performance. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="font-bold uppercase" style={{ fontSize: getSize(3) }}>Experience</div>
              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
              <div className="font-semibold" style={{ fontSize: getSize(2.5) }}>Senior Software Engineer</div>
              <div className="text-blue-600" style={{ fontSize: getSize(2.5) }}>Tech Company Inc. | Jan 2021 - Present</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40% through optimized caching and load balancing strategies</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Architected real-time data processing pipeline handling 50K requests/second with 99.9% uptime and sub-100ms response times</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Mentored team of 5 junior engineers, establishing code review practices, technical standards, and career development programs</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Optimized database queries and caching strategies, improving API response time by 60% and reducing infrastructure costs by 30%</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Collaborated with product and design teams to deliver features increasing user engagement by 25% and revenue by 15%</div>
              <div className="font-semibold mt-0.5" style={{ fontSize: getSize(2.5) }}>Software Engineer</div>
              <div className="text-blue-600" style={{ fontSize: getSize(2.5) }}>Startup Solutions | Jun 2019 - Dec 2020</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Developed full-stack web applications using React, Node.js, and PostgreSQL serving 100K+ users with responsive design and mobile optimization</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients, handling 10K+ requests per day</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50% and improving code quality</div>
              <div className="text-gray-600 leading-tight" style={{ fontSize: getSize(2.5) }}>• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and implementing monitoring and alerting systems</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default function BounceCards({
  className = '',
  templates = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true,
  onCardClick
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    templates.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    templates.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {templates.map((template, idx) => (
        <div
          key={template.id}
          className={`card card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? 'none'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => onCardClick && onCardClick(template)}
        >
          {/* Paper frame - US Letter: 8.5" × 11" */}
          <div 
            className="relative bg-white w-full h-full"
            style={{
              aspectRatio: '8.5 / 11',
              border: '0.5px solid #D1D5DB',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              boxSizing: 'border-box',
            }}
          >
            {/* Resume content */}
            <div className="w-full h-full overflow-hidden" style={{ boxSizing: 'border-box' }}>
              {renderTemplatePreview(template, isMobile)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
