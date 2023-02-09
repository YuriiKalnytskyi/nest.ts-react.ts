import { EnhancedWithAuthHttpService, HttpFactoryService } from '../module/common/services';
import { ExpectedFromQuery, Iuuid } from '../module/common/types';
import { IExampleLogin } from '../types';

class ExampleAuthService {
    constructor(private httpService: EnhancedWithAuthHttpService) {}

    async editUser(data: Partial<IExampleLogin>): Promise<ExpectedFromQuery<Iuuid>> {
        return this.httpService.put('user/edit', data);
    }

    async getOneUser( id : Iuuid): Promise<ExpectedFromQuery<IExampleLogin>> {
        return this.httpService.get<IExampleLogin>(`getUser/${id}`);
    }
}

const factory = new HttpFactoryService();
export const exampleAuthService = new ExampleAuthService(factory.createAuthHttpService());
