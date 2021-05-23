import { Box, withStyles } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 640,
  height: 480,
}

export const DeadSimple = () => {
  const webcamRef = React.useRef(null)
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
    <Box>
      <Box display="flex" flexDirection="column" style={{ position: 'relative' }}>
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
        <Box
          bgcolor="white"
          zIndex={0}
          width={'100%'}
          height={'100%'}
          style={{
            opacity: 1,
            position: 'absolute',
          }}
        />
        {srcs.current.map((src) => (
          <Box
            zIndex={1}
            style={{
              opacity: 0.1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img src={src} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
