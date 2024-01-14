import {
  handler
} from './build/handler.js';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

/*
Connect to the MongoDB database we have in Atlas
If the connection fails it will state as an error,
and if the connection succeeds it is logged in console.
*/
const url = "mongodb+srv://cfyock:YbV9fp3YOdlSn345@goatmarkscluster.g4szxnl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection failed');
  });

/*
Create new tables within the existing database
User table contains a username, password, groups the user are a part of, and the bookmarks the user has
Group table contains the group name, group code and the bookmarks the group has
*/
const userList = new mongoose.Schema({
  username: String,
  password: String,
  groups: [{
    code: String
  }],
  bookmarks: [{
    name: String,
    url: String,
  }]
});

const groupList = new mongoose.Schema({
  name: String,
  code: String,
  bookmarks: [{
    name: String,
    url: String,
  }]
});

const user = mongoose.model('user', userList);
const group = mongoose.model('group', groupList)

//! Routes separate from SVELTEKIT

/* 
Registers a username and password
Takes in the username and password you want registered
Checks the user table if the username already exists
Response is true if the username was successfully registered
Response is false if the username already exists (and was not added)
Response is status 500 error if the POST request fails 
*/
app.post('/register', async (req, res) => {
  let data_string = req.body;
  console.log("This is the log in")
  console.log(data_string);

  let index = await user.find({
    username: data_string["username"]
  });

  let new_user = new user({
    username: data_string["username"],
    password: data_string["password"],
  })

  try {
    if (index.length === 0) {
      console.log("Username does not exist")
      await new_user.save();
      res.send(data_string["username"]);
    } else {
      console.log("Username already exists")
      res.send(false);
    }
  } catch (error) {
    console.log("Ran into error in register")
    res.status(500).send(error);
  }
});

/* 
Logs in with a username and password
Checks the user table if the username already exists
Response is true if the login was successful
Response is false if the login fails
Response is status 500 error if the POST request fails 
*/
app.post('/login', async (req, res) => {
  let data_string = req.body;
  console.log("This is the log in")
  console.log(data_string);

  let index = await user.find({
    username: data_string["username"]
  });

  try {
    if (index.length === 0) {
      console.log("Username does not exist")
      await new_user.save();
      res.send(false);
    } else {
      console.log("Username found")
      if (index[0]["password"] == data_string["password"]) {
        res.send(true);
      }
    }
  } catch (error) {
    console.log("Ran into error in login")
    res.status(500).send(error);
  }
});

/* 
Creates a new group
Takes in the name of the group you want to create
Checks the group table if the code already exists
Response is true if the group was successfully created
Response is status 500 error if the POST request fails 
*/
app.post('/createGroup', async (req, res) => {
  let data_string = req.body;
  console.log("This is the group dstring")
  console.log(data_string);

  let rand;

  try {
    while (true) {
      rand = Math.floor(Math.random() * 90000) + 10000;

      let index = await group.find({
        code: rand
      });

      if (index.length === 0) {
        console.log("Group code does not exist")
        break;
      } else {
        console.log("Group code already exists")
        continue;
      }
    }

    let new_group = new group({
      name: data_string["name"],
      code: rand,
    })

    await new_group.save();

    res.send(true);

  } catch (error) {
    console.log("Ran into error in createGroup")
    res.status(500).send(error);
  }
});

/* 
Add a bookmark to an existing user
A user can have more than one of the same bookmark
Takes in a username, bookmark link and bookmark name
Response is true if the bookmark was successfully added
Response is false if the user does exist
Response is status 500 error if the POST request fails 
*/
app.post('/addBmarkUser', async (req, res) => {
  let data_string = req.body;
  console.log("This is the group dstring")
  console.log(data_string);

  let index = await user.find({
    username: data_string["username"]
  });

  console.log("this is the user: ", index)

  try {
    if (index.length === 0) {
      console.log("User does not exist? How are you giving them a bookmark?")
      res.send(false);
    } else {
      console.log("Found the user! Adding bookmark to bookmarks array.")
      console.log("This is the link: ", data_string["link"])
      console.log("This is the linkName: ", data_string["linkName"])
      console.log("This is the username: ", data_string["username"])
      await user.updateMany({
        username: data_string["username"]
      }, {
        $push: {
          bookmarks: {
            "name": data_string["linkName"],
            "url": data_string["link"]
          }
        }
      }, {
        "multi": true
      })
      res.send(true);
    }
  } catch (error) {
    console.log("Ran into error in addBmarkUser")
    res.status(500).send(error);
  }
});

/* 
Add a bookmark to an existing group
A group can have more than one of the same bookmark
Takes in the bookmark link and a name
Response is true if the bookmark was successfully added
Response is false if the group does not exist
Response is status 500 error if the POST request fails 
*/
app.post('/addBmarkGroup', async (req, res) => {
  let data_string = req.body;
  console.log("This is the group dstring")
  console.log(data_string);

  let index = await group.find({
    code: data_string["code"]
  });

  console.log("this is the group: ", index)

  try {
    if (index.length === 0) {
      console.log("Group does not exist? How are you giving them a bookmark?")
      res.send(false);
    } else {
      console.log("Found the user! Adding bookmark to bookmarks array.")
      console.log("This is the link: ", data_string["link"])
      console.log("This is the linkName: ", data_string["linkName"])
      console.log("This is the code: ", data_string["code"])
      await group.updateMany({
        code: data_string["code"]
      }, {
        $push: {
          bookmarks: {
            "name": data_string["linkName"],
            "url": data_string["link"]
          }
        }
      }, {
        "multi": true
      })
      res.send(true);
    }
  } catch (error) {
    console.log("Ran into error in addBmarkGroup")
    res.status(500).send(error);
  }
});

/* 
Add a group to an existing user
Takes in the group code and a username
Response is true if the group was successfully added
Response is false if the group or user does not exist OR IF the user is already in the group
Response is status 500 error if the POST request fails 
*/
app.post('/addGroupToUser', async (req, res) => {
  let data_string = req.body;
  console.log("This is the group dstring")
  console.log(data_string);

  let groupIndex = await group.find({
    code: data_string["code"]
  });
  let userIndex = await user.find({
    username: data_string["username"]
  });

  // CHECK IF THE USER IS ALREADY IN GROUP!!!!
  console.log("this is the group: ", groupIndex)
  console.log("this is the user: ", userIndex)


  try {
    if (groupIndex.length === 0 || userIndex === 0) {
      console.log("Group or user does not exist? What are you doing?")
      res.send(false);
    } else if (userIndex[0]["groups"].some(el => data_string["code"])) {
      console.log("User is already in that group!")
      res.send(false);
    } else {
      console.log("Found the user! Adding bookmark to bookmarks array.")
      console.log("This is the code: ", data_string["code"])
      console.log("This is the username: ", data_string["username"])
      await user.updateMany({
        username: data_string["username"]
      }, {
        $push: {
          bookmarks: {
            "name": data_string["linkName"],
            "url": data_string["link"]
          }
        }
      }, {
        "multi": true
      })
      await user.updateMany({
        username: data_string["username"]
      }, {
        $push: {
          groups: {
            "code": data_string["code"]
          }
        }
      }, {
        "multi": true
      })
      res.send(true);
    }
  } catch (error) {
    console.log("Ran into error in addGroupToUser")
    res.status(500).send(error);
  }
});


/* 
Get data of all groups
Takes in nothing
Response is true if data is returned
Response is status 500 error if the POST request fails 
*/
app.post('/getAllGroups', async (req, res) => {
  let groupIndex = await group.find();

  console.log("this is the group: ", groupIndex)

  try {
    res.send(groupIndex)
  } catch (error) {
    console.log("Ran into error in getAllGroups")
    res.status(500).send(error);
  }
});

/* 
Get data of all users
Takes in nothing
Response is true if data is returned
Response is status 500 error if the POST request fails 
*/
app.post('/getAllUsers', async (req, res) => {
  let userIndex = await user.find();

  console.log("this is the group: ", userIndex)

  try {
    res.send(userIndex)
  } catch (error) {
    console.log("Ran into error in getAllUsers")
    res.status(500).send(error);
  }
});

/* 
Get a group's info by its code
Takes in a group's code
Response is group's data
Response is false if group does not exist
Response is status 500 error if the POST request fails 
*/
app.post('/getGroupByCode', async (req, res) => {
  let data_string = req.body;
  console.log("This is the group dstring")
  console.log(data_string);

  let index = await group.find({
    code: data_string["code"]
  });

  console.log("this is the group: ", index)

  try {
    if (index.length === 0) {
      console.log("Group does not exist? How are you finding them?")
      res.send(false);
    } else {
      console.log("Found the group!")
      res.send(index);
    }
  } catch (error) {
    console.log("Ran into error in getGroupByCode")
    res.status(500).send(error);
  }
});

/* 
Get a user's info by its username
Takes in a user's username
Response is user's data
Response is false if user does not exist
Response is status 500 error if the POST request fails 
*/
app.post('/getUserByName', async (req, res) => {
  let data_string = req.body;
  console.log("This is the user dstring")
  console.log(data_string);

  let index = await user.find({
    code: data_string["username"]
  });

  console.log("this is the group: ", index)

  try {
    if (index.length === 0) {
      console.log("User does not exist? How are you finding them?")
      res.send(false);
    } else {
      console.log("Found the user!")
      res.send(index);
    }
  } catch (error) {
    console.log("Ran into error in getUserByCode")
    res.status(500).send(error);
  }
});

/* 
Detele a bookmark from a user
Takes in a user's username and the link of the bookmark
Response is true if deletion worked
Response is false if user does not exist
Response is status 500 error if the POST request fails 
*/
app.post('/delBmarkUser', async (req, res) => {
  let data_string = req.body;
  console.log("This is the user dstring")
  console.log(data_string);

  let index = await user.find({
    username: data_string["username"]
  });

  console.log("this is the user: ", index)

  try {
    if (index.length === 0) {
      console.log("User does not exist? How are you finding them?")
      res.send(false);
    } else {
      console.log("Found the user!")

      await user.updateMany({
        username: data_string["username"]
      }, {
        $pull: {
          bookmarks: {
            "url": data_string["link"],
          }
        }
      }, {
        "multi": true
      })

      res.send(true);
    }
  } catch (error) {
    console.log("Ran into error in delBmarkUser")
    res.status(500).send(error);
  }
});

/* 
Detele a bookmark from a user
Takes in a user's username and the link of the bookmark
Response is true if deletion worked
Response is false if user does not exist
Response is status 500 error if the POST request fails 
*/
app.post('/delBmarkGroup', async (req, res) => {
  let data_string = req.body;
  console.log("This is the user dstring")
  console.log(data_string);

  let index = await group.find({
    code: data_string["code"]
  });

  console.log("this is the group: ", index)

  try {
    if (index.length === 0) {
      console.log("User does not exist? How are you finding them?")
      res.send(false);
    } else {
      console.log("Found the user!")

      await group.updateMany({
        code: data_string["code"]
      }, {
        $pull: {
          bookmarks: {
            "url": data_string["link"],
          }
        }
      }, {
        "multi": true
      })

      res.send(true);
    }
  } catch (error) {
    console.log("Ran into error in delBmarkGroup")
    res.status(500).send(error);
  }
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);


app.listen(3000, () => {
  console.log('listening on port http://localhost:3000');
});



// import {
//   handler
// } from './build/handler.js';
// import express from 'express';
// // import mongoose from "mongoose";

// const app = express();

// // let SvelteKit handle everything else, including serving prerendered pages and static assets
// app.use(handler);

// app.listen(3000, () => {
//   console.log('listening on port http://localhost:3000');
// });

// const userList = new mongoose.Schema({
//   username: String,
//   password: String,
//   groups: [String],
// });
// const groupList = new mongoose.Schema({
//   code: String,
//   bookmarks: [{
//     name: String,
//     url: String,
//   }]
// });

// const user = mongoose.model('user', userList);
// const group = mongoose.model('group', groupList)

// // add a route that lives separately from the SvelteKit app
// app.post('/a', (req, res) => {
// let data_string = req.body;
// console.log("This is the log in")
// console.log(data_string);

// let index = await user.find({
//   user: data_string["user"]
// });

// let new_user = new user({
//   username: data_string["username"],
//   password: data_string["password"],
// })

//   res.end("This is an express route");
// });