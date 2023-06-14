const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const port = 3002;


function StartClientUDP(){
  
server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor escutando em ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  const data = message.toString();
  const [questionNumber, numAlternatives, responses] = data.split(';');

  const correctAnswers = 'VVFFV'; 

  const numCorrect = responses.split('').filter((response, index) => {
    return response === correctAnswers[index];
  }).length;

  const numIncorrect = responses.length - numCorrect;

  const response = `${questionNumber};${numCorrect};${numIncorrect}`;

  server.send(response, remote.port, remote.address, (error) => {
    if (error) {
      console.error('Erro ao enviar a resposta:', error);
    } else {
      console.log('Resposta enviada ao cliente:', response);
    }
  });
});

server.bind(port);


}


module.exports = StartClientUDP