type Review = {
  quote: string;
  author: string;
  title: string;
  year: string;
};

type Props = {
  reviews: Review[];
};

export function Reviews({ reviews }: Props) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        <h2 className="mb-12 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          Arviot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg h-fit">
              <blockquote className="text-lg italic mb-4">"{review.quote}"</blockquote>
              <cite className="text-gray-600">
                - {review.author}
                <br />
                <span className="text-sm">{review.title}</span>
                <br />
                {review.year}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 