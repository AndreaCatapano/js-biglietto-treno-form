const form = document.getElementById("ticketForm");


const priceKm = 0.21;
let discount = 0;
let discountValue = 0;
let fullPrice;
let finalPrice;



form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const inputDistanceToTravel = document.getElementById("km").value;
    const distanceToTravel = parseFloat(inputDistanceToTravel.replace(",", "."));
    const inputUserAge = document.getElementById("age").value;
    const userAge = parseInt(inputUserAge);

    let checkedKm = (km) => {
        if (!isNaN(km)) {
            fullPrice = priceKm * km;
            return fullPrice;
        }
        else if (km === 0) {
            alert(`Il valore ${km} è pari a 0.`);
        }
        else {
            console.log(`Il valore ${km} non è un numero.`);
        }
    };


    let checkedAge = (userAge) => {
        if (!isNaN(userAge)) {
            if (userAge < 18) {
                discount = 20;
                return discount;
            } else if (userAge >= 65) {
                discount = 40;
                return discount;
            }
        } else {
            console.log(`Il valore ${inputUserAge} non è un numero.`);
        }
    };



    const price = checkedKm(distanceToTravel);
    const discountApplied = checkedAge(userAge);

    if ((price && price > 0) && 
       (discountApplied  && discountApplied >= 0)) {

        if (discount !== 0) {
            discountValue = (price * discountApplied) / 100;
        } 
        finalPrice = (price - discountValue).toFixed(2);
        console.log(`Il prezzo finito per questo biglietto è di ${finalPrice}€`);
    } else {
        console.log("Impossibile calcolare il prezzo del biglietto.");
    }
})