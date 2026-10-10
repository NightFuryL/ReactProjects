import CityInfo from "./components/CityInfo";
import BookInfo from "./components/BookInfo";
import "./App.css";

const cityData = {
  cityName: "Одеса",
  country: "Україна",
  foundedYear: 1794,
  attractions: [
    {
      id: 1,
      name: "Одеський національний академічний театр опери та балету",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlW81DVQ3ycpphdD3Kt8EGEuuaX-c-jzOi20YuVPKWLA&s=10",
    },
    {
      id: 2,
      name: "Потьомкінські сходи",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqL-vOnrs_sxvoJ3WhO6Okp21c66BYGbvTSXZK19KaA&s=10",
    },
    {
      id: 3,
      name: "Вулиця Дерибасівська",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqKCTadN50XJxO6AWszraPMgUPi7k5C4HLeyWZjiaGQ&s=10",
    },
  ],
};

const bookData = {
  title: "Таємні війни (2015)",
  author: "Джонатан Гікман (видавництво Marvel, переклад Мрія)",
  genre: "Комікс, наукова фантастика",
  pageCount: 312,
  reviews: [
    {
      id: 1,
      reviewer: "Богля Л.",
      comment:
        "Сильна та глибока книга, яка змушує переосмислити багато речей у сучасному світі.",
      rating: 5,
    },
    {
      id: 2,
      reviewer: "Марія К.",
      comment:
        "Неймовірний сюжет та чудові ілюстрації. Рекомендую всім фанатам коміксів.",
      rating: 4,
    },
    {
      id: 3,
      reviewer: "Іван П.",
      comment:
        "Деякі моменти були трохи заплутаними, але загалом книга варта уваги.",
      rating: 5,
    },
  ],
};

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Дз, інфо про місто та улюблену книгу</h1>
      </header>
      <main className="main-content">
        <CityInfo
          cityName={cityData.cityName}
          country={cityData.country}
          foundedYear={cityData.foundedYear}
          attractions={cityData.attractions}
        />
        <BookInfo
          title={bookData.title}
          author={bookData.author}
          genre={bookData.genre}
          pageCount={bookData.pageCount}
          reviews={bookData.reviews}
        />
      </main>
    </div>
  );
}

export default App;
