import { GraphQLServer } from 'graphql-yoga'
//Using input from user using a greeting method
const typeDefs = `
    type Query {
        greet(name : String, surname : String) : String!
        add(a : Float!, b : Float!) : Float!
        
        me : User!
        posts : Post!
    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int
        organization : Organization!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }

    type Organization {
        company : String!
        branch : String!
        pincode : Int
        present_company : Boolean!
    }
`

const resolvers = {
    Query : {

        greet(parent, args, ctx, info) {
            if(args.name && args.surname){
                //return 'Welcome '+args.name
                return `Welcome ${args.name} ${args.surname}`
            }
            else{
                return 'Welcome Guest'
            }
        },

        add(parent, args, ctx, info){
            if(args.a && args.b){
                return args.a+args.b
            }
        },

        me() {
            return {
                id : 123,
                name : 'Jadon',
                email : 'test@gmail.com',
                age : 25,
                organization : {
                    company : "TCS",
                    branch : "Kolkata",
                    pincode : 700156,
                    present_company : true
            
                }
            }
        },
        posts() {
            return {
                id: 321,
                title: 'GraphQL',
                body: "This is Custom Type Schema",
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Custom Schema is running at localhost:4000")
})