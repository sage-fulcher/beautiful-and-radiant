import { Box } from '@material-ui/core'
import Papa from 'papaparse'
import React, { useEffect } from 'react'

export const Stonks = () => {
  const csvLink =
    'https://query1.finance.yahoo.com/v7/finance/download/BRK-B?period1=831600000&period2=1635552000&interval=1d&events=history&includeAdjustedClose=true'

  useEffect(() => {
    Papa.parse(csvLink, {
      download: true,
      complete: function (results) {
        console.log(results.chunk(5))
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
    ></Box>
  )
}
