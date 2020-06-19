var express    = require('express');
var cors = require('cors');
var app        = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

 
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


var connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'zr8opp68yl1m@localhost',
  password : 'G1+QGX%uRk(&*',
  database : 'nerdydev'

});

connection.connect();



app.post('/register', function(req, res){
	console.log(req.body);
    var name=req.body.name;
    var category=req.body.category;
    connection.query("INSERT INTO `user` (name,category) VALUES (?,?)", [name.toString(),category.toString()],
     err => {
        if(err) throw err;
            console.log("1 record inserted");
        });
    res.json("Registered");
});

app.get('/viewlist',function(req,res){
	
	getUsers(function (err, Result){ 
       //you might want to do something is err is not null...      
       res.json(Result);
   });
})

function getUsers(callback) {    
        connection.query("SELECT * FROM `user`",
            function (err, rows) {
                //here we return the results of the query
                callback(err, rows); 
            }
        );    
}
app.listen(3000, function () {
console.log('Example app listening on port 3000');
});
