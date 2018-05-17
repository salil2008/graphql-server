const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, {id}) => {
      return links.find( obj => obj.id === id );
    }
  },
  Mutation: {
    // 1
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }	
      links.push(link)
      return link
    },

    updateLink: (root, args) => {
      console.log(args)
      if((links.findIndex(link => link.id==args.id)) != -1) {
        let index = links.findIndex(link => link.id==args.id)
        if(args.url) {
          links[index].url = args.url
        } 
        if(args.description) {
          links[index].description = args.description
        }
        return links[links.findIndex(link => link.id==args.id)]
      } else {
        return null
      }
    },

    deleteLink: (root, {id}) => {
      if((links.findIndex(link => link.id==id)) != -1) {
          let index = links.findIndex(link => link.id==id)
          let removed_set = links[index]
          links.splice(index, 1);
          return removed_set
      } else {
          return null
      }
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))