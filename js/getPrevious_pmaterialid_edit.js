
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
    document.getElementById("spec_id").innerHTML = "SPEC ID&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: "+spec_id;
    document.getElementById("mat_no").innerHTML = "Material ID: "+mat_no;
    document.getElementById("mat_desc").innerHTML = mat_desc;
    document.getElementById("datepickerstart").value = getdateformat_input(startdate_def);
    document.getElementById("datepickerend").value = getdateformat_input(enddate_def);
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
            if (price.length == 0){

                document.getElementById("minnimum").innerHTML = 0;
                document.getElementById("maximun").innerHTML = 0;
                document.getElementById("average").innerHTML = 0;
                document.getElementById("total_comp").innerHTML = 'TOTAL COMPANIES : ' + price.length;

                plotdata([0],[0]);

            }else {

                if (price_min>=1000000){
                  val_price_min = (price_min/1000000).toFixed(2) + 'M';
                }
                else if (price_min>=1000) {
                  val_price_min = (price_min/1000).toFixed(2) + 'K';
                }
                else {
                  val_price_min = price_min;
                }

                if (price_max>=1000000){
                  val_price_max = (price_max/1000000).toFixed(2) + 'M';
                }
                else if (price_max>=1000) {
                  val_price_max = (price_max/1000).toFixed(2) + 'K';
                }
                else {
                  val_price_max = price_max;
                }

                if (Math.floor(price_average)>=1000000){
                  val_price_avg = (Math.floor(price_average)/1000000).toFixed(2) + 'M';
                }
                else if (Math.floor(price_average)>=1000) {
                  val_price_avg = (Math.floor(price_average)/1000).toFixed(2) + 'K';
                }
                else {
                  val_price_avg = Math.floor(price_average);
                }
                document.getElementById("minnimum").innerHTML = val_price_min;
                document.getElementById("maximun").innerHTML = val_price_max;
                document.getElementById("average").innerHTML = val_price_avg;
                document.getElementById("total_comp").innerHTML = 'TOTAL COMPANIES : ' + price.length;

            console.log(price_max);
            console.log(price_average);
      //////////////////////////Datatable/////////////////
            var t_body = $('#showresult').DataTable({
              "retrieve": true,
              "paging": false,
              "info": false,
              columns: [
                  { title: "Company Name" },
                  { title: "Price/Unit" },
                  { title: "Price/Volume" },
                  { title: "Date" },
                  { title: "Contact Number" },
                  { title: "More Detail" }
              ]
            });
            t_body
                .clear()
                .draw();
            var list = [];
            // //var i;
            for ( var j= 0; j < price.length; j++) {

                list[j] = [comp_name[j] , price[j] , min[j] , date[j] , comp_tel[j], "<a href=\"" +url[j]+ "\"><buttom>Next</buttom></a>" ];
                t_body.row.add( [
                    comp_name[j],
                    price[j],
                    min[j],
                    date[j],
                    comp_tel[j],
                    "<a href=\"" +url[j]+ "\"><buttom>Next</buttom></a>"
                ] ).draw( false );
                //list[j] = [comp_name[j]];
                }

    //         var list = [
    // [ "Tiger Nixon", "System Architect", "Edinburgh", 5421, "2011/04/25", 320.800 ],
    // [ "Garrett Winters", "Accountant", "Tokyo", 8422, "2011/07/25", 170.750 ],
    // [ "Ashton Cox", "Junior Technical Author", "San Francisco", 1562, "2009/01/12", 86.000 ],
    // [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", 6224, "2012/03/29", 433.060 ],
    // [ "Airi Satou", "Accountant", "Tokyo", 5407, "2008/11/28", 162.700 ],
    // [ "Brielle Williamson", "Integration Specialist", "New York", 4804, "2012/12/02", 372.000 ]
    //   ];
            console.log(list);
            // $(document).ready(function() {
            // $('#showresult').DataTable( {
            //     data: list,
            //     "retrieve": true,
            //     "paging": false,
            //     "info": false,
            //     columns: [
            //         { title: "Company Name" },
            //         { title: "Price/Unit" },
            //         { title: "Price/Volume" },
            //         { title: "Date" },
            //         { title: "Contact Number" },
            //         { title: "More Detail" }
            //     ]
            // } );

        // } );


      /////////////////////Graph//////////////////
            // var fr = [];
            var x = [], y = [];

            const maxRange = price_max;
            var min = Number.MAX_VALUE;
            const dict ={};
            price.forEach(function(num) {

                min = Math.min(min, num); // find min
                if (num > maxRange) {
                    num = maxRange + 1;
                }
                dict[num] = dict[num] ? dict[num] + 1 : 1;
                });

                console.log("Num | Count");

                // Print the occurrences per item in array starting from min to max
                while (min <= maxRange + 1) {
                if (!dict[min]) { // print only those numbers which are defined in dictionary
                    min++;
                    continue;
                }
                var xArr = []
                var range = dict[min];
                for (i = 0; i < range; i++) {
                    xArr.push('x');
                //   console.log(xArr);
                //   console.log(range);
                }

                // console.log(i);
                // console.log(min);
                x.push(min);
                y.push(i);

                var disp = (min <= maxRange) ? (min + "   | " + xArr.join("")) : (maxRange + "+  | " + xArr.join(""));
                // console.log(disp);
                min = min + 1;

                }
            console.log(x);
            console.log(y);

            plotdata(x,y);



            console.log("Query")

            };


        };



    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");

    })

    .always(function() {
        /* ... */
    });
}
var myChart;
function plotdata (x, y){

    dataG = {
        X:x,
        Y:y
    }
    // ------ //
        console.log(dataG);
        var ctx = document.getElementById('myChart').getContext('2d');

        myChart = new Chart(ctx, {
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
   myChart.destroy();
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

function getdateformat_input(date){
    var date2 = date.toString();
    var date2_split = date2.split(' ');
    var month = date2_split[1];
    var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month_string = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (i in month_array){
      if(month==month_array[i]) {
          var dateformat = date2_split[2]+"/"+month_string[i]+"/"+date2_split[3];
          return dateformat;

      }
    }
  }
