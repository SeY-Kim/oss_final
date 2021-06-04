
var APIKey = "3d44e735d54eb161a90e34a5ec76979e";

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
    //getWeatherForecastButton(APIKey);
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
            
            //온도에 따른 의상 선택
            t = Number(tempF);
            var closet1;
            if(t<6)
                closet1 = $('<p>').html("오늘은 날씨가 많이 추우니, 겨울 옷이랑 장갑이나 목도리 같은 방한 용품을 챙기세요!🧣🧤");
            else if(6<=t && t<10)
                closet1 = $('<p>').html("히트텍을 입는 건 어떤가요? 코트나 가죽자켓, 니트, 두꺼운 바지를 입는 게 좋을 것 같아요!🧥");
            else if(10<=t && t<12)
                closet1 = $('<p>').html("트렌치 코트나 자켓과 같은 그리 두껍지 않은 아우터를 입고 청바지나 면바지를 입어도 좋을 것 같아요👖");
            else if(12<=t && t<17)
                closet1 = $('<p>').html("청자켓과 같은 얇은 자켓, 가디건, 맨투맨 , 후드티, 니트를 입어도 딱 좋을 것 같아요><🧶");
            else if(17<=t && t<20)
                closet1 = $('<p>').html("얇은 니트나 얇은 자켓, 가디건, 기모가 없는 맨투맨이나 후드티만 입어도 충분해요><👟");
            else if(20<=t && t<23)
                closet1 = $('<p>').html("얇은 긴팔이나 얇은 가디건 또는 블라우스에 슬랙스 같은 면바지를 입어서 오늘은 좀 가볍게 외출해볼까요?🎓🌱");
            else if(23<=t && t<27)
                closet1 = $('<p>').html("시원하게!! 반팔티, 얇은 셔츠에 면바지 또는 반바지로 시원하게 입어요!👕");
            else if(t >=27)
                closet1 = $('<p>').html("가만히 있어도 땀이 줄줄 날 거 같으니 무조건 시원하게 !! 갖고 있는 옷 중에 가장 시원한 옷들로 골라보세요!! 반팔, 반바지, 민소매티 린넨 소재의 옷도 좋을 거 같아요!🩳");

            var closet2;
            if(wind<1)
                closet2 = $('<p>').html("💁바람이 거의 없어요! 오늘 기온에 더 집중해도 될 것 같아요!");
            else if(1<=wind<4)
                closet2 = $('<p>').html("실바람이 부는 오늘🌿 있는 듯 없는 듯한 바람에 더 집중해볼까요?");
            else if(4<=wind<8)
                closet2 = $('<p>').html("남실바람이 부네요! 마스크를 써야하지만 얼굴로 느껴지는 바람이 기분 좋을 것 같아요!😊");
            else if(8<=wind<13)
                closet2 = $('<p>').html("산들 산들 산들바람이 부는 지금 앞머리가 휘날리는데 괜찮으시겠어요?😉");
            else if(13<=wind<19)
                closet2 = $('<p>').html("건들 바람이 불고 있는데 겨드랑이 사이로 손을 넣고 가야할 것 같네요,,,🤨");
            else if(19<=wind<25)
                closet2 = $('<p>').html("흔들 바람이 불고 있어요! 아우터를 꼭 챙겨야겠는데요!💨");
            else if(25<=wind<32)
                closet2 = $('<p>').html("된바람이 불어요! 바람에 따뜻한 날씨도 춥게 느껴질 거예요! 따뜻한 옷을 입으세요😭");
            else if(wind>=32)
                closet2 = $('<p>').html("걷는 거조차 힘들어 질 정도예요 ..! 안전하게 안 나가면 좋겠지만 나가야한다면 완전무장은 필수😱");
            


            weatherDiv.append(city, temp, wind, humidity);


            $("#weather-result").prepend(city, temp, humidity, wind,closet1,closet2);



            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            getUVInd(APIKey, cityLat, cityLon);


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

function getCloset (temp,humidity,wind){
    var closet;
    if(temp<=10)
        closet = $('<p>').text("오늘은 날씨가 많이 추우니, 긴 팔과 긴 바지, 그리고 두꺼운 외투를 꼭 챙겨가세요!");
    else if(temp >10 || temp<=15)
        closet = $('<p>').text("오늘은 조금 쌀쌀할 것 같아요! 두껍지는 않아도 따뜻한 외투를 챙겨야 할 거예요!");
    else if(temp >15 || temp<=20)
        closet = $('<p>').html("오늘은 선선한 날씨일 것 같아요! 가디건과 같은 얇은 외투로 어디서든 적당한 온도를 유지하세요!");
    else if(temp >20 || temp<=25)
        closet = $('<p>').text("오늘은 점점 날이 따뜻해지고 있네요! 얇은 긴팔이나 반팔에 가벼운 아우터를 챙기는 걸 추천할게요!");
    else if(temp >25 || temp<=30)
        closet = $('<p>').text("오늘은 햇빛이 쨍쨍 더워요! 반팔을 입고도 땀이 조금 날 수 있어요!");
    else if(temp >30)
        closet = $('<p>').text("오늘은 완전 더워요! 최대한 가볍게 입고 선크림 바르는 걸 잊지 마세요!");


       return closet;

}

// //Function to get UV Index
// function getUVInd(APIKey, cityLat, cityLon) {

//     var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;



//     $.ajax({
//         url: queryURLUV,
//         method: "GET"
//     })

//         .then(function (response) {

//             console.log(response);

//             //Create div for weather
//             var weatherDiv = $('<div class="weatherdiv">');


//             var uvInd = $('<p>').html("UV Index: " + "<span class='badge badge-danger p-2'>" + response.value + "</span>");

//             weatherDiv.append(uvInd);

//             $("#weather-result").append(uvInd);
//         })
// }

function getWeatherForecastButton(APIKey) {
    var cityInput = $("#city-input").val();
    getWeatherForecast(cityInput, APIKey)
}


function getWeatherForecast(cityInput, APIKey) {

    //clear for new search result
    $("#weather-forecast").html("");


    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURLFor,
        method: "GET",

    })



        // .then(function (response) {


        //     var getForInfo = response.list;


        //     //divide by 8 since API updates weather every 3 hours a day
        //     for (var i = 1; i <= getForInfo.length / 8; i++) {

        //         var getIcon = getForInfo[i * 7].weather[0].icon;

        //         //get epoch time and convert to date
        //         var getForDate = getForInfo[i * 7].dt * 1000;
        //         var getWeatherDate = new Date(getForDate).getDate();
        //         var getWeatherMonth = new Date(getForDate).getMonth();
        //         var getWeatherYear = new Date(getForDate).getFullYear();

        //         var getForTemp = getForInfo[i * 7].main.temp;
        //         var getForHum = getForInfo[i * 7].main.humidity;


        //         //create card body
        //         var cardWeather = $('<div>').attr({ "class": "card bg-info shadow m-4 flex-container" });

        //         var cardBodyWeather = $('<div>').attr({ "class": "card-body" });
        //         var iconURL = $('<img>').attr({ "src": "https://openweathermap.org/img/w/" + getIcon + ".png" });

        //         var weatherForDate = $('<p>').html(getWeatherMonth + "/" + getWeatherDate + "/" + getWeatherYear);


        //         var weatherIcon = $("<p>").append(iconURL);

        //         var weatherForTemp = $('<p>').html("Temperature: " + getForTemp + "&deg" + "F");
        //         var weatherForHum = $('<p>').html("Humidity: " + getForHum + "% <br>");


        //         cardBodyWeather.append(weatherForDate, weatherIcon, weatherForTemp, weatherForHum);

        //         cardWeather.append(cardBodyWeather);
        //         $("#weather-forecast").append(cardWeather);


        //     }


        // })

}



function saveCity() {
    localStorage.setItem("citylist", JSON.stringify(cityArr));
}


showSavedData();