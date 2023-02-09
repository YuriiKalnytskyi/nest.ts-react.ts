import { HttpFactoryService, HttpService } from '../module/common/services';
import { ExpectedFromQuery, IToken } from '../module/common/types';

import { IExampleLogin } from '../types';

class ExampleService {
    constructor(private httpService: HttpService) {}

    async login(data: IExampleLogin): Promise<ExpectedFromQuery<IToken>> {
        return this.httpService.post<IToken, IExampleLogin>('login', data);
    }
}

const factory = new HttpFactoryService();
export const exampleService = new ExampleService(factory.createHttpService());
