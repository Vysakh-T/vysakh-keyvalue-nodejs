
import { getConnection } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import { Department } from "../entities/Department";

export class DepartmentRepository{

    async getAllDepartments(){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.find({relations: ['employee']});
    }

    async addNewDepartment(obj: DepartmentDto){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.save(DepartmentRepo.create(obj));
    }

    async getDepartmentbyID(id: string){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.findOne({where: {id: id}, relations: ['employee']});
    }

    async deleteDepartment(id: string){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.softDelete({id: id});
    }

    async updateDepartment(id: string, obj: DepartmentDto){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.update(id, obj);
    }
}