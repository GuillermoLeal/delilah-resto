// Conexión a Base de datos
const mongoose = require('mongoose');
// const uri = `mongodb+srv://${process.envUSER}:${process.envPASSWORD}@cluster1.grk5y.mongodb.net/${process.envDBNAME}?retryWrites=true&w=majority`;
const uri = process.env.URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Base de datos conectada'))
  .catch((e) => console.log('error db:', e));
