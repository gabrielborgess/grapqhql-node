const express=require('express');
const app=express();
const express_graphql=require('express-graphql');
const {buildSchema}=require('graphql');

const schema =buildSchema(`
type Query{
    message: String
}
`);
const root={
    message:()=>"Prueba"
}
app.use('/graphql',express_graphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(3000,()=>console.log('Servidor en el puerto 3000'));

