const Employee = require('./models/employee'); // Import the Employee model

// Resolver functions
const root = {
  // Query to list all employees (with optional filters)
  employees: async ({ role, name, age, class: employeeClass }) => {
    try {
      const filter = {};
      if (role) filter.role = role;
      if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search for name
      if (age) filter.age = age;
      if (employeeClass) filter.class = employeeClass;

      const employees = await Employee.find(filter);
      return employees;
    } catch (error) {
      console.error("Error retrieving employees:", error);
      throw new Error("Failed to retrieve employees");
    }
  },

  // Query to retrieve details of a single employee by ID
  employee: async ({ id }) => {
    try {
      const employee = await Employee.findById(id);
      if (!employee) throw new Error("Employee not found");
      return employee;
    } catch (error) {
      console.error("Error retrieving employee:", error);
      throw new Error("Failed to retrieve employee");
    }
  },

  // Mutation to add a new employee
  addEmployee: async ({ name, age, class: employeeClass, subjects, attendance, role }) => {
    try {
      // Create a new employee instance
      const newEmployee = new Employee({
        name,
        age,
        class: employeeClass,
        subjects,
        attendance,
        role,
      });

      // Save the employee to the database
      const savedEmployee = await newEmployee.save();

      // Return the saved employee details
      return savedEmployee;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw new Error("Failed to add employee");
    }
  },

  // Mutation to update an existing employee's details
  updateEmployee: async ({ id, name, age, class: employeeClass, subjects, attendance, role }) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { name, age, class: employeeClass, subjects, attendance, role },
        { new: true } // Return the updated document
      );

      if (!updatedEmployee) throw new Error("Employee not found");

      return updatedEmployee;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw new Error("Failed to update employee");
    }
  },

  // Query to get employees with pagination (example limit of 10 per page)
  employeesPaginated: async ({ page = 1, limit = 10 }) => {
    try {
      const skip = (page - 1) * limit;
      const employees = await Employee.find()
        .skip(skip)
        .limit(limit)
        .exec();
      
      return employees;
    } catch (error) {
      console.error("Error retrieving paginated employees:", error);
      throw new Error("Failed to retrieve paginated employees");
    }
  },
};

module.exports = root;
