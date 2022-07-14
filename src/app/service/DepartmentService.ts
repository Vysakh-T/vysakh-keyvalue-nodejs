import { DepartmentRespository } from "../repository/DepartmentRepository";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRespository){

    }

    getAllDepartments(){
        return this.departmentRepository.getAllDepartments();
    }

    addNewDepartment(name: string){
        return this.departmentRepository.addNewDepartment(name);
    }
    }