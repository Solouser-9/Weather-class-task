import { useState } from "react";
import {
  WiThunderstorm,
  WiShowers,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiSmoke,
  WiDayHaze,
  WiDust,
  WiSandstorm,
  WiVolcano,
  WiStrongWind,
  WiTornado,
} from "react-icons/wi";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "c37384b147f27532484d46f820ad75bb";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location.trim()
        )}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found or failed to fetch weather");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
      <h2>Weather Data</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
        <button type="submit">Search</button>
      </form>

      <section>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && weather && (
          <div>
            {weather.weather?.map((item) => (
              <div key={item.id}>
                {(() => {
                  if (item.main === "Thunderstorm") {
                    return <WiThunderstorm size={40} />;
                  } else if (item.main === "Drizzle") {
                    return <WiShowers size={40} />;
                  } else if (item.main === "Rain") {
                    return <WiRain size={40} />;
                  } else if (item.main === "Snow") {
                    return <WiSnow size={40} />;
                  } else if (item.main === "Clear") {
                    return <WiDaySunny size={40} />;
                  } else if (item.main === "Clouds") {
                    return <WiCloudy size={40} />;
                  } else if (item.main === "Mist" || item.main === "Fog") {
                    return <WiFog size={40} />;
                  } else if (item.main === "Smoke") {
                    return <WiSmoke size={40} />;
                  } else if (item.main === "Haze") {
                    return <WiDayHaze size={40} />;
                  } else if (item.main === "Dust") {
                    return <WiDust size={40} />;
                  } else if (item.main === "Sand") {
                    return <WiSandstorm size={40} />;
                  } else if (item.main === "Ash") {
                    return <WiVolcano size={40} />;
                  } else if (item.main === "Squall") {
                    return <WiStrongWind size={40} />;
                  } else if (item.main === "Tornado") {
                    return <WiTornado size={40} />;
                  } else {
                    return <WiCloudy size={40} />;
                  }
                })()}

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;