require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 5432;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});