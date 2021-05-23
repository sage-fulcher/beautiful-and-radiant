import { Box, Typography } from '@material-ui/core'
import React, { useRef, useEffect, useState } from 'react'
import { DeadSimple } from '../Organisms/deadSimple'

export const ItsLayers = () => {
  const [frame, setFrame] = useState(null)

  useEffect(() => {
    const grabFrame = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const track = stream.getVideoTracks()[0]
        const capture = new ImageCapture(track)
        capture.grabFrame().then((imageBitmap) => {
          var canvas = document.querySelector('canvas')
          console.log('Grabbed frame:', imageBitmap)
          canvas.width = imageBitmap.width
          canvas.height = imageBitmap.height
          canvas.getContext('2d').drawImage(imageBitmap, 0, 0)
          canvas.classList.remove('hidden')
          setFrame(imageBitmap)
        })
      })
    }
    // grabFrame()
  }, [])
  return (
    <Box>
      <Typography variant="h1">IT'S LAYERS TO THIS</Typography>
      <DeadSimple />
    </Box>
  )
}

export default ItsLayers
