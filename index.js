//inicio la URL de la API
const API_URL = "https://api.maas2.apollorion.com/";
var sol = 0;

//Funcion con call backs para consulta la API
function consultaDatos(url_api, callback) {
    //instancio un objeto de la XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    //comienzo la consulta
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange =  function(event){ //valido que se este ejecutando
        if(xhttp.readyState === 4){ //si se completo el estado es 4
            if(xhttp.status === 200){ //si la respuesta el 200 es que estamos melos
                callback(null, JSON.parse(xhttp.responseText)); //invoco el callback con la respuesta
            }
            else{ //si no es 200 valio verga
                const error = new Error('Error ' + url_api);
                return callback(error, null);
            }
        }
    } 
    xhttp.send();
}

const btn = document.querySelector("button")
btn.onclick = () => {
    //tomo los elementos del HTML
    const sunIn = document.getElementById("sunTxt").value;
    const url_api = API_URL + sunIn;
    //valido que el valor infresado sea valido 
    if(sunIn > sol){
        document.getElementById("errorLbl").innerText = "Error: nuemero de sol no valido";
        document.getElementById("fechaTxt").innerText = " ";
        document.getElementById("solTxt").innerText = "Sol numero: ";
        document.getElementById("tmaxTxt").innerText = "Temperatura máxima: ";
        document.getElementById("tminTxt").innerText = "Temperatura mínima: ";
        document.getElementById("unitTxt").innerText = "Unidad de medida: ";
        document.getElementById("errorLbl").innerText = "Error: numero de sol no valido";
    }else{
        consultaDatos(url_api, function(error, data){
            if(error) {
                document.getElementById("fechaTxt").innerText = " ";
                document.getElementById("solTxt").innerText = "Sol numero: ";
                document.getElementById("tmaxTxt").innerText = "Temperatura máxima: ";
                document.getElementById("tminTxt").innerText = "Temperatura mínima: ";
                document.getElementById("unitTxt").innerText = "Unidad de medida: ";
                document.getElementById("errorLbl").innerText = "Error: nuemero de sol no valido";
                return console.error(error);
                
            }else{
                let fecha = data.terrestrial_date;
                let sun = data.sol;
                let tmax = data.max_temp;
                let tmin = data.min_temp;
                let und = data.unitOfMeasure;
                
                document.getElementById("fechaTxt").innerText = fecha;
                document.getElementById("solTxt").innerText = "Sol numero: " + sun;
                document.getElementById("tmaxTxt").innerText = "Temperatura máxima: " + tmax;
                document.getElementById("tminTxt").innerText = "Temperatura mínima: " + tmin;
                document.getElementById("unitTxt").innerText = "Unidad de medida: " + und;
                document.getElementById("errorLbl").innerText = " ";
            }
        });
    }
};
//Hago la consulta inicial 
consultaDatos(API_URL, function(error, data){
    if(error) {
        return console.error(error);
    }else{
        let fecha = data.terrestrial_date;
        let sun = data.sol;
        let tmax = data.max_temp;
        let tmin = data.min_temp;
        let und = data.unitOfMeasure;
        //Traslado los resultados a pantalla 
        document.getElementById("fechaTxt").innerText = fecha;
        document.getElementById("solTxt").innerText = "Sol numero: " + sun;
        document.getElementById("tmaxTxt").innerText = "Temperatura máxima: " + tmax;
        document.getElementById("tminTxt").innerText = "Temperatura mínima: " + tmin;
        document.getElementById("unitTxt").innerText = "Unidad de medida: " + und;
        //capturo el valor del ultimo sol registrado
        sol = sun;
    }
});

function makeContador(inicial){
    let count = inicial; // puedo crer atributos que son privados por que su scope no sldra de este bloque
    return({
        getCount: function(){
            return(count);
        },
        getTest: "Hola soy un atributo",
        sumarUno: function(){
            count +=1;
        }
    })
}
let counter = makeContador(8);