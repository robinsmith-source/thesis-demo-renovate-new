import { FaStar, FaRegStar } from "react-icons/fa6";

export default function ReviewRating({ rating }: { rating: number }) {
  return (
    <ul className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index}>
          {index <= rating ? (
            <FaStar className="fill-orange-400" size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </li>
      ))}
    </ul>
  );
}
