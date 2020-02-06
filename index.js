const express=require('express');
const app=express();
const express_graphql=require('express-graphql');
const {buildSchema}=require('graphql');

//DATOS
const {libros}=require('./data.json')
console.log(libros)
const schema =buildSchema(`
type Query{
    libro(id:Int!):Libro
    libros(tena:String):[Libro]
}

type Libro{
    id:Int
    titulo:String
    autor:String
    tema:String
    url:String
}

`);

let obtenerLibro=(args)=>{
    let id=args.id;
    return libros.filter(libro=>{
        return libro.id==id;
    })[0]
}

let obtenerLibros=(args)=>{
    if (args.tema){
        let tema=args.tema;
        return libros.filter(libro=>libros.tema==tema)
    }else{
        return libros;
    }
}

const root={
    libro:obtenerLibro,
    libros:obtenerLibros
}
app.use('/graphql',express_graphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(3000,()=>console.log('Servidor en el puerto 3000'));

