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

const nposts = [
    {
        id : '221',
        title : "Post1",
        body : "This is post 1",
        publisher : "Tyson",
        author : '3'
    },
    {
        id : '122',
        title : "New Blog",
        body : "This is a new blog",
        publisher : "Brady",
        author : '3'
    },
    {
        id : '121',
        title : "Random",
        body : "This is random test case",
        publisher : "James",
        author : '1'
    }
]

const typeDefs = `
    type Query {
        
        bio (query : String) : [User!]!
        posts(check : String) : [Post!]!
        me : User!
        post : Post!

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
        author : User!
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

        posts(parent,args,ctx,info){
            if(!args.check){
                return nposts
            }
            else { 
                return nposts.filter((post) => {
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
        post() {
            return {
                id: 321,
                title: 'GraphQL',
                body: "This is Custom Type Schema",
                publisher: "Gary"
            }
        }
    },
    //Relational Mapping of Post and Author of type User
    Post :{
        author(parent,args,ctx,info){
            return users.find((user) => {
                return user.id == parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Relational Mapping is running at localhost:4000")
})