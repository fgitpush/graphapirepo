const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

// Define Employee Type for GraphQL
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    class: { type: GraphQLString },
    subjects: { type: new GraphQLList(GraphQLString) },
    attendance: { type: GraphQLInt },
    role: { type: GraphQLString }
  })
});

module.exports = EmployeeType;
