window.onload = function ()
{
  console.log("getlocation")
  getLocation();
  console.log(position.coords.latitude,position.coords.position.coords.longitude);
}
function doRegister(){
  // Name
  if (document.getElementById("textUsermane").value == "") {
    alert("please enter the email.");
    return;
  } else
    document.getElementById("textUsermane").value.textContent = "";

  // if (document.getElementById("textEMail").value == "") {
  //   alert("please enter the contact email.");
  //   return;
  // } else
  //   document.getElementById("textEMail").value.textContent = "";

  if (document.getElementById("textPassword").value == "") {
    alert("please enter password.");
    return;
  } else
    document.getElementById("textPassword").value.textContent = "";

  if (document.getElementById("textConfirmPassword").value == "") {
    alert("please enter confirm password.");
    return;
  } else
    document.getElementById("textConfirmPassword").value.textContent = "";

  if (document.getElementById("textPassword").value != document.getElementById("textConfirmPassword").value) {
    alert("Password and Confirm-password is not match!!!");
    return;
  } else
    document.getElementById("textConfirmPassword").value.textContent = "";

  var vender_status = document.getElementById("exampleFormControlSelect1").value;
  console.log(vender_status)
  // var vender_name;

  // if (vender_status == ) {
  //   // document.getElementById("CompNameid-input").value = "personal-vender";
  //   // vender_name = document.getElementById("CompNameid-input").value;
  //   vender_name = "PER";
  //   vender_status = document.getElementById("exampleFormControlSelect1").value;
  //   return;
  // } else
  //   // vender_status = document.getElementById("exampleFormControlSelect1").value;
  //   // vender_name = document.getElementById("CompNameid-input").value;
  //   vender_name = "LGE";


  if (document.getElementById("textName").value == "") {
    alert("please enter name.");
    return;
  } else
    document.getElementById("textName").value.textContent = "";

  if (document.getElementById("textLastname").value == "") {
    alert("please enter lastname.");
    return;
  } else
    document.getElementById("textLastname").value.textContent = "";

  // if (vender_status == "") {
  //   alert("please enter your company name.");
  //   return;
  // } else
  //   vender_status = "";

  if (document.getElementById("idortax").value == "") {
    alert("please enter your ID card number or Tax number.");
    return;
  } else
    document.getElementById("idortax").value.textContent = "";

  if (document.getElementById("phonenumberinput").value == "") {
    alert("please enter your telephone number.");
    return;
  } else
    document.getElementById("phonenumberinput").value.textContent = "";

  if (document.getElementById("egpid").value == "") {
    // alert("please enter your EGP id.");
    // return;
    document.getElementById("egpid").value.textContent = "";
  } else
     document.getElementById("egpid").value.textContent = "";

  if (document.getElementById("textcompanyaddress").value == "") {
    alert("please enter your address.");
    return;
  } else
    document.getElementById("textcompanyaddress").value.textContent = "";

    // console.log(document.getElementById("exampleFormControlSelect1").value)
    var lon_select = document.getElementById("lon").value;
    var lat_select = document.getElementById("lat").value

    if (typeof(lon_select)!='number' || typeof(lat_select)!='number')
    {
      alert('Please select your location');
    }


  jQuery.ajax({


      url: "https://peahub21.azurewebsites.net/api/signup/",
      // url: "https://hookb.in/3OynwLEapdhKeKj2MjmJ",


      type: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: JSON.stringify({

        "username" : document.getElementById("textUsermane").value,
        "password" : document.getElementById("textPassword").value,
        "confirmation_password": document.getElementById("textConfirmPassword").value,
        "email" : document.getElementById("textUsermane").value,
        "comp_type" : document.getElementById("exampleFormControlSelect1").value,
        "firstname": document.getElementById("textName").value,
        "lastname": document.getElementById("textLastname").value,
        "comp_name" : document.getElementById("CompNameid-input").value,
        "comp_address": document.getElementById("textcompanyaddress").value,
        "tax_id": document.getElementById("idortax").value,
        "mobile": document.getElementById("phonenumberinput").value,
        "comp_EGP_id": document.getElementById("egpid").value,
        "address": document.getElementById("textcompanyaddress").value,
        "location_lon": document.getElementById("lon").value,
        "location_lat": document.getElementById("lat").value,
        // "location_lon": "14.567",
        // "location_lat": "33.567",
        "comp_url" : "-",
        "comp_tel" : document.getElementById("phonenumberinput").value

      })

    })
    // console.log(data)

    .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data); //Return Data
      if (jqXHR.status == 200) {

      //   // TODO: Check condition Comp_type
      //   // if Comp_type == 1 || Comp_type == 2
      //   //window.location = "p11searchp.html"
      //   // else if (Comp_type == 3) {
      //   //window.location = "p11searchp.html"
      //   // }

      //   //window.location = "p11searchp.html"

       window.location.replace("./login.html")

      };
      
    })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
    // window.location.replace("./login.html")

  })
  .always(function() {
    /* ... */
  });

}

function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

function set_mail(){
  var emails = document.getElementById("textUsermane").value;
  document.getElementById("textUsermane").style.color = "green";
  document.getElementById("textUsermane").style.backgroundColor = "white";
  console.log(emails);
}
function Email_editcheck() {
  var emails = document.getElementById("textUsermane").value;
  var check_result = validateEmail(emails);
  if(check_result){
    set_mail();
  }
}

function Email_check() {
  var emails = document.getElementById("textUsermane").value;
  var check_result = validateEmail(emails);
  if(check_result){
    set_mail();
  }
  else {
    document.getElementById("textUsermane").style.backgroundColor = "yellow";
    alert("Email invalid");
    console.log(check_result);
  }
}

function Password_comp(){
  var pass_set = document.getElementById("textPassword").value;
  var pass_confirm = document.getElementById("textConfirmPassword").value;
  if(pass_set==""){
    alert("Please enter your password");
    document.getElementById("textPassword").style.backgroundColor = "yellow";
  }
  else{
    document.getElementById("textPassword").style.backgroundColor = "white";
    if(pass_set == pass_confirm){
      console.log("match");
      document.getElementById("textConfirmPassword").style.backgroundColor = "white";
      document.getElementById("textPassword").style.color = "green";
      document.getElementById("textConfirmPassword").style.color = "green";
    }
    else {
      alert("Password and Confirm-password is not match!!!");
      document.getElementById("textConfirmPassword").style.backgroundColor = "yellow";
    }
  }
}

function Name_check(){
  var name_get = document.getElementById("textName").value;
  if(name_get==""){
    alert("Please enter your name");
    document.getElementById("textName").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("textName").style.backgroundColor = "white";
    document.getElementById("textName").style.color = "green";
  }
}

function Lastname_check(){
  var name_get = document.getElementById("textLastname").value;
  if(name_get==""){
    alert("Please enter your lastname");
    document.getElementById("textLastname").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("textLastname").style.backgroundColor = "white";
    document.getElementById("textLastname").style.color = "green";
  }
}

function Company_check(){
  var name_get = document.getElementById("CompNameid-input").value;
  if(name_get==""){
    alert("Please enter your company");
    document.getElementById("CompNameid-input").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("CompNameid-input").style.backgroundColor = "white";
    document.getElementById("CompNameid-input").style.color = "green";
  }
}

function IdTax_check(){
  var name_get = document.getElementById("idortax").value;
  if(name_get==""){
    alert("Please enter your ID card / Tax ID ");
    document.getElementById("idortax").style.backgroundColor = "yellow";
  }
  else {
    if(name_get.length >= 10 && name_get.length <= 13){
      document.getElementById("idortax").style.backgroundColor = "white";
      document.getElementById("idortax").style.color = "green";
    }
    else{
      alert("ID card or Tax ID invalid");
      document.getElementById("idortax").style.backgroundColor = "yellow";
    }
  }
}

function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  return phoneno.test(inputtxt);
}

function Tel_check(){
  var name_get = document.getElementById("phonenumberinput").value;
  if(name_get==""){
    alert("Please enter your phonenumber");
    document.getElementById("phonenumberinput").style.backgroundColor = "yellow";
  }
  else {
    var tel_syntax = phonenumber(name_get);
    if(tel_syntax){
      document.getElementById("phonenumberinput").style.backgroundColor = "white";
      document.getElementById("phonenumberinput").style.color = "green";
    }
    else{
      alert("phonenumber invalid");
      document.getElementById("phonenumberinput").style.backgroundColor = "yellow";
    }
  }
}

function EGP_check(){
  var name_get = document.getElementById("egpid").value;
  if(name_get==""){
    alert("Please enter your EGP ID");
    document.getElementById("egpid").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("egpid").style.backgroundColor = "white";
    document.getElementById("egpid").style.color = "green";
  }
}

function selectFunction() {
  var x = document.getElementById("exampleFormControlSelect1").value;
  if (x == "Personal") {
    document.getElementById("textcompanyaddress").disabled = true;
    document.getElementById("CompNameid-input").style.visibility = "hidden";
  } else {
    document.getElementById("textcompanyaddress").disabled = false;
    document.getElementById("CompNameid-input").style.visibility = "visible";
    return;
  }
}

