import { GraphQLServer } from 'graphql-yoga'

//Building Schemas or TypeDef
const typeDef = `
    type Query {
        hello : String!
        name : String!
        location : String!
        bio : String!
    }
`


//Building resolvers for the schema
const resolver = {
    Query : {
        
        hello(){
            return 'Hello There !!!'
        },

        name(){
            return 'Arka'
        },

        location(){
            return 'Kolkata'
        },

        bio(){
            return 'I am a Developer'
        },

        /* id(){
            return 31
        } */

    }
}

//Building the GraphQLserver
const server = new GraphQLServer({
    typeDefs : typeDef,
    resolvers : resolver
})


//Start the server
server.start(()=>{
    console.log("Server is running at localhost:4000")
})

/* // Type definitions (schema)
const type = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Andrew Mead'
        },
        location() {
            return 'Philadelphia'
        },
        bio() {
            return 'I live in Philly and teach on Udemy!'
        }
    }
 }

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
}) */