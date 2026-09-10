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
const tickets = [
  {id:1,passengerName:"Ahmed",tripId:1,seatNumber:1,price:25},
  {id:2,passengerName:"Bashir",tripId:1,seatNumber:2,price:25},
  {id:3,passengerName:"Coumir",tripId:1,seatNumber:3,price:25},
  {id:4,passengerName:"Doha",tripId:2,seatNumber:1,price:90},
  {id:5,passengerName:"Eliyas",tripId:3,seatNumber:1,price:140},
  {id:6,passengerName:"Farid",tripId:4,seatNumber:1,price:65},
  {id:7,passengerName:"Ghali",tripId:5,seatNumber:1,price:110},
  {id:8,passengerName:"Hamid",tripId:6,seatNumber:1,price:120},
  {id:9,passengerName:"Ismail",tripId:7,seatNumber:1,price:150},
  {id:10,passengerName:"Jad",tripId:9,seatNumber:1,price:55},
];

// -- Utilité -- //

trips.forEach((trip) => {
  trip.occupiedSeats = [];
});

tickets.forEach((ticket) => {
  const trip = findTripById(ticket.tripId);
  if (trip) {
    trip.occupiedSeats.push(ticket.seatNumber);
    trip.availableSeats -= 1;
  }
});

let nextTicketId = tickets.length > 0 // On calcule le prochain id de ticket à partir du plus grand id existant
  ? Math.max(...tickets.map(t => t.id)) + 1 
  : 1;

function printHeader(header){
    console.log(`\n=== ${header} ===\n`); // pour l'utilisation dans chaque action
}
function findTripById(id) {
  return trips.find((t) => t.id === id);
}

function getNextSeatNumber(trip) { // Cherche la première place libre pour un trajet donné.
  let seat = 1;
  while (trip.occupiedSeats.includes(seat)) {
    seat++;
  }
  return seat;
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

  if (passengerName === "") {
    console.log("\nLe nom du passager ne peut pas être vide.");
    return;
  }
  
  const trip = findTripById(tripId);
  if (!trip) {
    console.log("\nTrajet introuvable.");
    return;
  }

  if (trip.availableSeats <= 0) {
    console.log("\nTrain complet.");
    return;
  }

  const seatNumber = getNextSeatNumber(trip);

  const ticket = {
    id: nextTicketId++,
    passengerName,
    tripId: trip.id,
    seatNumber,
    price: trip.price,
  };

  tickets.push(ticket);
  trip.occupiedSeats.push(seatNumber); // On note les places qui ne sont pas vides
  trip.availableSeats -= 1; // On diminue la quantité des places vides

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

  const ticketIndex = tickets.findIndex((t) => t.id === ticketId); // On trouve l'index du ticket, selon l'index donné par l'user
  if (ticketIndex === -1) {
    console.log("\nTicket introuvable.");
    return;
  }

  const ticket = tickets[ticketIndex]; // On trouve le ticket selon l'index
  const trip = findTripById(ticket.tripId); // On trouve le trip selon le ticket

  // On retire le ticket du tableau
  tickets.splice(ticketIndex, 1);

  // pour qu'elle puisse être réattribuée par getNextSeatNumber().
  if (trip) {
    trip.availableSeats += 1; // On augmente le nombre de places vides
    trip.occupiedSeats = trip.occupiedSeats.filter((seat) => seat !== ticket.seatNumber); // Et cela pour que la place annulée soit disponible pour un autre passager
  }

  console.log("\nTicket annulé avec succès.");
}
function rechercherTicket() {
  const passengerName = prompt("Nom du passager : ").trim();
  const results = tickets.filter( // On cherche les tickets, pour un nom qui se répète (soit majiscule ou miniscule)
    (t) => t.passengerName.toLowerCase() === passengerName.toLowerCase()
  );

  if (results.length === 0) {
    console.log("\nAucun ticket trouvé pour ce passager.");
    return;
  }

  afficherTickets(results);
}
function filtrerTrajets() {
  const departure = prompt("Ville de départ : ").trim();
  const results = trips.filter( // On cherche les départures des trajets, (soit majiscule ou miniscule)
    (t) => t.departure.toLowerCase() === departure.toLowerCase()
  );

  printHeader("RESULTAT DU FILTRE");
  if (results.length === 0) {
    console.log("Aucun trajet trouvé au départ de cette ville.");
    return;
  }
  results.forEach((t) => {
    console.log(`${t.departure} → ${t.destination} : ${t.price} DH`);
  });
}
function trierTrajets() {
  const sorted = [...trips].sort((a, b) => a.price - b.price); // Tri Croissant des trajets

  printHeader("TRAJETS TRIES PAR PRIX CROISSANT");
  sorted.forEach((t) => {
    console.log(`${t.departure} → ${t.destination} : ${t.price} DH`);
  });
}
function afficherStatistiques() {
  printHeader("STATISTIQUES");

  console.log(`Nombre total de tickets : ${tickets.length}`);

  const totalRevenue = tickets.reduce((sum, t) => sum + t.price, 0); // Somme des prix de tous les tickets
  console.log(`Chiffre d'affaires total : ${totalRevenue} DH`);
  
  if (tickets.length === 0) {
    console.log("\nTrajet le plus vendu : aucun ticket vendu pour le moment.");
    return;
  }

  const countByTrip = {};
  tickets.forEach((t) => {
    countByTrip[t.tripId] = (countByTrip[t.tripId] || 0) + 1;
  });

  let bestTripId = null;
  let bestCount = 0;
  for (const tripId in countByTrip) {
    if (countByTrip[tripId] > bestCount) {
      bestCount = countByTrip[tripId];
      bestTripId = parseInt(tripId, 10);
    }
  }

  const bestTrip = findTripById(bestTripId);
  console.log("\nTrajet le plus vendu :\n");
  if (bestTrip) {
    console.log(`${bestTrip.departure} → ${bestTrip.destination}`);
  }
  console.log(`${bestCount} tickets vendus`);
}

// -- Menu Principale -- //

function afficherMenu(){
    console.log("\n=================================\n        RAILWAY MANAGER\n=================================\n\n1. Afficher les trajets\n2. Acheter un ticket\n3. Afficher les tickets\n4. Annuler un ticket\n5. Rechercher un ticket\n6. Filtrer les trajets\n7. Trier les trajets\n8. Afficher les statistiques\n0. Quitter\n\n");
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
            case "6":
                filtrerTrajets();
                break;
            case "7":
                trierTrajets();
                break;
            case "8":
                afficherStatistiques();
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