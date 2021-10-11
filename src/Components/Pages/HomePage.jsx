import { Box } from '@material-ui/core'
import React from 'react'
import { MaHolidayHelp } from '../Organisms/MaHolidayHelp'
import { MuseumOfMaliciousUi } from '../Organisms/MuseumOfMaliciousUi'

const MyContext = React.createContext()
export const HomePage = () => {
  return (
    <Box>
      <MaHolidayHelp />
    </Box>
  )
}

export default HomePage
