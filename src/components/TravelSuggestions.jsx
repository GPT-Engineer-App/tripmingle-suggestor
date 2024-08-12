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
        setSuggestions({
          activities: data.attractions.slice(0, 5),
          restaurants: data.restaurants.slice(0, 5),
          events: data.events.slice(0, 3),
        });
        setError(null);
      } catch (err) {
        setSuggestions(null);
        setError('Destination not found or failed to fetch suggestions. Please try another destination.');
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
          <CardTitle>Suggested Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {suggestions.activities.map((activity, index) => (
              <li key={index}>{activity.name}</li>
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
              <li key={index}>{event.name} - {event.date}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {suggestions.restaurants.map((restaurant, index) => (
              <li key={index}>{restaurant.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelSuggestions;
