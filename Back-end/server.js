// Permet de gérer les ports 
const http = require('http');
const app = require('./app');

// Autorise le port ou à défaut le port 3000
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

// Permet d'écouter le server
server.listen (process.env.PORT || 3000); 
