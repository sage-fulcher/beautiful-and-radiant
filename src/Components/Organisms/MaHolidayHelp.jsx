import { Box, Card, Divider, Typography } from '@material-ui/core'
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
    <Linkify>
      <Box
        width={'100%'}
        maxWidth={'100%'}
        maxHeight={'50%'}
        px={2}
        boxSizing="border-box"
        style={{
          overflow: 'hidden',
          overflowY: 'auto', // added scroll
        }}
        textOverflow="wrap"
      >
        <Box
          fontFamily="Lato"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          pt={1}
        >
          <Typography variant="h5">
            {decorator} - {reduceGiftToYesOrNo(text)}
          </Typography>
        </Box>
        <Typography variant="body">{text.replace('no', '').replace('yes ', '')}</Typography>
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
          <Box pt={1}>
            <Typography variant="subtitle2">{note}</Typography>
          </Box>
        )}
      </Box>
    </Linkify>
  )
}
const CharityCard = ({ name, gift, giftNote, food, foodNote, phoneNumber, index }) => {
  // const borderColors = ['#3a3c58', '#c7a050', '#a186a3', '#9ca8c3', '#a1798a']
  const borderColors = ['#c6b6e4', '#8b7fa0', '#e4cab6', '#a08d7f', '#cde4b6']

  return (
    <Box width={{ xs: '100%', sm: '100%', md: '25%' }} height={'70%'} m={2} border={'5px, 0,0,0'}>
      <Card
        // bgcolor="#fbede9"
        style={{
          border: 'solid',
          borderRightWidth: '3px',
          borderLeftWidth: '12px',
          borderBottomWidth: '3px',
          borderTopWidth: '3px',
          borderColor: borderColors[index % borderColors.length],
        }}
        p={1}
      >
        <Box p={1}>
          <Box width={'100%'} display="flex" justifyContent="center">
            <Typography fontWeight="bold" variant="h3">
              {name}
            </Typography>
          </Box>

          {phoneNumber && (
            <a href={'tel:' + phoneNumber}>
              <Typography variant="body2">📞 - {phoneNumber}</Typography>
            </a>
          )}
        </Box>
        <Divider light />
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
        overflowY: 'scroll',
      }}
      width={'100vw'}
      pt={3}
    >
      {charities.map((charity, idx) => (
        <CharityCard {...charity} key={charity.name} index={idx} />
      ))}
    </Box>
  )
}
