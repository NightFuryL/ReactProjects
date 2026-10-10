interface Attraction {
  id: number;
  name: string;
  imageUrl: string;
}

interface CityInfoProps {
  cityName: string;
  country: string;
  foundedYear: number;
  attractions: Attraction[];
}

export default function CityInfo({
  cityName,
  country,
  foundedYear,
  attractions,
}: CityInfoProps) {
  return (
    <section className="info-card">
      <h2>Інформація про місто (завдання 1)</h2>
      <div className="city-details">
        <p>
          <strong>Місто:</strong> {cityName}
        </p>
        <p>
          <strong>Країна:</strong> {country}
        </p>
        <p>
          <strong>Рік заснування:</strong> {foundedYear}
        </p>
      </div>
      <h3>Визначні пам'ятки:</h3>
      <div className="attractions-grid">
        {attractions.map((attraction) => (
          <div key={attraction.id} className="attraction-card">
            <img src={attraction.imageUrl} alt={attraction.name} />
            <p>{attraction.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
