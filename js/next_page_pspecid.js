function next_page(obj){
    var theID =  obj;
    var index = theID.split("_");
    var i = index[1];
    var search_result = localStorage.getItem("search_result");
    var search_result_json = JSON.parse(search_result);
    var mat_no = search_result_json[i].mat_no;
    var spec_id = search_result_json[i].spec_id;
    var mat_desc = search_result_json[i].mat_desc;
    var url = search_result_json[i].url;

    var queryString = "?" + spec_id + "&para" + mat_no + "&para" + mat_desc + "&para" + url;
    console.log(queryString);
    window.location.href = "p11MaterialIdCopy4.html" + queryString;
}

