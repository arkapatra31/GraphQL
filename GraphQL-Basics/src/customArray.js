import { GraphQLServer } from 'graphql-yoga'

const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: "Sarah",
    email: 'sarah@example.com',
    age : 30
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age :28
}]

const posts = [
    {
        id : '221',
        title : "Post1",
        body : "This is post 1",
        publisher : "Tyson"
    },
    {
        id : '122',
        title : "New Blog",
        body : "This is a new blog",
        publisher : "Brady"
    },
    {
        id : '121',
        title : "Random",
        body : "This is random test case",
        publisher : "James"
    }
]

const typeDefs = `
    type Query {
        
        bio (query : String) : [User!]!
        nposts(check : String) : [Post!]!
        me : User!
        posts : Post!

    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int
        
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        publisher: String!
    }

`

const resolvers = {
    Query : {

        bio(parent,args,ctx,info) {
            if(!args.query){
                return users
            }
            else{
                return users.filter((user) => {
                    return user.age.toString().includes(args.query.toString())
                })
            }
        },

        nposts(parent,args,ctx,info){
            if(!args.check){
                return posts
            }
            else { 
                return posts.filter((post) => {
                    const titMatch = post.title.toLowerCase().includes(args.check.toLowerCase())
                    console.log(titMatch)
                    const bodyMatch = post.body.toLowerCase().includes(args.check.toLowerCase())
                    console.log(bodyMatch)
                    return titMatch && bodyMatch
                })
            }
        },

        me() {
            return {
                id : 123,
                name : 'Jadon',
                email : 'test@gmail.com',
                age : 25
            }
        },
        posts() {
            return {
                id: 321,
                title: 'GraphQL',
                body: "This is Custom Type Schema",
                publisher: "Gary"
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