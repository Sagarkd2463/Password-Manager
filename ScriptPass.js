function maskPassword(pass) { //hiding password using asterisk 
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }

    return str;
}

function copyText(txt) { //copying password 
    navigator.clipboard.writeText(txt).then(
        () => {
            // clipboard successfully set 
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            // clipboard write failed
            alert("Clipboard copying failed");
        },
    );
}

const deletePassword = (website) => { //using local storage to delete a password 
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website;
    });

    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Sucessfully deleted ${website}'s password`);
    showPasswords();
}

const showPasswords = () => {
    //logic to fill the table
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) { //if data is null or the table is empty then no data is available 
        tb.innerHTML = "No Data to Show!";
    } else {  //adding required details into table 
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr> `

        let arr = JSON.parse(data);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
                //creating table with all the details 
            str += `<tr>    
        <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
    </tr>`
        }
        tb.innerHTML = tb.innerHTML + str;
    }

    website.value = "";
    username.value = "";
    password.value = "";
}

showPasswords();
 
document.querySelector(".btn").addEventListener("click", (e) => { //an event listener to pass passwords into local storage 
    e.preventDefault();
   
    let passwords = localStorage.getItem("passwords");

    if(passwords == null) { // if null then push all details in an empty array of object
        let json = [];
        json.push({
            website: website.value,
            username: username.value,
            password: password.value
        }); 
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    } else { //fetching details from local storage and pushing into an json object 
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({ 
            website: website.value, 
            username: username.value, 
            password: password.value 
        });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPasswords(); 
});