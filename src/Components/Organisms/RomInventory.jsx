import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { GbaTitles } from '../../Utils/romLists'

export const RomInventory = (platform = 'gba') => {
  const defaultLibrary = GbaTitles
  const [roms, setRoms] = useState(GbaTitles)
  const [filter, setFilter] = useState('')
  useEffect(() => {
    setRoms(GbaTitles.filter((title) => title.toLowerCase().includes(filter)))
  }, [filter])
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent="space-between">
      <Box display={'flex'} flexDirection={'column'}>
        Inspection tools
        <ul>
          <li>
            <label for="bsProgress">
              <strong>Percentage of library that matches</strong>
            </label>
            <br />
            <progress id={'bsProgress'} max={defaultLibrary.length} value={roms.length} />
          </li>
          <li>
            <label for="text21">
              <strong>Enter filter here</strong>
            </label>
            <br />
            <input id="text21" type="text" onChange={(e) => setFilter(e.target.value)} />
          </li>
          <li>
            <strong>
              Matching results
              <br />
              {roms.length}
            </strong>
          </li>
        </ul>
      </Box>
      <ul class="tree-view">
        {roms.slice(0, 20).map((rom) => (
          <li>
            <strong style={{ color: 'purple' }}>✨ {rom} ✨</strong>
          </li>
        ))}
      </ul>
    </Box>
  )
}
