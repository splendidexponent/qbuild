const sqlite3 = require('sqlite3').verbose();

class CreateTableBuilder{
  constructor(tableName){
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

class QBuild{
  constructor(){
    this.connection = null;
    this.lastStatement = '';
    this.lastErrorMessage = '';
  }

  connect(path=':memory:'){
    this.connection = new sqlite3.Database(path);

    return this;
  }

  disconnect(){
    this.connection.close();

    return this;
  }

  createTable(tableName, settingsCb){
    return new Promise((resolve)=>{
      const builder = new CreateTableBuilder(tableName);
      settingsCb(builder);
      const sql = builder._build();
  
      this.lastStatement = sql;
      this.connection.run(sql, (error)=>{
        if(error){
          this.lastErrorMessage = error.message;
          console.log(this.lastErrorMessage);

          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = new QBuild;
