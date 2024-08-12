import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your actual API key

export const fetchPlacesData = async (destination) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: `tourist attractions in ${destination}`,
        key: API_KEY,
      },
    });

    const attractions = response.data.results.map(place => ({
      name: place.name,
      rating: place.rating,
    }));

    const restaurantResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: `restaurants in ${destination}`,
        key: API_KEY,
      },
    });

    const restaurants = restaurantResponse.data.results.map(place => ({
      name: place.name,
      rating: place.rating,
    }));

    // Note: Google Places API doesn't provide event data, so we'll use mock data for events
    const events = [
      { name: "Local Food Festival", date: "2023-07-15" },
      { name: "Summer Concert Series", date: "2023-07-17" },
      { name: "Art Exhibition Opening", date: "2023-07-18" },
    ];

    return { attractions, restaurants, events };
  } catch (error) {
    console.error('Error fetching places data:', error);
    throw error;
  }
};
