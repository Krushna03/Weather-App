import { useState, useEffect, useCallback } from 'react';
import { getWeather } from './services/weatherApi';
import type { WeatherData } from './types/weather';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [city, setCity] = useState('Pune');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeather(location);
      setWeather(data);
      setCity(location);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather('Pune');
  }, [fetchWeather]);

  // Updates the real-time weather after every 100 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather(city);
    }, 100000);

    return () => clearInterval(interval);
  }, [city, fetchWeather]);

  return (
    <div className="app-container">
      <div className="glass-panel">
        <h1 className="title">Weather App</h1>

        <SearchBar
          onSearch={fetchWeather}
          isLoading={loading}
          onReset={() => fetchWeather('Pune')}
        />

        {loading && <div className="loader"></div>}

        {error && <div className="error-msg">{error}</div>}

        {weather && !loading && !error && (
          <>
            <WeatherDisplay weather={weather} />
            <p className="subtitle">The weather report updates after every 100 seconds</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
