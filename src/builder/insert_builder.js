const BaseBuilder = require("./base_builder");

class InsertBuilder extends BaseBuilder{
  constructor(tableName, values){
    super();
    
    this.tableName = tableName;
    this.columns = Object.keys(values);
    this.values = this.addQuotes(Object.values(values));
  }

  _build(){
    return `INSERT INTO ${this.tableName} ( ${this.columns.join(', ')} ) VALUES ( ${this.values.join(', ')} );`;
  }
}


module.exports = InsertBuilder;
