const BaseBuilder = require("./base_builder");

class DeleteBuilder extends BaseBuilder{
  constructor(tableName){
    super();

    this.tableName = tableName;
  }

  _build(){
    return `DELETE FROM ${this.tableName};`;
  }
}


module.exports = DeleteBuilder;
