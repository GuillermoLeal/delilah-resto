require('dotenv').config();
require('./src/database');

const app = require('./src/app');

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}!`);
});
