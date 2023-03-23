import { Box, Typography, withStyles } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
    zIndex: 9,
  },
})(Typography)
const BlackTextTypography = withStyles({
  root: {
    color: '#000000',
    zIndex: 9,
  },
})(Typography)

function randn_bm() {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 10 || num < -9) return randn_bm() // resample between 0 and 1
  return num
}
const generateDot = (x, y) => {
  const red = randn_bm() * 256
  const green = Math.random() * 256
  const blue = Math.random() * 256
  const size = Math.round(randn_bm() * 40)
  return {
    left: x - size / 2,
    top: y - size / 2,
    color: `rgba(${red}, ${green}, ${blue}, 0.15)`,
    size: `${size}px`,
  }
}

const generateManyDots = (totalDots = 900) => {
  const dots = []
  const gaussianDots = totalDots * randn_bm()
  for (let i = 0; i < gaussianDots; i++) {
    const randomX = randn_bm() * (window.innerWidth - 80) + 60
    const randomY = randn_bm() * (window.innerHeight - 80) + 60
    dots.push(generateDot(randomX, randomY))
  }
  for (let i = 0; i < totalDots - gaussianDots; i++) {
    const randomX = Math.random() * (window.innerWidth - 30) + 30
    const randomY = Math.random() * (window.innerHeight - 80) + 60
    dots.push(generateDot(randomX, randomY))
  }
  return dots
}

const initialDots = generateManyDots(20)

export const Splat = () => {
  require('98.css') // here

  const [dots, setDots] = useState(initialDots)
  const [darkMode, setDarkMode] = useState(false)
  const rectRef = useRef()
  const drawDots = useCallback(
    (e) => {
      if (rectRef.current) {
        var rect = rectRef.current.getBoundingClientRect()
        const xCoord = e.clientX - rect.left
        const yCoord = e.clientY - rect.top
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
    [dots],
  )

  return (
    <Box
      bgcolor={darkMode ? '#818181' : '#008080'}
      height={'96vh'}
      width={'96vw'}
      paddingY={'2vh'}
      paddingX={'2vw'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'baseline'}>
        <WhiteTextTypography variant={'h4'}>
          You won't know what you are missing till you go look for it
        </WhiteTextTypography>
      </Box>
      <div
        className="window"
        style={{
          display: 'flex',
          flexDirection: 'column',
          //   height: '98%',
          //   width: '98%',
          overflow: 'hidden',
          flexGrow: 1,
        }}
      >
        <div style={{ zIndex: 99 }} className="title-bar">
          <div className="title-bar-text">SPLAT!</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={() => setDots([])} />
            <button aria-label="Maximize" onClick={() => setDots(generateManyDots())} />
            <button aria-label="Close" onClick={() => setDarkMode(!darkMode)} />
          </div>
        </div>
        <Box
          bgcolor={darkMode ? 'black' : 'white'}
          display={'flex'}
          flexDirection={'row'}
          flexWrap="wrap"
          justifyContent={'center'}
          alignContent={'center'}
          style={{
            overflow: 'hidden',
          }}
          width={'100%'}
          flexGrow={1}
          pt={3}
          fontStyle={'white'}
          position={'relative'}
          onMouseMove={(e) => drawDots(e)}
          onTouchMove={(e) => drawDots(e)}
          ref={rectRef}
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
          {darkMode ? (
            <>
              <BlackTextTypography variant="h1">
                HELLO <br />
                BEAUTIFUL!
              </BlackTextTypography>
              <BlackTextTypography variant="subtitle2">yes you</BlackTextTypography>
            </>
          ) : (
            <>
              <WhiteTextTypography variant="h1">
                HELLO <br />
                BEAUTIFUL!
              </WhiteTextTypography>
              <WhiteTextTypography variant="subtitle2">yes you</WhiteTextTypography>
            </>
          )}
        </Box>
      </div>
    </Box>
  )
}
