class DataAccess {
    private dbmodel: any;

    constructor(dbmodel: any) {
        this.dbmodel = dbmodel
    }

    async create(data: any) {
        const newData = new this.dbmodel(data);
        await newData.save();
        return newData;
    }


    async findOne({ filter }: any) {
        return this.dbmodel.findOne(filter);
    }

    async findAll({ filter }: any = {}) {
        return this.dbmodel.find(filter);
    }

    async update({ filter, data }: any) {
        return this.dbmodel.updateOne(filter, data);
    }

    async remove({ filter }: any) {
        return this.dbmodel.deleteOne(filter);
    }
}

export default DataAccess;