const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') != 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.get('/', (request, response) => {
  response.send("Hello World");
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
