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
    },
    {
        id : '123',
        title : "Random2",
        body : "This is random2 test case",
        publisher : "John",
        author : '1'
    }
]

const comments = [
    {
        id : '1',
        text : "This is comment 1",
        author : "Andrew",
        post : '121'
    },
    {
        id : '2',
        text : "This is comment 2",
        author : "Sarah",
        post : '122'
    },
    {
        id : '3',
        text : "This is comment 3",
        author : "Sarah",
        post : '221'
    }, 
    {
        id : '4',
        text : "This is final comment",
        author : "John",
        post : '123'
    }
]

const typeDefs = `
    type Query {
        
        users (query : String) : [User!]!
        posts(check : String) : [Post!]!
        me : User!
        comments : [Comment!]!
        post : Post!

    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int
        posts : [Post!]!
        comments : [Comment]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        publisher: String!
        author : User!
    }

    type Comment {
        id : ID!
        text : String!
        author : User!
        post : Post!
    }

`

const resolvers = {
    Query : {

        users(parent,args,ctx,info) {
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
        comments(parent,args,ctx, info){
            return comments
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
    },
    
    User :{
        posts(parent,args,ctx,info){
            return posts.filter((post) => {
                return post.author == parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.author == parent.name
            })
        }
    },

    Comment : {
        author(parent,args,ctx,info){
            return users.find((user) => {
                return user.name == parent.author
            })
        },
        post (parent,args,ctx,info) {
            return posts.find((post) => {
                return post.id == parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Comment part 3 is running at localhost:4000")
})