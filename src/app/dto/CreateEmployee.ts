import { IsNumber, IsString, validate, ValidateIf, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AddressDto } from "./CreateAddress";
import { DepartmentDto } from "./CreateDepartment";

export class CreateEmployeeDto {

    @IsString()
    public name: string;

    @IsString()
    public jdate: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsString()
    public experience: string;
    
    @IsString()
    public departmentId: string;

    // @ValidateIf(o => o.department.id != null)
    // @ValidateNested({ each: true })
    // @Type(() => DepartmentDto)
    // public department: DepartmentDto;

    @ValidateIf(o => o.address.id == null)
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    public address: AddressDto;
}

