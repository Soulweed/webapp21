function doLogin() {
  if (document.getElementById("username").value == "") {
    username.textContent = "please enter the username";
    alert("please enter the username");
    return;
  } else
    document.getElementById("username").value.textContent = "";

  if (document.getElementById("password").value == "") {
    password.textContent = "please enter the password";
    alert("please enter the password");
    return;
  } else
    document.getElementById("password").value.textContent = "";

  jQuery.ajax({

      url: "https://peahub21.azurewebsites.net/api/login/",
      // url: "http://127.0.0.1:8000/api/v2.0/login/",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      data: JSON.stringify({
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
      })
    })
    .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      if (jqXHR.status == 200) {
          console.log(data['type'])
          console.log("gggggggg")
          localStorage.setItem("token", data['token']);
          localStorage.setItem("comp_id", data['comp_id']);
          localStorage.setItem("comp_name", data['comp_name']);
          if(data['type']=='PER' || data['type']=='LGE'){
            window.location.replace("c11search.html")
          }
          else if(data['type'] =='PEA'){
            window.location.replace("p11searchp.html")
          }
      }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
  })
  .always(function() {
      /* ... */
  });
}

function f_forgot() {
// console.log("hello forgot");
// console.log(document.getElementById("emailforgot").value);
jQuery.ajax({
  url: "https://peahub21.azurewebsites.net/api/forgetpassword",
  // url: "http://127.0.0.1:8000/api/v2.0/login/",
  type: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    "email": document.getElementById("emailforgot").value
  })
})
.done(function(data, textStatus, jqXHR) {
  // console.log("HTTP Request Succeeded: " + jqXHR.status);
  // console.log(data);
  if (jqXHR.status == 200) {
      // console.log("Succeeded")
      alert("โปรดตรวจสอบอีเมล์ ระบบได้ส่งรหัสผ่านไปที่อีเมล์แล้ว")
  }  
})
.fail(function(jqXHR, textStatus, errorThrown) {
  // console.log("HTTP Request Failed" + jqXHR.status);
  if (jqXHR.status == 500) {
     alert("โปรดตรวจสอบอีกครั้ง ไม่พบอีเมล์ในระบบ ")
}  
  
})
.always(function() {
  /* ... */
});
}



