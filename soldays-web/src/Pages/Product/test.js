// var stockValue = [1, 5, 9, 13, 25, 3, 0, 45, 61, 99, 120, 52, -32, 196, 99, -64];
const stockValue = [-1, -5, -9, -13, -25, -45, -61, -99, -120, -52, -32, -196, -99, -64]
var desc = stockValue.sort((a,b)=>{
    if(a === b){
        return b - a 
    }else {
        return b-a
    }
})

// console.log(desc)
var index = 0
var asc = stockValue.sort((a,b)=>{

    // console.log(a, 'ini a',index)
    // console.log(b,' ini b',index)
    index++
    if(a === b){
        return a - b
    }else{
        return a -b
    }
    
})
var newArray = []
var testing = stockValue.forEach((val,index)=>{
        if(val[index+1] === val){
            newArray.push(val[index+1])
            return val[index+1] - val
        }else {
            newArray.push(val[index+1])
            return val[index+1] - val
        }
})
// console.log(newArray,' testing')

// console.log(asc)

var min = asc[0]
var max = asc[stockValue.length-1]
var margin = max - min
console.log(margin,'margin')
console.log(min,'min ')
console.log(max,'max')


