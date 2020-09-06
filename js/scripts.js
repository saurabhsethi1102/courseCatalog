$(document).ready(function(){
    var today = new Date().getTime;
    const proxy = "https://tranquil-dawn-42121.herokuapp.com/";
    const urlCategories = 'https://frontend-hiring.appspot.com/all_categories';
    const urlCourses = 'https://frontend-hiring.appspot.com/all_courses';
    const url1=proxy + urlCategories;
    const url2=proxy + urlCourses;
    $.ajax({
      url: url1,
      type: 'GET',
      data: {
         secret : 'HelloMars'
      },
      success: function(data) {
        $('#category').empty();
        $('#category').append('<input type="radio" id="all" name="category" value="all" checked>');
        $('#category').append('<label for="all">All</label><br>');  
        var categoryArray=eval(JSON.parse(data)['payload']);
        for (var i=0; i<categoryArray.length; i++){
            $('#category').append('<input type="radio" id="'+categoryArray[i]+'" name="category" value="'+categoryArray[i]+'">');
            $('#category').append('<label for="'+categoryArray[i]+'"> '+categoryArray[i]+'</label><br>');
        }   
      },
    });
    $.ajax({
        url: url2,
        type: 'GET',
        data: {
           secret : 'HelloMars'
        },
        success: function(data) {
            $('#courses').empty();
            var courseArray=eval(JSON.parse(data)['payload']);
            $('#courseArrayLength').text(courseArray.length+' courses open for registration');
            for (var i = 0; i < courseArray.length; i++){
                var courses = '<div class= "card" style = "height: 25rem; width: 22rem ; margin: 10px;">';
                courses += '<div class="card-body">';
                courses += '<h5 class="card-title" id="courseTitle">' + courseArray[i]['title'] + '</h5>';
                courses += '<h6 class="card-subtitle mb-2 text-muted" id="courseInstructor">' + courseArray[i]['instructor_name'] + '</h6>';
                courses += '<div class="row" style="margin-top:50px">';
                courses += '<div class="col-sm-3" style="text-align:center"><i class="fas fa-exclamation-circle"></i></div>';
                courses += '<div class="col-sm-9"><p class="card-text" id="courseDescription">' + courseArray[i]['description'] + '</p></div></div >';
                courses += '<div class="row">';
                courses += '<div class="col-sm-3" style="text-align:center"><i class="far fa-calendar-alt"></i></div>';
                var start_date = new Date(courseArray[i]['start_date']).getTime();
                var end_date = new Date(courseArray[i]['end_date']).getTime();
                if (today< start_date) {
                    courses += '<div class="col-sm-9" id="otherDetails"><p>Pre-registration<br>'+courseArray[i]['start_date']+'-'+courseArray[i]['end_date']+'<br>'+courseArray[i]['estimated_workload']+'</p></div>';
                }
                else if (start_date < today < end_date){
                    courses += '<div class="col-sm-9" id="otherDetails"><p>Ongoing<br>'+courseArray[i]['start_date']+'-'+courseArray[i]['end_date']+'<br>'+courseArray[i]['estimated_workload']+'</p></div>';
                }
                else{
                    courses += '<div class="col-sm-9" id="otherDetails"><p>Completed<br>'+courseArray[i]['start_date']+'-'+courseArray[i]['end_date']+'<br>'+courseArray[i]['estimated_workload']+'</p></div>';
                }
                courses += '</div></div>';
                $('#courses').append(courses);
            }   
        },
     });
});

$('body').on('change', 'input[type=radio][name=category]', function() {
    if (this.value == 'all') {
        alert(this.value);
    }
    else{
        alert(this.value);
    }
});