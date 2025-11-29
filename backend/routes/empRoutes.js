const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(global.__basedir, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({storage});

router.get("/employees/search", empController.searchEmployees)
// Get all employees
router.get("/employees", empController.getAllEmployees);

// Get single employee by ID
router.get("/employees/:eid", empController.getEmployeeById);

// Delete employee by ID
router.delete("/employees/:eid", empController.deleteEmployee);

router.post("/employees", upload.single("profilePic"), empController.createEmployee);

router.put("/employees/:eid", upload.single("profilePic"), empController.updateEmployee);

module.exports = router;
