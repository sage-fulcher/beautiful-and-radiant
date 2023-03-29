import { Box } from '@material-ui/core'
import React from 'react'
import { RomInventory } from '../Organisms/RomInventory'

export const Rg53xxDb = () => {
  return (
    <Box
      // bgcolor={'#008080'}
      height={'96vh'}
      width={'96vw'}
      paddingY={'2vh'}
      paddingX={'2vw'}
      display={'flex'}
      flexDirection={'column'}
      style={{
        backgroundImage:
          'url(https://www.newegg.com/insider/wp-content/uploads/windows_xp_bliss-wide.jpg)',
      }}
    >
      <link rel="stylesheet" href="https://unpkg.com/xp.css" />
      <div class="window" style={{ width: '100%' }}>
        <div class="title-bar">
          <div class="title-bar-text">A Window With Stuff In It</div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body" style={{ display: 'flex', justifyContent: 'center' }}>
          <section class="tabs" style={{ maxWidth: '700px', width: '100%' }}>
            <menu role="tablist" aria-label="Sample Tabs">
              <button role="tab" aria-selected="true" aria-controls="tab-A">
                GBA
              </button>
            </menu>
            <article role="tabpanel" id="tab-A">
              <RomInventory />
            </article>
          </section>
        </div>
      </div>
    </Box>
  )
}

export default Rg53xxDb
