const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

router.post("/employees", upload.single("profilePic"), empController.createEmployee);

router.put("/employees/:eid", upload.single("profilePic"), empController.updateEmployee);

module.exports = router;
