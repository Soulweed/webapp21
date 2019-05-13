var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&para");
var search_by = queries[0];
var search_text = queries[1];
postData(search_by, search_text);
localStorage.setItem("search_by", search_by);
localStorage.setItem("search_text", search_text);


function postData(sort, text){
    let search_by = sort;
    let search_text = text;
    var token = "Token " + localStorage.getItem("token");
    jQuery.ajax({

       url: "https://peahub21.azurewebsites.net/api/search/",

    //    url : "https://hookb.in/ggd1pb80KLsB0B1y81OG",
       type: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,

        },
        contentType: "application/json",
        data: JSON.stringify(
            {
                "search_by": search_by,
                "search_text": search_text,
                "token": localStorage.getItem("token")
            })
    })

    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data); //Return Data
        if (jqXHR.status == 200) {
            console.log(data)

            console.log(data['result'])
            // window.localStorage.setItem('datasearch',JSON.stringify(data));
            var obj = data['result'];
            var data_json = JSON.stringify(obj);
            localStorage.setItem("search_result", data_json);
            var i;
            let html_result = '';
            let div_end = '</div>';
            let grey_table = '<div class=\"linegreykeyword\">';
            let white_table = '<div class=\"linewhitekeyword\">';
            let tablecontainer = '<div class=\"tablelinecontainer\"></div>';
            let statutencours = '<div class=\"statutencours\">';
            let statutencours1 = '<div class=\"statutencours1\">';
            let tablecelcopy = '<div class=\"tablecelcopy\">';
            let tablecelcopy1 = '<div class=\"tablecelcopy1\">';
            let background = '<div class=\"background\"></div>';
            let fond = '<div class=\"fond\"></div>';
            let lable = '<div class=\"label\">';
            let lable_mat = '<div class=\"label\">';
            let button = '<button type=\"button\"';
            let button_class = 'class=\"buttonnext button:hover\"';
            let onclick = 'onclick=\"next_page(this.id)\">';
            let next = '<div class=\"next\">NEXT</div></botton>' + div_end;
            let id = '';

            for (i in obj){
                if (i%2==0){
                    html_result += grey_table + tablecontainer;
                }
                else{
                    html_result += white_table + tablecontainer;
                }
                id = 'id=\"next_' + i + '\"';
                html_result += statutencours1 + fond + lable + obj[i].spec_id + div_end + div_end;
                html_result += statutencours + fond + lable_mat + obj[i].mat_no + div_end + div_end;
                html_result += tablecelcopy + background + tablecelcopy1 + lable + obj[i].mat_desc + div_end + div_end + div_end;
                html_result += button + button_class + id + onclick + next;
            }
            document.getElementById('search_result').innerHTML = html_result;




            //document.getElementById("loader").style.display = "none";
            //window.location = "p11searchp.html"
            //window.location.replace( "/p11searchp.html" )
            console.log("Query")
        };
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");

    })
    .always(function() {
        /* ... */
    });
}
