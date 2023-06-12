import { Viaje } from "../models/Viaje.js"
import { Testimonial } from "../models/Testimoniales.js"

const paginaInicio = async(req, res) => { //req-lo que enviamos : res - lo que express nos responde
    //Consultar 3 viajes del modelo Viaje
    
        const promiseDB = [];

        promiseDB.push(Viaje.findAll({limit:3}))
        promiseDB.push(Testimonial.findAll({limit:3}))

    try {
        //Es conveniente ejecutar los 2 awaits al mismo tiempo para evitar hacer esperar al usuario

        const resultado = await Promise.all( promiseDB );

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
        
    } catch (error) {
        console.log(error)
    }
}
const paginaNosotros =  (req, res) => { //Ponemos el archivo pug que queremos sin especificar rutas
    res.render("nosotros", {
        pagina: "Nosotros"
    }); 

}
const paginaViajes = async (req, res) => {    
    //Consultar la BD - Gracias al modelo tendremos los metodos, importante importarlos

    const viajes = await Viaje.findAll(); //Con este traemos todos los elementos de esa tabla

    console.log(viajes);

    res.render("viajes", {
        pagina: "Próximos Viajes",
        viajes,
    }); 

}
const paginaTestimoniales = async (req, res) => {    
    try {
        const testimoniales = await Testimonial.findAll();
        res.render("testimoniales", {
            pagina: "testimoniales",
            testimoniales
        }); 
    } catch (error) {
        console.log(error)
    }
    
    

}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{

    const { slug } = req.params;


    try {//en caso de alguna peticion que puede que no haya llegado a la BD
        const viaje = await Viaje.findOne({where : {slug}});

        res.render("slug", {
            pagina: "Información Viaje",
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    paginaInicio, 
    paginaNosotros, 
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}