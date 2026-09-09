const prompt = require('prompt-sync')();

// -- Données -- //

const trips = [
  { id: 1, departure: "Safi", destination: "Youssoufia", departureTime: "07:30", arrivalTime: "08:30", price: 25, availableSeats: 50 },
  { id: 2, departure: "Safi", destination: "Marrakech", departureTime: "08:00", arrivalTime: "10:30", price: 90, availableSeats: 50 },
  { id: 3, departure: "Safi", destination: "Casablanca", departureTime: "09:00", arrivalTime: "13:00", price: 140, availableSeats: 50 },
  { id: 4, departure: "Youssoufia", destination: "Marrakech", departureTime: "09:15", arrivalTime: "11:00", price: 65, availableSeats: 50 },
  { id: 5, departure: "Youssoufia", destination: "Casablanca", departureTime: "10:00", arrivalTime: "13:30", price: 110, availableSeats: 50 },
  { id: 6, departure: "Marrakech", destination: "Casablanca", departureTime: "11:30", arrivalTime: "14:30", price: 120, availableSeats: 50 },
  { id: 7, departure: "Marrakech", destination: "Rabat", departureTime: "12:00", arrivalTime: "16:00", price: 150, availableSeats: 50 },
  { id: 8, departure: "Casablanca", destination: "Rabat", departureTime: "14:00", arrivalTime: "15:15", price: 40, availableSeats: 50 },
  { id: 9, departure: "Casablanca", destination: "Kenitra", departureTime: "15:00", arrivalTime: "16:45", price: 55, availableSeats: 50 },
  { id: 10, departure: "Rabat", destination: "Kenitra", departureTime: "16:00", arrivalTime: "16:45", price: 30, availableSeats: 50 },
  { id: 11, departure: "Rabat", destination: "Fes", departureTime: "17:00", arrivalTime: "19:30", price: 95, availableSeats: 50 },
  { id: 12, departure: "Kenitra", destination: "Fes", departureTime: "17:30", arrivalTime: "20:00", price: 85, availableSeats: 50 },
  { id: 13, departure: "Fes", destination: "Meknes", departureTime: "08:30", arrivalTime: "09:20", price: 35, availableSeats: 50 },
  { id: 14, departure: "Fes", destination: "Oujda", departureTime: "10:00", arrivalTime: "13:30", price: 130, availableSeats: 50 },
  { id: 15, departure: "Meknes", destination: "Rabat", departureTime: "11:00", arrivalTime: "13:30", price: 80, availableSeats: 50 },
  { id: 16, departure: "Meknes", destination: "Casablanca", departureTime: "12:00", arrivalTime: "15:00", price: 105, availableSeats: 50 },
  { id: 17, departure: "Casablanca", destination: "El Jadida", departureTime: "16:30", arrivalTime: "18:00", price: 50, availableSeats: 50 },
  { id: 18, departure: "El Jadida", destination: "Safi", departureTime: "18:30", arrivalTime: "20:30", price: 60, availableSeats: 50 },
  { id: 19, departure: "Marrakech", destination: "Agadir", departureTime: "15:00", arrivalTime: "18:30", price: 100, availableSeats: 50 },
  { id: 20, departure: "Agadir", destination: "Safi", departureTime: "19:00", arrivalTime: "22:00", price: 95, availableSeats: 50 },
];
const tickets = [];
let nextTicketId = 1;

// -- Utilité -- //

function printHeader(header){
    console.log(`\n=== ${header} ===\n`); // pour l'utilisation dans chaque action
}
function findTripById(id) {
  return trips.find((t) => t.id === id);
}

// -- Actions (Fonctions) -- //

function afficherTrajets(list = trips) {
  printHeader("TRAJETS DISPONIBLES");
  if (list.length === 0) {
    console.log("Aucun trajet trouvé.");
    return;
  }
  list.forEach((trip) => {
    console.log(`#${trip.id} ${trip.departure} → ${trip.destination}`);
    console.log(`Départ : ${trip.departureTime}`);
    console.log(`Arrivée : ${trip.arrivalTime}`);
    console.log(`Prix : ${trip.price} DH`);
    console.log(`Places disponibles : ${trip.availableSeats}\n`);
  });
}
function acheterTicket() {
  const passengerName = prompt("Nom du passager : ").trim();
  const tripId = parseInt(prompt("Identifiant du trajet : ").trim(), 10);

  const trip = findTripById(tripId);
  if (!trip) {
    console.log("\nTrajet introuvable.");
    return;
  }

  if (trip.availableSeats <= 0) {
    console.log("\nTrain complet.");
    return;
  }

  const seatNumber = (50 - trip.availableSeats) + 1;

  const ticket = {
    id: nextTicketId++,
    passengerName,
    tripId: trip.id,
    seatNumber,
    price: trip.price,
  };

  tickets.push(ticket);
  trip.availableSeats -= 1;

  console.log("\nTicket acheté avec succès.\n");
  console.log(`Ticket #${ticket.id}`);
  console.log(`Passager : ${ticket.passengerName}`);
  console.log(`Trajet : ${trip.departure} → ${trip.destination}`);
  console.log(`Place : ${ticket.seatNumber}`);
  console.log(`Prix : ${ticket.price} DH`);
}
function afficherTickets(list = tickets) {
  printHeader("TICKETS");
  if (list.length === 0) {
    console.log("Aucun ticket enregistré.");
    return;
  }
  list.forEach((ticket) => {
    const trip = findTripById(ticket.tripId);
    const routeLabel = trip ? `${trip.departure} → ${trip.destination}` : "Trajet inconnu";
    console.log(`Ticket #${ticket.id}`);
    console.log(`Passager : ${ticket.passengerName}`);
    console.log(`Trajet : ${routeLabel}`);
    console.log(`Place : ${ticket.seatNumber}`);
    console.log(`Prix : ${ticket.price} DH\n`);
  });
}
function annulerTicket() {
  const ticketId = parseInt(prompt("Identifiant du ticket : ").trim(), 10);

  const ticketIndex = tickets.findIndex((t) => t.id === ticketId);
  if (ticketIndex === -1) {
    console.log("\nTicket introuvable.");
    return;
  }

  const ticket = tickets[ticketIndex];
  const trip = findTripById(ticket.tripId);

  tickets.splice(ticketIndex, 1);

  trip.availableSeats++;

  console.log("\nTicket annulé avec succès.");
}
function rechercherTicket() {
  const passengerName = prompt("Nom du passager : ").trim();
  const results = tickets.filter(
    (t) => t.passengerName.toLowerCase() === passengerName.toLowerCase()
  );

  if (results.length === 0) {
    console.log("\nAucun ticket trouvé pour ce passager.");
    return;
  }

  afficherTickets(results);
}

// -- Menu Principale -- //

function afficherMenu(){
    console.log("\n=================================\n        RAILWAY MANAGER\n=================================\n\n1. Afficher les trajets\n2. Acheter un ticket\n3. Afficher les tickets\n4. Annuler un ticket\n5. Rechercher un ticket\n6. Filtrer les trajets\n7. Trier les trajets\n0. Quitter\n\n");
}
function main(){
    let running = true;

    while(running){
        afficherMenu();
        const choice = prompt("Votre choix : ").trim(); // trim pour effacer les espaces vides du prompt
        
        switch(choice){
            case "1":
                afficherTrajets();
                break;
            case "2":
                acheterTicket();
                break;
            case "3":
                afficherTickets();
                break;
            case "4":
                annulerTicket();
                break;
            case "5":
                rechercherTicket();
                break;
            case "0":
                console.log("\nAu revoir !");
                running = false;
                break;
            default:
                console.log("\nChoix invalide, veuillez réessayer.");
        }
    }
}
main();