import { ObjectLiteral } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRespository){

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
        return this.departmentRepository.deleteDepartment(id);
    }

    updateDepartment(id: string, obj: DepartmentDto){
        return this.departmentRepository.updateDepartment(id,obj);
    }


    }