window.onload = function(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&para");
    var spec_id = queries[0];
    var mat_no = queries[1];
    var mat_desc = queries[2];
    var url = queries[3];

    document.getElementById("spec_id").innerHTML = "SPEC ID&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: "+spec_id;
    document.getElementById("mat_no").innerHTML = "Material ID: "+mat_no;
    document.getElementById("mat_desc").innerHTML = mat_desc;
}
