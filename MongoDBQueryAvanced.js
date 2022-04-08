//optener informacion de las collection
db.getCollectionInfos()

//Crear (No se crea hasta ingresar documentos)
db.createCollection('prueba2',{})

db.createCollection("mycol", { capped : true, autoIndexId : true, size : 6142800, max : 10000 } )

db.createCollection(
    "tiempo24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "data",
          granularity: "hours"
       },
       expireAfterSeconds: 86400
    }
)



//insertar documentos en una collection
db.tiempo24h.insertMany( [
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T04:00:00.000Z"),
      "temp": 11
   }
   ]
)
  
   
 db.inventario.insertMany([
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
])
   
   
 //Formas de optener los documentos de una collection
 db.getCollection('tiempo24h').find({})
 db.tiempo24h.find()
 db.inventario.find()
 
 
 //contar los elementos de una collection
 db.inventario.count() 
 
  // Eliminr collectionsencible a mayusculas
 db.prueba2.drop()
   
 
 //Utilizar JvaScript en mongo
 var campos = db.alumnos.findOne()
 for(campo in campos){print(campo)}
 campos
   
   
   
   //conteo por algun atributo especifico
  db.alumnos.find().count() 
  db.alummos.find({sexo:'F'}).count()
   
   //Select nombre,ap_paterno,curp,edad FROM alumnos WHERE sexo = 'F'    ----> simepre muestra el _id
   db.alummos.find({sexo:'F'}, {nombre:1, ap_paterno:1, curp:1, edad:1})
   
   //Select nombre,ap_paterno,curp,edad FROM alumnos WHERE sexo = 'F'    ----> No muestra el id
   db.alummos.find({sexo:'F'}, {nombre:1, ap_paterno:1, curp:1, edad:1, _id:0})
   
   db.alummos.find({sexo:'F'}, {kk:1, ss:1, ssd:1, f:1, _id:0})
   
   db.alummos.find({sexo:'F'},{nombre:1,ap_paterno:1, curp:1, edad:1, _id:0}).sort({ap_paterno:1,nombre:1})  
   
   //SELECT nansakkasa From alumnos WHERE sexo = 'F' ORDER BY ap_paterno DESC,nombre DESC
   db.alummos.find({sexo:'F'},{nombre:1,ap_paterno:1, curp:1, edad:1, _id:0}).sort({ap_paterno:-1,nombre:-1})  
   
   //SELECT nansakkasa From alumnos WHERE sexo = 'F' ORDER BY ap_paterno ,nombre LIMIT 5
   db.alummos.find({sexo:'F'},{nombre:1,ap_paterno:1, curp:1, edad:1, _id:0}).sort({ap_paterno:1,nombre:1}).limit(5)  
   
   //SELECT sk,ds,gr,wd FROM alumnos WHERE sexo = 'F' ORDER BY ap_paterno ,nombre LIMIT 5, 5    ----> Se brinca los primeros 5 
   db.alummos.find({sexo:'F'},{nombre:1,ap_paterno:1, curp:1, edad:1, _id:0}).sort({ap_paterno:1,nombre:1}).skip(5).limit(5) 
  
  //SELCT * FROM alumnos WHERE sexo='F'AND edad.anios = 28
  db.alummos.find({sexo:'F', "edad.anios":28}).count()
  
  //SELECT * FROM alumnos WHERE sexo = 'F'  OR  edad.anios = 28;
    db.alummos.find({$or:  [{sexo:'F'}, {"edad.anios":28}]  }).count()
    
   //SELECT * FROM alumnos WHERE sexo = 'F'  AND  edad.anios = 28;
    db.alummos.find({$and:  [{sexo:'F'}, {"edad.anios":28}]  }).count()
    
    
    
    
////////////////
//Encontrar alumnos con curp de tipo numerico
db.alumnos.find({"curp": {$type:"number"}}).count()

//Encontrar alumnos con curp de tipo string
db.alumnos.find({"curp": {$type:"string"}}).count()
db.alumnos.find({"curp": {$type:2}}).count()

//Encontrar alumnos con curp de tipo decimal
db.alumnos.find({"curp": {$type:"decimal"}}).count()
db.alumnos.find({"curp": {$type:19}}).count()


//Agregacion de elementos a la collection direcciones*** ignorar, estan integrados en la base de datos exportada
db.direcciones.insertMany(
[
  {"_id":1, direccion:"Av Rancho seco SN", cp: "57200", "alumnos": [ "Juan", "Ana", "Pedro" ]},
  {"_id":2, direccion:"Av Universidad 3000", cp: 30300},
  {"_id":3, direccion:"Av Central 5000", cp: NumberLong(56234), "posgrado": true},
  {"_id":4, direccion:"Las Palmas 4", cp: NumberInt(56330), "preferencias": {
        "seguimientoEmails": false,
        "idioma": "Español",
        "zonaHoraria": 5
    }},
  {"_id":5, direccion:"Bosques de Africa 2", cp: ["57200", "57201"], "fecha" : ISODate("2020-01-08T08:52:30.038Z")},
  {"_id":6, direccion:"Bosques de Africa 2", cp: {codigo:"57200", zp:"57201"}}
]
)
  
db.direcciones.insertMany([
  {"_id":7, 
  direccion:"Bosques de Africa 2", cp: [
   {codigo:"57200", zp:"57201"},
   {codigo:"58200", zp:"58201"},
   {codigo:"59200", zp:"59201"}
   ]
  },
  {"_id":8, 
  direccion:"Bosques de Africa 2", cp: [
   ["57200", 57201],
   ["58200", 58201],
   ["59200", 59201]
   ]
  },
  {"_id":9, direccion:"Bosques de Africa 2", "cp" : ISODate("2020-01-08T08:52:30.038Z")}
  ]
)
  
  
  db.direcciones.find()
  db.direcciones.find({ "cp":{$exists:1}})

//doube
  db.direcciones.find({ "cp":{$type: "double"}})
  
  //String
    db.direcciones.find({ "cp":{$type: 2}})
  db.direcciones.find({ "cp":{$type: "string"}})
  
  //Object
    db.direcciones.find({ "cp":{$type: "object"}})
    
    //Array
    db.direcciones.find({ "cp":{$type: "array"}})
      
    //objectID
    db.direcciones.find({ "cp":{$type: 7}})
    db.direcciones.find({ "cp":{$type: "objectId"}})
          
    db.direcciones.insert({"_id":10, direccion:"Bosques de Africa 2", "cp" : true})


    //boole
    db.direcciones.find({ "cp":{$type: 8}})
    db.direcciones.find({ "cp":{$type: "bool"}})


//Date
db.direcciones.find({ "cp":{$type: 9}})
db.direcciones.find({ "cp":{$type: "date"}})
  

//Nulos
db.direcciones.find({ "cp":{$type: "null"}})

  

//Int
db.direcciones.find({ "cp":{$type: 16}})
db.direcciones.find({ "cp":{$type: "int"}})


db.direcciones.insert({"_id":11, direccion:"Av Universidad 3000", cp: 30.300})

//Decimal
db.direcciones.find({ "cp":{$type: "number"}})






// $gte: Mayor o igual que. Puede ser de tipo $gte:[Valor1,valor2], primer valor mayor o igual que
db.alumnos.find({"edad.anios": {$gte: 30}}).count()

//Expresiones.- podemos la agregacion de expresiones como gte
db.alumnos.find({$expr: {$gte: ["$edad.dias","$edad.anios"]}}).count()

// el gt tiene una condicion en 
db.alumnos.find({
   $expr: {
        $gt:[
          {   
            $cond:{
                if:{ $gte: ["$edad.anios",30]},
                then:{$divide:["$edad.anios", 2]},
                else:{ $divide:["$edad.anios", 3]}               
            }
          }, 
        10
        ]
    }
   })
   
   
   db.alumnos.find({
   $expr: {
        $gt:[
          {   
            $cond:{
                if:{ $gte: ["$edad.anios",30]},
                then:{$divide:["$edad.anios", 2]},
                else:{ $divide:["$edad.anios", 3]}               
            }
          }, 
          {
              $cond:{
                if:{ $gte: ["$edad.anios",30]},
                then:"$edad.meses",
                else: "$edad.dias"  
              }
          }
        ]
    }
   })
   
   
   
   db.alumnos.find({
   $expr: {
        $gt:[
          {   
            $cond:{
                if:{ $gte: ["$edad.anios",30]},
                then:{$divide:["$edad.anios", 2]},
                else:{ $divide:["$edad.anios", 3]}               
            }
          }, 
          {
              $cond:{
                if:{ $gte: ["$edad.anios",30]},
                then:"$edad.meses",
                else: "$edad.dias"  
              }
          }
        ]
    }
   }).count()
   
   
   
db.alumnos.find({ 
    $and:[
    {
    $expr: { 
        $gt:[
            {
                $cond:{
                    if:{ $gte:["$edad.anios", 28]},
                    then:{ $divide:["$edad.anios", 2]},
                    else:{ $divide:["$edad.anios", 3]}
                }
            },
            {
                $cond:{
                    if:{ $gte:["$edad.anios", 28]},
                    then: "$edad.meses" ,
                    else: "$edad.dias" 
                }
            }
        ] 
    } 
    },
    { edad:{ $exists:1} }
   ]
    
})




////////////////
//base de datos Ejercicios

//2.- Mostrar todos los documentos de la colección restaurants 
db.getCollection('restaurant').find({})


//3 Mostrar nombre de restaurante, barrio y cocina de la colección restaurants  ordenados por barrio   
db.restaurant.find({},{nombre: 1, barrio:1, cocina:1}).sort({barrio:1})

//4Mostrar los primeros 5 restaurantes del barrio Bronx.
db.restaurant.find({barrio: 'Bronx'}).limit(5)

//5Mostrar los restaurantes con del zipcode 11226
db.restaurant.find({"direccion.zipcode": "11226"})

//6Mostrar los restaurantes con una alguna puntuación superior a 90
db.restaurant.find({"calificaciones.puntuacion":{$gte: 90}})

//7Mostrar los restaurantes de comida American o Chineese del barrio Queens.
db.restaurant.find({ [{cocina:"American"}, {cocina:"Chineese"}] })

//8Mostrar los restaurantes con una calificación “A” y puntuación 9 
db.restaurant.find({ $and: [{"calificaciones.calificacion":"A"}, {"calificaciones.puntuacion":9}] })


//9  Mostrar los restaurantes de comida Mexicana que no esten en el barrio Queens o bronx
db.restaurant.find({ $and : [
    
    {barrio:{ $nin: ["Bronx", "Queens"]}}
    , {cocina: "Mexican" }
    ]
     
})
    






////////////////////
//EXPRESIONES REGULARES

//Inicia con una letra (R), Simbolo ^
db.alumnos.find({nombre:{$regex:"^R.*$"}}, {nombre:1, _id:0})
db.alumnos.find(  {nombre:  {$regex:"^r.*$", $options:"i"}  }, {nombre:1, _id:0}  )

//evaluar expresion regular 
db.alumnos.find({nombre:/^R/}, {nombre:1, _id:0})
db.alumnos.find({nombre:/^r/i}, {nombre:1, _id:0})

//Termina con una letra (R) 
db.alumnos.find({nombre:{$regex:".*r$", $options:"i"}}, {nombre:1, _id:0})
db.alumnos.find({nombre:/.*r$/i}, {nombre:1, _id:0})

//Contiene una letra
db.alumnos.find({nombre:{$regex:".*r.*", $options:"i"}}, {nombre:1, _id:0})
db.alumnos.find({nombre:/.*r.*/i}, {nombre:1, _id:0})

//Contiene la cadena jose
db.alumnos.find({nombre:{$regex:".*jose.*", $options:"i"}}, {nombre:1, _id:0})
db.alumnos.find({nombre:/.*jose.*/i}, {nombre:1, _id:0})

//Listar de forma unica los nombres que terminen con la cadena JOse de forma ordenada
db.alumnos.distinct("nombre", {nombre:/.*jose$/i}, {nombre:1, _id:0}).sort()

//Listar de forma unica los nombres que tengan la cadena Jose de forma ordenada
db.alumnos.distinct("nombre", {nombre:/.*jose.*/i}, {nombre:1, _id:0}).sort()

//Listar de forma unica los nombres que no tengan la cadena Jose de forma ordenada
db.alumnos.distinct("nombre", {nombre:{$not:/.*jose.*/i}}, {nombre:1, _id:0}).sort()
db.alumnos.distinct("nombre", {nombre:{$nin:[/.*quer.*/]}}, {nombre:1, _id:0}).sort()


db.alumnos.find({ciudad:{$exists:1}})
db.alumnos.distinct("ciudad")
db.alumnos.find({})

//Alumnos que contengan la palabara jose y no vivan en queretaro
db.alumnos.find({$and:[{nombre:/.*jose.*/i}, {ciudad:{$not:/.*quer.*/i}},{ciudad:{$exists:1}}]}, {nombre:1, ciudad:1, _id:0})
db.alumnos.find({$and:[{nombre:{$regex:".*jose.*", $options: "i"}}, {ciudad:{$not:{$regex:".*quer.*",$options: "i"}}},{ciudad:{$exists:1}}]}, {nombre:1, ciudad:1, _id:0})


//Buscar los alumnos que se llamen Jose o inicien con maria
db.alumnos.distinct("nombre",{nombre:/(jose|^maria)/i})

 //Que contengan jose o maria
db.alumnos.distinct("nombre",{nombre:/(jose|maria)/i},{nombre:1, _id:0})

 //Que contengan terminen con jose o inicien maria
db.alumnos.distinct("nombre",{nombre:/(jose$|^maria)/i},{nombre:1, _id:0})

//Listar todas las formas de escritura de queretaro
db.alumnos.distinct("ciudad", {ciudad:/(quer|qro)/i})
db.alumnos.distinct("ciudad", {ciudad:{$in:[/.*quer.*/i, /.*qro.*/i]}})
db.alumnos.distinct("ciudad", {ciudad:{$in:[/.*quer.*/i, /.*qro.*/i, "CORREGIDORA"]}})

//Listar todas las CIUDADES QUE NO SEAN queretaro
db.alumnos.distinct("ciudad", {ciudad:{$nin:[/.*quer.*/i, /.*qro.*/i]}})

db.alumnos.distinct("email")

//Listar emails que contengan un digito
db.alumnos.distinct("email", {email:/[0-9]/})

//Listar emails que no contengan un digito
db.alumnos.distinct("email", {email:{$not:/[0-9]/}})

//Listar emails que inicien con un digito
db.alumnos.distinct("email", {email:/^[0-9]/})

//Listar emails que terminen con un digito
db.alumnos.distinct("email", {email:/[0-9]$/})

//Listar correos con un formato valido // una versionmejor ^([a-z]|[0-9])+(\.([a-z]|[0-9]){1,})?+@[^@]+\.[a-zA-Z]{2,}$
db.alumnos.distinct("email", {email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/})

//Listar correos con un formato valido de dominio de dos letras
db.alumnos.distinct("email", {email:/^[^@]+@[^@]+\.[a-zA-Z]{2}$/})

// regresa arreglo, listar los alumnos con un nombre  entre 4 y 6 caracteres
db.alumnos.distinct("nombre", { nombre:/^[a-zA-Z]{4,6}$/i})

// regresa arreglo, listar los alumnos con un nombre  6 caracteres
db.alumnos.distinct("nombre", { nombre:/^[a-zA-Z]{6,}$/i})


//coincidir  con caracteres de puntucacion y con simbolos 
//!"#$...
db.alumnos.distinct("email", {email:/[[:punct:]]/i})

db.alumnos.distinct("nombre", {nombre: /[[:punct:]]/})


//Listar emails que no contenngan un digito usando clase de caacees
db.alummos.distinct( "email", {email: { $not:/[[:digit:]]/}}  )

//listar los alumnos cin un nombre de 4  6 caracteres [alpha:]
db.alummos.distinct( "nombre", {nombre: /^[[:alpha:]]{4,6}$/i}  )

//lostar alumnos con un nombre de 4 a 6 cataacreres (numericos y letras ) a-z . A-Z o 0-9
db.alummos.distinct( "nombre", {nombre: /^[[:alnum:]]{4,6}$/i}  )


//Listar los alumnos co un nombre que inclua un espacio en blanco
db.alumnos.distinct("nombre", {nombre:/[[:space:]]/i})



//CLASES ABREVIADAS    --> db.alumnos.distinct("nombre", {nombre:/[[:space:]]/i})
db.alumnos.distinct("nombre", {nombre:/\s/i})

//cualquier carecter que no sea un spacio blanco
db.alumnos.distinct("nombre", {nombre:/\S/i})


//digitos   \d
db.alumnos.distinct("nombre", {nombre:/\d/i})

//que no sean digitos 
db.alumnos.distinct("nombre", {nombre:/\D/i})

//REGEX PARA UNA CURP
db.alumnos.find({
    curp:/[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]/
},
{nombre:1, curp:1, _id:0})


//QUE NO (SEAN NO NUMEROS) ES DECIR, NUMEROS
db.alumnos.find({
    $and: [
    {curp: {$not: /\D/}},
    {curp: {$exists:1}}
    ]
},
{nombre:1, curp:1, _id:0})



db.alumnos.find({
    curp: {$not: /\d/}
},
{nombre:1, curp:1, _id:0})
    
    
    












//////////////////CAMBIO DE BASEDE DATOS

use blog
db.user.insertOne({
   "autor":1,
   "nombre":"will",
   "correo": "Will@gmail.com",
   "ciudad": "chilpancingo",
   "descripcion": "",
   "direccion":[{
     "calle":"",
      "numero": 0,
      "cp": 00000}
   ],
   "telefono": []
}
)

db.user.find({})


//Listar el numero de usuarios por ciudad
db.user.aggregate(
{$group: {"_id": "$ciudad","count":{$sum:1} } },
{$project: {ciudadh:"$_id", count:"$count", _id:0} }
)



//Listar las noticias de temas ”TECNOLOGIA”
db.user.find({"noticias.tema": "Tecnologia"},{noticias:1}).toArray()


db.alumnos.distinct("nombre", { nombre:/^[a-zA-Z]{4,6}$/i})


//Listar el nombre y correo de los usuarios que tengan una descripcion
db.user.find({"descripcion": {$exists:true}}, {nombre:1, correo:1})




//Listar los usuarios que tengan mas de un telefono (arreglo)
db.user.find({"telefono": {$gt:1}}, {nombre:1})


//n Listar el numero de noticias por tema
db.user.aggregate(
{$group: {"_id": "$noticias.tema","count":{$sum:1} } },
{$project: {temas:"$_id", count:"$count", _id:0} }
)



//EJEMPLO DE DOCUMENTOS EN LA COLLECTION USER
db.user.insertMany([

{
   "autor":1,
   "nombre":"ishahi",
   "correo": "ishahi@gmail.com",
   "ciudad": "chilpancingo",
   
   "direccion":[{
     "calle":"Genaro vazquez",
      "numero": 139,
      "cp": 303289}
   ],
   "telefono": [32354546,984587432],
   "noticias": [{
       "tema": "Tecnologia",
       "titulo": "la inteligencia artificial en la Medicina",
       "descripcion": "Esta es un articulo de la inteligencia artifical dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "IA",
             "programacion",
             "unam"
           ]
       },
       {
       "tema": "base de datos joana",
       "titulo": "la bases de datos  en la Medicina",
       "descripcion": "Esta es un articulo de la inteligencia artifical dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "IA",
             "programacion",
             "unam",
           "bases de datos"
           ]
       },
       {
       "tema": "Matematicas discretas",
       "titulo": "la Matematicas discretas en la Medicina",
       "descripcion": "Esta es un articulo de la Matematicas discretas dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "unam",
           "matematicas"
           ]
       }
       ]
},
{
   "autor":1,
   "nombre":"liam",
   "correo": "liam@gmail.com",
   "ciudad": "acapulco",
   
   "direccion":[{
     "calle":"lindavista",
      "numero": 139,
      "cp": 54932}
   ],
   "telefono": [893492843],
   "noticias": [{
       "tema": "Informatica",
       "titulo": "la Informatica en la Medicina",
       "descripcion": "Esta es un articulo de la  Informatica dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "IA",
             "programacion",
             "unam"
           ]
       },
       {
       "tema": "base de datos relacionales",
       "titulo": "la bases de datos relacionales en la Medicina",
       "descripcion": "Esta es un articulo de la inteligencia artifical dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "IA",
             "programacion",
             "unam",
           "bases de datos"
           ]
       },
       {
       "tema": "robotica",
       "titulo": "la robotica  en la Medicina",
       "descripcion": "Esta es un articulo de la Matematicas discretas dummy",
       "fecha_pubicacion": new Date(),
       "etiquetas": [
             "tecnologia",
             "ciencia",
             "unam",
           "robotica"
           ]
       }
       ]
}
]
)











///////////////////
// GROUP BY 

db.alumnos.find({})
//aggregate contendra ->$ ciudad tienen simbolo $ por que funciona como operador
db.alumnos.aggregate( 
[
  {$group: {"_id": "$ciudad","count":{$sum:1} } }, 
  {$project: {ciudadh:"$_id", count:"$count", _id:0} }
]
)
  
  
  //Agrupamos por 
db.alumnos.aggregate( 
[
  {$group: {"_id": {ciudad: "$ciudad", sexo: "$sexo"} ,"noalu":{$sum:1} } }, 
 // { $count: "nreg"} 
  {$project: {ciudadh:"$_id.ciudad",  sexo: "$_id.sexo", noalu:"$noalu", _id:0} },
  {$sort: {ciudadh:1,sexo: 1}},
  {$match: {ciudadh: "QUERETARO"}}
]
)  
  
  
  
  
  db.alumnos.aggregate( 
[
  {$match:{ciudad:{$exists:1}}},
  {$group: {"_id": {ciudad: "$ciudad", sexo: "$sexo"} ,"noalu":{$sum:1} } }, 
 // { $count: "nreg"} 
  {$project: {ciudadh:"$_id.ciudad",  sexo: "$_id.sexo", noalu:"$noalu", _id:0} },
  {$sort: {ciudadh:1,sexo: 1}},
  //{$match: {ciudadh: "QUERETARO"}}
]
)  
  
  
  
  
  //regresa una caleccion, pero no es la coleccion alumnos, es una vista consecuente del match
  //Regresa el conteo de quienn tiene ciudad y sexo.
  db.alumnos.aggregate( 
[
  {$match:{ciudad:{$exists:1}}},
  {$match:{sexo:{$exists:1}}},

  {$count: "neg"}

]
)  
  
  
  
  //regresa el numero de registros, que tengan sexo y que tengan sexo
  
    db.alumnos.aggregate( 
[
  {$match:{ciudad:{$exists:1}}},
  {$match:{sexo:{$exists:1}}},
  {$group: {"_id": {ciudad: "$ciudad", sexo: "$sexo"} ,"noalu":{$sum:1} } }, 
 // { $count: "nreg"} 
  {$project: {ciudadh:"$_id.ciudad",  sexo: "$_id.sexo", noalu:"$noalu", _id:0} },
  {$sort: {ciudadh:1,sexo: 1}},
  //{$match: {ciudadh: "QUERETARO"}}
  {$count: "nreg"}
  
]
)  
  
  
  
 /*
  $project
  $match
  $group
  $sort
  $skip
  $limit
  $unwind
  $out
  $geonear
  $sample    muestrear , nuestra de forma aleatoriamente un ejemplo
  $lookup    
  
  */
  
  
  
  






///////////////////
//estudiar aggregate
db.alumnos.find({})

/*
1.- filtro donde solo los de queretaro
2.- Hacemos projection, sacamos elementos y aramamos nuevos atributos
3.- De eje consijunto solo sacamos quienes tengan la palabra jose
4.- Arupamos por sexo y los contamos
5.- Realizamos una nueva projection  solo de sexo y nalu(atributos que hicimos en el group)
*/
db.alummos.aggregate( 
[
   {$match: {ciudad: "QUERETARO"}}, 
   {$project:{_id:0,email:"$email", sexo:"$sexo", 
       alumno: {$concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]} 
       }  
    },
    {$match:{alumno:/jose/i}},
    {$group:{"_id":"$sexo","nalu":{$sum:1}}},
    {$project: {sexo:"$_id", nalu:"$nalu", _id:0}},
   // {$match:{ nalu:{ $gte:5}}}
   
]
)/*
    SELECT sexo,count(*)nalu
    FROM alumnos
    WHERE ciudad = "QUERETARO", concat(nombre,ap_paterno,apmaterno ) LIKE '%JOSE%'
    GROUP BY sexo
    HAVING count(*) >=5
   */
   
   // econtrar a los alumnos que tengan evaluaciones
   db.alumnos.find( 
      {evaluaciones: { $exists:1}}
     // {_id:0, email:1 , sexo:1 ,}
    )
   
  
  /*
  1.- aggregate, para hacer uso de diferentes operadores dentro, como match,group etc
  2.- Solo quins tengan evaluciones
  3.- Projection sacamos atributos , donde calificaciones entra a $evaluaciones un arreglo y optenemos calificacion
  4.- En otro atributo creado en la projection hacemos lo mismo con materias, fechas, y alumno
  */
   db.alumnos.aggregate([
    {$match: {evaluaciones: {$exists:1}}},
    {$project: {_id:0 , email: "$email", sexo: "$sexo", sexo:1, calificaciones: "$evaluaciones.calificacion",
        materias: "$evaluaciones.materia",fechas:"$evaluaciones.fecha",
        alumno:{$concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]}}}
      
   ])
 
          
          
          
   /*
   1.- Agregamos el aggregate, macheamos por clave alumno, y que existan las evaluaciones
   2.- $unwind, o que hace es que separa por atributos de un array     
   */       
  db.alumnos.aggregate([
       {$match: {evaluaciones: {$exists:1}}},
       {$match: {"clave_alu": 11050207}},
       {$unwind: "$evaluaciones"},
       //{$unwind: "$materias"}
  ])
    
       
          
          
      //El mismo que esta arriba
   db.alumnos.aggregate([
   {$match: {evaluaciones: {$exists:1}}},
   {$match: {"clave_alu": 11050207}},
   {$project: {_id:0 , email: "$email", sexo: "$sexo", sexo:1 ,evaluaciones: "$evaluaciones.calificacion",
       materia: "$evaluaciones.materia",fechas:"$evaluaciones.fecha",
       alumno:{$concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]}}} 
   ])
          
          
 
 //unwind, lo que hace es destruir un array por cada elemento.
    db.alumnos.aggregate([
    { $match:{ evaluaciones:{ $exists: 1}}}, 
    { $match:{"clave_alu" : 11050207} },
    { $project:{ _id:0, email:"$email", sexo:"$sexo", sexo:1, calificaciones:"$evaluaciones.calificacion", 
        materias:"$evaluaciones.materia", fechas:"$evaluaciones.fecha", //evaluaciones:1,
        alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno" ]} } },
    { $unwind: "$calificaciones"},
    { $unwind: "$materias"},
    { $unwind: "$fechas"},
    //{ $count: "nalu"} 
    ])
      
    
    
    
  db.alumnos.aggregate([
    {$match: {"evaluaciones":{$exists: 1}}}
    ])

  db.alumnos.aggregate([
      {$match: {"sexo":"M"}},
      {$unwind: "$evaluaciones"},
      {$match: {"evaluaciones.calificacion": {$lt: 6}}},
      {$group:{ "_id":{"clave_alu":"$clave_alu","alumno": {$concat: ["$ap_paterno" ,"$ap_materno", "$nombre"]}}, "Total": {$sum:1}}},
      {$project:{
          evaluacion: "$evaluaciones.materia",    //no sirve este atributo
          nombre: "$_id.alumno",
          Materisreprobadas: "$Total"
          
          }}
       
      ])













///////////////////// 
//clase usamos unwind

db.alumnos.aggregate( [
  {$match: {"clave_alu": 11050235}},
  {$unwind: "$evaluaciones"},
  {$unwind: "$materias"}
])
  
  //este no
db.alumnos.aggregate( [
  {$match: {"clave_alu": 11050235}},
  {$unwind: "$evaluaciones"},
  {$match: {"evaluaciones.calificacion": {$gte: 6}}},
  {$group:{ "_id":["$clave_alu", "$ap_paterno" ,"$ap_materno", "$nombre" ]}}
])
  
  
db.alumnos.aggregate( [
  {$match: {"clave_alu": 11050235}},
  {$unwind: "$evaluaciones"},
  {$match: {"evaluaciones.calificacion": {$gte: 6}}},
  {$group:{ "_id":{"clave_alu":"$clave_alu", "alumno": { $concat:["$ap_paterno" ,"$ap_materno", "$nombre"] }},
  "promedio":{$avg: "$evaluaciones.calificacion"}
  
  } }
])
  
  db.alumnos.aggregate( [
  //{$match: {"clave_alu": 11050235}},
  {$unwind: "$evaluaciones"},
  {$match: {"evaluaciones.calificacion": {$gte: 6}}},
  {$group:{ "_id":{"clave_alu":"$clave_alu", "alumno": { $concat:["$ap_paterno" ,"$ap_materno", "$nombre"] }},
  "Calificacionpromedio":{$avg: "$evaluaciones.calificacion"},
  "CalificacionMax": {$max: "$evaluaciones.calificacion"},
    "CalificacionMin": {$min: "$evaluaciones.calificacion"},
    "CalificacionTotal": {$sum: "$evaluaciones.calificacion"},
    "CalificacionConteo": {$sum: 1},
  } },
  {$project: {
      clave_alu:"$_id.clave_alu",alumno: "$_id.alumno",
      calificacionPromedio:"$calificacionPromedio",CalificacionMax:"$CalificacionMax" ,
      CalificacionMin:"$CalificacionMin" , "CalificacionTotal": "$CalificacionTotal",
      CalificacionConteo: "$CalificacionConteo", _id:0   }}
  
])
      
      
      
        db.alumnos.aggregate( [
  //{$match: {"clave_alu": 11050235}},
  {$unwind: "$evaluaciones"},
  {$match: {"evaluaciones.calificacion": {$it: 5}}},
  {$group:{ "_id":{"clave_alu":"$clave_alu", "alumno": { $concat:["$ap_paterno" ,"$ap_materno", "$nombre"] }},
  "Calificacionpromedio":{$avg: "$evaluaciones.calificacion"},
  "CalificacionMax": {$max: "$evaluaciones.calificacion"},
    "CalificacionMin": {$min: "$evaluaciones.calificacion"},
    "CalificacionTotal": {$sum: "$evaluaciones.calificacion"},
    "CalificacionConteo": {$sum: 1},
  } },
  {$project: {
      clave_alu:"$_id.clave_alu",alumno: "$_id.alumno",
      calificacionPromedio:"$calificacionPromedio",CalificacionMax:"$CalificacionMax" ,
      CalificacionMin:"$CalificacionMin" , "CalificacionTotal": "$CalificacionTotal",
      CalificacionConteo: "$CalificacionConteo", _id:0   }}
  
])
      db.alumnos.find({})
      
      
  db.alumnos.aggregate([
      {$match: {"sexo":"M"}},
      {$unwind: "$evaluaciones"},
      {$match: {"evaluaciones.calificacion": {$lt: 6}}},
      {$group:{ "_id":{"clave_alu":"$clave_alu","alumno": {$concat: ["$ap_paterno" ,"$ap_materno", "$nombre"]}}, "Total": {$sum:1}}},
      {$project:{
          nombre: "$_id.alumno",
          Materisreprobadas: "$Total"
          
          }}
      ])
          

  //$concat: ["$ap_paterno", " " ,"$ap_materno", " ", "$nombre" ]
          
          
          
          
          
          
          
          
          
          
////////////////
//FECHAS

db.alumnos.aggregate( [
   {$match:{"clave_alu": 11050242}},
   {$unwind: "$evaluaciones"},
   {
       $project:{
           isoFecha:"$evaluaciones.fecha",
           fecha:{$dateToString:{format:"%Y-%m-%d",date:"$evaluaciones.fecha"}},
           horaMx:{$dateToString:{format:"%H-%M-%S:%L%z",date:"$evaluaciones.fecha",timezone:"America/Mexico_City"}},
           horaChihu:{$dateToString:{format:"%H-%M-%S:%L%z",date:"$evaluaciones.fecha",timezone:"America/Mexico_City"}},

           }
       }

])

 db.alumnos.find({})
 
 
 db.fechas.insertMany([
{ fecha: "2017-02-08T12:10:40.787", timezone: "America/Mexico_City", mensaje:  "Paso1: Iniciado" },
{ fecha: "2017-02-08", timezone: "-05:00", mensaje:  "Paso1: Ended" },
{ mensaje:  " Paso1: Ended " },
{ fecha: "2017-02-09", timezone: "Europe/London", mensaje: "Paso2: Iniciado"},
{ fecha: "2017-02-09T03:35:02.055", timezone: "+0530", mensaje: "Paso2: En Progreso"}
])


db.fechas.find()



db.fechas.aggregate([
   {$project:{
       fecha:{$dateFromString:{dateString:"$fecha"}},
       timezone:"$timezone",
       fechaOri:{$dateFromString:{dateString:"$fecha",timezone:"$timezone"}},
       fechaCDMX:{$dateFromString:{dateString:"$fecha",timezone:"America/Mexico_City"}}
       }}

])


db.fechas.aggregate([
   {$group:{_id:{anio:{$year: "$_id"},mes:{$month:"$_id"}},
   numeroCalif:{$sum:1}
   }}

])
db.fechas.find()          









/////////////FECHAS Y TIEMPO

//manejo de fechas y tiempos
db.alumnos.aggregate([
    {$match: { "clave_alu": 11050242}},
    {$unwind: "$evaluaciones"},
    {$project: {
        fecha: "$evaluaciones.fecha",
        anio: {$year: "$evaluaciones.fecha"},
        mes:  {$month: "$evaluaciones.fecha"},
        dia:  {$dayOfMonth: "$evaluaciones.fecha"},
        hora: {$hour: "$evaluaciones.fecha"},
        min:  {$minute: "$evaluaciones.fecha"},
        seg:  {$second: "$evaluaciones.fecha"},
        milisegundos: {$millisecond: "$evaluaciones.fecha"},
        diaDelAnio : {$dayOfYear: "$evaluaciones.fecha"},
        diaDeLaSemana: {$dayOfWeek: "$evaluaciones.fecha"},
        semana: {$week: "$evaluaciones.fecha"}
        }}
])
        
        
        
//Hacemos project, luego agrupamos y luego lo ponemos en otro project     
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$project:{
        fecha: "$evaluaciones.fecha",
        calificacion: "$evaluaciones.calificacion",
        anio: {$year: "$evaluaciones.fecha"}
        }
     },
     {
         $group: {_id:"$anio", promedio:{$avg: "$calificacion"},
                                      califTotal: { $sum: "$calificacion"},
                                      numeroCalif: { $sum:1}
       }
     },
     {
         $project: {anio: "$_id",
                    _id:0,
                    promedio: "$promedio",
                    califTotal: "$califTotal",
                    numeroCalif: "$numeroCalif"
            }
      },{$sort: {amio: -1, mes:1} }
])
      
      
db.alumnos.find({})


db.alumnos.aggregate([
      {$match: {"clave_alu": 11050242}},
      {$unwind: "$evaluaciones"},
      {
          $project: {
              idoFecha: "$evaluaciones.fecha",
              fecha: {$dateToString: {format: "%Y-%m-%d", date: "$evaluaciones.fecha"}},
              hora: {$dateToString: {format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha"}},
              horaChiu: {$dateToString: {format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha",timezone: "America/Chihuahua"}},
              horaMx: {$dateToString: {format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha",timezone: "America/Mexico_City"}},
              horaNY: {$dateToString: {format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha",timezone: "America/New_York"}},
              difMinMx: {$dateToString: {format: "%H-%M-%S:%L%z", date: "$evaluaciones.fecha",timezone: "America/Chihuahua"}}          
              }
          }
      ])

 
  

db.fechas.find()
       
db.fechas.aggregate([
      {$project: {
          fecha: {$dateFromString: {dateString: "$fecha"}},
          timezone: "$timezone",
          fechaOri: {$dateFromString: {dateString: "$fecha",
                                       timezone: "$timezone"}
                     },
          fehcaCDMX: {$dateFromString: {dateString: "$fecha",
                                        timezone: "$timezone"}}
                      
          
          }} 
    ])
          



//multiplica un valor por 100 y optengo los valores de un project
db.alumnos.aggregate([
       {$unwind:"$evaluaciones"},
       {$group: {
           "_id": {anio: {$dateToString: {format: "%Y",date: "$evaluaciones.fecha"}},
                   ciudad: "$ciudad" },
            noEvaluaciones: {$sum: 1},
            promedio: {$avg: "$evaluaciones.calificacion"},
            totalEvaluaciones: {$sum: "$evaluaciones.calificacion"},
            totalEvaluacionesx100: {$sum:{$multiply:["$evaluaciones.calificacion",100]}}
           }},
        { $project : {
            ciudad: "$_id.ciudad",anio: "$_id.anio", noEvaluaciones: "$noEvaluaciones",
            promedioEvaluaciones: "$promedio", totalEvaluaciones: "$totalEvaluaciones",
            totalEvaluacionesx100: "$totalEvaluacionesx100", _id: 0
            }}   
    ])
            
    
    
    
    
//Uso de map: Evalua cada item de un array, y devuelve un array, {input: El array,as: el nombre de cada item a iterar, in: funcion} 
db.alumnos.aggregate([
      {$match: {"evaluaciones": {$exists: 1}}},
      {
          $project: {
              _id:0, alumno: {$concat: ["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]},
              evaluaciones: {
                  $map: {
                      input: "$evaluaciones.calificacion",
                      as: "eval",
                      in:{$multiply: ["$$eval", 100]}
                  }
              }
          },
          $project: {
              alumno: 1,
              anios: 1,
              calificacionesMas10: {
                  $map: {
                      input: "$evaluaciones.calificacion",
                      as: "eval",
                      in: {$add: ["$$eval", 10]}
                      }
                  }
              }
      }
   ])
         
     
     
     
     
     
     
     
     
     
     
/////////// Clase 1 Marzo
//Agrupamos por ciudad e ipmrimimos cuantos alumnos hay por cada ciudad
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    


//hace un array de cada alumno deacuerdo a sus evaluaciones (de tipo array ) y agrupamos, si un alumno tiene 5 evaluaciones, va a ver 5 item de ese alumno por la funcion unwind
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])


//The $push operator appends a specified value to an array, hace objetos y los agrega a un array para este caso
db.alumnos.aggregate([
    { $group:{
            _id:"$ciudad",
            alumnos:{ $push:{ 
                alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
                matricula:"$clave_alu", curp:"$curp"
                } }
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])




//Agrupamos por ciudad y años, sacamos evaluacion sumea y promedio, volvemos agruar solo porciudad, y años lo agremamos comodato en un array y al final en un project 
db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{sexo:"M"}, {edad:{$exists:1}}]}},
    { $group:{
            _id:{ciudad:"$ciudad", anios:"$edad.anios"},
            total:{ $sum:"$evaluaciones.calificacion"},
            promedio:{ $avg:"$evaluaciones.calificacion"}
        }
    },
    { $group:{
            _id:"$_id.ciudad", 
            ciudadDatos:{ $push:{ anios:"$_id.anios", total:"$total", promedio:"$promedio"} }
        }
    },
    { $project:{ ciudad:"$_id", ciudadDatos:"$ciudadDatos", _id:0}}
])
    

//$addToSet NO repite los valores que se agregan a un arreglo  No repetido valores 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    { $group:{
            _id:"$ciudad",
            alumnos:{ $addToSet:{ $concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}}
        }
    },
    { $project:{ ciudad:"$_id", alumnos:"$alumnos", _id:0}}
])
    
    
//agrupa por sexo y  agrega a un array las ciudades que tienen dicho sexo, pero se repiten, abajo un ejemplo sin repetir atributos 
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $push: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])
    
    



//ordena por el parametro pasado en $sort "Ordena" | $addToSet solo funciona en $group , y de esa agrupacion toma los atributos  y los uno en un array 
db.alumnos.aggregate([
    {$sort:{ ciudad:1}},
    { $group:{
            _id:"$sexo",
            ciudades:{ $addToSet: "$ciudad"}
        }
    },
    { $project:{ sexo:"$_id", ciudades:"$ciudades", _id:0}}
])



// max, min, avg, sum
// $first $last
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])



db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"}
       }},
    {$sort:{ "_id.alumno":1}},
])
    
    
 
    
    

db.alumnos.aggregate([
    { $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $group:{
        _id:{ matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}},
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1}
       }},
    {$sort:{ "_id.alumno":1}},
])
    
    




// $addFields
db.alumnos.aggregate([
    //{ $unwind:"$evaluaciones"},
    { $match:{ $and:[{ciudad:"QUERETARO"}, {sexo:"F"}]}},
    { $project:{
        matricula:"$clave_alu", alumno:{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
        evaluaciones:"$evaluaciones"
        }},
     { $addFields:{
        primeraCalif:{ $first:"$evaluaciones.calificacion"},
        ultimaCalif:{ $last:"$evaluaciones.calificacion"},
        totalCalif:{ $sum:"$evaluaciones.calificacion"},
        promedioCalif:{ $avg:"$evaluaciones.calificacion"},
        maxCalif:{ $max:"$evaluaciones.calificacion"},
        minCalif:{ $min:"$evaluaciones.calificacion"},
        numeroCalif:{ $sum:1},
        semestre:"2022-1"
       }},
])
    


     //pediente
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {$match: {$and:[{ciudad: "QUERETARO"},{sexo:"F"}]}},
    {$group:{
        _id:{matricula:"$clave_alu", alumno: {$concat: ["$nombre", " ", "$ap_paterno,", " ", "$ap_materno"]}},
        primera Calificacion: {$first}
        }}
    
    ]) 
    
    
    
db.alumnos.aggregate([
     {$match: {$and:[{ciudad: "QUERETARO"},{sexo:"F"}]}},
     {$project: {
         matriculo: "$clave_alu", alumno: {$concat: ["$nombre", " ", "$ap_paterno,", " ", "$ap_materno"]},
         evaluaciones: "$evaluaciones"
         }},
        {
            $addFields: {
                primeraCalif: {$first: "$evaluaciones.calificacion"},
                ultimaCalif: {$last: "$evaluaciones.calificacion"},
                totalCalif: {$sum: "$evaluaciones.calificacion"},
                promedioCalif: {$avg: "$evaluaciones.calificacion"},
                maxCalif: {$max: "$evaluaciones.calificacion"}
                }
            } 
        
      ])
        
            
            
           // Lunes

















 //Controlar el numero de grupos con buckets
 // - Agrupa las agrupaciones del group por el id especificado en el boundaries, y los que sobren los guarda en default
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucket: {
            groupBy: "$edad.dias",
            boundaries: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],
            default: "nulos",
            output:{
                nalu: {$sum:1},
                alumnos:{$addToSet: {
                    almuno: { $concat: ["$nombre", " " , "$ap_paterno",
                    " ", "$ap_materno", " "]},
                    materia: "$evaluaciones.materia",
                    calificacion: "$evaluaciones.calificacion",
                    edad: "$edad"
                    }}

                }

            }
     },
    /* {
         $project:{
             califMinima:"$_id.min", calificacionMaxima: {$add:["$_id.max", -1]},
             nalu: "$nalu", alumnos: "$alumnos",_id:0
             }
         }*/
])

db.alumnos.aggregate([
     {$match: {"evaluaciones.calificacion": 8}}
     ])

// BucketAuto.- Mongo agrega automaticamente los mimites para hacer hacer las agrupaciones de los groupby por un promedio encontrado en la agrupacion
// de los dcumentos, partir del valor pasado en buckets , en este caso van del 5 al 6, del 6 al 7 .....
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucketAuto: {
            groupBy: "$evaluaciones.calificacion",
            buckets:17,
            output:{
                nalu: {$sum:1},
                alumnos:{$addToSet: {
                    $concat: ["$nombre", " " , "$ap_paterno",
                    " ", "$ap_materno", " ", {$toString:"$evaluaciones.materia" }]
                    }}
                } 
            }
     }
])
     
     
//Arroja los mismos resultados, pero los agregamos a un $project, y ahi jugamos con el output 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucketAuto: {
            groupBy: "$evaluaciones.calificacion",
            buckets:15,
            output:{
                nalu: {$sum:1},
                alumnos:{$addToSet: {
                    almuno: { $concat: ["$nombre", " " , "$ap_paterno",
                    " ", "$ap_materno", " "]},
                    materia: "$evaluaciones.materia",
                    calificacion: "$evaluaciones.calificacion"
                    }}

                }

            }
     },
     {
         $project:{
             califMinima:"$_id.min", calificacionMaxima: {$add:["$_id.max", -1]},
             nalu: "$nalu", alumnos: "$alumnos",_id:0
             }
         }
])
         
         




     
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucketAuto: {
            groupBy: "$edad.dias",
            buckets:30,
            output:{
                nalu: {$sum:1},
                alumnos:{$addToSet: {
                    almuno: { $concat: ["$nombre", " " , "$ap_paterno",
                    " ", "$ap_materno", " "]},
                    materia: "$evaluaciones.materia",
                    calificacion: "$evaluaciones.calificacion"
                    }}

                }

            }
     },
    /* {
         $project:{
             califMinima:"$_id.min", calificacionMaxima: {$add:["$_id.max", -1]},
             nalu: "$nalu", alumnos: "$alumnos",_id:0
             }
         }*/
])
     
     
     
     
     
     
     
     
     
     
 db.alumnos.aggregate([
     {$unwind:"$materias"}, 
    {$sortByCount: "$materias"},
    {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
     ])    
     
     
 //Facet crea un arreglo de documentos y lo agregamos a un nombre de objeto
db.alumnos.aggregate([
    {
     $facet:{
        "materias": [
        {$unwind:"$materias"}, 
        {$sortByCount: "$materias"},
        {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
        ]
      } 
     }    
])
     
     
     
     
     
db.alumnos.aggregate([
    {
     $facet:{
        "materias": [
        {$unwind:"$materias"}, 
        {$sortByCount: "$materias"},
        {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
        ],
        "evaluaciones": [
        {$unwind:"$evaluaciones"}, 
        {$sortByCount: "$evaluaciones.calificacion"},
        {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
        ],
        "ciudades":[
        {$sortByCount:"$ciudad"},
        {$project:{"ciudad": "$_id", nrenglones:"$count",_id:0}}
        ]
      } 
     }    
])