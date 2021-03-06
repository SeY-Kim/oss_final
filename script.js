
var APIKey = "994c1ccdade8cf0a8329d774dc6dafa7";

var cityArr = [];



//function to show saved city button after refresh
function showSavedData() {
    var cityArr = JSON.parse(localStorage.getItem('citylist'));


    for (var i = 0; i < cityArr.length; i++) {
        console.log("cityArr", cityArr);



        // Then dynamicaly generating buttons for each city in the array
        var a = $("<button>").attr({ "class": "list-group-item list-group-item-action", "id": cityArr[i] });

        // Providing the initial button text
        a.text(cityArr[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

        $("#" + cityArr[i]).on("click", function (event) {
            event.preventDefault();

            var cityName = this.id;

            getWeatherToday(cityName, "existing");
            getWeatherForecast(cityName, APIKey);


        });
    }

}

//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {
    event.preventDefault();
    getWeatherTodayButton();
    saveCity();
});


function getWeatherTodayButton() {

    var cityInput = $("#city-input").val();

    getWeatherToday(cityInput, "new");

}

function getWeatherToday(cityInput, callType) {


    //clear for new search result
    $("#weather-result").html("");

    cityArr.push(cityInput);

    // Query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

    var cityLat;
    var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })


        .then(function (response) {


            var currentDate = moment().format('MM/D/YYYY');


            //Create div for weather
            var weatherDiv = $('<div class="weatherdiv">');


            var getIcon = response.weather[0].icon;
            console.log("cek icon", getIcon);

            var iconURL = $('<img>').attr({ "src": "https://openweathermap.org/img/w/" + getIcon + ".png" });


            var city = $("<p>").html("<h3>" + response.name + " (" + currentDate + ")");
            city.append(iconURL);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var tempF = (tempF - 32) / 1.8;

            $('.temp').html(tempF.toFixed() + "Degree");

            //Store the weather data
            var temp = $('<p>').html("Temperature: " + tempF.toFixed() + "&deg" + "C");

            var wind = $('<p>').text("Wind Speed: " + response.wind.speed + " MPH");

            var humidity = $('<p>').text("Humidity: " + response.main.humidity + "%");
            
            //????????? ?????? ?????? ??????
            t = Number(tempF);
            var closet1;
            var closet3;
            if(t<6)
                {closet1 = $('<p>').html("????????? ????????? ?????? ?????????, ?????? ????????? ???????????? ????????? ?????? ?????? ????????? ????????????!????????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/01.png' width='200' height='100' />");}
            else if(6<=t && t<10)
                {closet1 = $('<p>').html("???????????? ?????? ??? ????????????? ????????? ????????????, ??????, ????????? ????????? ?????? ??? ?????? ??? ?????????!????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/02.png' width='200' height='100' />");}
            else if(10<=t && t<12)
                {closet1 = $('<p>').html("????????? ????????? ????????? ?????? ?????? ????????? ?????? ???????????? ?????? ???????????? ???????????? ????????? ?????? ??? ?????????????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/03.png' width='200' height='100' />");}
            else if(12<=t && t<17)
                {closet1 = $('<p>').html("???????????? ?????? ?????? ??????, ?????????, ????????? , ?????????, ????????? ????????? ??? ?????? ??? ?????????><????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/04.png' width='200' height='100' />");}
            else if(17<=t && t<20)
                {closet1 = $('<p>').html("?????? ????????? ?????? ??????, ?????????, ????????? ?????? ??????????????? ???????????? ????????? ????????????><????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/05.png' width='200' height='100' />");}
            else if(20<=t && t<23)
                {closet1 = $('<p>').html("?????? ???????????? ?????? ????????? ?????? ??????????????? ????????? ?????? ???????????? ????????? ????????? ??? ????????? ???????????????????????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/06.png' width='200' height='100' />");}
            else if(23<=t && t<27)
                {closet1 = $('<p>').html("????????????!! ?????????, ?????? ????????? ????????? ?????? ???????????? ???????????? ?????????!????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/07.png' width='200' height='100' />");}
            else if(t >=27)
                {closet1 = $('<p>').html("????????? ????????? ?????? ?????? ??? ??? ????????? ????????? ???????????? !! ?????? ?????? ??? ?????? ?????? ????????? ????????? ???????????????!! ??????, ?????????, ???????????? ?????? ????????? ?????? ?????? ??? ?????????!????");
                closet3 =  $('<p>').html("?????? OOTD ???? "+"<img src='img/08.png' width='200' height='100' />");}

            var closet2;
            if(wind<1)
                closet2 = $('<p>').html("????????? ?????? ?????????! ?????? ????????? ??? ???????????? ??? ??? ?????????!????");
            else if(1<=wind<4)
                closet2 = $('<p>').html("???????????? ?????? ?????????? ?????? ??? ?????? ?????? ????????? ??? ???????????????????");
            else if(4<=wind<8)
                closet2 = $('<p>').html("??????????????? ?????????! ???????????? ??????????????? ????????? ???????????? ????????? ?????? ?????? ??? ?????????!????");
            else if(8<=wind<13)
                closet2 = $('<p>').html("?????? ?????? ??????????????? ?????? ?????? ???????????? ??????????????? ??????????????????????????");
            else if(13<=wind<19)
                closet2 = $('<p>').html("?????? ????????? ?????? ????????? ???????????? ????????? ?????? ?????? ????????? ??? ?????????,,,????");
            else if(19<=wind<25)
                closet2 = $('<p>').html("?????? ????????? ?????? ?????????! ???????????? ??? ?????????????????????!????");
            else if(25<=wind<32)
                closet2 = $('<p>').html("???????????? ?????????! ????????? ????????? ????????? ?????? ????????? ?????????! ????????? ?????? ????????????????");
            else if(wind>=32)
                closet2 = $('<p>').html("?????? ????????? ????????? ??? ???????????? ..! ???????????? ??? ????????? ???????????? ?????????????????? ??????????????? ??????????");
            


            weatherDiv.append(city, temp, wind, humidity);


            $("#weather-result").prepend(city, temp, humidity, wind,closet1,closet2,closet3);



            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            //if button city name already exist
            if (callType == "existing")
                return;

            for (var i = 0; i < city.length; i++) {


                // Then dynamicaly generating buttons for each city in the array
                var a = $("<button>").attr({ "class": "list-group-item list-group-item-action", "id": response.name });

                // Providing the initial button text
                a.text(response.name);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);

                $("#" + response.name).on("click", function (event) {
                    event.preventDefault();

                    var cityName = this.id;

                    saveCity();

                    getWeatherToday(cityName, "existing");


                });
            }

           
        })
}

function saveCity() {
    localStorage.setItem("citylist", JSON.stringify(cityArr));
}


showSavedData();