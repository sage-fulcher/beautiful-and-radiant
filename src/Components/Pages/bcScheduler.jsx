const holdays = ['09/08/2021']
import { Box } from '@material-ui/core'
import React from 'react'

export const BcScheduler = () => {
  const genSchedule = (start) => {
    const holidayStrings = ['09/07/2021', '10/11/2021', '11/24/2021', '11/25/2021', '11/26/2021']
    const holidayDates = holidayStrings.map((h) => new Date(h))
    const startDate = new Date(start)

    moreWeeks = true
    weeks = ['', startDate]
    while (moreWeeks) {
      newDate = new Date(weeks.at(-1))
      weeks.push(new Date(newDate.setDate(newDate.getDate() + 7)))
      if (weeks.length > 25) {
        moreWeeks = false
      }
    }

    return weeks.filter((week) => holidayDates.filter((holiday) => +holiday === +week).length == 0)
  }

  return <Box>{genSchedule('09/01/2021').map()}</Box>
}

export default HomePage
