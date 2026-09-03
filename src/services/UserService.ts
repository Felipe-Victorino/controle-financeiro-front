import BaseService from "./BaseService";

class UserService extends BaseService{

  static #instance: UserService;

  private constructor(){
    super('/user');
  }

  public static get instance(){
    if(!UserService.#instance){
      this.#instance = new UserService();
    }

    return this.#instance;
  }
}

export default UserService;