# Resume Builder

A professional, ATS-friendly resume builder built with React. Create compact, space-efficient resumes that fit perfectly on one page and export them as PDFs.

## Features

- ✨ **ATS-Friendly Design**: Optimized for Applicant Tracking Systems
- 📝 **Easy Form Input**: Fill in your information with an intuitive form interface
- 📄 **Live Preview**: See your resume update in real-time as you type
- 📥 **PDF Download**: Export your resume as a professional PDF
- 🎨 **Modern Typography**: Uses Inter font for clean, professional appearance
- 💾 **Client-Side Only**: No backend required, everything runs in your browser
- 📐 **Two-Column Layout**: Efficient 30/70 split for maximum space utilization
- 📏 **One-Page Design**: Compact layout ensures everything fits on a single page

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Fill in Your Information**:
   - **Personal Information**: Name, title, email, phone, location, LinkedIn, GitHub
   - **Professional Summary**: Brief overview of your background
   - **Education**: Degree, school, field of study, dates, GPA
   - **Work Experience**: Company, position, location, dates, achievements
   - **Skills**: Core technical and professional skills
   - **Tools & Technologies**: Software, frameworks, platforms
   - **Languages**: Spoken languages with proficiency levels
   - **Certifications**: Professional certifications with issuer and date
   - **Projects**: Personal or professional projects with descriptions
2. **Preview**: See your resume update in real-time on the right side
3. **Download**: Click the "Download PDF" button to save your resume

## Template Design

The resume template features:

- **Two-Column Layout**: 
  - Left column (30%): Skills, Tools, Languages, Certifications
  - Right column (70%): Summary, Experience, Projects, Education
- **Compact Spacing**: Tight but readable line heights and margins
- **Modern Typography**: Inter font family for professional appearance
- **ATS-Friendly**: No graphics, clear text hierarchy, standard section names
- **Flat Design**: Pure white background, no gradients or shadows
- **Neutral Colors**: Black, dark gray, and muted blue accents only
- **Small Caps Headers**: Bold, uppercase section titles with thin dividers
- **One-Page Fit**: Optimized to fit all content on a single page

## Technologies Used

- React 18
- Vite
- jsPDF
- html2canvas
- CSS3

## License

MIT License - feel free to use this project for personal or commercial purposes.
