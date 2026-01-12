export const fonts = [
  {
    id: 'inter',
    name: 'Inter',
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
    googleFont: 'Inter:wght@400;500;600;700'
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Roboto:wght@400;500;700'
  },
  {
    id: 'opensans',
    name: 'Open Sans',
    family: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Open+Sans:wght@400;600;700'
  },
  {
    id: 'lato',
    name: 'Lato',
    family: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Lato:wght@400;700'
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Montserrat:wght@400;600;700'
  },
  {
    id: 'raleway',
    name: 'Raleway',
    family: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Raleway:wght@400;600;700'
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Poppins:wght@400;500;600;700'
  },
  {
    id: 'source-sans',
    name: 'Source Sans Pro',
    family: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Source+Sans+Pro:wght@400;600;700'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    family: "'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFont: 'Ubuntu:wght@400;500;700'
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    family: "'Playfair Display', Georgia, serif",
    googleFont: 'Playfair+Display:wght@400;600;700'
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    family: "'Merriweather', Georgia, serif",
    googleFont: 'Merriweather:wght@400;700'
  },
  {
    id: 'crimson',
    name: 'Crimson Text',
    family: "'Crimson Text', Georgia, serif",
    googleFont: 'Crimson+Text:wght@400;600;700'
  }
]

export const getFontGoogleUrl = (fontId) => {
  const font = fonts.find(f => f.id === fontId)
  if (!font) return null
  return `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`
}
