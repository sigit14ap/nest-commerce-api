import { IsInt, IsString, IsAlphanumeric } from "class-validator";
import { RegisterRequest } from "../interfaces/store.interface";

export class RegisterRequestDto implements RegisterRequest {
    @IsInt()
    public readonly user_id: number;
    
    @IsAlphanumeric()
    public readonly domain: string;

    @IsString()
    public readonly name: string;
}