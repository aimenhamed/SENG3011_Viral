import { getLogger } from "../../utils/Logger";
import {
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";

export class UserService {
  private logger = getLogger();
  constructor(readonly userRepository: UserRepository) {}

  async registerUser(
    userDetails: IUserRegisterRequestBody
  ): Promise<IUserRegisterSuccessResponse | undefined> {
    const newUser = new UserEntity();
    newUser.name = userDetails.name;
    newUser.email = userDetails.email;
    // TODO: hash password
    newUser.password = userDetails.password;

    const userEntity: UserEntity = await this.userRepository.saveUser(newUser);
    if (userEntity === undefined) {
      this.logger.error(
        `Failed to register user with name ${newUser.name} and email ${newUser.email} `
      );
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully registered new user, with userId: ${newUser.userId}`
    );
    return {
      user: convertUserEntityToInterface(userEntity),
    };
  }
}
