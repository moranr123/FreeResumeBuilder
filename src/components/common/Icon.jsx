const iconMap = {
  email: 'fi-rr-envelope',
  phone: 'fi-rr-phone-call',
  location: 'fi-rr-marker',
  linkedin: 'fi-brands-linkedin',
  github: 'fi-brands-github',
  link: 'fi-rr-link',
  download: 'fi-rr-download',
  template: 'fi-rr-layout-fluid',
  user: 'fi-rr-user',
  education: 'fi-rr-graduation-cap',
  briefcase: 'fi-rr-briefcase',
  skills: 'fi-rr-settings',
  project: 'fi-rr-folder',
  preview: 'fi-rr-eye',
  arrowLeft: 'fi-rr-arrow-left',
  chevronLeft: 'fi-rr-angle-left',
  font: 'fi-rr-text',
}

function Icon({ name, className = '' }) {
  const iconClass = iconMap[name] || ''
  return <i className={`fi ${iconClass} ${className}`}></i>
}

export default Icon
