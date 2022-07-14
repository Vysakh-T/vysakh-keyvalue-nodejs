import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/authorizationMiddleware";
import Roles from "../../helpers/roles";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(Object.values(Roles)), this.getAllEmployees);
    this.router.post(`${this.path}`, authorize([Roles.admin,Roles.hr]), validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),this.createEmployee);
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)), this.getEmployeeByID);
    this.router.delete(`${this.path}/:id`, authorize([Roles.admin,Roles.hr]), this.deleteEmployee);
    this.router.put(`${this.path}/:id`, authorize([Roles.admin,Roles.hr]),validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body), this.updateEmployee);
    this.router.post(`${this.path}/login`, this.login);
  }


  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.email,
      loginData.password,
      loginData.role
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };


  
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.getAllEmployees(), Date.now() - request.startTime, "OK", 1));
      // response.send(await this.employeeService.getAllEmployees());
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      const obj = Object(request.body);
      console.log(request.body);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.createEmployee(obj), Date.now() - request.startTime, "OK", 1));
      // response.send(await this.employeeService.createEmployee(obj));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      const name = String(request.params.id);
      console.log(request);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.getEmployeebyID(name), Date.now() - request.startTime, "OK", 1));
      // response.send(await this.employeeService.getEmployeebyID(name));
    } catch (error) {
      return next(error);
    }
  }

  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      const id = String(request.params.id);
      console.log(request.query);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.deleteEmployee(id), Date.now() - request.startTime, "OK", 1));
      // response.send(await this.employeeService.deleteEmployee(id));
    } catch (error) {
      return next(error);
    }
  }

  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      const obj = Object(request.body);
      const id = String(request.params.id);
      console.log(request.body);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.updateEmployee(id,obj), Date.now() - request.startTime, "OK", 1));
      // response.send(await this.employeeService.updateEmployee(id,obj));
    } catch (error) {
      return next(error);
    }
  }
}

export default EmployeeController;