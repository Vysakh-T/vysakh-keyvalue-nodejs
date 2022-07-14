import { ObjectLiteral } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRepository){

    }

    async getAllDepartments(){
        return this.departmentRepository.getAllDepartments();
    }

    async addNewDepartment(obj: DepartmentDto){
        return this.departmentRepository.addNewDepartment(obj);
    }

    async getDepartmentbyID(id: string){
        const depData = await this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        return depData;
    }

    async deleteDepartment(id: string){

        const depData = await this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        return this.departmentRepository.deleteDepartment(id);

    }

    async updateDepartment(id: string, obj: DepartmentDto){

        const depData = await this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }

        return this.departmentRepository.updateDepartment(id,obj);
    }

}