window.onload = function(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    console.log(queryString);
    var queries = queryString.split("&para");
    console.log(queries);
    var spec_id = queries[0];
    console.log(spec_id);
    var mat_no =  queries[1];
    var mat_desc = queries[2];
    var unit_price = queries[3];
    var min_vol = queries[4];
    var send_date = queries[5];
    var send_time = queries[6];

    document.getElementById('spec_id').innerHTML = spec_id;
    document.getElementById("mat_no").innerHTML = mat_no;
    document.getElementById("mat_desc").innerHTML = mat_desc;
    document.getElementById("unit_price").innerHTML = unit_price;
    document.getElementById("min_vol").innerHTML = min_vol;
    document.getElementById("send_date").innerHTML = send_date;
    document.getElementById("send_time").innerHTML = send_time;
}
