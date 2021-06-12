import { GraphQLServer } from "graphql-yoga"

const schema = `
    type Query {
        Maths : Int
        English : Int
        Physics : Int
        Avg : Float
        Pass : Boolean!
    }
`

const resolver = {
    Query : {
        Maths(){
            return 100
        },
        English(){
            return 90
        },
        Physics(){
            return 96
        },
        Avg(){
            return 94.55
        },
        Pass(){
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs : schema,
    resolvers : resolver
})

server.start(()=>{
    console.log("Server is running at localhost:4000")
})