import { Box, Typography, withStyles } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import '98.css'

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
    zIndex: 9,
  },
})(Typography)

const generateDot = (x, y) => {
  const red = Math.random() * 256
  const green = Math.random() * 256
  const blue = Math.random() * 256
  return {
    left: x,
    top: y,
    color: `rgba(${red}, ${green}, ${blue}, 0.15)`,
    size: `${Math.random() * 60}px`,
  }
}

const generateManyDots = () => {
  const dots = []
  console.log('HEY')
  for (let i = 0; i < 800; i++) {
    const randomX = Math.random() * (window.innerWidth - 100) + 50
    const randomY = Math.random() * (window.innerHeight - 100) + 50
    dots.push(generateDot(randomX, randomY))
  }
  return dots
}

const initialDots = []

export const Splat = () => {
  const [dots, setDots] = useState(initialDots)
  const [listening, setListening] = useState(false)
  const drawDots = useCallback(
    (e) => {
      const xCoord = e.clientX
      const yCoord = e.clientY
      if (listening) {
        if (dots.length > 1) {
          const lastX = dots[dots.length - 1].left
          const lastY = dots[dots.length - 1].top
          const distFromlastPoint = ((xCoord - lastX) ** 2 + (yCoord - lastY) ** 2) ** 0.5
          if (distFromlastPoint > 15) {
            setDots([...dots, generateDot(xCoord, yCoord)])
          }
        } else {
          setDots([...dots, generateDot(xCoord, yCoord)])
        }
      }
    },
    [dots, listening],
  )

  return (
    <div
      className="window"
      style={{
        flexDirection: 'column',
        display: 'flex',
        height: '98vh',
        width: '98vw',
        overflow: 'hidden',
      }}
    >
      <div className="title-bar">
        <div className="title-bar-text">SPLAT!</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={() => setDots([])} />
          <button aria-label="Maximize" onClick={() => setDots(generateManyDots())} />
          <button aria-label="Close" onClick={() => setDots([])} />
        </div>
      </div>
      <Box
        bgcolor="white"
        display={'flex'}
        flexDirection={'row'}
        flexWrap="wrap"
        justifyContent={'center'}
        alignContent={'center'}
        style={{
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
        width={'100%'}
        flexGrow={1}
        pt={3}
        fontStyle={'white'}
        onMouseMove={(e) => drawDots(e)}
        onMouseEnter={() => setListening(true)}
        onMouseLeave={() => setListening(false)}
      >
        {dots.map((dot, idx) => (
          <Box
            position={'absolute'}
            width={dot.size}
            height={dot.size}
            bgcolor={dot.color}
            top={dot.top}
            left={dot.left}
            borderRadius={'47%'}
            key={'dot' + idx}
          />
        ))}
        <WhiteTextTypography variant="h1">
          HELLO <br />
          BEAUTIFUL!
        </WhiteTextTypography>
        <WhiteTextTypography variant="subtitle2">yes you</WhiteTextTypography>
      </Box>
    </div>
  )
}
