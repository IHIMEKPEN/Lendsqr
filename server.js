//server.js
const app = require("./app");

// production

// This code creates a server listening at the  port specified
app.listen(process.env.PORT || 5000, process.env.LOCAL_ADDRESS, () => {
  console.log(`Server is now listening at port ${process.env.PORT}`);
});
// development

// // This code creates a server listening at the  port specified
// app.listen(5000, () => {
//     console.log(`Server is now listening at port 5000`);
//   });