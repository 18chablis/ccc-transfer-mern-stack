

module.exports = function(app) {
 
    var clergy = require('../controller/clergy.controller');
  
    app.post('/api/clergy', clergy.createClergy);
    app.get('/api/clergy/:id', clergy.getClergy);
    app.get('/api/clergy', clergy.clergy);
    app.put('/api/clergy', clergy.updateClergy);
    app.delete('/api/clergy/:id', clergy.deleteClergy);
  }
