const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('😈😈😈😈😈')
})

// GET all route
  // Send back all characters, with a root key of 'characters'
router.get('/', (req, res) => {
  res.json({ characters: characters })
})

router.get('/characters/:id', (req, res, next) => {
  // Grab the id of the character we want from the request URL parameters
  const id = req.params.id

  // FILTER approach
  const character = characters.filter(character => {
    return character.id == id
  })

  if (!character.length) {
    next()
  }

  // Respond with the correct character
  res.json({ character: character[0] })
})


router.post('/characters', (req, res, next) => {
  // Pull the data that is to be posted from the request body
  const body = req.body
  console.log(body)
  // Get the data into the 'database'
  characters.push(body)
  // Respond to the client with some data
  res.json({ characters: characters })
})

router.put('/characters/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  console.log(id)
  console.log(body)

  // Find correct resource by it's ID
    // Some type of loop
  const updatedCharacters = characters.map(character => {
    // The current character is the one with matching ID
    if (character.id == id) {
      // Replace the character that matches by ID with the new body
      return body
    }
    // The current character is NOT the one with matching ID
    return character
  })

  // res.json() with the modified array
  res.json({ characters: updatedCharacters })

})

router.delete('/characters/:id', (req, res) => {
  const id = req.params.id

  // Find correct resource by it's ID
    // Some type of loop
  const survivors = characters.filter(character => {
    return character.id != id
  })

  // Remove the resource from the array

  // res.json() with the updated array (or new array)
  res.json({ characters: survivors })
})

module.exports = router
