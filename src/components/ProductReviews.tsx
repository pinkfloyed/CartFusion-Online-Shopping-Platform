'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: { name: string };
};

type Props = { productId: string };

export default function ProductReviews({ productId }: Props) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return alert('Login required');

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      setComment('');
      setRating(5);
      fetchReviews(); 
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length
    ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Reviews</h3>

      {/* Average Rating */}
      <div className="flex items-center mb-4">
        <span className="text-yellow-500">
          {'★'.repeat(Math.round(averageRating))}
          {'☆'.repeat(5 - Math.round(averageRating))}
        </span>
        <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="border rounded p-3 bg-white">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{r.user.name}</div>
              <div className="text-yellow-500">
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </div>
            </div>
            {r.comment && <p className="text-gray-700 mt-1">{r.comment}</p>}
            <div className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review */}
      {session && (
        <form onSubmit={submitReview} className="mt-4 space-y-2">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Terrible</option>
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a review"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}
