/**
 * Wraps Controllers for easy import from other modules
 */

import HealthController from "./HealthController";
import { EmployeeService } from "../service/EmployeeService";
import EmployeeController from "./EmployeeController";
import { DepartmentService } from "../service/DepartmentService";
import DepartmentController from "./DepartmentController";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository())),
];