$('#listlang').hide();
$('#lang').on('click', function(){
    $('#listlang').toggle();
});
$('.lang').on('click', function(e){
  e.preventDefault();
  var lang = $(this).attr('data-h');
  var langURL = 'http://localhost:85/APPNGSYS/langue.php';
  $.ajax({
    type: 'GET',
    data: {'lang':lang},
    url: langURL,
    success:function(response){
      $('#listlang').hide();
      location.href = response;
    }
  });
});