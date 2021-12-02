const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
const PORT = 3001;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
