function f_validate(val){ // เช็คตัวเลข
    if (document.getElementById("dropdown").value == "mat_id"){
        if (event.keyCode < 45 || event.keyCode > 57) {
            alert("กรุณาป้อนตัวเลขค่ะ");
            event.returnValue = false;
            val.focus();
            }

    } else{

            val.focus();
    }
       
}

function f_senddata(){
    var search_by = document.getElementById("dropdown").value;
    var search_text = document.getElementById("condition_str").value;
    console.log(search_text.length);
    if (document.getElementById("dropdown").value == "spec_id"){

        if (search_text.length  <= 10){
            
        }else {
            alert("โปรดตรวจสอบ การค้นหาต้องมีจำนวน 10 ตัว");
            return;
        }
    }else if (document.getElementById("dropdown").value == "mat_no"){
        if (search_text.length <= 10){
            
        }else {
            alert("โปรดตรวจสอบ การค้นหาต้องเป็นตัวเลขจำนวน 10 ตัว");
            return;
        }

    }

    if (search_text == "" ) {
        alert("โปรดตรวจสอบข้อมูลการค้นหาอีกครั้ง");
        document.getElementById("condition_str").value.textContent = "";
        return;
    } else {
        var queryString = "?" + search_by + "&para" + search_text;
        window.location.href = "p11specidp.html" + queryString;
        console.log(queryString);
      }
}

   

   