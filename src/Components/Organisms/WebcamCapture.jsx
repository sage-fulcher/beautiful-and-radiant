import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 260,
  height: 200,
  facingMode: 'user',
}

export const WebcamCapture = () => {
  const webcamRef = React.useRef(null)
  const [src, setSrc] = useState('')

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setSrc(imageSrc)
  }, [webcamRef])

  return (
    <Box>
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={260}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture()}>Capture</button>
    </Box>
  )
}
