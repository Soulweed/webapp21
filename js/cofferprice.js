// $(function() {
//
//   $(document).ready(function() {
//     $('#mat_document').on('change', function(evt) {
//       // console.log(this.files[0]);
//       // console.log("-----------------------------");
//       // console.log(this.files[0].size);
//
//       var filename = this.files[0].name;
//       // console.log(this.files[0].name);
//
//       var filesize = (this.files[0].size)/(1024*1024);
//       // console.log(filesize);
//
//       if (this.files[0].size >= 2*1024*1024) {
//         alert("PDF file of maximum 2MB. Please try again.");
//       }
//
//       localStorage.setItem('filename-json', JSON.stringify(filename));
//       localStorage.setItem('filesize-json', JSON.stringify(filesize));
//
//     });
//   });
//
//   $('form').on('pdfform').on('submit', function(e) {
//     // console.log("Hello");
//     // TODO creat table row for price detail
//     e.preventDefault();
//
//     var reader = new FileReader(),
//       file = $('#mat_document')[0];
//
//     if (!file.files.length) {
//       alert('no file uploaded');
//       return false;
//     }
//
//     reader.onload = function() {
//
//       document.getElementById("offer_result").style.visibility = "initial";
//
//       var matprice = document.getElementById("textPriceUnit").value;
//       var matvol = document.getElementById("textVolume").value;
//
//       if (matprice == "") {
//         alert("Please enter the material unit price.");
//         return;
//       }
//
//       if (matvol == "") {
//         alert("Please enter minimun of material offer value.");
//         return;
//       }
//
//       var data = reader.result,
//         base64 = data.replace(/^[^,]*,/, ''),
//         info = {
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,POST"
//           },
//           contentType: "application/json",
//           data: JSON.stringify({
//             "quo_upload_file": base64,
//             "price"          : matprice,
//             "min_vol"        : matvol,
//             "mat_no"         : "1050010054",
//             "comp_id"        : "12"
//           })
//         };
//       // console.log(info);
//       // console.log("--------------------------------");
//       localStorage.setItem('localinfo', JSON.stringify(info));
//       localStorage.setItem('matprice-json', JSON.stringify(matprice));
//       localStorage.setItem('matvol-json', JSON.stringify(matvol));
//
//       var filenamejson = localStorage.getItem('filename-json');
//       // console.log(filenamejson);
//       var filename = JSON.parse(filenamejson);
//       // console.log(filename);
//
//       // var filesizejson = localStorage.getItem('filesize-json');
//       // var fileSize = JSON.parse(filesizejson);
//       // console.log(fileSize);
//       typeof fileSize;
//       var filesize = fileSize.toFixed(2);
//
//       //TODO -> Insert selected PDF file:
//       let html_result = '';
//       let grey_table = '<div class=\"resulttable\">';
//       let div_end = '</div>';
//       let pdflogo = '<img class=\"pdflogo\" anima-src="./img/c-1-1-material-id---price-pdfcolor.png" src="./img/c-1-1-material-id---price-pdfcolor.png">';
//       let titlename = '<div class=\"myidpdf\">';
//       let pdftitle = '<div class=\"pdftitle\"> PDF </div>';
//       let sizeUnit = '<div class=\"pdfUnitsize\"> MB </div>';
//       let pdfsize = '<div class=\"pdfsize\">';
//       let uploadedtitle = '<div class=\"uploadedtitle\"> UPLOADED </div>';
//       let deleteButtun = '<img onclick="deletePDF()" anima-src="./img/c-1-1-material-id---price-icdeleteoutline24px@2x.png" class=\"icdeleteoutline24px1\" src="./img/c-1-1-material-id---price-icdeleteoutline24px@2x.png">';
//
//       html_result += grey_table + pdflogo + (titlename + filename + div_end) + (pdftitle) + (pdfsize + filesize + div_end + sizeUnit) + uploadedtitle + deleteButtun + div_end;
//       document.getElementById('offer_result').innerHTML = html_result;
//     };
//     reader.readAsDataURL(file.files[0]);
//   });
// });
var base64updte = "";


function convertToBase64() {
  console.log('inprogress')
  //Read File
  var selectedFile = document.getElementById("mat_document").files;
  if (selectedFile.length > 0) {
    // RUN A LOOP TO CHECK EACH SELECTED FILE.
    for (var i = 0; i <= selectedFile.length - 1; i++) {

      var fsize = selectedFile.item(i).size; // THE SIZE OF THE FILE.
      document.getElementById('fp').textContent = (fsize/1000).toFixed(2) + ' KB';

    }
  }
  //Check File is not Empty
  if (selectedFile.length > 0) {
    // Select the very first file from list
    var fileToLoad = selectedFile[0];
    // FileReader function for read the file.
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      var fields = base64.split(',');
      base64updte = fields[1];
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);

  } else {
    alert("Please attach qaotation.");
  }
}

function confirmoffer() {
  console.log('clickcomplete');
  // console.log(base64updte);
  if (document.getElementById("textPriceUnit").value == "") {
    alert("Please enter the material unit price.");
    return;
  }

  if (document.getElementById("textVolume").value == "") {
    alert("Please enter minimun of material offer value.");
    return;
  }
  // convertToBase64();
  console.log(base64updte);

  jQuery.ajax({
    url: "https://peahub21.azurewebsites.net/api/v2.0/offer/",
    // url: "https://peahub21.azurewebsites.net/api/v2.0/offer/",
    // url: "http://192.168.43.175:8000/api/ball/testpdf/",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },


    data: JSON.stringify({

      "comp_id": "14",
      "price" : document.getElementById("textPriceUnit").value,
      "quo_upload_file" : base64updte,
      "min_vol" : document.getElementById("textVolume").value,
      "mat_no" : document.getElementById("mat_no").textContent
    })
  })
    .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      alert("Document uploaded successfully.");
      // deletePDF();
    })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      alert("Document uploaded failed!!!.");
  })
  .always(function() {
      /* ... */
  });
  deletePDF();
  base64updte = "";
  document.getElementById('fp').textContent = '';



}

function deletePDF() {
  console.log("Helloooooooooooo~~~~~~~");
  document.getElementById("offer_result").disabled = true;
  document.getElementById("offer_result").style.visibility = "hidden";
  document.getElementById('pdfform').reset();
  return;
}

function offer_next_page() {
  window.location.href = "c11finalcopy2.html"; //+ queryString
}

// TODO
function get_response_offer(data) {

  // collect variable to var before save to localStorage
  var spec_id = obj['spec_id'];
  var mat_no = obj['mat_no'];
  var mat_desc = obj['mat_desc'];
  var price = obj['price'];
  var minvalue = obj['min'];
  var url = obj['url'];
  var timestamp = obj['date'];
  // TODO store data to localStorage
  var theID = document.getElementsByClassName("buttonnext")[0].id;
  var index = theID.split("_");
  var i = index[1];
  var search_result = localStorage.getItem("search_result");
  var search_result_json = JSON.parse(search_result);
  var mat_no = search_result_json[i].mat_no;
  var spec_id = search_result_json[i].spec_id;
  var mat_desc = search_result_json[i].mat_desc;
  var url = search_result_json[i].url;
  var queryString = "?" + spec_id + "&para=" + mat_no + "&para=" + mat_desc + "&para=" + url;
  console.log(queryString);
}
