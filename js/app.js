const form = document.getElementById("ticketForm");
const pUserName = document.getElementById("user-name");
const pUserKm = document.getElementById("user-km");
const pUserAge = document.getElementById("user-age");
const pPrice = document.getElementById("price");



const priceKm = 0.21;
let typeOfDiscount = "No Sconto"
let discount = 0;
let discountValue = 0;
let finalPrice;


const city = ["Roma", "Napoli", "Milano", "Firenze"];
const dist = [[0, 220.30, 578.7, 277.1], [220.30, 0, 773.5, 471.9], [578.7, 773.5, 0, 318.6], [277.1, 471.9, 318.6, 0]];


form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputName = document.getElementById("name").value;


    const inputDepartureCity = document.getElementById("departure-city").selectedIndex - 1;
    const inputArrivalCity = document.getElementById("arrival-city").selectedIndex - 1;


    const inputUserAge = document.getElementById("age");


    let checkedKm = (departureCity, arrivalCity) => {
        if (departureCity !== arrivalCity) {
            const distance = dist[departureCity][arrivalCity];
            return priceKm * distance;
        } else {
            console.log("Hai selezionato lo stessa città!");
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



    const price = checkedKm(inputDepartureCity, inputArrivalCity);
    const discountPercentage = checkedAge(inputUserAge);
    const discountValue = (price * discountPercentage) / 100;
    const finalPrice = (price - discountValue).toFixed(2);

    pUserName.textContent = inputName;
    pUserKm.textContent = `${price} Km`;
    pUserAge.textContent = `${typeOfDiscount}`;
    pPrice.textContent = `${finalPrice}€`;


    console.log(`Il prezzo finito per questo biglietto è di ${finalPrice}€`);

    console.log(discount)
})