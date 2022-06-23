const express = require("express");
const app = express();
const mysql = require('mysql2');

app.listen(3000, () => {
    console.log("Listening to port 3000");
});

app.use(express.static("sf"));

let dbparams = {
    host: 'localhost',
    user: 'root',
    password: '5133',
    database: 'rahulmulik'
}

const conn = mysql.createConnection(dbparams);
// conn.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log("Conncetion succefull")
//     }
// });
//get details
//request
///output
app.get("/getdetails", (req, resp) => {
    console.log("inside details");
    let bookid = req.query.bookid;
    console.log(bookid);

    console.log("connected");

    let output = { status: false, bookdetails:{ bookid:0, bookname:"", price:0}
}

    conn.query('select * from book where bookid=?',[bookid],
     (error, rows) => {
    if (error) {
        console.log("Something went wrong");
    }
    else {
        if (rows.lenght > 0) {
            output.status = true;
            output.bookdetails = rows[0];
        }
        else {
            console.log("Book not found")
        }
    }
    resp.send(output);
});
});    


app.get("/update",(req,resp)=>{
    console.log("in database")


    let bookdetails={
        bookid:req.query.booid,
        bookname:req.query.bookname,
        price:req.query.price,
    }

    let output={status:false}


    conn.query('update book set bookid=?, bookname=?,price=?',[bookdetails.bookid,bookdetails.bookname,bookdetails.price],
    (error,res)=>{
        if(error){
            console.log(error);
        }
        else{
            if(res.affectedRows>0){
                console.log("Updation succesful");
                output.status=true;
            }
            else{
                console.log("updation fail")
            }
        }
        resp.send(output);
    });
});