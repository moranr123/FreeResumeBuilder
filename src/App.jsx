import { useState } from 'react'
import TemplateSelection from './features/template/TemplateSelection'
import ResumeBuilder from './features/resume/ResumeBuilder'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  if (!selectedTemplate) {
    return <TemplateSelection onSelectTemplate={setSelectedTemplate} />
  }

  return <ResumeBuilder selectedTemplate={selectedTemplate} />
}

export default App
