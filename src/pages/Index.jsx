import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TravelSuggestions from '../components/TravelSuggestions';

const Index = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [hasCar, setHasCar] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Travel Planner</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              required
            />
          </div>
          <div>
            <Label htmlFor="days">Number of Days</Label>
            <Input
              id="days"
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="car-mode"
              checked={hasCar}
              onCheckedChange={setHasCar}
            />
            <Label htmlFor="car-mode">I have a rental car</Label>
          </div>
          <Button type="submit" className="w-full">Plan My Trip</Button>
        </form>
      </div>
      {showSuggestions && (
        <TravelSuggestions
          destination={destination}
          days={days}
          hasCar={hasCar}
        />
      )}
    </div>
  );
};

export default Index;
