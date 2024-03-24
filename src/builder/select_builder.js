const BaseBuilder = require("./base_builder");

class SelectBuilder extends BaseBuilder{
  constructor(tableName, columns){
    super();

    this.tableName = tableName;
    this.columns = this.addAliasNames(columns);
  }

  addAliasNames(columns){
    if(!columns){
      return [];
    }

    return columns.map((column)=>{
      return `${column} AS ${column}`;
    });
  }

  _build(){
    if(this.columns.length > 0){
      return `SELECT ${this.columns.join(', ')} FROM ${this.tableName};`;
    } else {
      return `SELECT * FROM ${this.tableName};`;
    }
  }
}


module.exports = SelectBuilder;
