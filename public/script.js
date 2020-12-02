const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var synth = window.speechSynthesis;
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = ["pt-BR", "pt-PT", "en-US"];
recognition.interimResults = false;
recognition.maxAlternatives = 1;
const start = document.querySelector("#id");
const you = document.getElementById("you")
var span = document.getElementById('someID');
let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
};
const audio = new Audio("polishcow.mp3");
function utterThis(msg) {
 const utterThis = new SpeechSynthesisUtterance(msg);
 synth.speak(utterThis)
}


  function speak() {
  recognition.start();
  console.log('Ready to receive a color command.');
}
speak();
start.onclick = (clicked) => {
  
  if(!clicked) {
  recognition.stop();
  } else {
    recognition.start();
  }
}
recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
 you.textContent = color;
  if(color === "Olá") {
    span.textContent = "Olá!";
    utterThis("Olá!")
    speak();
  } else if(color === "tudo bem") {
    utterThis("Sim e você?");
    span.textContent = "Sim e você?";
    speak();
    } else if(color === "conte uma piada") {
       span.textContent = "'-'"
       speak();
         } else if(color === "Preto") {
           document.body.style.backgroundColor = "black";
           document.body.style.color = "white";
           span.textContent = "Pronto!"
           utterThis("Pronto! Para voltar ao branco, diga branco")
         } else if(color === "branco") {
           document.body.style.backgroundColor = "white";
           document.body.style.color = "black";
           span.textContent = "Pronto!"
           utterThis("Pronto! para colocar no preto, diga preto")
           speak();
         } else if(color === "adeus") {
           recognition.stop()
           utterThis("Mais já? ok! te vejo em breve!")
           span.textContent = "Mais já? ok! te vejo em breve!";
           setTimeout(() => {
             window.close()
          }, 1000)
         } else if(color === "vaca polonesa") {
           span.innerHTML = "<img src='https://c.tenor.com/iCgOuohU11kAAAAM/dancing-polish-cow-at4am.gif' width='200'>"
audio.play();
    
         } else if(color === "parar") {
         if(!audio.playing) return span.textContent = "Nada tocando...";
           audio.pause();
           utterThis("Pronto!")
           span.textContent = "Pronto!";
         } else if(color === "colorido") {
           document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/489856.gif')"
           document.body.style.color = "white"
         }
    else {
      utterThis("Desculpe, não entendi!")
    span.textContent = "Desculpe, não entendi!";
    speak();
  }
};
audio.onended = function() {
  span.textContent = "Cow";
  utterThis("Cow")
  speak();
};
recognition.onend = function() {
 
  console.log('Speech recognition service disconnected');
};