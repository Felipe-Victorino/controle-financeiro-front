import BaseService from "./BaseService";

class AuthService extends BaseService{
  constructor(){
    super('/auth');

  }
}

export default AuthService;