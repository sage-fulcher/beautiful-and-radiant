import { Box } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 640,
  height: 480,
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
      {srcs.current.map((src) => (
        <Box
          width={'100%'}
          height={'100%'}
          paddingBottom={'50px'}
          zIndex={1}
          style={{
            opacity: 0.1,
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
