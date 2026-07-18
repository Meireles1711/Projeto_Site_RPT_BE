const fetch = require ("node-fetch");

// sensores disponíveis

const sensores = [
    {
        tipo:"temperatura",
        gerar: () => (Math.random() *10 +20).toFixed(2),
        unidade: "C"

    },
    {
        tipo:"umidade",
        gerar: () => (Math.random() *50 +30).toFixed(2),
        unidade: "%"

    },
    {
        tipo:"luminosidade",
        gerar: () => (Math.random() *1000).toFixed(0),
        unidade: "lux"

    },
    {
        tipo:"presenca",
        gerar: () => (Math.random() > 0.5?"detectado": "ausente"),
        unidade: ""

    },
 
];

const dispositivos = ["sensor1","sensor2","sensor3","sensor4"]

function gerarDado(){
    const sensor = sensores[Math.floor(Math.random() * sensores.length)];
    const dispositivo = dispositivos[Math.floor(Math.random() * dispositivos.length)];
    return{
        dispositivo: dispositivo,
        tipo: sensor.tipo,
        valor: String(sensor.gerar()),
        unidade :sensor.unidade,
        timestamp: new Date().toISOString() 
    };
}





async function enviarDado(){
    const dado = gerarDado();

    try{
        const res = await fetch("http://localhost:3000/iot",{
           method: "POST",
           headers: {
            "Content-Type" : "application/json"
           }, 
           body: JSON.stringify(dado)
        });
        const resultado = await res.json();
        console.log("Enviado:",dado);
        console.log("Salvo no Banco ID:",resultado.id);
    } catch (err){
      console.log("Erro ao enviar:",err.message);
    }  
}
setInterval(enviarDado,4000);

