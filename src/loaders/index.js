const StartServerUDP = require('./serverUDP');
class Loaders {
  start (){
    StartServerUDP();
  }
}
module.exports = new Loaders (); 

