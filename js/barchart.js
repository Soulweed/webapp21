// var theID =  document.getElementsByClassName("buttonnext")[0].id;
var date_input = '05/04/2019';
var date = date_input.split("/");
var date_output = '';
var i;
for (i = date.length-1; i >= 0; i--) {
    date_output += date[i];
    if (i>0){
        date_output += '/';
    }
}
console.log(date_output);
// var x;
// var y;
fetch('https://api.myjson.com/bins/1c3bzk')
    .then((res) => { return res.json() })
    .then((data) => {
    var price = data['price'];
    var price_min = Math.min(...price);
    var price_max = Math.max(...price);
    var price_average = price.reduce((a,b) => a + b, 0) / price.length;
    console.log(price_min);
    console.log(price_max);
    console.log(price_average);

    var fr = [];
    var x = [], y = [];
    var length = price.length;
    var visited = -1;

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

        //Displays the frequency of each element present in array
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
        };
        return dataG
    })
    .then((dataG) => {
        console.log(dataG);


//graph

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
                    beginAtZero: true
                }
            }]
        }
    }
});
})
