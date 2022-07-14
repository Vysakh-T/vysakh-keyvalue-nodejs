import { ObjectLiteral } from "typeorm";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRespository){

    }

    getAllDepartments(){
        return this.departmentRepository.getAllDepartments();
    }

    addNewDepartment(obj: ObjectLiteral){
        return this.departmentRepository.addNewDepartment(obj);
    }

    getDepartmentbyID(id: string){
        return this.departmentRepository.getDepartmentbyID(id);
    }

    deleteDepartment(id: string){
        return this.departmentRepository.deleteDepartment(id);
    }

    updateDepartment(id: string, obj: ObjectLiteral){
        return this.departmentRepository.updateDepartment(id,obj);
    }


    }