const Employee = require("../models/Employee");

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position} = req.query;
    const query = {}
    if (department) query.department = department;
    if (position) query.position = position;
    console.log("[EMP CONTROLLER] searchEmployees called");
    const employees = await Employee.find(query);
    console.log(`[EMP CONTROLLER] Employees found: ${employees.length}`);
    const output = employees.map(emp => ({
      employee_id: emp._id.toString(),
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
    }));
    res.status(200).json(output)
  } catch (err) {
    console.error("[EMP CONTROLLER] searchEmployees error:", err);
    res.status(500).json({ status: false, message: "Internal server error", error: err.message });
  }
};
exports.getAllEmployees = async (req, res) => {
  try {
    console.log("[EMP CONTROLLER] getAllEmployees called");
    const employees = await Employee.find().lean();
    console.log(`[EMP CONTROLLER] Employees found: ${employees.length}`);

    const output = employees.map(emp => ({
      employee_id: emp._id.toString(),
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
    }));

    res.status(200).json(output);
  } catch (err) {
    console.error("[EMP CONTROLLER] getAllEmployees error:", err);
    res.status(500).json({ status: false, message: "Internal server error", error: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    console.log("[EMP CONTROLLER] createEmployee called");
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json({ status: true, message: "Employee created", employee_id: emp._id.toString() });
  } catch (err) {
    console.error("[EMP CONTROLLER] createEmployee error:", err);
    res.status(400).json({ status: false, message: "Error creating employee", error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    console.log(`[EMP CONTROLLER] getEmployeeById called: ${req.params.eid}`);
    const emp = await Employee.findById(req.params.eid);
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });

    res.status(200).json({
      employee_id: emp._id.toString(),
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
    });
  } catch (err) {
    console.error("[EMP CONTROLLER] getEmployeeById error:", err);
    res.status(500).json({ status: false, message: "Invalid employee ID", error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    console.log(`[EMP CONTROLLER] updateEmployee called: ${req.params.eid}`);
    const emp = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });

    res.status(200).json({ status: true, message: "Employee updated", employee: emp });
  } catch (err) {
    console.error("[EMP CONTROLLER] updateEmployee error:", err);
    res.status(500).json({ status: false, message: "Internal server error", error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    console.log(`[EMP CONTROLLER] deleteEmployee called: ${req.params.eid}`);
    const emp = await Employee.findByIdAndDelete(req.params.eid);
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });

    res.status(200).json({ status: true, message: "Employee deleted" });
  } catch (err) {
    console.error("[EMP CONTROLLER] deleteEmployee error:", err);
    res.status(500).json({ status: false, message: "Internal server error", error: err.message });
  }
};
