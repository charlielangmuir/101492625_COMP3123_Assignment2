const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");

router.get("/employees/search", empController.searchEmployees)
// Get all employees
router.get("/employees", empController.getAllEmployees);

// Create a new employee
router.post("/employees", empController.createEmployee);

// Get single employee by ID
router.get("/employees/:eid", empController.getEmployeeById);

// Update employee by ID
router.put("/employees/:eid", empController.updateEmployee);

// Delete employee by ID
router.delete("/employees/:eid", empController.deleteEmployee);

module.exports = router;
