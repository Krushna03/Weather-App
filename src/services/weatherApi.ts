import type { WeatherData } from '../types/weather';

export const getWeather = async (location: string): Promise<WeatherData> => {
  // 1. Geocoding
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
  );
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const { latitude, longitude, name, admin1, country, timezone } = geoData.results[0];

  // 2. Weather
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto`
  );
  const weatherData = await weatherRes.json();

  if (!weatherData.current) {
    throw new Error('Failed to fetch weather data');
  }

  const current = weatherData.current;

  return {
    city: `${name}${admin1 ? `, ${admin1}` : ''}, ${country}`,
    temperature: current.temperature_2m,
    conditionCode: current.weather_code,
    windSpeed: current.wind_speed_10m,
    humidity: current.relative_humidity_2m,
    isDay: current.is_day === 1,
    timezone: timezone || 'UTC',
  };
};
