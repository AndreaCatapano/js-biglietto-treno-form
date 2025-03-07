const ticket = document.getElementById("ticket");
const form = document.getElementById("form-ticket")
const ticketError = document.getElementById("error");

const priceKm = 0.21;
let typeOfTicket;
let discount = 0;
let discountValue = 0;
let finalPrice;


const city = ["Roma", "Napoli", "Milano", "Firenze"];
const dist = [[0, 220.30, 578.7, 277.1], [220.30, 0, 773.5, 471.9], [578.7, 773.5, 0, 318.6], [277.1, 471.9, 318.6, 0]];


form.addEventListener("submit", function (event) {
    event.preventDefault();


    const inputName = document.getElementById("name").value;
    const inputUserAge = document.getElementById("age");
    const inputDepartureCity = document.getElementById("departure-city").selectedIndex - 1;
    const inputArrivalCity = document.getElementById("arrival-city").selectedIndex - 1;


    let checkedKm = (departureCity, arrivalCity) => {
        if (departureCity !== arrivalCity) {
            const distance = dist[departureCity][arrivalCity];
            return priceKm * distance;
        }
        };


    let checkedAge = (inputUserAge) => {
        let discount = 0;

        switch (inputUserAge.value) {
            case "1":
                discount = 20;
                typeOfTicket = "Biglietto Studenti"
                break;
            case "3":
                discount = 40;
                typeOfTicket = "Biglietto Silver Travel Pass"
                break;
            default:
                discount = 0;
                typeOfTicket = "Biglietto Standard"
        }
        return discount;
    };

    const price = checkedKm(inputDepartureCity, inputArrivalCity);
    const discountPercentage = checkedAge(inputUserAge);
    const discountValue = (price * discountPercentage) / 100;
    const finalPrice = (price - discountValue).toFixed(2);

    if (!isNaN(finalPrice)) {

        ticketError.classList.replace("d-block", "d-none")
        ticket.classList.replace("d-none", "d-block")
        let pUserName = document.getElementById("user-name");
        pUserName.textContent = inputName;
        let pUserKm = document.getElementById("user-km");
        pUserKm.textContent = `${city[inputDepartureCity]}-${city[inputArrivalCity]}`;
        let pUserAge = document.getElementById("user-age");
        pUserAge.textContent = `${typeOfTicket}`;
        let pPrice = document.getElementById("price");
        pPrice.textContent = `${finalPrice}€`;
        serialCodeSring = serialCodeGenerator(lookForInitials(city, inputDepartureCity, inputArrivalCity))
        let serialCode = document.getElementById("serialcode");
        serialCode.textContent = `${serialCodeSring}`;

    } else {
        let isValidInputDepartureCity = inputDepartureCity >= 0 && inputDepartureCity <= 3
        let isValidInputArrivalCity = inputArrivalCity >= 0 && inputArrivalCity <= 3

        if (!isValidInputDepartureCity || !isValidInputArrivalCity){
            ticketError.textContent = "Impossibile generare il biglietto, non hai inserito tutti i campi!"
        } else {
            ticketError.textContent = "Impossibile generare il biglietto, hai selezionato lo stessa città!"
        }
        ticketError.classList.replace("d-none", "d-block")
    }
})


const lookForInitials = (arr, departureCity, arrivalCity) => {
    const initials = [];

    if (departureCity >= 0 && departureCity < arr.length) {
        initials.push(arr[departureCity][0], arr[departureCity][1]); // Prima e seconda lettera della città di partenza
    }
    if (arrivalCity >= 0 && arrivalCity < arr.length) {
        initials.push(arr[arrivalCity][0], arr[arrivalCity][1]); // Prima e seconda lettera della città di arrivo
    }

    console.log(initials);
    return initials;
}

function randomNumberTo1At9 () {
    return parseInt(Math.random() * (9 - 1) + 1);
}

function serialCodeGenerator (arr){
    const serialCode = ["0", "0", "0", "0", "0", "0","0","0","0","0","0","0"]
    for (let i = 0; i < arr.length; i++){
        serialCode[i] = arr[i].toUpperCase();
    }

    for (let i = 4; i < serialCode.length; i++){
        const randomNumber = randomNumberTo1At9();
        serialCode[i] = randomNumber;
    }

    return serialCodeString = serialCode.join("");
}


