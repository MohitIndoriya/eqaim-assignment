const express=require("express")
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors());

function add(num1,num2){
  let l1 = num1.length;
  let l2 = num2.length;
  let carryString = ["_"]
  let sumString = []
  
  let arr=[]
  let carry = 0;
  let total = 0;
  let i=0;
  while (l1 != 0 || l2 != 0) {
    let x = 0;
    let y = 0;
    if (l1 > 0) {
      x = +num1[l1 - 1]
      l1--
    }
    if (l2 > 0) {
      y = +num2[l2 - 1]
      l2--;
    }
    let sum = x + y + carry;
    if (sum >= 10) {
      carry = Math.floor(sum / 10);
      carryString.unshift(carry)
      total = sum % 10;
      sumString.unshift(total)
      
      
      if (l1 == 0 && l2 == 0 && carry != 0) {
        sumString.unshift(carry);
        carry=0;
       
      }
    } else {
      sumString.unshift(sum);
      
      
      carry = 0;
      carryString.unshift(carry)
    }
    let obj1 = { carryString:carryString.join(""), sumString:sumString.join("") }
    
    arr.push(obj1)
  }
  return arr
}

app.post("/",(req,res)=>{
    try{
      let {num1,num2}=req.body;
    num1=num1.toString()
    num2=num2.toString()
   let ans=add(num1,num2)

    res.status(201).send(ans)
    }
    catch(e){
      res.status(400).send(e)
    }
})




app.listen(8080,()=>{
    console.log("server listning on port 8080")
})