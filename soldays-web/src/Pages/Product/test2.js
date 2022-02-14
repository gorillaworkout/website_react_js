
var result = []

const add=(name)=>{

  if(result.length> 0 ){
    console.log('result ada isi')
    var findIndex = result.findIndex((val)=>{

      return val === name
    })
    if(findIndex === -1){
      result.push(name)
    }else {
      console.log('product sudah ada')
    }
  }else {
    result.push(name)
  }
  console.log(result)
  return result

}

const remove=(name)=>{
  
  if(result.length > 0){
    console.log('result ada isi')
    var findIndex = result.findIndex((val)=>{
      return val === name
    })
    if(findIndex === -1){
      console.log('gaada yang diapus')
    }else {
      result.splice(findIndex,1)
    }
  }else {
    console.log('result gaada isi')
  }
  console.log(result,'final remove')
  return result
}

const getList=()=>{
  console.log(result)
  return result
}
// add('baju')
// add('celana')
// add('jacket')
// remove('baju')
// getList()


// let angka = [1,3,2,5,6,3,2,3,5,7]

const reverseAngka=(angka)=>{

  // var resultFinal = []
  //   for(var i = angka.length-1; i >= 0; i--) {
  //       resultFinal.push(angka[i]);
  //   }
  //   console.log(angka)
  //   console.log(resultFinal)
  //   return resultFinal;;

  var resultFinal = angka.reverse().join(',')
  console.log(resultFinal)
}

// reverseAngka(angka)
let angka = [1,3,2,5,6,3,2,3]

const sortFreq=(angka)=>{

  var sort = angka.sort()
  console.log(sort)
  var result =[]

  sort.forEach((val)=>{

  })
}

sortFreq(angka)



const test=(lo,hi,k)=>{

  
  var low =  Math.min(...lo)
  var max = Math.max(...hi)
  console.log(low)
  
  

}

test([1,2,3,43,],[3,2,1,23,2,1],[23,32,2,1,3])


let array2 = ['DKI JAKARTA','JAKARTA BARAT','KELAPA DUA','KEBON JERUK','11550']

array2.splice(1,3)
console.log(array2)
