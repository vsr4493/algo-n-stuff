const a = function(){
      return Object.create({
              init: function(){
                        this.data = [1,2,3,4];
                        return this;
                      },
              [Symbol.iterator]: function*(){
                        for(let i in this.data){
                                    yield this.data[i];
                                  }
                      }
            }).init();
}
console.clear();
const x = a();
console.log(Array.from(x));
