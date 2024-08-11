const button = document.querySelector("#search");
const place = document.querySelector("#enter");
//editing info
const loc = document.querySelector("#name");
const time = document.querySelector("#time");
const temp = document.querySelector("#temp");
//our api code
async function getdata(cityName){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=045252fdf1914601a07101306241108&q=${cityName}&aqi=yes`);
    return (await promise.json());
}
async function displayData(){
    const city = place.value;
    const result = await getdata(city);
    console.log(result);
    if (result.error)
    {
        loc.innerText="ERROR";
        time.innerText=`${result.error.code}`;
        temp.innerText=`${result.error.message}`;
    }
    else{
        loc.innerText=(`${result.location.name}, ${result.location.region}, ${result.location.country}`);
        time.innerText=`${result.location.localtime}`;
        temp.innerText=`${result.current.temp_c}°C, ${result.current.condition.text}`;
    }
    
}
place.addEventListener("keydown",(event)=>{
    if (event.key==='Enter')
        displayData();
})
button.addEventListener("click",displayData);
// http://api.weatherapi.com/v1/current.json?key=045252fdf1914601a07101306241108&q=London&aqi=yes
