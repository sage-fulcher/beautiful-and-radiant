import { Box, Typography, withStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
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

const initialDots = []

export const Splat = () => {
  const [dots, setDots] = useState(initialDots)
  const [lastDot, setLastDot] = useState(initialDots)
  const [nextDot, setNextDot] = useState(initialDots)
  const drawDots = useCallback(
    (e) => {
      const xCoord = e.clientX
      const yCoord = e.clientY
      if (dots.length > 1) {
        const lastX = dots[dots.length - 1].left
        const lastY = dots[dots.length - 1].top
        const distFromlastPoint = ((xCoord - lastX) ** 2 + (yCoord - lastY) ** 2) ** 0.5
        if (distFromlastPoint > 15) {
          const newDot = generateDot(xCoord, yCoord)
          setDots([...dots, generateDot(xCoord, yCoord)])
        }
      } else {
        const newDot = generateDot(xCoord, yCoord)
        setDots([...dots, generateDot(xCoord, yCoord)])
      }
    },
    [dots],
  )

  return (
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
      width={'100vw'}
      height={'100vh'}
      pt={3}
      zIndex={2}
      fontStyle={'white'}
      onMouseMove={(e) => drawDots(e)}
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
      <WhiteTextTypography zIndex={3} variant="h1">
        HELLO <br />
        BEAUTIFUL!
      </WhiteTextTypography>
      <WhiteTextTypography variant="subtitle2">yes you</WhiteTextTypography>
    </Box>
  )
}
