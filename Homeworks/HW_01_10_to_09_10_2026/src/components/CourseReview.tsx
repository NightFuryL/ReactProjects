import { useState, type FormEvent } from "react";

export default function CourseReview() {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="review-success">
        <p>
          Дякуємо за відгук! Ваша оцінка: {rating}. Ваш коментар: {reviewText}
        </p>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rating-container">
        <span>Оцінка:</span>
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={rating === star ? "rating-btn active" : "rating-btn"}
              onClick={() => setRating(star)}
            >
              {star} ★
            </button>
          ))}
        </div>
      </div>

      <div className="textarea-container">
        <label htmlFor="review-textarea">Ваш коментар:</label>
        <textarea
          id="review-textarea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Напишіть ваші враження про курс..."
          rows={4}
        />
      </div>

      <button type="submit" className="submit-btn">
        Відправити відгук
      </button>
    </form>
  );
}
