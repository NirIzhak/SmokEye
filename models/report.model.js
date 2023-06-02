const DB = require('../utils/db');

class Report{

    type;
    details;
    image;
    address;

    constructor(type,details,image,address){

        this.type = type;
        this.details = details;
        this.image = image;
        this.address = [{city:address[0],street:address[1],streetNum:address[2]}];   
    }

    static async ShowAllReports() {
        return await new DB().ShowAllReports('reports');
    }
    static async ShowReportByCity(city) {
        let query = { "address.city": city }
        return await new DB().ShowReportByCity('reports', query);
    }
    static async ShowUserReports(doc) {
        return await new DB().ShowUserReports('reports',doc);
    }
    static async InsertNewReport(doc) {
        return await new DB().InsertNewReport('reports',doc);
    }
}


module.exports = Report;

    