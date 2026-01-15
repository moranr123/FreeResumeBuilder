export const initialResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    profilePhoto: '',
  },
  summary: '',
  experience: [
    {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
  ],
  education: [
    {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }
  ],
  skills: [
    { id: Date.now(), name: '', level: 5 }
  ],
  tools: [
    { id: Date.now(), name: '' }
  ],
  languages: [
    { id: Date.now(), name: '', proficiency: 'Fluent' }
  ],
  certifications: [
    { id: Date.now(), name: '', issuer: '', date: '' }
  ],
  projects: [
    {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      github: '',
    }
  ],
}
