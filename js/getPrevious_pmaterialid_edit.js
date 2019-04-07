
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&para");
var spec_id = queries[0];
var mat_no = queries[1];
var mat_desc = queries[2];
var url = queries[3];
var startdate_def = new Date();
startdate_def.setDate(startdate_def.getDate() - 30);
var enddate_def = new Date();
var startdateformat = getdateformat(startdate_def);
var enddateformat = getdateformat(enddate_def);
postData(mat_no,startdateformat,enddateformat);

window.onload= function() {
            reload();
  function reload(){
  //var mat_no = "100002321";
  // var spec_id = 'RE-233444';
  // var mat_desc = '50 kVA, three-phase transformer, permanently sealed and completely oil filled system (without gas cushion) type, withstand short-circuit, 22,000-416/240V, symbol Dyn11.';


  document.getElementById("spec_id").innerHTML = "SPEC ID&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: "+spec_id;
  document.getElementById("mat_no").innerHTML = "Material ID: "+mat_no;
  document.getElementById("mat_desc").innerHTML = mat_desc;


};
}

function postData(mat_no,startdateformat,enddateformat){
    jQuery.ajax({
        url: "https://peahub21.azurewebsites.net/api/v2.0/report/",
        // url: "http://127.0.0.1:8080/api/v2.0/report/",
        //https://hookbin.com/kx6xKbGgjXhepeoxWojw

        type: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        contentType: "application/json",
        data: JSON.stringify(
            {
                "mat_no": mat_no,
                "start_date": startdateformat ,
                "end_date": enddateformat
            })
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data); //Return Data
        if (jqXHR.status == 200) {
           console.log(data)
            var obj = data['result'];
            console.log(obj);
            var comp_name = obj['comp_name'];
            var price = obj['price'];
            var min = obj['min'];
            var date = obj['date'];
            var comp_tel = obj['comp_tel'];
            var url = obj['url'];

            var price_min = Math.min(...price);
            var price_max = Math.max(...price);
            var price_average = price.reduce((a,b) => a + b, 0) / price.length;
            document.getElementById("minnimum").innerHTML = price_min;
            document.getElementById("maximun").innerHTML = price_max;
            document.getElementById("average").innerHTML = price_average;
            document.getElementById("total_comp").innerHTML = 'TOTAL COMPANIES : ' + price.length;
            console.log(price_max);
            console.log(price_average);
      //////////////////////////Datatable/////////////////
            const list = [];
            //var i;
            for ( var i= 0; i < price.length; i++) {
              list[i] = [comp_name[i] , price[i] , min[i] , date[i] , comp_tel[i] ,"<a href=\"./media/"+url[i]+"\"><button class=\"btn btn-primary\">Next</button></a>"];
            }
            console.log(list);
            $(document).ready(function() {
                $('#example').DataTable({
                    retrieve: true,
                    paging: false,
                    data: list,
                    columns: [
                        { title: "Lender/Name/ID" },
                        { title: "Price/Unit" },
                        { title: "Price/Volume" },
                        { title: "Date" },
                        { title: "Contact Number" },
                        { title: "See Detail" }
                    ]
                }); ///console.log(text);
            } );

      /////////////////////Graph//////////////////
            var fr = [];
            var x = [], y = [];
            var length = price.length;
            var visited = -1;
            var y_max = price_max+1;

                for(var i = 0; i < length; i++){
                    var count = 1;
                    for(var j = i+1; j < length; j++){
                        if(price[i] == price[j]){
                            count++;
                            //To avoid counting same element again
                            fr[j] = visited;
                        }
                    }
                    if(fr[i] != visited)
                        fr[i] = count;
                }
                for(var i = 0; i < fr.length; i++){
                    if(fr[i] != visited)
                        x[i] = price[i].toString();
                        y[i] = fr[i]
                }
                console.log(x);
                console.log(y);
                dataG = {
                    X:x,
                    Y:y
                }
                
                    console.log(dataG);
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: dataG.X,
                            datasets: [{
                                label: '# PRICE CHART',
                                data: dataG.Y,
                                backgroundColor:'rgba(39, 99, 219, 1.0)',
                                borderColor: 'rgba(39, 99, 132, 1.0)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        stepSize: 1,
                                        beginAtZero: true,
                                    }
                                }]
                            }
                        }
                    });

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
//////////////////////////////////////////////

///////////////////////////////////////////////
//var obj = JSON.parse(txt);
// fetch('https://api.myjson.com/bins/6o3ng')
//     .then((res) => { return res.json() })
//     .then((data) => {
//
// })


function Send(){
  console.log("Send()");
   var startDate = document.getElementById("datepickerstart").value;
   var startdate = startDate.split("/");
   var date_output = '';
   var i;
   for (i = startdate.length-1; i >= 0; i--) {
       date_output += startdate[i];
       if (i>0){
           date_output += '/';
       }
   }
   console.log(date_output);

   var endDate = document.getElementById("datepickerend").value;
   var enddate = endDate.split("/");
   var dateend_output = '';
   var j;
   for (j = enddate.length-1; j >= 0; j--) {
       dateend_output += enddate[j];
       if (j>0){
           dateend_output += '/';
       }
   }
   console.log(dateend_output);
   postData(mat_no,date_output,dateend_output);
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