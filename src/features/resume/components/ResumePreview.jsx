import { useRef, useEffect, useCallback, useMemo } from 'react'
import { pdf } from '@react-pdf/renderer'
import Icon from '../../../components/common/Icon'
import { fonts } from '../../../constants/fonts'
import { getColorScheme } from '../../../constants/colors'
import ResumePDF from './ResumePDF'
import TwoColumnLayout from './layouts/TwoColumnLayout'
import SingleColumnLayout from './layouts/SingleColumnLayout'
import CorporateLayout from './layouts/CorporateLayout'
import ImageLayout from './layouts/ImageLayout'
import { renderDivider, renderSectionHeader } from './layouts/layoutUtils'

function ResumePreview({ resumeData, selectedTemplate = 'modern', selectedFont = 'inter', selectedColor = 'black', themeColor = '#F2F2F2', onDownloadReady, inModal = false }) {
  // US Letter dimensions at 96 DPI: 816px x 1056px (exact 1:1 scale)
  // This ensures pixel-perfect WYSIWYG between preview and PDF
  const US_LETTER_WIDTH_PX = 816
  const US_LETTER_HEIGHT_PX = 1056
  
  const resumeRef = useRef(null)
  const resumeDataRef = useRef(resumeData)
  const colorScheme = useMemo(() => getColorScheme(selectedColor), [selectedColor])

  // Keep ref in sync with latest resumeData
  useEffect(() => {
    resumeDataRef.current = resumeData
  }, [resumeData])

  // Text flow normalization styles - match Word/Google Docs rendering
  const textFlowStyles = {
    whiteSpace: 'normal',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    letterSpacing: 'normal',
    textAlign: 'left'
  }

  const downloadPDF = useCallback(async () => {
    try {
      // Generate true vector PDF using @react-pdf/renderer
      // This creates a native PDF with embedded fonts and vector graphics
      const pdfDoc = (
        <ResumePDF
          resumeData={resumeDataRef.current}
          selectedTemplate={selectedTemplate}
          selectedFont={selectedFont}
          selectedColor={selectedColor}
          themeColor={themeColor}
        />
      )

      // Generate PDF blob
      const blob = await pdf(pdfDoc).toBlob()
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const fileName = resumeDataRef.current?.personalInfo?.fullName || 'resume'
      link.download = `${fileName}-resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error // Re-throw so loading state can be handled
    }
  }, [selectedTemplate, selectedFont, selectedColor, themeColor])

  useEffect(() => {
    if (onDownloadReady) {
      onDownloadReady(downloadPDF)
    }
  }, [onDownloadReady, downloadPDF])

  const templateClasses = useMemo(() => {
    // Always use exact pixel dimensions for pixel-perfect rendering
    // US Letter: 8.5" x 11" = 215.9mm x 279.4mm = 816px x 1056px at 96 DPI
    const base = "bg-white font-sans text-gray-900 overflow-hidden"
    const styles = {
      compact: `${base} text-[9pt] leading-[1.28] p-[8mm_10mm]`,
      modern: `${base} text-[9.5pt] leading-[1.35] p-[9mm_11mm]`,
      classic: `${base} text-[9pt] leading-[1.32] p-[9mm_12mm]`,
      minimal: `${base} text-[9pt] leading-[1.4] p-[8mm_10mm]`,
      corporate: `${base} text-[10pt] leading-[1.5] p-[12mm_15mm]`,
      'with-image': `${base} text-[9.5pt] leading-[1.4] p-[10mm_12mm]`,
    }
    return styles[selectedTemplate] || styles.modern
  }, [selectedTemplate])

  // Use renderDivider from layoutUtils
  const renderDividerComponent = () => renderDivider(themeColor)

  const renderHeader = () => {
    const headerStyles = {
      compact: 'text-center mb-1.5 pb-1',
      modern: 'text-center mb-2 pb-1.5',
      classic: 'text-center mb-2 pb-1.5',
      minimal: 'text-center mb-1.5 pb-0.5',
      corporate: 'mb-3 pb-2',
      'with-image': 'mb-3 pb-2',
    }
    const nameStyles = {
      compact: 'text-[17pt] font-bold mb-0.5 text-black uppercase',
      modern: 'text-[18pt] font-bold mb-1 text-black',
      classic: 'text-[18pt] font-bold mb-1 text-black',
      minimal: 'text-[16pt] font-semibold mb-0.5 text-black',
      corporate: 'text-[22pt] font-bold mb-1 text-black',
      'with-image': 'text-[20pt] font-bold mb-1 text-black',
    }
    const titleStyles = {
      compact: 'text-[9.5pt] font-medium mb-1 text-gray-600',
      modern: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      classic: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      minimal: 'text-[9pt] font-normal mb-1 text-gray-500',
      corporate: 'text-[11pt] font-medium mb-2 text-gray-700',
      'with-image': 'text-[10pt] font-medium mb-1.5 text-gray-600',
    }
    const contactStyles = {
      compact: 'flex justify-center flex-wrap gap-1 text-[8pt] text-gray-600',
      modern: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      classic: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      minimal: 'flex justify-center flex-wrap gap-1 text-[7.5pt] text-gray-500',
      corporate: 'flex flex-wrap gap-2 text-[9pt] text-gray-600',
      'with-image': 'flex flex-wrap gap-2 text-[8.5pt] text-gray-600',
    }


    return (
      <header className={headerStyles[selectedTemplate] || headerStyles.modern}>
        <h1 
          className={nameStyles[selectedTemplate] || nameStyles.modern}
          style={{ 
            color: colorScheme.colors.primary,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: 'normal',
            textAlign: 'left'
          }}
        >
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        {resumeData.personalInfo.title && (
          <p 
            className={titleStyles[selectedTemplate] || titleStyles.modern}
            style={{ 
              color: colorScheme.colors.tertiary,
              whiteSpace: 'normal',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              letterSpacing: 'normal',
              textAlign: 'left'
            }}
          >
            {resumeData.personalInfo.title}
          </p>
        )}
        <div 
          className={contactStyles[selectedTemplate] || contactStyles.modern}
          style={{ 
            color: colorScheme.colors.tertiary,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: 'normal',
            textAlign: 'left'
          }}
        >
          {resumeData.personalInfo.email && (
            <span className="inline-block">{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.phone}</span>
            </>
          )}
          {resumeData.personalInfo.location && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.location}</span>
            </>
          )}
          {resumeData.personalInfo.linkedin && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.linkedin}</span>
            </>
          )}
          {resumeData.personalInfo.github && (
            <>
              {selectedTemplate === 'corporate' ? (
                <span style={{ color: colorScheme.colors.light }}>•</span>
              ) : (
                <span style={{ color: colorScheme.colors.light }}>|</span>
              )}
              <span className="inline-block">{resumeData.personalInfo.github}</span>
            </>
          )}
        </div>
        {renderDividerComponent()}
      </header>
    )
  }

  // Layout components are now extracted - use them directly




  const resumeContent = (
    <div 
      ref={resumeRef} 
      data-resume-content
      className={templateClasses}
      style={{ 
        fontFamily: fonts.find(f => f.id === selectedFont)?.family || fonts[0].family,
        boxSizing: 'border-box',
        margin: 0,
        // ALWAYS use exact US Letter dimensions at 1:1 scale for pixel-perfect WYSIWYG
        width: `${US_LETTER_WIDTH_PX}px`,
        height: `${US_LETTER_HEIGHT_PX}px`,
        minWidth: `${US_LETTER_WIDTH_PX}px`,
        minHeight: `${US_LETTER_HEIGHT_PX}px`,
        maxWidth: `${US_LETTER_WIDTH_PX}px`,
        maxHeight: `${US_LETTER_HEIGHT_PX}px`,
        // Text flow normalization - match Word/Google Docs rendering
        whiteSpace: 'normal',
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        letterSpacing: 'normal',
        textAlign: 'left',
        // Prevent column overflow and content shifts
        overflow: 'hidden',
        position: 'relative',
        // Font rendering optimization for pixel-perfect match
        fontSynthesis: 'none',
        textRendering: 'optimizeLegibility',
        webkitFontSmoothing: 'antialiased',
        mozOsxFontSmoothing: 'grayscale',
        // CSS variables for color scheme
        '--color-primary': colorScheme.colors.primary,
        '--color-secondary': colorScheme.colors.secondary,
        '--color-tertiary': colorScheme.colors.tertiary,
        '--color-accent': themeColor,
        '--color-muted': colorScheme.colors.muted,
        '--color-light': colorScheme.colors.light,
      }}
    >
      {renderHeader()}
      {selectedTemplate === 'classic' 
        ? <SingleColumnLayout resumeData={resumeData} selectedTemplate={selectedTemplate} colorScheme={colorScheme} themeColor={themeColor} />
        : selectedTemplate === 'corporate'
        ? <CorporateLayout resumeData={resumeData} selectedTemplate={selectedTemplate} colorScheme={colorScheme} themeColor={themeColor} />
        : selectedTemplate === 'with-image'
        ? <ImageLayout resumeData={resumeData} selectedTemplate={selectedTemplate} colorScheme={colorScheme} themeColor={themeColor} />
        : <TwoColumnLayout resumeData={resumeData} selectedTemplate={selectedTemplate} colorScheme={colorScheme} themeColor={themeColor} />}
    </div>
  )

  if (inModal) {
    return (
      <div style={{ 
        width: `${US_LETTER_WIDTH_PX}px`, 
        height: `${US_LETTER_HEIGHT_PX}px`,
        margin: '0 auto',
        display: 'block'
      }}>
        {resumeContent}
      </div>
    )
  }

  return (
    <div className="h-full min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-65px)] overflow-auto flex flex-col justify-start items-center pt-6 sm:pt-8 md:pt-10 hidden lg:flex" data-resume-preview>
      {/* Preview wrapper - scales for display but element itself is always 816x1056px */}
      {/* The actual resumeContent is always rendered at 1:1 scale (816x1056px) */}
      {/* We scale the wrapper for display, but PDF export captures the element at 1:1 */}
      <div 
        className="origin-top"
        style={{
          transform: 'scale(0.7)', // Scale for display only
          transformOrigin: 'top center',
        }}
      >
        {resumeContent}
      </div>
    </div>
  )
}

export default ResumePreview
