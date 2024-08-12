import axios from 'axios';

const TRIPADVISOR_API_KEY = 'YOUR_TRIPADVISOR_API_KEY';
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

export const fetchPlacesData = async (destination) => {
  try {
    const [attractions, restaurants, events] = await Promise.all([
      fetchAttractions(destination),
      fetchRestaurants(destination),
      fetchEvents(destination)
    ]);

    return {
      attractions,
      restaurants,
      events
    };
  } catch (error) {
    console.error('Error fetching places data:', error);
    throw new Error('Failed to fetch travel suggestions');
  }
};

const fetchAttractions = async (destination) => {
  const response = await axios.get(`https://api.tripadvisor.com/v1/location/${destination}/attractions`, {
    params: {
      key: TRIPADVISOR_API_KEY,
      limit: 5
    }
  });
  return response.data.data.map(attraction => ({
    name: attraction.name,
    rating: attraction.rating
  }));
};

const fetchRestaurants = async (destination) => {
  const response = await axios.get(`https://api.tripadvisor.com/v1/location/${destination}/restaurants`, {
    params: {
      key: TRIPADVISOR_API_KEY,
      limit: 5
    }
  });
  return response.data.data.map(restaurant => ({
    name: restaurant.name,
    rating: restaurant.rating
  }));
};

const fetchEvents = async (destination) => {
  const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    params: {
      key: GOOGLE_API_KEY,
      q: destination,
      timeMin: new Date().toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: 'startTime'
    }
  });
  return response.data.items.map(event => ({
    name: event.summary,
    date: event.start.dateTime || event.start.date
  }));
};
