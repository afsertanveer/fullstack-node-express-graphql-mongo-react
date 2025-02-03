const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { projects, clients } = require("../sampleData.js");

const Project = require("../models/Project.js");
const Client = require("../models/Client.js");

//client type

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
//project type

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return client.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const client = new Client(args);
        return await client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await Client.findByIdAndDelete(args.id);
      },
    },
    //add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { valie: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId:{type:GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent,args){
        const newProject = new Project(args);
        return await newProject.save();
      }
    },
    deleteProject:{
      type:ProjectType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent,args){
        return await Project.findByIdAndDelete(args.id);
      }
    },
    //update a project
    updateProject:{
      type:ProjectType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { valie: "In Progress" },
              completed: { value: "Completed" },
            },
          })
        },
      },
      async resolve(parent,args){
        return await Project.findByIdAndUpdate(args.id,{
          $set:{
            name:args.name,
            description:args.description,
            status:args.status
          }
        },
        {new : true})
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
