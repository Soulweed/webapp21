window.onload = function(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    console.log(queryString);
    var queries = queryString.split("&para");
    var spec_id = queries[0];
    console.log(spec_id);
    var mat_no =  queries[1];
    var mat_desc = queries[2];
    var average_price = queries[3];
    var startdate = queries[4];
    var enddate = queries[5];
    var total_comp = queries[6];

    document.getElementById('spec_id').innerHTML = spec_id;
    document.getElementById("mat_no").innerHTML = mat_no;
    document.getElementById("mat_desc").innerHTML = mat_desc;
    document.getElementById("average").innerHTML = average_price;
    document.getElementById("datepickerstart").innerHTML = startdate;
    document.getElementById("datepickerend").innerHTML = enddate;
    document.getElementById("total_comp").innerHTML = total_comp;
}
