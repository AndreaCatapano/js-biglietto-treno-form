const form = document.getElementById("ticketForm");
const pUserName = document.getElementById("user-name");
const pUserKm = document.getElementById("user-km");
const pUserAge = document.getElementById("user-age");
const pPrice = document.getElementById("price");




const priceKm = 0.21;
let typeOfDiscount = "No Sconto"
let discount = 0;
let discountValue = 0;
let fullPrice;
let finalPrice;


form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputName = document.getElementById("name").value;
    const inputDistanceToTravel = document.getElementById("km").value;
    const distanceToTravel = parseFloat(inputDistanceToTravel.replace(",", "."));
    const inputUserAge = document.getElementById("age");


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


    let checkedAge = (inputUserAge) => {
        let discount = 0;

        switch (inputUserAge.value) {
            case "1":
                discount = 20;
                typeOfDiscount = "Sconto Studenti"
                break;
            case "3":
                discount = 40;
                typeOfDiscount = "Silver Travel Pass"
                break;
            default:
                discount = 0;
        }

        return discount;
    };



    const price = checkedKm(distanceToTravel);
    const discountPercentage = checkedAge(inputUserAge);
    const discountValue = (price * discountPercentage) / 100;
    const finalPrice = (price - discountValue).toFixed(2);

    pUserName.textContent = inputName;
    pUserKm.textContent = `${inputDistanceToTravel} Km`;
    pUserAge.textContent = `${typeOfDiscount}`;
    pPrice.textContent = `${finalPrice}€`;


    console.log(`Il prezzo finito per questo biglietto è di ${finalPrice}€`);

    console.log(discount)
})