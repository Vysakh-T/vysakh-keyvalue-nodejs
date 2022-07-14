import { ObjectLiteral } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRepository){

    }

    getAllDepartments(){
        return this.departmentRepository.getAllDepartments();
    }

    addNewDepartment(obj: DepartmentDto){
        return this.departmentRepository.addNewDepartment(obj);
    }

    getDepartmentbyID(id: string){
        const depData = this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        return depData;
    }

    deleteDepartment(id: string){

        const depData = this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        return this.departmentRepository.deleteDepartment(id);
        
    }

    updateDepartment(id: string, obj: DepartmentDto){

        const depData = this.departmentRepository.getDepartmentbyID(id);
        if(!depData){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        return this.departmentRepository.updateDepartment(id,obj);
    }

}