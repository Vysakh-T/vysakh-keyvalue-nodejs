
import { options } from "superagent";
import { getConnection, ObjectLiteral } from "typeorm";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{

    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations: ['department','address']});
    }

    public async getEmployeeByEmail(email: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { email },
        });
        return employeeDetail;
    }

    async createNewEmployee(obj: EmployeeDto){
        const employeeRepo = getConnection().getRepository(Employee);
        // return employeeRepo.createQueryBuilder().insert().into(Employee).values({name: name}).execute();
        return employeeRepo.save(employeeRepo.create(obj));
    }

    async deleteEmployee(uid: string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({id: uid});
    }

    async getEmployeebyID(uid: string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({where:{id: uid}, relations: ['department','address']});
    }

    async updateEmployee(id:string, obj: EmployeeDto){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.update(id, obj);
    }
}