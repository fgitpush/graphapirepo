const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const EmployeeType = require('./types/employeeType');  // Import EmployeeType
const Employee = require('../models/employee');       // Import Employee model

// Root Query for fetching data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      args: {
        role: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sort: { type: GraphQLString }
      },
      resolve(parent, args) {
        const { page = 1, limit = 10, role, sort } = args;
        const skip = (page - 1) * limit;
        let sortObj = {};

        if (sort) sortObj[sort] = 1;

        const filters = {};
        if (role) filters.role = role;

        return Employee.find(filters)
          .skip(skip)
          .limit(limit)
          .sort(sortObj);
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      }
    }
  }
});

// Mutation for adding, updating, and deleting employees
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        class: { type: GraphQLString },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLInt },
        role: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const newEmployee = new Employee({
          name: args.name,
          age: args.age,
          class: args.class,
          subjects: args.subjects,
          attendance: args.attendance,
          role: args.role
        });

        return newEmployee.save();
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        class: { type: GraphQLString },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLInt },
        role: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        return Employee.findByIdAndRemove(args.id);
      }
    }
  }
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
