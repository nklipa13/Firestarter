const axios = require('axios');


axios.post('http://localhost:9999/api/project/5c82e89ac2af98b4dd1ed031/faq', {
    question: 'How much?',
    answer: "42",
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('http://localhost:9999/api/project/5c82e89ac2af98b4dd1ed031')
  .then(function (response) {
    console.log(response.data[0].faq);
  })
  .catch(function (error) {
    console.log(error);
  });

// axios.post('http://localhost:9999/api/project/', {
//     title: 'Test Project',
//     creator: "0x0",
//     description: "Great project",
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//   axios.get('http://localhost:9999/api/project/5c82d3d168b4e9a45f3743a2')
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });