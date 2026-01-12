# Folder Structure

This document describes the maintainable folder structure of the Resume Builder application.

## Structure Overview

```
src/
├── components/          # Shared/reusable components
│   └── common/
│       └── Icon.jsx     # Icon component used across the app
│
├── features/            # Feature-based organization
│   ├── resume/         # Resume building feature
│   │   ├── components/
│   │   │   ├── ResumeForm.jsx      # Form for editing resume data
│   │   │   └── ResumePreview.jsx   # Preview component with PDF export
│   │   └── ResumeBuilder.jsx        # Main container for resume builder
│   │
│   └── template/       # Template selection feature
│       └── TemplateSelection.jsx   # Template selection screen
│
├── constants/          # Application constants
│   ├── resume.js       # Initial resume data structure
│   └── templates.js    # Available template definitions
│
├── utils/              # Utility functions (for future use)
│
├── assets/             # Static assets
│   └── logo.jpg
│
├── App.jsx             # Root component with routing logic
├── main.jsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Organization Principles

### 1. Feature-Based Structure
- Each major feature has its own folder under `features/`
- Features are self-contained with their own components
- Makes it easy to locate and modify feature-specific code

### 2. Shared Components
- Common, reusable components go in `components/common/`
- These are used across multiple features
- Example: `Icon` component

### 3. Constants
- All constants are centralized in `constants/`
- Makes it easy to update default values and configurations
- Separates data from logic

### 4. Clear Separation of Concerns
- **Features**: Business logic and feature-specific components
- **Components**: Reusable UI components
- **Constants**: Configuration and default data
- **Utils**: Helper functions (ready for future use)

## Import Paths

### From App.jsx
```javascript
import TemplateSelection from './features/template/TemplateSelection'
import ResumeBuilder from './features/resume/ResumeBuilder'
```

### From Feature Components
```javascript
// ResumePreview.jsx
import Icon from '../../../components/common/Icon'

// ResumeBuilder.jsx
import { initialResumeData } from '../../constants/resume'
```

### From Template Selection
```javascript
import Icon from '../../components/common/Icon'
import { templates } from '../../constants/templates'
```

## Benefits

1. **Maintainability**: Easy to find and modify code
2. **Scalability**: Simple to add new features
3. **Reusability**: Shared components are clearly identified
4. **Testability**: Features are isolated and testable
5. **Team Collaboration**: Clear structure reduces conflicts

## Future Additions

When adding new features:
1. Create a new folder under `features/`
2. Add feature-specific components in `features/[feature]/components/`
3. Add constants to `constants/` if needed
4. Update `App.jsx` to include the new feature

Example:
```
features/
  └── export/          # New export feature
      ├── components/
      │   └── ExportOptions.jsx
      └── ExportManager.jsx
```
