
import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    async getAllDepartments(){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.find({relations: ['employee']});
    }
    async addNewDepartment(name: string){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.save(DepartmentRepo.create({name: name}));
    }
}