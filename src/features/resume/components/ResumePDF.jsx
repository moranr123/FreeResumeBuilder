import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { getColorScheme } from '../../../constants/colors'

// React-pdf supports these fonts out of the box:
// - Helvetica (default)
// - Times-Roman
// - Courier
// For Google Fonts, we'll map them to the closest system font
// or use Helvetica as fallback for best compatibility
const getPDFFontFamily = (fontId) => {
  const fontMap = {
    'inter': 'Helvetica',
    'roboto': 'Helvetica',
    'opensans': 'Helvetica',
    'lato': 'Helvetica',
    'montserrat': 'Helvetica',
    'raleway': 'Helvetica',
    'poppins': 'Helvetica',
    'source-sans': 'Helvetica',
    'ubuntu': 'Helvetica',
    'playfair': 'Times-Roman',
    'merriweather': 'Times-Roman',
    'crimson': 'Times-Roman',
  }
  return fontMap[fontId] || 'Helvetica'
}

function ResumePDF({ resumeData, selectedTemplate = 'modern', selectedFont = 'inter', selectedColor = 'black', themeColor = '#F2F2F2' }) {
  const colorScheme = getColorScheme(selectedColor)
  // Use react-pdf compatible font name
  const pdfFontFamily = getPDFFontFamily(selectedFont)
  
  // Get template-specific padding (convert mm to points: 1mm = 2.83465pt)
  const getTemplatePadding = () => {
    const paddingMap = {
      compact: { top: 22.68, right: 28.35, bottom: 22.68, left: 28.35 }, // 8mm 10mm
      modern: { top: 25.51, right: 31.18, bottom: 25.51, left: 31.18 }, // 9mm 11mm
      classic: { top: 25.51, right: 34.02, bottom: 25.51, left: 34.02 }, // 9mm 12mm
      minimal: { top: 22.68, right: 28.35, bottom: 22.68, left: 28.35 }, // 8mm 10mm
      corporate: { top: 34.02, right: 42.52, bottom: 34.02, left: 42.52 }, // 12mm 15mm
      'with-image': { top: 28.35, right: 34.02, bottom: 28.35, left: 34.02 }, // 10mm 12mm
    }
    return paddingMap[selectedTemplate] || paddingMap.modern
  }

  const padding = getTemplatePadding()

  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: pdfFontFamily,
      fontSize: selectedTemplate === 'corporate' ? 10 : 9.5,
      paddingTop: padding.top,
      paddingRight: padding.right,
      paddingBottom: padding.bottom,
      paddingLeft: padding.left,
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    header: {
      marginBottom: selectedTemplate === 'corporate' ? 12 : 8,
    },
    name: {
      fontSize: selectedTemplate === 'corporate' ? 22 : selectedTemplate === 'minimal' ? 16 : 18,
      fontWeight: 'bold',
      color: colorScheme.colors.primary,
      marginBottom: 4,
      textAlign: selectedTemplate === 'corporate' ? 'left' : 'center',
    },
    title: {
      fontSize: selectedTemplate === 'corporate' ? 11 : 10,
      color: colorScheme.colors.tertiary,
      marginBottom: 6,
      textAlign: selectedTemplate === 'corporate' ? 'left' : 'center',
    },
    contact: {
      fontSize: selectedTemplate === 'minimal' ? 7.5 : 8.5,
      color: colorScheme.colors.tertiary,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: selectedTemplate === 'corporate' ? 'flex-start' : 'center',
      gap: 4,
      marginBottom: 8,
    },
    divider: {
      width: '100%',
      height: 0.75,
      backgroundColor: themeColor,
      marginTop: 8,
      marginBottom: 8,
    },
    twoColumn: {
      flexDirection: 'row',
      marginTop: 8,
      gap: 10,
    },
    leftColumn: {
      width: '30%',
    },
    rightColumn: {
      width: '70%',
    },
    section: {
      marginBottom: 6,
    },
    sectionHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: selectedTemplate === 'corporate' ? themeColor : colorScheme.colors.primary,
      marginBottom: 4,
      fontVariant: 'small-caps',
    },
    sectionDivider: {
      width: '100%',
      height: 0.75,
      backgroundColor: themeColor,
      marginBottom: 4,
    },
    modernSectionDivider: {
      width: '100%',
      height: 0.75,
      backgroundColor: themeColor,
      marginTop: 0,
      marginBottom: 0,
    },
    modernSectionHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: colorScheme.colors.primary,
      marginTop: 7, // 6-8pt spacing from divider to title
      marginBottom: 0,
      fontVariant: 'small-caps',
    },
    modernSectionContent: {
      marginTop: 7, // 6-8pt spacing from title to content
      marginBottom: 0,
    },
    listItem: {
      fontSize: 8.5,
      color: colorScheme.colors.secondary,
      marginBottom: 2,
      lineHeight: 1.25,
    },
    experienceItem: {
      marginBottom: 6,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    position: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: colorScheme.colors.primary,
    },
    company: {
      fontSize: 9,
      fontWeight: 'semibold',
      color: themeColor,
    },
    date: {
      fontSize: 8,
      color: colorScheme.colors.tertiary,
      textAlign: 'right',
    },
    location: {
      fontSize: 8,
      color: colorScheme.colors.muted,
      textAlign: 'right',
    },
    bulletPoint: {
      fontSize: 8.5,
      color: colorScheme.colors.secondary,
      marginBottom: 1,
      paddingLeft: 8,
      lineHeight: 1.28,
    },
    summary: {
      fontSize: 8.5,
      color: colorScheme.colors.secondary,
      lineHeight: 1.3,
      marginBottom: 6,
    },
    singleColumn: {
      marginTop: 6,
    },
    corporateLeft: {
      width: '35%',
    },
    corporateRight: {
      width: '65%',
    },
    imageLayout: {
      flexDirection: 'row',
      marginTop: 8,
      gap: 12,
    },
    imageLeft: {
      width: '28%',
    },
    imageRight: {
      width: '72%',
    },
    profileImage: {
      width: '100%',
      aspectRatio: 1,
      marginBottom: 12,
      borderRadius: 4,
    },
  })

  const renderDivider = () => <View style={styles.divider} />

  // Render section header for all templates: divider first, then title
  const renderSectionHeader = (title) => {
    const headerColor = selectedTemplate === 'corporate' 
      ? themeColor 
      : colorScheme.colors.primary
    
    return (
      <View style={{ marginBottom: 0, padding: 0 }}>
        <View style={styles.modernSectionDivider} />
        <Text style={[styles.modernSectionHeader, { color: headerColor }]}>{title}</Text>
      </View>
    )
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{resumeData.personalInfo.fullName || 'Your Name'}</Text>
      {resumeData.personalInfo.title && (
        <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
      )}
      <View style={styles.contact}>
        {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
        {resumeData.personalInfo.phone && (
          <>
            <Text>{selectedTemplate === 'corporate' ? ' • ' : ' | '}</Text>
            <Text>{resumeData.personalInfo.phone}</Text>
          </>
        )}
        {resumeData.personalInfo.location && (
          <>
            <Text>{selectedTemplate === 'corporate' ? ' • ' : ' | '}</Text>
            <Text>{resumeData.personalInfo.location}</Text>
          </>
        )}
        {resumeData.personalInfo.linkedin && (
          <>
            <Text>{selectedTemplate === 'corporate' ? ' • ' : ' | '}</Text>
            <Text>{resumeData.personalInfo.linkedin}</Text>
          </>
        )}
        {resumeData.personalInfo.github && (
          <>
            <Text>{selectedTemplate === 'corporate' ? ' • ' : ' | '}</Text>
            <Text>{resumeData.personalInfo.github}</Text>
          </>
        )}
      </View>
      {renderDivider()}
    </View>
  )

  const renderTwoColumnLayout = () => (
    <View style={styles.twoColumn}>
      <View style={styles.leftColumn}>
        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Skills')}
          <View style={styles.modernSectionContent}>
            {(resumeData.skills.length > 0 ? resumeData.skills : [
              { id: 1, name: 'JavaScript' },
              { id: 2, name: 'Python' },
              { id: 3, name: 'React' },
              { id: 4, name: 'Node.js' },
            ]).map(skill => (
              <Text key={skill.id} style={styles.listItem}>{skill.name}</Text>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Tools')}
          <View style={styles.modernSectionContent}>
            {(resumeData.tools.length > 0 ? resumeData.tools : [
              { id: 1, name: 'Git' },
              { id: 2, name: 'Docker' },
              { id: 3, name: 'AWS' },
              { id: 4, name: 'PostgreSQL' },
            ]).map(tool => (
              <Text key={tool.id} style={styles.listItem}>{tool.name}</Text>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Languages')}
          <View style={styles.modernSectionContent}>
            {(resumeData.languages.length > 0 ? resumeData.languages : [
              { id: 1, name: 'English', proficiency: 'Native' },
              { id: 2, name: 'Spanish', proficiency: 'Fluent' },
            ]).map(lang => (
              <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={[styles.listItem, { fontWeight: 'bold' }]}>{lang.name}</Text>
                <Text style={[styles.listItem, { fontSize: 7.5, color: colorScheme.colors.muted }]}>{lang.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Certifications')}
          <View style={styles.modernSectionContent}>
            {(resumeData.certifications.length > 0 ? resumeData.certifications : [
              { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Jan 2023' },
            ]).map(cert => (
              <View key={cert.id} style={{ marginBottom: 4 }}>
                <Text style={[styles.listItem, { fontWeight: 'bold' }]}>{cert.name}</Text>
                {cert.issuer && <Text style={[styles.listItem, { fontSize: 8 }]}>{cert.issuer}</Text>}
                {cert.date && <Text style={[styles.listItem, { fontSize: 7.5, color: colorScheme.colors.muted }]}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.rightColumn}>
        {resumeData.summary && (
          <View style={{ marginBottom: 6 }}>
            {renderSectionHeader('Summary')}
            <View style={styles.modernSectionContent}>
              <Text style={styles.summary}>{resumeData.summary}</Text>
            </View>
          </View>
        )}

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Experience')}
          <View style={styles.modernSectionContent}>
            {(resumeData.experience.length > 0 ? resumeData.experience : [
          {
            id: 1,
            position: 'Senior Software Engineer',
            company: 'Tech Company Inc.',
            location: 'San Francisco, CA',
            startDate: 'Jan 2021',
            endDate: 'Present',
            current: true,
            description: '• Led development of microservices architecture\n• Architected real-time data processing pipeline\n• Mentored team of 5 junior engineers',
          },
        ]).map(exp => (
          <View key={exp.id} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.position}>{exp.position || 'Position'}</Text>
                <Text style={styles.company}>{exp.company || 'Company'}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                <Text style={styles.date}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Text>
              </View>
            </View>
            {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
              <Text key={idx} style={styles.bulletPoint}>
                {line.trim().replace(/^[•\-]\s*/, '')}
              </Text>
            ))}
          </View>
        ))}
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Projects')}
          <View style={styles.modernSectionContent}>
            {(resumeData.projects.length > 0 ? resumeData.projects : [
          {
            id: 1,
            name: 'E-Commerce Platform',
            technologies: 'React, Node.js, MongoDB',
            description: '• Built scalable e-commerce platform\n• Implemented real-time order tracking',
          },
        ]).map(project => (
          <View key={project.id} style={{ marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={[styles.position, { fontSize: 9.5 }]}>{project.name || 'Project Name'}</Text>
              {project.technologies && (
                <Text style={[styles.date, { fontSize: 7.5, fontStyle: 'italic' }]}>{project.technologies}</Text>
              )}
            </View>
            {project.description && project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
              <Text key={idx} style={styles.bulletPoint}>
                {line.trim().replace(/^[•\-]\s*/, '')}
              </Text>
            ))}
          </View>
        ))}
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          {renderSectionHeader('Education')}
          <View style={styles.modernSectionContent}>
            {(resumeData.education.length > 0 ? resumeData.education : [
          {
            id: 1,
            degree: 'Bachelor of Science in Computer Science',
            school: 'State University',
            field: 'Computer Science',
            location: 'City, State',
            startDate: 'Aug 2016',
            endDate: 'May 2020',
            gpa: '3.8',
          },
        ]).map(edu => (
          <View key={edu.id} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.position}>{edu.degree || 'Degree'}</Text>
                <Text style={styles.company}>{edu.school || 'School'}</Text>
                {edu.field && <Text style={[styles.date, { textAlign: 'left', fontStyle: 'italic' }]}>{edu.field}</Text>}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {edu.location && <Text style={styles.location}>{edu.location}</Text>}
                <Text style={styles.date}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && <Text style={styles.date}>GPA: {edu.gpa}</Text>}
              </View>
            </View>
          </View>
        ))}
          </View>
        </View>
      </View>
    </View>
  )

  const renderSingleColumnLayout = () => (
    <View style={styles.singleColumn}>
      {resumeData.summary && (
        <>
          {renderSectionHeader('Summary')}
          <Text style={styles.summary}>{resumeData.summary}</Text>
        </>
      )}

      {renderSectionHeader('Experience')}
      {(resumeData.experience.length > 0 ? resumeData.experience : []).map(exp => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.position}>{exp.position || 'Position'}</Text>
              <Text style={styles.company}>{exp.company || 'Company'}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {exp.location && <Text style={styles.location}>{exp.location}</Text>}
              <Text style={styles.date}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
            </View>
          </View>
          {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
            <Text key={idx} style={styles.bulletPoint}>
              {line.trim().replace(/^[•\-]\s*/, '')}
            </Text>
          ))}
        </View>
      ))}

      {renderSectionHeader('Skills')}
      <Text style={styles.summary}>
        {(resumeData.skills.length > 0 ? resumeData.skills : []).map(s => s.name).join(', ')}
      </Text>
    </View>
  )

  const renderCorporateLayout = () => (
    <View style={styles.twoColumn}>
      <View style={styles.corporateLeft}>
        {renderSectionHeader('Education')}
        {(resumeData.education.length > 0 ? resumeData.education : []).map(edu => (
          <View key={edu.id} style={{ marginBottom: 8 }}>
            <Text style={[styles.position, { fontSize: 10 }]}>{edu.degree || 'Degree'}</Text>
            <Text style={styles.company}>{edu.school || 'School'}</Text>
            {edu.field && <Text style={[styles.date, { textAlign: 'left' }]}>{edu.field}</Text>}
            <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
          </View>
        ))}

        {renderSectionHeader('Skills')}
        {(resumeData.skills.length > 0 ? resumeData.skills : []).map(skill => (
          <Text key={skill.id} style={styles.bulletPoint}>• {skill.name}</Text>
        ))}
      </View>

      <View style={styles.corporateRight}>
        {resumeData.summary && (
          <>
            {renderSectionHeader('Professional Summary')}
            <Text style={styles.summary}>{resumeData.summary}</Text>
          </>
        )}

        {renderSectionHeader('Work History')}
        {(resumeData.experience.length > 0 ? resumeData.experience : []).map(exp => (
          <View key={exp.id} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.position, { fontSize: 10.5 }]}>{exp.position || 'Position'}</Text>
                <Text style={[styles.company, { fontSize: 9.5 }]}>{exp.company || 'Company'}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                <Text style={styles.date}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Text>
              </View>
            </View>
            {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
              <Text key={idx} style={[styles.bulletPoint, { paddingLeft: 12 }]}>
                {line.trim().replace(/^[•\-]\s*/, '')}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  )

  const renderImageLayout = () => (
    <View style={styles.imageLayout}>
      <View style={styles.imageLeft}>
        {resumeData.personalInfo.profilePhoto && (
          <Image src={resumeData.personalInfo.profilePhoto} style={styles.profileImage} />
        )}
        {renderSectionHeader('Skills')}
        {(resumeData.skills.length > 0 ? resumeData.skills : []).map(skill => (
          <Text key={skill.id} style={styles.listItem}>{skill.name}</Text>
        ))}
      </View>

      <View style={styles.imageRight}>
        {resumeData.summary && (
          <>
            {renderSectionHeader('Professional Summary')}
            <Text style={styles.summary}>{resumeData.summary}</Text>
          </>
        )}

        {renderSectionHeader('Experience')}
        {(resumeData.experience.length > 0 ? resumeData.experience : []).map(exp => (
          <View key={exp.id} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.position}>{exp.position || 'Position'}</Text>
                <Text style={styles.company}>{exp.company || 'Company'}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                <Text style={styles.date}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Text>
              </View>
            </View>
            {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
              <Text key={idx} style={styles.bulletPoint}>
                {line.trim().replace(/^[•\-]\s*/, '')}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {renderHeader()}
        {selectedTemplate === 'classic' 
          ? renderSingleColumnLayout() 
          : selectedTemplate === 'corporate'
          ? renderCorporateLayout()
          : selectedTemplate === 'with-image'
          ? renderImageLayout()
          : renderTwoColumnLayout()}
      </Page>
    </Document>
  )
}

export default ResumePDF
