import { Box, Button, Card, TextField, Typography } from '@material-ui/core'
import { EvilCheckboxesGroup } from '../molecules/EvilCheckboxesGroup'
import React, { useContext, useState } from 'react'

export const MuseumOnMaliciousUiContext = React.createContext()

const EvilButton = () => {
  const { successes, setSuccesses, setAttempts, attempts } = useContext(MuseumOnMaliciousUiContext)
  const [hovered, setHovered] = useState(false)
  const [extraBlock, setExtraBlock] = useState(false)
  const [myClicks, setMyClicks] = useState(0)
  const isDone = myClicks > 0
  const handleMouseEnter = () => {
    !hovered && setHovered(true)
  }
  const handleMouseOut = () => {
    hovered && setHovered(false)
    setExtraBlock(false)
  }
  const handleClick = () => {
    setSuccesses(successes + 1)
    setMyClicks(myClicks + 1)
    setHovered(true)
  }

  return (
    <Box
      width={'fit-content'}
      onClick={() => !isDone && setAttempts(attempts + 1)}
      p={'5px'}
      onMouseEnter={() => handleMouseEnter()}
      onMouseOut={() => handleMouseOut()}
    >
      <Button
        onClick={() => handleClick()}
        onMouseEnter={() => (attempts > 8 ? handleMouseEnter() : null)}
        disabled={hovered || isDone || extraBlock}
        variant="contained"
      >
        {isDone ? 'Ok you got me' : 'You cant click me'}
      </Button>
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
      <Box pl={4}>
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
          <Card>
            <Box width={'fit-content'} p={'12px'}>
              <Typography variant="h3">{`THIS IS A BUTTON WHICH YOU CANNOT CLICK!!!`}</Typography>
              <EvilButton />
            </Box>
          </Card>
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
          <Card>
            <Box display={'flex'} flexDirection={'column'} width={'fit-content'} p={'12px'}>
              <Typography variant="h3">{`ASSIGN RESPONSIBILITY FOR THIS DISASTER`}</Typography>
              <EvilCheckboxesGroup />
            </Box>
          </Card>
        </Box>
      </Box>
    </MuseumOnMaliciousUiContext.Provider>
  )
}
