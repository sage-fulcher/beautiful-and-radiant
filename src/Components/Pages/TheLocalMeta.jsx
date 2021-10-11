// import { Box, Typography, Avatar } from '@material-ui/core'
// import React, { useRef } from 'react'
// import { useState } from 'react'
// import useInterval from 'react-useinterval'
// import { k_combinations } from '../../Utils/UtilsFromOnline'

// function hslToHex(h, s, l) {
//   l /= 100
//   const a = (s * Math.min(l, 1 - l)) / 100
//   const f = (n) => {
//     const k = (n + h / 30) % 12
//     const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
//     return Math.round(255 * color)
//       .toString(16)
//       .padStart(2, '0') // convert to Hex and prefix "0" if needed
//   }
//   return `#${f(0)}${f(8)}${f(4)}`
// }

// export const TheLocalMeta = () => {
//   const generateArray = (numElements) => {
//     return Array.from(Array(numElements).keys())
//   }
//   const colorFromWinsAndLosses = (winPercent) => {
//     // const h = (wins / rounds) * 255
//     const h = 180 - 50 + winPercent
//     return hslToHex(h, 100, 50)
//   }
//   const numTeams = 10
//   // const teams = new Array(numTeams).reduce((acc, val, idx) => {
//   //   acc.push({ name: 'a coolname' + idx, wins: 0, losses: 0 })
//   //   return acc
//   // }, [])
//   const teams = new Array(5).fill('.').map((i, idx) => {
//     const team = { id: idx, name: 'a cool name' + idx, wins: 0, losses: 0 }
//     return team
//   })

//   const pairings = k_combinations(teams, 2)
//   const initialMatchupHistory = pairings
//     .map((pairing) => {
//       const withWinPercentage = { ...pairing, team1WinPercent: Math.floor(Math.random() * 100) }
//       return withWinPercentage
//     })
//     .flat()

//   const Square = ({ matchup, ...rest }) => {
//     const myColor = colorFromWinsAndLosses(matchup.winPercent)
//     console.log(myColor)
//     return (
//       <Box
//         flex={1}
//         flexBasis={'9%'}
//         bgcolor={myColor}
//         m={'2px'}
//         // bgcolor={'red'}
//         {...rest}
//       >
//         {matchup.winPercent}
//       </Box>
//     )
//   }
//   const pixelWidth = Math.floor(numTeams / 16) * 16
//   const pixelHeight = pixelWidth * (9 / 16)
//   const getOpponentForTeam = (teamId) => {
//     const halfTheTeams = numTeams / 2
//     const randomId = Math.floor(Math.random() * halfTheTeams + halfTheTeams)
//     return randomId
//   }
//   const [matchUpHistory, setMatchUpHistory] = useState(initialMatchupHistory)
//   const advanceMeta = () => {
//     const matchUps = []
//     matchUps.map((m) => (m = ((Math.random() * 180) / Math.random()) * 180 * 100))
//   }
//   useInterval(advanceMeta, 3000)

//   return (
//     <Box
//       display={'flex'}
//       flexDirection="row"
//       flexWrap={'wrap'}
//       height={'95vh'}
//       width={'75vw'}
//       px={'2.5vw'}
//       alignItems=""
//     >
//       {matchUpHistory.map((element, idx) => (
//         <Square key={idx} matchup={element} />
//       ))}
//     </Box>
//   )
// }

// export default TheLocalMeta
