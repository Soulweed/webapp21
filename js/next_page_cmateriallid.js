function next_page(){
    var spec_id = document.getElementById("spec_id").textContent;
    console.log(spec_id);
    var mat_no = document.getElementById("mat_no").textContent;
    var mat_desc = document.getElementById("mat_desc").textContent;
    var unit_price = document.getElementById("textPriceUnit").value;
    var min_vol = document.getElementById("textVolume").value;
    var send_date_def = new Date();
    var send_date = getdateformat(send_date_def);
    var send_time = gettimeformat(send_date_def)

    var queryString = "?" + spec_id + "&para" + mat_no + "&para" + mat_desc + "&para" + unit_price + "&para" + min_vol + "&para" + send_date + "&para" + send_time;
    console.log(queryString);
    window.location.href = "c11finalcopy.html" + queryString;
}

function getdateformat(date){
    var date2 = date.toString();
    var date2_split = date2.split(' ');
    var month = date2_split[1];
    var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month_string = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (i in month_array){
      if(month==month_array[i]) {
          var dateformat = date2_split[3]+"/"+month_string[i]+"/"+date2_split[2];
          return dateformat;
  
      }
    }
}

function gettimeformat(date){
    var date2 = date.toString();
    var date2_split = date2.split(' ');
    var time = date2_split[4];
    return time;
}

