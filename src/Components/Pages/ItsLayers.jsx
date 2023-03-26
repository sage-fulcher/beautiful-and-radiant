import { Box, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { DeadSimple } from '../Organisms/deadSimple'

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography)

export const ItsLayers = () => {
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
      <link rel="stylesheet" href="https://unpkg.com/xp.css"></link>
      <WhiteTextTypography variant="h4">
        The past, present and future are only illusions, even if stubborn ones
      </WhiteTextTypography>
      <div
        className="window"
        style={{
          display: 'flex',
          flexDirection: 'column',
          //   height: '98%',
          //   width: '98%',
          overflow: 'hidden',
          flexGrow: 1,
        }}
      >
        <div style={{ zIndex: 99 }} className="title-bar">
          <div className="title-bar-text">ITS LAYERS TO THIS</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <DeadSimple />
      </div>
    </Box>
  )
}

export default ItsLayers
