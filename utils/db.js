const { MongoClient, ObjectId } = require('mongodb');

class DB {
    db_uri;
    db_name;
    client;

    constructor() {
        this.db_uri = process.env.DB_URI;
        this.db_name =  process.env.DB_NAME;
        this.client = new MongoClient(this.db_uri);
}
//user actions
async FindOneUser(collection,query){
    try{
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).findOne(query);
    }catch(error){
        throw error;
    }
    finally{
        await this.client.close();
    }
}
async UpdateUser(collection,query){
    try{
        await this.client.connect();
         let doc = FindOneUser('users',query)
        return await this.client.db(this.db_name).collection(collection).UpdateOne(doc);
    }catch(error){
        throw error;
    }
    finally{
        await this.client.close();
    }
}
async InsertUser(collection,doc){
    try{
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).insertOne(doc);
    }catch(error){
        throw error;
    }
    finally{
        await this.client.close();
    }
}
async RemovetUser(collection,doc){
    try{
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).deleteOne(doc);
    }catch(error){
        throw error;
    }
    finally{
        await this.client.close();
    }
}
//reports actions
async ShowAllReports(collection, query = {}, project = {}) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
async ShowReportByCity(collection, query, project = {}) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
async ShowUserReports(collection, query, project = {}) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
async InsertNewReport(collection, doc) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).insertOne(doc);
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
//info actions
async ShowAllInfo(collection, query = {}, project = {}) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
async AddlInfo(collection, doc) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).insertOne(doc);
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}
async UpdateInfo(collection, query,doc) {
    try {
        await this.client.connect();
        return await this.client.db(this.db_name).collection(collection).updateOne(query,doc);
    } catch (error) {
        throw error;
    }
    finally {
        await this.client.close();
    }
}

}
module.exports = DB;