import { Box } from '@material-ui/core'
import React from 'react'

const PrideFlag = ({ colors, direction = 'vertical', height = 200, ...rest }) => {
  const numColors = colors.length
  const flagStyle = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    height,
    width: '100%',
    ...rest,
  }
  const colorStyle = {
    flex: 1,
    height: `${100 / numColors}%`,
  }
  const colorElements = colors.map((color, index) => (
    <Box key={index} style={{ ...colorStyle, backgroundColor: color }} />
  ))

  return <Box style={flagStyle}>{colorElements}</Box>
}

const flags = [
  {
    id: 'rainbow',
    name: 'Rainbow',
    colors: ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'],
  },
  {
    id: 'transgender',
    name: 'Transgender',
    colors: ['#55CDFC', '#F7A8B8', '#FFFFFF', '#F7A8B8', '#55CDFC'],
  },
  {
    id: 'lesbian',
    name: 'Lesbian',
    colors: ['#D52D00', '#EF7627', '#FF9A56', '#FFFFFF', '#D162A4', '#B55690', '#A30262'],
  },
  { id: 'bisexual', name: 'Bisexual', colors: ['#D60270', '#9B4F96', '#0038A8'] },
  { id: 'pansexual', name: 'Pansexual', colors: ['#FF1B8D', '#FFD300', '#1BB3FF'] },
  { id: 'asexual', name: 'Asexual', colors: ['#000000', '#A4A4A4', '#FFFFFF', '#810081'] },
  { id: 'intersex', name: 'Intersex', colors: ['#FFD800', '#7A00AA'] },
  { id: 'genderqueer', name: 'Genderqueer', colors: ['#B57EDC', '#FFFFFF', '#4A8123'] },
  { id: 'nonbinary', name: 'Non-binary', colors: ['#FFF430', '#FFFFFF', '#9C59D1'] },
  { id: 'twospirit', name: 'Two-spirit', colors: ['#9E2A2B', '#FFFFFF', '#000000'] },
  { id: 'polyamory', name: 'Polyamory', colors: ['#000000', '#FF0000', '#008000', '#FFFF00'] },
]

export const FlagsContainer = () => {
  const flagContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '100%',
  }

  const flagStyle = {
    flex: '0 0 calc(33.33% - 10px)',
    margin: '5px',
    maxWidth: '200px',
  }

  return (
    <div style={flagContainerStyle}>
      {flags.map((flag) => (
        <div key={flag.id} style={flagStyle}>
          <PrideFlag colors={flag.colors} />
        </div>
      ))}
    </div>
  )
}

export default PrideFlag
