
import React, { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Calendar, Image, Users, Code, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Updated data for the slideshow with more web3/tech event focus
const slideshowData = [
  {
    id: 1,
    type: 'event',
    title: 'Annual Blockchain Hackathon',
    date: 'November 15-16, 2023',
    description: 'Join us for 48 hours of building dApps, smart contracts, and Web3 innovations with leading blockchain technologies.',
    imageUrl: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=2070',
    bgColor: 'from-purple-900/20 to-pink-600/20',
    icon: <Code className="mr-2 h-5 w-5 text-purple-400" />
  },
  {
    id: 2,
    type: 'image',
    title: 'Web3 Developer Workshop',
    description: 'Students exploring decentralized technologies in our hands-on smart contract and dApp development series.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
    bgColor: 'from-indigo-900/20 to-purple-600/20',
    icon: <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
  },
  {
    id: 3,
    type: 'event',
    title: 'Metaverse & AI Conference',
    date: 'December 10, 2023',
    description: 'Featuring industry experts and the latest advancements in artificial intelligence and metaverse technology.',
    imageUrl: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=2068',
    bgColor: 'from-blue-900/20 to-indigo-600/20',
    icon: <Code className="mr-2 h-5 w-5 text-purple-400" />
  },
  {
    id: 4,
    type: 'image',
    title: 'DAO Governance Summit',
    description: 'Tech clubs coming together to share ideas about decentralized organizations and governance models.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070',
    bgColor: 'from-purple-900/20 to-indigo-600/20',
    icon: <Users className="mr-2 h-5 w-5 text-purple-400" />
  },
  {
    id: 5,
    type: 'event',
    title: 'Women in Web3 Panel',
    date: 'January 20, 2024',
    description: 'Celebrating and encouraging diversity in blockchain, crypto, and decentralized technology fields.',
    imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070',
    bgColor: 'from-pink-900/20 to-purple-600/10',
    icon: <Code className="mr-2 h-5 w-5 text-purple-400" />
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
    <section className="py-16 bg-space-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-56 h-56 bg-pink-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-6 mx-auto relative z-10">
        <ScrollReveal
          className="mb-12 text-center"
          threshold={0.1}
          delay={200}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="text-gradient">Upcoming Events & Gallery</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest events and activities in Web3, blockchain, and tech happening across our communities.
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
                  <div className={`bg-gradient-to-br ${slide.bgColor} p-6 md:p-8 rounded-xl border border-purple-500/20 backdrop-blur-sm shadow-neon h-full`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <div className="flex items-center mb-4">
                          {slide.type === 'event' ? (
                            <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                          ) : (
                            slide.icon || <Image className="mr-2 h-5 w-5 text-purple-400" />
                          )}
                          <span className="text-sm font-medium text-purple-400">
                            {slide.type === 'event' ? 'Upcoming Event' : 'Gallery Highlight'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{slide.title}</h3>
                        {slide.date && (
                          <p className="text-gray-300 mb-2">{slide.date}</p>
                        )}
                        <p className="text-gray-300 mb-6">
                          {slide.description}
                        </p>
                        {slide.type === 'event' && (
                          <button className="button-shine bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-md font-medium text-sm transition-all hover:shadow-neon border border-purple-500/30">
                            Register Now
                          </button>
                        )}
                      </div>
                      <div className="order-1 md:order-2 rounded-lg overflow-hidden border border-purple-500/30 shadow-neon aspect-video">
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
            <CarouselPrevious className="hidden md:flex bg-purple-900/30 border-purple-500/40 text-white hover:bg-purple-800/50" />
            <CarouselNext className="hidden md:flex bg-purple-900/30 border-purple-500/40 text-white hover:bg-purple-800/50" />
          </Carousel>

          <div className="flex justify-center mt-6 space-x-2">
            {slideshowData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-purple-500 scale-110"
                    : "bg-gray-600/30"
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
