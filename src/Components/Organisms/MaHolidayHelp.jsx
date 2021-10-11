import { Box, Card, Typography } from '@material-ui/core'
import Papa from 'papaparse'
import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify'

export const MuseumOnMaliciousUiContext = React.createContext()

const reduceGiftToYesOrNo = (inString = '') => {
  return inString && inString.toLocaleLowerCase().indexOf('yes ') > -1 ? '✅' : '❌'
}
const CharityDisplay = ({ decorator, text, note, phoneNumber }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <Box
      width={'100%'}
      maxWidth={'100%'}
      maxHeight={'50%'}
      p={2}
      boxSizing="border-box"
      style={{
        overflow: 'hidden',
        overflowY: 'auto', // added scroll
      }}
      textOverflow="wrap"
    >
      <Typography variant="h4">
        {decorator} - {reduceGiftToYesOrNo(text)}
      </Typography>
      <Typography variant="body2">
        <Box width="100%">
          <Linkify>{text.replace('no', '').replace('yes ', '')} </Linkify>
        </Box>
      </Typography>
      {note && !showMore ? (
        <Box
          onClick={() => setShowMore(true)}
          pt={1}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          width={'100%'}
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="subtitle2">--- More Info ---</Typography>{' '}
        </Box>
      ) : (
        <Box pt={1} display="flex" flexDirection="row" justifyContent="center" width={'100%'}>
          <Linkify>
            <Typography variant="subtitle2">{note}</Typography>
          </Linkify>
        </Box>
      )}
    </Box>
  )
}
const CharityCard = ({ name, gift, giftNote, food, foodNote, phoneNumber }) => {
  return (
    <Box
      width={{ sm: '100%', md: '25%' }}
      height={{ sm: '70%', md: '70%' }}
      m={2}
      // bgcolor="#eeeee4"
      // boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
    >
      <Card>
        <Box p={2}>
          <Typography variant="h4">{name}</Typography>
          {phoneNumber && (
            <a href={'tel:' + phoneNumber}>
              <Typography variant="subtitle2">📞 - {phoneNumber}</Typography>
            </a>
          )}
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          {gift && <CharityDisplay decorator="🎁" text={gift} note={giftNote} />}
          {food && <CharityDisplay decorator="🥖" text={food} note={foodNote} />}
        </Box>
      </Card>
    </Box>
  )
}

export const MaHolidayHelp = () => {
  const [charities, setCharities] = useState([])
  const csvLink =
    'https://docs.google.com/spreadsheets/d/1okL6HJ9TA1WMlQWbuTSDYDkKmwb-b2Fl7kvfQqkwR0k/export?format=csv'

  useEffect(() => {
    Papa.parse(csvLink, {
      download: true,
      complete: function (results) {
        const parsedResults =
          (results.data &&
            results.data.splice(1).map((charity) => {
              return {
                name: charity[0],
                gift: charity[1],
                food: charity[2],
                giftNote: charity[3],
                foodNote: charity[4],
                phoneNumber: charity[5],
              }
            })) ||
          []
        console.log(parsedResults)
        results.data && setCharities(parsedResults)
      },
    })
  }, [])

  return (
    <Box
      bgcolor="#eab676"
      display={'flex'}
      flexDirection={'row'}
      flexWrap="wrap"
      justifyContent={'center'}
      style={{
        overflow: 'hidden',
        overflowY: 'scroll', // added scroll
      }}
      width={'100vw'}
      pt={3}
    >
      {charities.map((charity) => (
        <CharityCard {...charity} />
      ))}
    </Box>
  )
}
