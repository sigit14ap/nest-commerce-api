import { Inject, Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "src/entities/store.entity";
import { Repository } from "typeorm";
import { RegisterRequestDto } from "src/dto/store.dto";
import { DefaultResponse } from "src/app.interface";

@Injectable()
export class StoreService {
    @InjectRepository(Store)
    private readonly repository: Repository<Store>;

    public async register(request: RegisterRequestDto): Promise<DefaultResponse> {

        let checkStore = await this.repository.findOne({ 
            where: { 
                user_id: request.user_id 
            } 
        });

        if(checkStore) {
            return { status: HttpStatus.CONFLICT, message: 'Already registered as store', data: {}, error: [] };
        }

        let checkDomain = await this.repository.findOne({ 
            where: { 
                domain: request.domain 
            } 
        });

        if(checkDomain) {
            return { status: HttpStatus.CONFLICT, message: 'Domain already exists', data: {}, error: [] };
        }

        let store = new Store;
        store.user_id = request.user_id;
        store.domain = request.domain;
        store.name = request.name;

        let result = await this.repository.save(store);

        return { 
            status: HttpStatus.OK, 
            message: 'Success Register as Store', 
            data: result,
            error: []
        };
    }
}