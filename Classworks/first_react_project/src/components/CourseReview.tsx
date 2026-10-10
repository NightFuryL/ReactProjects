import { useState, type FormEvent } from "react";

interface CourseReviewProps {
  initialCourseName?: string;
}

export default function CourseReview({ initialCourseName }: CourseReviewProps) {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReviewText("");
    setRating(5);
  };

  if (isSubmitted) {
    return (
      <div className="review-success">
        <p>
          🎉 Дякуємо за відгук{initialCourseName ? ` про курс "${initialCourseName}"` : ""}!
          <br />
          Ваша оцінка: <strong>{rating} ★</strong>.
          <br />
          {reviewText && (
            <span>
              Ваш коментар: <em>"{reviewText}"</em>
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3 px-3 py-1 text-sm bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors"
        >
          Залишити ще один відгук
        </button>
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
        <label htmlFor="review-textarea">
          Ваш коментар{initialCourseName ? ` до курсу ${initialCourseName}` : ""}:
        </label>
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
