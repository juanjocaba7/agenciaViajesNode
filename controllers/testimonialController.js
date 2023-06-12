import { Testimonial }  from "../models/Testimoniales.js"
const guardarTestimonial =async (req,res) => {
    
    // Validar testimonial
    const { nombre, correo, mensaje} = req.body;

    const errores = [];
    
    if(nombre.trim() === ""){
        errores.push({mensaje : "El Nombre esta vacio"})
    }
    if(correo.trim() === ""){
        errores.push({mensaje : "El Correo esta vacio"})
    }
    if(mensaje.trim() === ""){
        errores.push({mensaje : "El Mensaje esta vacio"})
    }

    //Al detectar errores, renderizamos la misma pagina, se haran visibles los errores y ademas conservaremos los valores ya escritos previamente
    if(errores.length > 0) {

        //Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();


        // Mostrar la Vista con los Errores
        res.render("testimoniales", {
            pagina: "testimoniales",
            errores, 
            nombre, 
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en la BD

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect("/testimoniales")
        } catch (error) {
            console.log(error)
        }

    }

}

export {
    guardarTestimonial
}