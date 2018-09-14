
const apiKey = 'INSERT API KEY HERE';
const baseAPIUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

$(function () {
  afterGoClicked();
  var button = $("#button")
  button.click(afterGoClicked)
})

$(function () {
  var query = $("#query")
  query.change(afterGoClicked)
})

function afterGoClicked() {
  var genre = $("#genre").val()
  var year = $("#year").val()
  var completeURL = buildQueryString(baseAPIUrl, genre, year)
  $.getJSON(completeURL,afterDataLoaded)
}

function buildQueryString(baseUrl, genre, year){
  if (genre === "All"){return baseUrl + "&primary_release_year="+year}
  else{return baseUrl + "&with_genres="+genre + "&primary_release_year="+year}
}

function afterDataLoaded(dataObject){
  var posterBaseUrl = "https://image.tmdb.org/t/p/w500"

  for (i = 0; i < 9; i++){
    var image = $("#movieImg"+i)
    var posterPath = dataObject.results[i].poster_path
    var websiteLink = dataObject.results[i].id
    image.attr("src", posterBaseUrl + posterPath);
    image.attr("alt", websiteLink);
  }

  $('#iframe').attr("src","https://www.themoviedb.org/movie/"+$("#movieImg0").attr("alt"))

  for(let i = 0; i < 9; i++) {
    $('#movieImg' + i).click(function(){
      $('a').attr('href','https://www.themoviedb.org/movie/' + $("#movieImg"+i).attr("alt"))
      //$('#iframe').attr("src","https://www.themoviedb.org/movie/"+$("#movieImg"+i).attr("alt"));
    });
  }

  for (let j = 0; j < 9; j++){
    var time;
    $("#movieImg"+j).mouseenter(function(){
      clearTimeout(time);
      $("#movieImg"+j).attr("style","transition: transform .25s ease;transform: scale(1.2);box-shadow: -1px 0 0 1px red, 0 1px 0 1px red, 1px 0 0 1px red, 0 -1px 0 1px red;");
      for (i = 0; i < j; i++){
        $("#movieImg"+i).attr("style","transform: translate3d(-20px, 0, 0);transition: transform .25s ease,opacity .5s ease;opacity: .3");
      }
      for (i = j+1; i < 9; i++){
        $("#movieImg"+i).attr("style","transform: translate3d(20px, 0, 0);transition: transform .25s ease,opacity .5s ease;opacity: .3");
      }
    })
    $("#movieImg"+j).mouseleave(function(){
      time = setTimeout(function(){
        for (i = 0; i < 9; i++){
          $("#movieImg"+i).attr("style","transform: translate3d(0, 0, 0);transition: transform .25s ease,opacity .5s ease;opacity:1");
        }
      },250);
    })
  }
}
