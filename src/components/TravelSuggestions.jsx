import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPlacesData } from '../lib/api';

const TravelSuggestions = ({ destination, days, hasCar }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const data = await fetchPlacesData(destination);
        setSuggestions(data);
        setError(null);
      } catch (err) {
        setSuggestions(null);
        setError('Failed to fetch suggestions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [destination]);

  if (loading) {
    return <div className="mt-8 text-center">Loading suggestions...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">{error}</div>;
  }

  if (!suggestions) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Attractions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {suggestions.attractions.map((attraction, index) => (
              <li key={index}>{attraction.name} - Rating: {attraction.rating}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {suggestions.events.map((event, index) => (
              <li key={index}>{event.name} - {new Date(event.date).toLocaleDateString()}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Rated Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {suggestions.restaurants.map((restaurant, index) => (
              <li key={index}>{restaurant.name} - Rating: {restaurant.rating}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelSuggestions;
