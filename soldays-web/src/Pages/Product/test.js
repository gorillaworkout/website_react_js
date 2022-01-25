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
// console.log(margin,'margin')
// console.log(min,'min ')
// console.log(max,'max')




function plusMinus(arr) {
    // Write your code here
    var positif = 0
    var negatif = 0
    var zero = 0
    
    arr.forEach((val,index,array)=>{
        if(val> 0){
            positif +=1
        }else if(val < 0){
            negatif +=1
        }else if ( val === 0){
            console.log('masuk ke zero')
            zero += 1
        }
    })
    positif = (positif/arr.length).toFixed(6)
    negatif = (negatif/arr.length).toFixed(6)
    zero = (zero/arr.length).toFixed(6)
    console.log(arr.length,'arr length')
    console.log(positif,negatif,zero)
    return console.log(positif+ '\n' + negatif+ '\n' + zero)
}
var arr = [3,3,0,-1,-1,2]
// plusMinus(arr)


const staircase=()=>{

    // var n = 5; // row or column count
    // // defining an empty string
    // let string = "";

    // for(let i = 0; i < n; i++) { // external loop
    // for(let j = 0; j < n; j++) { // internal loop
    //     string += "*";
    // }
    // // newline after each row
    // string += "\n";
    // }
    // // printing the string
    // console.log(string);

    let n = 5;
    let string = "";
    for (let i = 1; i <= n; i++) {
      // printing spaces
      for (let j = 0; j < n - i; j++) {
        string += " ";
      }
      // printing star
      for (let k = 0; k < i; k++) {
        string += "*";
      }
      string += "\n";
    }
    console.log(string);

}



// staircase()


const minMax=(arr)=>{
    console.log(arr)
    var arrResult  = []
    var hitung = 0
    arr.forEach((val,index,array)=>{
        // console.log(val,index,array)
        array.forEach((value,id)=>{
            console.log(value,'value')
            if(index === id){
                console.log(value,'ni gak di itung',id,index)
            }else {
                hitung += value
                console.log(hitung,id)
            }
        })
    })

}

var array = [1,2,3,4,5]

minMax(array)