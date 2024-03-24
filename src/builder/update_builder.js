const BaseBuilder = require("./base_builder");

class UpdateBuilder extends BaseBuilder{
  constructor(tableName, values){
    super();

    this.tableName = tableName;
    this.columns = Object.keys(values);
    this.values = this.addQuotes(Object.values(values));
  }

  _parts(){
    return this.columns.map((column, i)=>{
      return `SET ${column} = ${this.values[i]}`
    });
  }

  _build(){
    return `UPDATE ${this.tableName} ${this._parts().join(', ')};`;
  }
}


module.exports = UpdateBuilder;
