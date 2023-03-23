import { Box } from '@material-ui/core'
import React, { useRef } from 'react'
import useInterval from 'react-useinterval'

function hslToHex(h, s, l) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export const Sorting = () => {
  const generateArray = (numElements) => {
    return Array.from(Array(numElements).keys())
  }
  const colorFromHeight = (height) => {
    const h = (height / numElements) * 255
    return hslToHex(h, 100, 50)
  }
  const numElements = 800
  const shuffle = (array) => {
    var currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex = currentIndex - 1

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  }

  const generateElements = () => {
    return shuffle(generateArray(numElements))
  }

  const starter = generateElements()
  const swapStyles = (j, k) => {
    const arr = theElements.current
    const ele1 = document.getElementById('bar' + j).parentElement
    const ele2 = document.getElementById('bar' + k).parentElement
    const ele1Height = ele1.style.height || (arr[j] / numElements) * 100 + '%'
    const ele1Color = ele1.style.backgroundColor || colorFromHeight(arr[j])
    const ele2Height = ele2.style.height || (arr[k] / numElements) * 100 + '%'
    const ele2Color = ele2.style.backgroundColor || colorFromHeight(arr[k])
    document.getElementById('bar' + j).parentElement.style.backgroundColor = ele2Color
    document.getElementById('bar' + j).parentElement.style.height = ele2Height
    document.getElementById('bar' + k).parentElement.style.backgroundColor = ele1Color
    document.getElementById('bar' + k).parentElement.style.height = ele1Height
  }
  const theElements = useRef(starter)
  const prevIndexRef = useRef(0)
  const done = useRef(false)
  // const prevMinRef = useRef(numElements + 1)

  const bubbleSort = () => {
    let prevIndex = prevIndexRef.current
    let arr = theElements.current
    if (prevIndex === arr.length) {
      done.current = true
    }
    for (let i = prevIndex; i < arr.length; i++) {
      prevIndexRef.current = i + 1
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j + 1] < arr[j]) {
          // ES6 way of swapping array elements
          swapStyles(j, j + 1)
          ;[theElements.current[j + 1], theElements.current[j]] = [
            theElements.current[j],
            theElements.current[j + 1],
          ]
        }
      }
      // setTheElements(arr)
      // setTheElementsStr(arr.join(''))
      return arr
    }
    return arr
  }

  // const insertionSort = () => {
  //   let arr = theElements.current
  //   let prevIndex = prevIndexRef.current

  //   for (let i = prevIndex; i < arr.length; i++) {
  //     prevIndexRef.current = i + 1
  //     // Start comparing current element with every element before it
  //     for (let j = i - 1; j > -1; j--) {
  //       console.log(j)
  //       console.table([arr[j], arr[j + 1]])
  //       // Swap elements as required
  //       if (arr[j + 1] < arr[j]) {
  //         swapStyles(j, j + 1)
  //         // document.getElementById('bar' + (j + 1)).parentElement.style.height =
  //         //   (arr[j] / numElements) * 100 + '%'
  //         // document.getElementById('bar' + j).parentElement.style.height =
  //         //   (arr[j + 1] / numElements) * 100 + '%'
  //         ;[theElements.current[j + 1], theElements.current[j]] = [arr[j], arr[j + 1]]
  //       }
  //     }
  //     return arr
  //   }
  //   return arr
  // }

  // const selectionSort = () => {
  //   let min = prevMinRef.current
  //   let arr = theElements.current
  //   let prevIndex = prevIndexRef.current

  //   for (let i = prevIndex; i < arr.length; i++) {
  //     prevIndexRef.current = i + 1
  //     // Assume a minimum value
  //     prevMinRef.current = i
  //     for (let j = i + 1; j < arr.length; j++) {
  //       if (arr[j] < arr[prevMinRef.current]) {
  //         prevMinRef.current = j
  //       }
  //     }

  //     // Swap if new minimun value found
  //     if (prevMinRef.current !== i) {
  //       swapStyles(i, prevMinRef.current)

  //       // document.getElementById('bar' + i).parentElement.style.height =
  //       //   (arr[prevMinRef.current] / numElements) * 100 + '%'
  //       // document.getElementById('bar' + prevMinRef.current).parentElement.style.height =
  //       //   (arr[i] / numElements) * 100 + '%'
  //       ;[arr[i], arr[prevMinRef.current]] = [arr[prevMinRef.current], arr[i]]
  //       theElements.current = arr
  //     }
  //     return
  //   }
  //   return arr
  // }
  // useEffect(() => {
  //   console.log('checking')
  //   setStopSorting(!theElements.find((e, idx) => e !== idx))
  // }, [theElementsStr, theElements])
  useInterval(bubbleSort, done.current ? null : 1.666666666)
  // useInterval(selectionSort, 1000)

  const Bar = ({ height, children }) => {
    console.log(height / numElements)
    return (
      <Box
        height={(height / numElements) * 100 + '%'}
        width={(1 / numElements) * 100 + '%'}
        bgcolor={colorFromHeight(height)}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      bgcolor={'#008080'}
      height={'96vh'}
      width={'96vw'}
      paddingY={'2vh'}
      paddingX={'2vw'}
      display={'flex'}
      flexDirection={'column'}
    >
      <link rel="stylesheet" href="https://unpkg.com/7.css"></link>
      {/* <Typography variant="h1">SORT YOURSELF OUT</Typography> */}
      <div
        className="window glass"
        style={{
          display: 'flex',
          flexDirection: 'column',
          // height: '98%',
          // width: '98%',
          overflow: 'hidden',
          flexGrow: 1,
        }}
      >
        <div style={{ zIndex: 99 }} className="title-bar">
          <div className="title-bar-text">SORT YOURSELF OUT</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div
          class="window-body has-space"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',

            // height: '98%',
            // width: '98%',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {/* <Box
            display={'flex'}
            flexDirection="row"
            height={'100%'}
            width={'100%'}
            // alignItems="flex-end"
          > */}
          {starter.map((element, idx) => (
            <Bar key={idx} height={element}>
              <div id={'bar' + idx} key={'outer' + idx}></div>
            </Bar>
          ))}
          {/* </Box> */}
        </div>
      </div>
    </Box>
  )
}

export default Sorting
