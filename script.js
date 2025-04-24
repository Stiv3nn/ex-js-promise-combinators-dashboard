// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"
// Esempio di utilizzo
// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));
// Esempio di output atteso
// // Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// ​
// // Output in console
// London is in United Kingdom. 
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.

// .then(res => res.json()); questo è quello sotto
async function fetchJson(url){
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}


async function getDashboardData(query){


    try{
        console.log(`Caricando la dashboard per la query "${query}"`);
        const destinationsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const weatherPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);
    
        const promises = [destinationsPromise, weatherPromise, airportsPromise];
        const [destinations, weathers, airports] = await Promise.all(promises);
    
        // console.log([destinations, weathers, airports]);
    
        return{
            city: destinations[0].name,
            country: destinations[0].country,
            temperature: weathers[0].temperature,
            weather: weathers[0].weather_description,
            airport: airports[0].name
        }
    
        // USIAMO LA DESTRUTTURAZONE PER NON USARE IL RESULT
        // const destinations = result[0];
        // const weathers = result[1];
        // const airports = result[2];
    }catch(error){
        throw new Error(`Errore nel recupero dei dati: ${error.message}`);
    }

}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));;