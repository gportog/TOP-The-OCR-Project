$(':file').change(function(){
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;
    if (file.name.length < 1) {
        // optional complaint?
    }
    else if (file.size > 28116350) {
        alert("File is to big");
    }
    else if (file.type != 'image/png' && file.type != 'image/jpg'
             && !file.type != 'image/gif'
             && file.type != 'image/jpeg' ) {
        alert("File must be png, jpg, or gif");
    }
});


$("#convert").click(function (e) {
    e.preventDefault();
    var oData = new FormData(document.forms.namedItem("add_ocr")); 
    $("#output").html('Loading...');  
    $.ajax({ //ajax form submit
        url : "/v1/convert/ocr",
        type: "POST",
        data : oData,
        dataType : "json",
        contentType: false,
        cache: false,
        processData:false,
        complete: function (res) {
          if (res.status == 200)
            $("#output").html(res.responseText);
          else
            alert('ERROR: ', res.responseText);                     
      }
    });
  });