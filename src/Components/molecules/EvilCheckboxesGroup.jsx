// import Checkbox from '@material-ui/core/Checkbox'
// import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormGroup from '@material-ui/core/FormGroup'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormLabel from '@material-ui/core/FormLabel'
// import { makeStyles } from '@material-ui/core/styles'
// import React, { useEffect, useState } from 'react'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
// }))

// const mockGetPrefs = async () => {
//   const mockPrefs = [
//     {
//       id: 1,
//       label: 'Hello!',
//       checked: true,
//     },
//     {
//       id: 2,
//       label: 'Hi!',
//       checked: false,
//     },
//     {
//       id: 3,
//       label: 'Howdy!',
//       checked: false,
//     },
//     {
//       id: 4,
//       label: 'Partner!',
//       checked: true,
//     },
//   ]
//   return mockPrefs
// }

// export const EvilCheckboxesGroup = () => {
//   const classes = useStyles()
//   const [prefs, setPrefs] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const prefs = await mockGetPrefs()
//       setPrefs(prefs)
//       console.table(prefs)
//     }
//     fetchData()
//   }, [])

//   const updatedCheckedById = (id, val) => {
//     const _prefs = prefs
//     console.log('find by ID')
//     const theIndex = _prefs.findIndex((pref) => pref.id === id)
//     _prefs[theIndex].checked = val
//     console.log(val)
//     console.log(_prefs[theIndex])
//     setPrefs(_prefs)
//   }

//   const EvilFormControlLabel = ({ pref }) => {
//     const { checked, label, id } = pref
//     console.log(label)
//     return (
//       <FormControlLabel
//         key={id}
//         control={
//           <Checkbox
//             checked={checked}
//             onChange={(e) => updatedCheckedById(id, e.target.checked)}
//             name={label}
//           />
//         }
//         label={label}
//       />
//     )
//   }

//   console.log(prefs)
//   return (
//     <div className={classes.root}>
//       <FormControl component="fieldset" className={classes.formControl}>
//         <FormLabel component="legend">Assign responsibility</FormLabel>
//         <FormGroup>
//           {prefs.map((pref) => (
//             <EvilFormControlLabel pref={pref} key={pref.id} />
//           ))}
//         </FormGroup>
//         <FormHelperText>Be careful</FormHelperText>
//       </FormControl>
//       {/* <FormControl required error={error} component="fieldset" className={classes.formControl}>
//         <FormLabel component="legend">Pick two</FormLabel>
//         <FormGroup>
//           {prefs.map((pref) => (
//             <EvilFormControlLabel key={pref} pref={pref} />
//           ))}
//         </FormGroup>
//         <FormHelperText>You can display an error</FormHelperText>
//       </FormControl> */}
//     </div>
//   )
// }
