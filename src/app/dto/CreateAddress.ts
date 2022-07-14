import { IsNumber, IsString } from "class-validator";

export class AddressDto {
    @IsString({})
    public zipcode: string;

    @IsString()
    public desc: string;
}