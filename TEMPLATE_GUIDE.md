# Resume Template Guide

## Overview

This resume builder features a professional, ATS-friendly template with a compact two-column layout designed to fit all your information on a single page while maintaining excellent readability.

## Template Specifications

### Layout Structure

**Two-Column Design:**
- **Left Column (30%)**: Contains supporting information
  - Skills
  - Tools & Technologies
  - Languages
  - Certifications
  
- **Right Column (70%)**: Contains main content
  - Professional Summary
  - Work Experience
  - Projects
  - Education

### Design Principles

1. **ATS-Friendly**
   - No images or graphics
   - Clean text hierarchy
   - Standard section names
   - Machine-readable format

2. **Space-Efficient**
   - Tight line heights (1.32)
   - Minimal margins and padding
   - Thin dividers instead of large spacing
   - Compact font sizes (8.5-10pt)

3. **Modern Typography**
   - Font Family: Inter (with system fallbacks)
   - Section Headers: Bold, uppercase, small-caps
   - Body Text: 9pt base size
   - Header: 17pt name, 9.5pt title

4. **Color Palette**
   - Background: Pure white (#ffffff)
   - Primary Text: Black (#000) and dark gray (#1a1a1a)
   - Secondary Text: Medium gray (#4b5563, #6b7280)
   - Accent: Muted blue (#2563eb)
   - Dividers: Light gray (#d1d5db)

## Best Practices for Content

### Personal Information
- Keep contact details concise
- Use abbreviated URLs (e.g., "linkedin.com/in/username")
- Include only relevant links

### Professional Summary
- 3-4 sentences maximum
- Focus on key achievements and expertise
- Avoid first-person pronouns
- Keep it dense but readable

### Experience
- Use bullet points for achievements
- Start each bullet with action verbs
- Quantify results when possible
- Keep descriptions concise (1-3 lines per bullet)
- Limit to 3-5 bullets per position

### Skills & Tools
- List items in order of proficiency
- Group similar skills together
- Use industry-standard terminology
- Avoid rating bars (not ATS-friendly)

### Projects
- Include 2-4 most relevant projects
- Highlight technologies used
- Focus on impact and results
- Include links if available

### Education
- Most recent degree first
- Include GPA if above 3.5
- Add relevant coursework sparingly
- Keep location details minimal

## Tips for One-Page Fit

1. **Prioritize Content**: Include only the most relevant information
2. **Condense Descriptions**: Use concise, impactful language
3. **Limit Entries**: 2-3 work experiences, 2-4 projects, 1-2 education entries
4. **Remove Redundancy**: Avoid repeating similar information
5. **Adjust Skills**: Include 6-10 core skills maximum

## Sample Data Structure

### Optimal Content Amounts for One Page:
- **Work Experience**: 2-3 positions, 3-4 bullets each
- **Projects**: 2-4 projects, 2-3 bullets each
- **Education**: 1-2 entries
- **Skills**: 8-12 items
- **Tools**: 8-12 items
- **Languages**: 2-4 languages
- **Certifications**: 2-4 certifications

## PDF Export

The template is optimized for PDF export:
- Maintains formatting and spacing
- Preserves font styling
- Ensures proper page breaks
- Generates ATS-readable files

## Customization Notes

If you need to modify the template:

1. **Font Sizes**: Located in `ResumePreview.css`
2. **Column Widths**: Adjust `.resume-sidebar` and `.resume-main` widths
3. **Spacing**: Modify margin and padding values in CSS
4. **Colors**: Update color values in CSS (maintain high contrast for ATS)

## Troubleshooting

**Content overflows one page:**
- Reduce number of experience/project entries
- Shorten bullet point descriptions
- Remove optional sections (website, certifications if minimal)
- Reduce font sizes slightly (stay above 8pt for readability)

**Text too cramped:**
- Increase line-height values slightly
- Add more margin between sections
- Reduce content amount

**ATS not parsing correctly:**
- Avoid special characters in section headers
- Use standard date formats (Jan 2020 - Dec 2023)
- Keep formatting simple and consistent
- Test with online ATS checkers

## Support

For issues or questions:
1. Check the main README.md for setup instructions
2. Verify all dependencies are installed
3. Ensure you're using a modern browser for preview
4. Test PDF export with sample data first
