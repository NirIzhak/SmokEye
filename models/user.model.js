const DB = require('../utils/db');

class User {
    //userId;
    firstName;
    lastName;
    email;
    password;
    address;

    constructor(userId,firstName,lastName,email,password, address) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = [{city:address[0],street:address[1],streetNum:address[2]}];   
    }

    static async FindOneUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().FindOneUser('users',query);
    }
    static async UpdateUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().UpdateUser('users',query);
    }
    static async InsertUser(doc){
        return await new DB().InsertUser('users',doc);
    }
    static async RemovetUser(id){
        let query = {"id":{$eq:id}}
        return await new DB().RemovetUser('users',query);
    }
    
}
module.exports = User;