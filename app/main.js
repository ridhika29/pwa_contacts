function index(){
    document.getElementById('first').classList.toggle("hide");
    document.getElementById('myData').classList.add("hide");
    

}

function register() {
	var name=document.getElementById('name').value;
	var category=document.getElementById('category').value;
	fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
         body: JSON.stringify({
        name: name,
        category:category,
        
      })
    })
    .then(response => response.json())
    .then(json => {
        document.getElementById('name').value='';
        document.getElementById('category').value='';
        document.getElementById('message').classList.toggle("hide");
        document.getElementById('message').innerHTML=json;
    });
}

function view() {
	fetch('http://localhost:3000/viewlist')
    .then(response => response.json())
    .then(json => 
    	appendData(json))
    .catch(console.log)

    }

      function appendData(data) {
      	document.getElementById('first').classList.add("hide");
            var mainContainer = document.getElementById("myData");
            mainContainer.classList.toggle("hide");
            var table=document.getElementById("mytable")
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
                cell1.innerHTML = data[i].name;
                cell2.innerHTML = data[i].category;
               
            }
        }
    
