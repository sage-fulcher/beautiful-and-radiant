import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 260,
  height: 200,
}

export const DeadSimple = () => {
  const webcamRef = React.useRef(null)
  const [src, setSrc] = useState('')

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      debugger
      setSrc(imageSrc)
    }
  }, [webcamRef])

  useEffect(() => {
    console.log(src)
  }, [src])

  return (
    <Box>
      <button onClick={() => capture()}>Capture</button>
      {src == '' ? (
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={260}
          videoConstraints={videoConstraints}
        />
      ) : (
        <img src={src} />
      )}
    </Box>
  )
}
