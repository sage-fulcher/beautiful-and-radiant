import { Box, Card, TextField, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { FlagsContainer } from './PrideFlag'

export const MuseumOnMaliciousUiContext = React.createContext()

function UnusableTextInput() {
  const [inputValue, setInputValue] = useState('')
  const [inputStyle, setInputStyle] = useState({})

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleInputFocus = () => {
    setInputStyle({
      position: 'relative',
      left: `${Math.random() * 100}px`,
      top: `${Math.random() * 100}px`,
    })
  }

  return (
    <TextField
      label="Unusable Text Input"
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      style={inputStyle}
    />
  )
}

const EvilButton = () => {
  const { successes, setSuccesses, setAttempts, attempts } = useContext(MuseumOnMaliciousUiContext)
  const [hovered, setHovered] = useState(false)
  const [extraBlock] = useState(false)
  const [myClicks, setMyClicks] = useState(0)
  const isDone = myClicks > 0
  const handleMouseEnter = () => {
    !hovered && setHovered(true)
  }
  // const handleMouseOut = () => {
  //   hovered && setHovered(false)
  //   setExtraBlock(false)
  // }
  const handleClick = () => {
    setSuccesses(successes + 1)
    setMyClicks(myClicks + 1)
    setHovered(true)
  }

  return (
    <Box width={'fit-content'} onClick={() => !isDone && setAttempts(attempts + 1)} p={'5px'}>
      <button
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouseEnter()}
        disabled={hovered || isDone || extraBlock}
        variant="contained"
      >
        {isDone ? 'Ok you got me' : 'You cant click me'}
      </button>
    </Box>
  )
}
const EvilText = () => {
  const { successes, setSuccesses, setAttempts, attempts } = useContext(MuseumOnMaliciousUiContext)

  const [myString, setMyString] = useState('')
  const done = myString === 'THE PROBLEM EXIST BETWEEN THE KEYBOARD AND CHAIR'

  const handleChange = (e) => {
    const newVal =
      e.target.value.length % 1 === 0 ? e.target.value.split('').reverse().join('') : e.target.value
    setMyString(newVal)
    e.target.value === 'THE PROBLEM EXIST BETWEEN THE KEYBOARD AND CHAIR' &&
      setSuccesses(successes + 1)
  }

  return (
    <>
      {done && <Typography variant="body1">✅</Typography>}
      <TextField
        disabled={done}
        id="filled-basic"
        label="Outlined"
        value={myString}
        onBlur={() => setAttempts(attempts + 1)}
        onChange={(e) => handleChange(e)}
        variant="outlined"
      />
    </>
  )
}

export const MuseumOfMaliciousUi = () => {
  const [attempts, setAttempts] = useState(0)
  const [successes, setSuccesses] = useState(0)

  return (
    <MuseumOnMaliciousUiContext.Provider value={{ attempts, setAttempts, successes, setSuccesses }}>
      <link rel="stylesheet" href="https://unpkg.com/xp.css"></link>
      <Box pl={4}>
        <Box display={'flex'} flexDirection={'row'} width={'100%'}></Box>
        <FlagsContainer bgColor={'blue'} />
        <UnusableTextInput />
        <Typography variant="h1">WELCOME TO THE MUSEUM OF MALICIOUS UI</Typography>
        <Typography variant="h1">HERE YOU MAY ATTEMPT TO PERFORM INTERACTIONS</Typography>
        <Typography
          style={{ color: 'green' }}
          variant="h2"
        >{`SUCCESSFUL INTERACTIONS : ${successes}`}</Typography>
        <Typography style={{ color: 'red' }} variant="h2">{`FAILED INTERACTIONS : ${
          attempts - successes
        }`}</Typography>
        <Box width={'fit-content'} p={'24px'}>
          <Box width={'fit-content'} p={'12px'}>
            <div class="window">
              <div class="title-bar">
                <div class="title-bar-text">A Window With Stuff In It</div>
                <div class="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              <div class="window-body">
                <Typography variant="h5">{`THIS IS A BUTTON WHICH YOU CANNOT CLICK!!!`}</Typography>
                <EvilButton />
              </div>
            </div>
          </Box>
        </Box>
        <Box width={'fit-content'} p={'24px'}>
          <Card>
            <Box display={'flex'} flexDirection={'column'} width={'fit-content'} p={'12px'}>
              <Typography variant="h3">{`TYPE THE FOLLOWING PHRASE:`}</Typography>
              <Typography variant="body1">{`THE PROBLEM EXIST BETWEEN THE KEYBOARD AND CHAIR`}</Typography>
              <EvilText />
            </Box>
          </Card>
        </Box>
        <Box width={'fit-content'} p={'24px'}>
          {/* <Card>
            <Box display={'flex'} flexDirection={'column'} width={'fit-content'} p={'12px'}>
              <Typography variant="h3">{`ASSIGN RESPONSIBILITY FOR THIS DISASTER`}</Typography>
              <EvilCheckboxesGroup />
            </Box>
          </Card> */}
        </Box>
      </Box>
    </MuseumOnMaliciousUiContext.Provider>
  )
}
