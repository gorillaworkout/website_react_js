var array = [1,3,5,3,6,7,3,4,6,9]

var desc = array.sort((a,b)=>{
    if(a === b){
        return b - a 
    }else {
        return b-a
    }
})

console.log(desc)

var asc = array.sort((a,b)=>{
    if(a === b){
        return a - b
    }else{
        return a -b
    }
})

console.log(asc)

