import { EntityNotFoundError, ObjectLiteral } from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { EmployeeRespository } from "../repository/EmployeeRepository";

import { CustomError, ErrorCodes } from "../../app/util/errorCode";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { email } from "envalid";
import { resolve } from "path";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameORPasswordException";

export class EmployeeService{
    constructor(private employeeRepository: EmployeeRespository){

    }



    public employeeLogin = async (
        email: string,
        password: string,
        role: string
        ) => {
        const employeeDetails = await this.employeeRepository.getEmployeeByEmail(
            email
        );
        if (!employeeDetails) {
            throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
            let payload = {
            "id": employeeDetails.id,
            "email": employeeDetails.email,
            "role": employeeDetails.role
            };
            const token = this.generateAuthTokens(payload);

            return {
            idToken: token,
            employeeDetails,
            };
        } else {
            throw new IncorrectUsernameOrPasswordException();
        }
        };

        private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
            expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
        };  



    async getAllEmployees(){
        return this.employeeRepository.getAllEmployees();
    }

    async createEmployee(employeeDetails: any){
        // return this.employeeRepository.createNewEmployee(obj);

        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                jdate: employeeDetails.jdate,
                email: employeeDetails.email,
                role: employeeDetails.role,
                status: employeeDetails.status,
                experience: employeeDetails.experience,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                departmentId: employeeDetails.departmentId,
                address: employeeDetails.address,
                department: employeeDetails.department
            });
            const save = await this.employeeRepository.createNewEmployee(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","400");
        }
    }

    async deleteEmployee(uid: string){
        return this.employeeRepository.deleteEmployee(uid);
    }

    async getEmployeebyID(uid: string){
        
        const empData = await this.employeeRepository.getEmployeebyID(uid);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
            // const details: CustomError = {
            //     CODE:"ddd",
            //     MESSAGE:"fdfdgdg"
            // }
            // throw new EntityNotFoundException(details);
        }
        
        return empData;

    }

    async updateEmployee(id: string, obj: ObjectLiteral){
        return this.employeeRepository.updateEmployee(id,obj);
    }
}