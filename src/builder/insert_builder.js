class InsertBuilder{
  constructor(tableName, values){
    this.tableName = tableName;
    this.columns = Object.keys(values);
    this.values = this.addQuotes(Object.values(values));
  }

  addQuotes(values){
    return values.map((value)=>{
      if(value == undefined || value == null){
        return "null";
      }

      switch(typeof value){
        case 'string':
          return `"${value}"`;

        default:
          return value;
      }
    });
  }

  _build(){
    return `INSERT INTO ${this.tableName} ( ${this.columns.join(', ')} ) VALUES ( ${this.values.join(', ')} );`;
  }
}


module.exports = InsertBuilder;
