const sqlite3 = require('sqlite3').verbose();

const CreateTableBuilder = require('./builder/create_table_builder');
const InsertBuilder = require('./builder/insert_builder');
const SelectBuilder = require('./builder/select_builder');

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

  log(message){
    console.log(`[${(new Date()).toLocaleString()}] ${message}`);
  }

  run(sql, resolve){
    this.log(sql);
    
    this.lastStatement = sql;
    this.connection.run(sql, (error)=>{
      if(error){
        this.lastErrorMessage = error.message;
        this.log(this.lastErrorMessage);

        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  fetch(sql, resolve){
    this.log(sql);
    
    this.lastStatement = sql;
    this.connection.all(sql, (error, rows)=>{
      if(error){
        this.lastErrorMessage = error.message;
        this.log(this.lastErrorMessage);

        resolve(false);
      } else {
        resolve(rows);
      }
    });
  }

  createTable(tableName, settingsCb){
    return new Promise((resolve)=>{
      const builder = new CreateTableBuilder(tableName);
      settingsCb(builder);
      this.run(builder._build(), resolve);
    });
  }

  insert(tableName, values){
    return new Promise((resolve)=>{
      const builder = new InsertBuilder(tableName, values);
      this.run(builder._build(), resolve);
    });
  }

  select(tableName, columns){
    return new Promise((resolve)=>{
      const builder = new SelectBuilder(tableName, columns);
      this.fetch(builder._build(), resolve);
    });
  }
}

module.exports = QBuild;
