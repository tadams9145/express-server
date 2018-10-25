const express = require("express");
const router = express.Router();

// Data
const characters = require("../data.json");

// GET all route
// Send back all characters, with a root key of 'characters'
router.get("/", (req, res) => {
  res.json({characters: characters});
});

// GET one route
// Sends back a single character from the data
// Use route parameters
// Has a root key of 'character'
router.get("/:id", (req, res, next) => {
  // Grab the id of the character we want from the request URL parameters
  const id = req.params.id;

  // if (typeof id !== 'number') {
  //   next()
  // }
  // Use that id to find the right character in our data

  // FOR loop approach
  // for (i = 0; i < characters.length; i++) {
  //   if (characters[i].id == id) {
  //     res.json({character: characters[i]})
  //   }
  // }

  // FILTER approach
  const character = characters.filter(character => {
    return character.id == id;
  });

  if (!character.length) {
    next();
  }

  // Respond with the correct character
  res.json({character: character[0]});
});

// Clever but fragile approach accessing the characters array by index
// app.get('/characters/:id', (req, res, next) => {
//   res.json(characters[req.params.id - 1])
// })

router.post("/", (req, res, next) => {
  // Pull the data that is to be posted from the request body
  const body = req.body;
  console.log(body);

  // Insert new data into characters array
  // WE NEED BODY PARSER
  // Where does it go?
  // How does it get used?

  // Get the data into the 'database'
  characters.push(body);

  // Respond to the client with some data
  res.json({characters: characters});
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  console.log(id);
  console.log(body);

  // Find correct resource by it's ID
  // Some type of loop
  const updatedCharacters = characters.map(character => {
    // The current character is the one with matching ID
    if (character.id == id) {
      // Replace the character that matches by ID with the new body
      return body;
    }
    // The current character is NOT the one with matching ID
    return character;
  });

  // res.json() with the modified array
  res.json({characters: updatedCharacters});
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  // Find correct resource by it's ID
  // Some type of loop
  // Remove the resource from the array
  const survivors = characters.filter(character => {
    return character.id != id;
  });

  // res.json() with the updated array (or new array)
  res.json({characters: survivors});
});

module.exports = router;
