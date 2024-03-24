const BaseBuilder = require("./base_builder");

class CreateTableBuilder extends BaseBuilder{
  constructor(tableName){
    super();

    this.tableName = tableName;
    this.sqlParts = [];
  }

  string(name){
    this.sqlParts.push(`${name} string NOT NULL`);
  }

  _build(){
    return `CREATE TABLE ${this.tableName} ( ${this.sqlParts.join(', ')} );`;
  }
}


module.exports = CreateTableBuilder;
