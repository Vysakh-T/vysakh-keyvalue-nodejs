
import { getConnection } from "typeorm";
import { AddressDto } from "../dto/AddressDto";
import { Address } from "../entities/Address";
export class AddressRepository{

    async getAllAddresses(){
        const AddressRepo = getConnection().getRepository(Address);
        return AddressRepo.find({relations: ['employee']});
    }


    async getAddressbyID(id: string){
        const AddressRepo = getConnection().getRepository(Address);
        return AddressRepo.findOne({where: {id: id}, relations: ['employee']});
    }


    async updateAddress(id: string, obj: AddressDto){
        const AddressRepo = getConnection().getRepository(Address);
        return AddressRepo.update(id, obj);
    }


}