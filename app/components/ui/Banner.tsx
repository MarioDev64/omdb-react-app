import { motion } from 'framer-motion';

interface BannerProps {
  className?: string;
}

export function Banner({ className = '' }: BannerProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-2xl lg:py-8 ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/avengers.jpg')`,
        }}
      />

      {/* Dark overlay filter */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-8 py-16 lg:py-24 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          🎬 OMDB React App
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium drop-shadow-md">
          Search movies and series from around the world
        </p>
      </div>
    </div>
  );
}
