import type { WeatherData } from '../types/weather';
import { WMO_CODES } from '../types/weather';
import Clock from './Clock';

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="weather-info">
      <h2 className="city-name">{weather.city}</h2>
      <div className="main-stats">
        <span className="temperature">{Math.round(weather.temperature)}°</span>
        <div className="condition-container">
          <div className="condition">{WMO_CODES[weather.conditionCode] || 'Unknown'}</div>
        </div>
      </div>

      <div className="details">
        <div className="detail-item">
          <span>Wind</span>
          <span className="detail-value">{weather.windSpeed} km/h</span>
        </div>
        <div className="detail-item">
          <span>Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Local Time</span>
          <Clock timezone={weather.timezone} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
