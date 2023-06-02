const DB = require('../utils/db');

class Info{

    infoId;
    description;
    constructor(infoId,description){
        this.infoId = infoId;
        this.description = description;
    }

    static async ShowAllInfo() {
        return await new DB().ShowAllInfo('info');
    }
    static async AddlInfo(doc) {
        return await new DB().AddlInfo('info',doc);
    }
    static async UpdateInfo(id,des) {
        let query = {"infoId":{$eq:id}}
        let desUpdate = ({description},{$set:des});
        return await new DB().UpdateInfo('info',query,desUpdate);
    }
}
module.exports = Info;