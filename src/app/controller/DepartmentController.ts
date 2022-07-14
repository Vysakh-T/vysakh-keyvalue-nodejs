import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import authorize from "../middleware/authorizationMiddleware";
import Roles from "../../helpers/roles";
import validationMiddleware from "../middleware/validationMiddleware";
import { DepartmentDto } from "../dto/CreateDepartment";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(Object.values(Roles)), this.getAllDepartments);
    this.router.post(`${this.path}`, authorize([Roles.admin,Roles.hr]), validationMiddleware(DepartmentDto,APP_CONSTANTS.body),this.addNewDepartment);
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)), this.getDepartmentByID);
    this.router.delete(`${this.path}/:id`, authorize([Roles.admin,Roles.hr]), this.deleteDepartment);
    this.router.put(`${this.path}/:id`, authorize([Roles.admin,Roles.hr]),validationMiddleware(DepartmentDto,APP_CONSTANTS.body), this.updateDepartment);
  }
  
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller" };
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.getAllDepartments(), Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private addNewDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller" };
      const obj = Object(request.body);
      console.log(request.body);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.addNewDepartment(obj), Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getDepartmentByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller"};
      const id = String(request.params.id);
      console.log(request);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.getDepartmentbyID(id), Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller"};
      const id = String(request.params.id);
      console.log(request);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.deleteDepartment(id), Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller"};
      const id = String(request.params.id);
      const obj = Object(request.body);
      console.log(request);
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.updateDepartment(id,obj), Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

}

export default DepartmentController;