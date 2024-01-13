import {
  handler
} from './build/handler.js';
import express from 'express';

const app = express();
app.use(express.json());

// add a route that lives separately from the SvelteKit app
app.post('/a', (req, res) => {
  let data_string = req.body;
  console.log("This is the log in")
  // console.log(req);
  console.log(data_string);

  res.send(req.body);
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

// // const userList = new mongoose.Schema({
// //   username: String,
// //   password: String,
// //   groups: [String],
// // });
// // const groupList = new mongoose.Schema({
// //   code: String,
// //   bookmarks: [{
// //     name: String,
// //     url: String,
// //   }]
// // });

// // const user = mongoose.model('user', userList);
// // const group = mongoose.model('group', groupList)

// // add a route that lives separately from the SvelteKit app
// app.post('/a', (req, res) => {
//   // let data_string = req.body;
//   // console.log("This is the log in")
//   // console.log(data_string);

//   // let index = await user.find({
//   //   user: data_string["user"]
//   // });

//   // let new_user = new user({
//   //   username: data_string["username"],
//   //   password: data_string["password"],
//   // })

//   res.end("This is an express route");
// });