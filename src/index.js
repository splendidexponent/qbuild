const sqlite3 = require('sqlite3').verbose();

const CreateTableBuilder = require('./builder/create_table_builder');

class QBuild{
  constructor(){
    this.connection = null;
    this.lastStatement = '';
    this.lastErrorMessage = '';
  }

  connect(path=':memory:'){
    this.connection = new sqlite3.Database(path);
  }

  disconnect(){
    this.connection.close();
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

module.exports = QBuild;
