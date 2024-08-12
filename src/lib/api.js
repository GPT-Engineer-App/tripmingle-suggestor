// Mock data for travel suggestions
const mockData = {
  "New York": {
    attractions: [
      { name: "Central Park", rating: 4.8 },
      { name: "Statue of Liberty", rating: 4.7 },
      { name: "Empire State Building", rating: 4.6 },
      { name: "Metropolitan Museum of Art", rating: 4.8 },
      { name: "Broadway", rating: 4.7 }
    ],
    restaurants: [
      { name: "Katz's Delicatessen", rating: 4.5 },
      { name: "Le Bernardin", rating: 4.7 },
      { name: "Lombardi's Pizza", rating: 4.4 },
      { name: "Shake Shack", rating: 4.3 },
      { name: "The Halal Guys", rating: 4.4 }
    ],
    events: [
      { name: "New York Fashion Week", date: "2023-09-08" },
      { name: "NYC Marathon", date: "2023-11-05" },
      { name: "Times Square New Year's Eve", date: "2023-12-31" }
    ]
  },
  "Paris": {
    attractions: [
      { name: "Eiffel Tower", rating: 4.6 },
      { name: "Louvre Museum", rating: 4.7 },
      { name: "Notre-Dame Cathedral", rating: 4.7 },
      { name: "Arc de Triomphe", rating: 4.7 },
      { name: "Palace of Versailles", rating: 4.6 }
    ],
    restaurants: [
      { name: "L'Ami Louis", rating: 4.3 },
      { name: "Le Chateaubriand", rating: 4.4 },
      { name: "Septime", rating: 4.5 },
      { name: "L'Arpège", rating: 4.6 },
      { name: "Bistrot Paul Bert", rating: 4.4 }
    ],
    events: [
      { name: "Bastille Day Celebration", date: "2023-07-14" },
      { name: "Paris Autumn Festival", date: "2023-09-01" },
      { name: "Nuit Blanche", date: "2023-10-07" }
    ]
  }
};

export const fetchPlacesData = async (destination) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = mockData[destination];
      if (data) {
        resolve(data);
      } else {
        reject(new Error('Destination not found'));
      }
    }, 1000); // Simulate network delay
  });
};
