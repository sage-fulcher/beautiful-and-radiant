import { Box } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 640,
  height: 480,
}

function getNormalSeries(num) {
  const mean = 5
  const stdDev = 2
  let series = []
  for (let i = 1; i <= 10; i++) {
    if (i === num) {
      series.push(0.2)
    } else if (i === 1 || i === 10) {
      series.push(0.01)
    } else {
      const probability = normalDistribution(mean, stdDev, i)
      const value = probability * (1 - 0.2 - 0.01 * 2)
      series.push(value)
    }
  }
  return series
}

function normalDistribution(mean, stdDev, x) {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI))
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2)
  return coefficient * Math.exp(exponent)
}

export const DeadSimple = () => {
  const webcamRef = useRef(null)
  let srcs = useRef([])
  const [newSrc, setNewSrc] = useState(null)

  useEffect(() => {
    if (webcamRef.current) {
      function getImage() {
        const imageSrc = webcamRef.current.getScreenshot()
        setNewSrc(imageSrc)
      }
      getImage()
      const interval = setInterval(() => getImage(), 300)
      return () => {
        clearInterval(interval)
      }
    }
  }, [webcamRef])

  useEffect(() => {
    if (newSrc) {
      const appendedSrcs = [newSrc, ...srcs.current]
      srcs.current = appendedSrcs.slice(0, 10)
    }
  }, [newSrc])
  const opacities = getNormalSeries(5)

  return (
    <Box
      display="flex"
      height={'100%'}
      width={'100%'}
      flexDirection="column"
      style={{ position: 'relative' }}
    >
      <Box
        bgcolor="white"
        zIndex={0}
        style={{
          opacity: 1,
          position: 'absolute',
        }}
        width={'100%'}
        height={'100%'}
      />
      <Box zIndex={-1}>
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
        />
      </Box>
      {srcs.current.map((src, idx) => (
        <Box
          width={'100%'}
          height={'100%'}
          paddingBottom={'50px'}
          zIndex={1}
          style={{
            opacity: opacities[idx],
            position: 'absolute',
          }}
          display={'flex'}
          justifyContent={'center'}
          bgcolor={'black'}
        >
          <img
            // paddingBottom={'50px'}
            height="100%"
            width="auto"
            src={src}
            alt="You from a few milliseconds ago"
          />
        </Box>
      ))}
    </Box>
  )
}
