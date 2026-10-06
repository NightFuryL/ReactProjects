interface Review {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
}

interface BookInfoProps {
  title: string;
  author: string;
  genre: string;
  pageCount: number;
  reviews: Review[];
}

export default function BookInfo({
  title,
  author,
  genre,
  pageCount,
  reviews,
}: BookInfoProps) {
  return (
    <section className="info-card">
      <h2>Інформація про улюблену книгу (завдання 2)</h2>
      <div className="book-details">
        <p>
          <strong>Назва книги:</strong> {title}
        </p>
        <p>
          <strong>Автор:</strong> {author}
        </p>
        <p>
          <strong>Жанр:</strong> {genre}
        </p>
        <p>
          <strong>Кількість сторінок:</strong> {pageCount}
        </p>
      </div>
      <h3>Рецензії читачів:</h3>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <h4>
              {review.reviewer} (Оцінка: {review.rating}/5)
            </h4>
            <p>"{review.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
