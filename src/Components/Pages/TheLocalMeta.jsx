import { Box } from '@material-ui/core'
import React, { useRef, useCallback } from 'react'
import { useState, useEffect } from 'react'
import useInterval from 'react-useinterval'
import Webcam from 'react-webcam'

const numRows = 25
const numCols = 35

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const videoConstraints = {
  width: numCols * 20,
  height: numRows * 20,
}

// Directions: N, S, E, W, NE, NW, SE, SW
const operations = [
  [0, 1], // right
  [0, -1], // left
  [1, -1], // top left
  [-1, 1], // top right
  [1, 1], // top
  [-1, -1], // bottom
  [1, 0], // bottom right
  [-1, 0], // bottom left
]

const generateEmptyGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}

const randomTiles = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)))
  }
  return rows
}

const GridGame = (bgImg) => {
  const [grid, setGrid] = useState(() => {
    return randomTiles()
  })

  const [running, setRunning] = useState(false)
  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback((grid) => {
    if (!runningRef.current) {
      return
    }

    let gridCopy = JSON.parse(JSON.stringify(grid))
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0

        operations.forEach(([x, y]) => {
          const newI = i + x
          const newJ = j + y

          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += grid[newI][newJ]
          }
        })

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1
        }
      }
    }

    setGrid(gridCopy)
  }, [])

  useInterval(() => {
    runSimulation(grid)
  }, 150)
  useEffect(() => {
    setRunning(!running)
    if (!running) {
      runningRef.current = true
    }
  }, [])
  const blendModes = [
    // 'multiply',
    'screen',
    // 'overlay',
    // 'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'color-burn',
    // 'hard-light',
    'soft-light',
    'difference',
    'color-burn',
    'color-burn',
    'exclusion',
    'hue',
    // 'saturation',
    'color',
    // 'luminosity',
  ]
  const [blendMode, setBlendMode] = useState(get_random(blendModes))

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          width: 'fit-content',
          margin: '0 auto',
          // bgImg: bgImg,
          bgcolor: '#c3c3c3',
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                // Deep clone grid
                let newGrid = JSON.parse(JSON.stringify(grid))
                newGrid[i][k] = grid[i][k] ? 0 : 1
                setGrid(newGrid)
              }}
              style={{
                width: 18,
                height: 18,
                backgroundColor: grid[i][k] ? '#008080' : 'black',
                border: '1px solid #262934',
                'mix-blend-mode': blendMode,
              }}
            ></div>
          )),
        )}
      </div>
    </>
  )
}

export const TheLocalMeta = () => {
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
    <Box height={'100vh'}>
      <Box
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <GridGame bgImg={newSrc} />
      </Box>

      <Box
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={-9}
      >
        <Webcam
          audio={false}
          height={numRows * 20}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={numCols * 20}
          videoConstraints={videoConstraints}
          style={{ opacity: 0.8 }}
        />
      </Box>
    </Box>
  )
}

export default TheLocalMeta
