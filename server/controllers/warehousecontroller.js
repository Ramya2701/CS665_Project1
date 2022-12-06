const mysql=require("mysql");

const con = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'warehousedb',
  multipleStatements: true
});
exports.view=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select productid,agentid,products.product_name,agent_name,price,manfactured_date,rating,address from products join agents on products.product_name=agents.product_name",(err,rows)=>{
      connection.release();
      if(!err){
        res.render("page1",{rows});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
    
  });
 
};

exports.cart=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from cart",(err,rows)=>{
      connection.release();
      if(!err){
        res.render("viewCart",{rows});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
    
  });
 
}; 
exports.addCart=(req,res)=>{
  const obj = JSON.parse(JSON.stringify(req.body));
  con.getConnection((err,connection)=>{
    if(err) throw err
    let accountid=obj.accountid;
    console.log(accountid);
    connection.query("select productid,agentid,products.product_name,agent_name,price,manfactured_date,rating,address from products join agents on products.product_name=agents.product_name",(err,rows)=>{
      connection.release();
      if(!err){
        res.render("addCart",{rows});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
  });

}


exports.save1 =(req,res)=>{

  const obj = JSON.parse(JSON.stringify(req.body));
  con.getConnection((err,connection)=>{
    if(err) throw err
 
    let productId=obj.productid;
    let agentid = obj.agentid;
    let productName = obj.productname;
    let accountid=obj.accountid;
    

    connection.query("insert into cart (productname,productid,agentid,quantity,accountid) values (?,?,?,1,?)",[productName,productId,agentid,1,accountid],(err,rows)=>{
      connection.release();
      if(!err){
        res.render("addCart",{msg:"Product Details Added Success"});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
  });
}

exports.pOrder=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("SELECT * FROM  cart WHERE  delivery_date < date_sub(current_date(),interval 0 day)",(err,rows)=>{
      connection.release();
      if(!err){
        res.render("previousOrder",{rows});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
    
  });
 
}
exports.edituser1=(req,res)=>{
  res.render("edituser");
}
 
exports.edituser=(req,res)=>{
 
  con.getConnection((err,connection)=>{
let username=req.params.username;
    if(err) throw err
    connection.query("select * from customers where username=?",[username],(err,rows)=>{
      connection.release();
      if(!err){
        res.render("edituser",{rows});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
  });
 
}
 
exports.edit=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    let username=req.params.username;
    let password=req.params.password;
 
    connection.query("update customers set username=?,password=?",[username,password],(err,rows)=>{
      connection.release();
      if(!err){
 
 
  con.getConnection((err,connection)=>{
    if(err) throw err
    let username=req.params.username;
 
    connection.query("select * from customers where username=?",[username],(err,rows)=>{
      connection.release();
      if(!err){
        res.render("edituser",{rows,msg:"User Details Updated Success"});
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
  });
      }else{
        console.log("Error in Listing Data "+err);
      }
 
    });
  });
}
 
 
 
exports.delete=(req,res)=>{
  con.getConnection((err,connection)=>{
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    if(err) throw err
    //Get ID from url
    let id=obj.productid;
    let agentid=obj.agentid;
    connection.query("delete from cart where productid=? and agentid=?",[id,agentid],(err,rows)=>{
      connection.release();
      if(!err) {
      }else{
        console.log(err);
      }
 
    });
 
  });
};

exports.login=(req,res)=>{

        res.render("login1");	

};
exports.signup=(req,res)=>{
  res.render("signup");
}
exports.signup1=(req,res)=>{
  let firstname=req.body.firstname;
	let lastname=req.body.lastname;
	let username = req.body.username;
	let password = req.body.password;
	if (firstname && lastname && username && password) {
		connection.query('insert into customers (firstname,lastname,username,password) values(?,?,?,?)', [firstname,lastname,username, password], function(error, results, fields) {
			if (error) throw error;
      return res.render("signup");
			
		});

  res.render("login");
}
};
exports.homepage=(req,res)=>{
  con.getConnection((error,connection)=>{
    const obj = JSON.parse(JSON.stringify(req.body));
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      connection.query('SELECT customerid FROM customers WHERE username = ? AND password = ?', [username, password], function(error, results) {
        if (error) throw error;
        if (results.length > 0) {
          res.render('homepage',{results});

        } else {
          res.send('Incorrect Username and/or Password!');
        }        
      });
    }
    else{
     res.render("signup")

};
    });
};
