import { ObjectLiteral } from "typeorm";
import { AddressDto } from "../dto/AddressDto";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { AddressRepository } from "../repository/AddressRepository";
import { ErrorCodes } from "../util/errorCode";

export class AddressService{
    addressRepository: AddressRepository;

    constructor(){
        this.addressRepository =  new AddressRepository();
    }

    async getAllAddresses(){
        return this.addressRepository.getAllAddresses();
    }


    async getAddressByID(id: string){
        const addData = await this.addressRepository.getAddressbyID(id);
        if(!addData){
            throw new EntityNotFoundException(ErrorCodes.ENTITY_WITH_ID_NOT_FOUND);
        }
        return addData;
    }


    async updateAddress(id: string, obj: AddressDto){
        const addData = await this.addressRepository.getAddressbyID(id);
        if(!addData){
            throw new EntityNotFoundException(ErrorCodes.ENTITY_WITH_ID_NOT_FOUND);
        }
        return this.addressRepository.updateAddress(id,obj);
    }

}