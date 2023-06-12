
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";


const app = express();

//Conectar la base de datos
db.authenticate()
    .then( () => console.log("base de datos conectada"))
    .catch( error => console.log(error))

//Definir port
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set("view engine", "pug");

//Obtener el año actual(Middleware)
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next();
});

//Agregar Body Parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));



//Definir la Carpeta Publica
app.use(express.static("public"));

// Agregar router  ==  Use abarca todos las funciones del CRUD(get,post,patch,delete)
app.use("/", router);




app.listen(port, () => {
    console.log(`El Servidor está funcionando en el Puerto ${port} , http://localhost:4000/`)
})















