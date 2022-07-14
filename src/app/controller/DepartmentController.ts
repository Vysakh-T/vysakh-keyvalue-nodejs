import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllDepartments);
    this.router.post(`${this.path}`, this.addNewDepartment);
  }
  
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller" };
      response.status(200);
      response.send(await this.departmentService.getAllDepartments());
    } catch (error) {
      return next(error);
    }
  }

  private addNewDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller" };
      const name = String(request.query.name);
      response.status(200);
      response.send(await this.departmentService.addNewDepartment(name));
    } catch (error) {
      return next(error);
    }
  }
}

export default DepartmentController;