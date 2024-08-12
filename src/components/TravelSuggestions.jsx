import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TravelSuggestions = ({ destination, days, hasCar }) => {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    // Mock API call to get suggestions
    const fetchSuggestions = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockSuggestions = {
        activities: [
          "Visit the local museum",
          "Take a walking tour of the city",
          "Enjoy a picnic in the park",
          hasCar ? "Drive to a nearby scenic viewpoint" : "Take a bike tour",
        ],
        events: [
          { name: "Local Food Festival", date: "2023-06-15" },
          { name: "Summer Concert Series", date: "2023-06-17" },
          { name: "Art Exhibition Opening", date: "2023-06-18" },
        ],
        restaurants: [
          "The Cozy Corner Café",
          "Gourmet Delights Restaurant",
          "Seaside Seafood Spot",
          "Vegan Vibes Eatery",
        ],
      };

      setSuggestions(mockSuggestions);
    };

    fetchSuggestions();
  }, [destination, days, hasCar]);

  if (!suggestions) {
    return <div className="mt-8 text-center">Loading suggestions...</div>;
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
              <li key={index}>{activity}</li>
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
              <li key={index}>{restaurant}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelSuggestions;
