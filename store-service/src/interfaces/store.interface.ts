import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { util, configure } from "protobufjs/minimal";
import { Observable } from "rxjs";
import * as Long from 'long';
import { DefaultResponse } from "src/app.interface";

export const protobufPackage = 'store';

export interface RegisterRequest {
    user_id: number;
    domain: string;
    name: string;
}

export interface StoreServiceCilent {
    register(request: RegisterRequest): Observable<DefaultResponse>;
}

export function StoreServiceControllerMethod() {
    return function (constructor:  Function) {
        const grpcMethods: string[] = ['register'];

        for(const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod('StoreService', method)(constructor.prototype[method], method, descriptor);
        }

        const grpcStreamMethods: string[] = [];

        for(const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod('StoreService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const STORE_SERVICE_NAME = 'StoreService';

if (util.Long !== Long) {
    util.Long = Long as any;
    configure();
}