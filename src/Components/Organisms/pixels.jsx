import { Box } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import jpeg from 'jpeg-js'
import { QuoteCarousel } from './GPTsolid'

export const DeadSimple = () => {
  var getPixels = require('get-pixels')

  getPixels('https://thispersondoesnotexist.xyz/img/4316.jpg', function (err, pixels) {
    if (err) {
      console.log('Bad image path', err)
      //   console.log('Bad image path')
      return
    }
    console.log('got pixels', pixels.shape.slice())
  })

  useEffect(() => {
    fetch('https://thispersondoesnotexist.xyz/img/4316.jpg')
      .then((response) => response.json())
      .then((data) => console.log(data))
  }, [])

  return <QuoteCarousel />
}
