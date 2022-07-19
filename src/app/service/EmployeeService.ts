import { EntityNotFoundError, ObjectLiteral } from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { EmployeeRespository } from "../repository/EmployeeRepository";

import { CustomError, ErrorCodes } from "../../app/util/errorCode";
import { EmployeeDto } from "../dto/EmployeeDto";
import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { email } from "envalid";
import { resolve } from "path";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameORPasswordException";
import { AddressDto } from "../dto/AddressDto";
import { AddressService } from "./AddressService";

export class EmployeeService{
    constructor(private employeeRepository: EmployeeRespository){

    }

    private addressService = new AddressService();
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

    async createEmployee(employeeDetails: EmployeeDto){
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
            });
            console.log(newEmployee)
            const save = await this.employeeRepository.createNewEmployee(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","400");
        }
    }

    async deleteEmployee(uid: string){

        const empData = await this.employeeRepository.getEmployeebyID(uid);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        return this.employeeRepository.deleteEmployee(uid);
        
    }

    async getEmployeebyID(uid: string){
        
        const empData = await this.employeeRepository.getEmployeebyID(uid);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        
        return empData;
    }

    async updateEmployee(id: string, obj: EmployeeDto){

        const empData = await this.employeeRepository.getEmployeebyID(id);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        
        return this.employeeRepository.updateEmployee(id,obj);
    }


    //Address Services

    async getAllEmployeeAddresses(){
        return this.addressService.getAllAddresses();
    }

    async getAddressByEmployeeID(uid: string){
        
        const empData = await this.employeeRepository.getEmployeebyID(uid);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        
        return this.addressService.getAddressByID(empData.address.id);
    }

    async updateEmployeeAddress(id: string, obj: AddressDto){

        const empData = await this.employeeRepository.getEmployeebyID(id);
        if(!empData) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }

        return this.addressService.updateAddress(empData.address.id,obj);
    }
}