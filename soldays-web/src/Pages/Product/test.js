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
    arr.forEach((val,index,array)=>{
        var hitung = 0
        console.log(val,index,array)
        array.forEach((value,id,arr)=>{
            console.log(value,'value')
            if(index === id){
                console.log(value,'ni gak di itung',id,index)
            }else {
                hitung += value
                // console.log(hitung,id)
            }
            if(id === arr.length -1){
                arrResult.push(hitung)
                console.log(arrResult)
            }
        })
    })

    var smallest = arrResult[0]
    var biggest = arrResult[0]
    arrResult.forEach((val)=>{
        if(val>biggest){
            biggest = val
        }else if (val < smallest ){
            smallest = val
        }
    })
    console.log('smallest : ',smallest)
    console.log('biggest : ',biggest)

    console.log(smallest, ' ', biggest)

}

var array = [7,69,2,221,8974]

// minMax(array)



const canddleTallest=(arr)=>{

   var mathMax = Math.max(...arr)
       console.log(mathMax,'math max')
       var total_item = 0
       arr.forEach((val)=>{
           // console.log(val)
           if(val === mathMax){
               total_item +=1
           }
       })
       console.log(total_item)
       return total_item

}

var arrnew = [3,3,2,2,5,5,5,5,5,5]
// canddleTallest(arrnew)


const likes=(names)=>{
    console.log(names)
    if(names.length > 1){
        console.log('masuk ke if ')
    }else {
        console.log('masuk ke else')
    }
}
var arr2 = []
// likes(arr2)


const noone=(names)=>{
    var result = ''
  if(names.length > 3){
    var peopleLeft = names.length-2
    result = `${names[0]}, ${names[1]} and  ${peopleLeft} others like this`
  }else if(names.length > 0){
    result = `${names}, like this`
  }else {
    result = 'No one like this'
  }
  console.log(result)
  return result
}

// noone(['peter'])
// noone(['peter','james'])
// noone(['peter','james','bordat'])
// noone(['peter','samue','sanaan','dong'])
// noone(['peter'])


for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 0)
  }

  



  function foo(){
      return 5
  }

  let myVar = foo;

  function primeFactorsTo(max)
  {
      var store  = [], i, j, primes = [];
      for (i = 2; i <= max; ++i) 
      {
          if (!store [i]) 
            {
              primes.push(i);
              for (j = i << 1; j <= max; j += i) 
              {
                  store[j] = true;
              }
          }
      }
      return primes;
  }
  console.log(primeFactorsTo(10));


  let testing2 = [
    [
        [
            {
                Category:'Adhesive',
                allSubCategory:[
                    [
                        {
                            Subcategory:'Sealant'
                        }
                    ],
                    [
                        {
                            Subcategory:'Sealant'
                        }
                    ]
                ]
            }
        ],
        [
            {
                Category:'Adhesive2',
                allSubCategory:[
                    [
                        {
                            Subcategory:'Sealant2'
                        }
                    ],
                    [
                        {
                            Subcategory:'Sealant2'
                        }
                    ]
                ]
            }
        ],
        [
            {
                Category:'Adhesive3',
                allSubCategory:[
                    [
                        {
                            Subcategory:'Sealant3'
                        }
                    ],
                    [
                        {
                            Subcategory:'Sealant3'
                        }
                    ]
                ]
            }
        ]
    ]
]
console.log(testing2)
let find = testing2.forEach((val,index)=>{
    console.log(val)
})