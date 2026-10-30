const { calcularOperacion: c, convertir: v } = require("./app.js");
const casos = [
 ["1 m a cm","1","m-cm",v], ["100 cm a m","100","cm-m",v], ["1 kg a g","1","kg-g",v], ["1000 g a kg","1000","g-kg",v],
 ["0 m a cm","0","m-cm",v], ["1.5 m a cm","1.5","m-cm",v], ["vacío","","m-cm",v], ["negativo","-5","kg-g",v], ["texto","abc","cm-m",v]
];
casos.forEach(([n,e,id,f])=>console.log(n,"=>",f(e,id)));
console.log("12+3 =>",c("12","3","sumar"));
console.log("12/3 =>",c("12","3","dividir"));
console.log("5/0 =>",c("5","0","dividir"));
console.log("vacío =>",c("","3","sumar"));
console.log("texto =>",c("abc","3","sumar"));
console.log("7/2 =>",c("7","2","dividir"));
