const express = require('express');

const port = 8000;

const app = express()

app.set("view engine","ejs");

app.use(express.urlencoded())

let userData = [
    {
        id : 29,
        name:"pallak",
        email:"pallak@gmail.com",
        mobile:7573901456,
        password:1234
    },
    {
        id : 7,
        name:"arzu",
        email:"arzu@gmail.com",
        mobile:7553901456,
        password:845
    },
    {
        id : 3,
        name:"pratiksha",
        email:"pratiksha@gmail.com",
        mobile:755390165,
        password:8252
    }
]
app.post('/insertData',(req,res)=>{
    let obj = {
        id : req.body.id,
        name : req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    }
    userData.push(obj);
    return res.redirect('back');

});


app.get('/',(req,res)=>{
  return res.render('form',{
    user : userData
});
});

// delete data

app.get('/deleteData',(req,res)=>{
    let id = req.query.id
    let data = userData.filter((val)=>{
        return val.id != id
    });
    userData = data;
    return res.redirect('back');
});

app.get('/editData',(req,res)=>{
    let id = req.query.id;
    let data = userData.filter((val)=>{
        return val.id == id;
    });
    
    return res.render('edit',{
        user:data[0]
    })
})


// edit data

app.post('/editData',(req,res)=>{
    let editId = req.body.editId;
    let data = userData.filter((curData)=>{
        if(curData.id == editId){
            curData.name = req.body.name;
            curData.email = req.body.email;
            curData.password = req.body.password;
            curData.mobile = req.body.mobile;
        }
        return curData;
    });
    userData = data;
    console.log("Daata Updated");
    return res.redirect('/')
})


app.listen(port,(err)=>{
    if(err){
        console.log("not start")
        return false;
    }
    console.log("http://localhost:"+ port)
}) 