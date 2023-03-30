import { User } from "../../schemas/user.schema";
import { userStub } from "../stubs/user.stub";
import { MockModel } from "../../../database/test/support/mock.model";

export class UserModel extends MockModel<User> {
  protected entityStub = userStub()
}