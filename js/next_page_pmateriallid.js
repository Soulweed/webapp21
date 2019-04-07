function next_page(){
    var spec_id = document.getElementById("spec_id").textContent;
    console.log(spec_id);
    var mat_no = document.getElementById("mat_no").textContent;
    var mat_desc = document.getElementById("mat_desc").textContent;
    var average_price = document.getElementById("average").textContent;
    var startdate = document.getElementById("datepickerstart").value;
    console.log(startdate);
    var enddate = document.getElementById("datepickerend").value;
    var total_comp = document.getElementById("total_comp").textContent;
    console.log(total_comp);
    total_comp = total_comp.split("TOTAL COMPANIES : ");
    console.log(total_comp);

    var queryString = "?" + spec_id + "&para" + mat_no + "&para" + mat_desc + "&para" + average_price + "&para" + startdate + "&para" + enddate + "&para" + total_comp[1];
    console.log(queryString);
    window.location.href = "p11final.html" + queryString;
}

