class BaseBuilder{
  constructor(){

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
}

module.exports = BaseBuilder;
