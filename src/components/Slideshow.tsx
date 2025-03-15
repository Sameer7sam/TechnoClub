
import React, { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Calendar, Image } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Sample data for the slideshow
const slideshowData = [
  {
    id: 1,
    type: 'event',
    title: 'Annual Hackathon 2023',
    date: 'November 15-16, 2023',
    description: 'Join us for 24 hours of coding, innovation, and fun. Open to all skill levels.',
    imageUrl: '/placeholder.svg',
    bgColor: 'from-techBlue/20 to-[#5E5CE6]/20'
  },
  {
    id: 2,
    type: 'image',
    title: 'Tech Workshop Series',
    description: 'Students exploring new technologies in our hands-on workshop series.',
    imageUrl: '/placeholder.svg',
    bgColor: 'from-[#E5DEFF]/50 to-[#D6BCFA]/50'
  },
  {
    id: 3,
    type: 'event',
    title: 'AI Conference',
    date: 'December 10, 2023',
    description: 'Featuring industry experts and the latest advancements in artificial intelligence.',
    imageUrl: '/placeholder.svg',
    bgColor: 'from-[#FEC6A1]/30 to-[#FDE1D3]/30'
  },
  {
    id: 4,
    type: 'image',
    title: 'Collaboration Summit',
    description: 'Tech clubs coming together to share ideas and build community partnerships.',
    imageUrl: '/placeholder.svg',
    bgColor: 'from-[#F2FCE2]/50 to-[#C8C8C9]/20'
  },
  {
    id: 5,
    type: 'event',
    title: 'Women in Tech Panel',
    date: 'January 20, 2024',
    description: 'Celebrating and encouraging diversity in the technology field.',
    imageUrl: '/placeholder.svg',
    bgColor: 'from-[#FFDEE2]/30 to-[#D946EF]/10'
  }
];

const Slideshow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideshowData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-techGray-light/50">
      <div className="container px-6 mx-auto">
        <ScrollReveal
          className="mb-12 text-center"
          threshold={0.1}
          delay={200}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Events & Gallery
          </h2>
          <p className="text-techGray-dark max-w-3xl mx-auto">
            Stay updated with the latest events and activities happening across our tech communities.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="mx-auto max-w-5xl"
          threshold={0.1}
          delay={400}
        >
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              align: "center",
            }}
          >
            <CarouselContent>
              {slideshowData.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className={`bg-gradient-to-br ${slide.bgColor} p-6 md:p-8 rounded-xl shadow-card h-full`}>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="order-2 md:order-1">
                        <div className="flex items-center mb-4">
                          {slide.type === 'event' ? (
                            <Calendar className="mr-2 h-5 w-5 text-techBlue" />
                          ) : (
                            <Image className="mr-2 h-5 w-5 text-techBlue" />
                          )}
                          <span className="text-sm font-medium text-techBlue">
                            {slide.type === 'event' ? 'Upcoming Event' : 'Gallery Highlight'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                        {slide.date && (
                          <p className="text-techGray-medium mb-2">{slide.date}</p>
                        )}
                        <p className="text-techGray-dark mb-4">
                          {slide.description}
                        </p>
                        {slide.type === 'event' && (
                          <button className="button-shine bg-techBlue text-white px-5 py-2 rounded-md font-medium text-sm transition-all hover:shadow-md hover:bg-techBlue/90">
                            Register Now
                          </button>
                        )}
                      </div>
                      <div className="order-1 md:order-2 bg-white rounded-lg overflow-hidden shadow-sm aspect-video flex items-center justify-center">
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="flex justify-center mt-6 space-x-2">
            {slideshowData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-techBlue scale-110"
                    : "bg-techGray-medium/30"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Slideshow;
