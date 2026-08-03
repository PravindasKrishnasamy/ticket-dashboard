require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`TicketFlow backend listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
