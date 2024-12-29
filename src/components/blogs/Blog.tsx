import React, { useEffect, useRef, useState } from 'react';
import './blog.scss';
import { motion } from 'framer-motion';
import Button from '../Button';

type Blog = {
    url: string; image: string; title?: string; description?: string;
};

const blogs = [
    {
        image: 'https://via.placeholder.com/504x350.png?text=Post+1',
        url: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7240639236914208768',
        title: 'Post 1',
        description: 'This is a description for Post 1',
    },
    {
        image: 'https://via.placeholder.com/504x350.png?text=Post+2',
        url: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7240639236914208768',
        title: 'Post 2',
        description: 'This is a description for Post 2',
    },
    {
        image: 'https://via.placeholder.com/504x350.png?text=Post+3',
        url: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7240639236914208768',
        title: 'Post 3',
        description: 'This is a description for Post 3',
    },
];

const Card = ({
    url,
    image,
    title,
    description,
}: Blog) => {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="card-content flex">
                <div className='relative h-full'>
                    <img src={image} alt="Card Thumbnail" />
                    <motion.div 
                        className='title-container absolute border-2 border-indigo-400 bg-secondary-color text-white p-2'
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                            opacity: isHovered ? 0 : 1, // Fade out on hover
                            y: isHovered ? -20 : 0, // Bounce upwards when hovered
                        }}
                        transition={{
                            opacity: { duration: 0.3 }, // Smooth fade effect
                            y: { type: 'spring', stiffness: 400, damping: 10 }, // Spring effect for bounce
                        }}
                    >
                        {title}
                    </motion.div>
                </div>
                <motion.div 
                    className='flex flex-col details-container ml-3'
                    variants={{
                        hidden: { 
                            opacity: 0,
                            x: '-10%',
                            y: 0,
                            width: '0px',
                            display: 'none',
                        },
                        visible: { 
                            opacity: 1,
                            x: 0,
                            y: 0,
                            width: '400px',
                            display: 'block',
                            transition: {
                                duration: 0.3,
                            }
                        },
                    }}
                    initial={
                        isHovered ? 'visible' : 'hidden'
                    }
                    animate={
                        isHovered ? 'visible' : 'hidden'
                    }
                >
                    <h4>{title}</h4>
                    <span>{description}</span>
                    <Button
                        className='w-1/2 mt-3'
                        buttonVariant="primary"
                        onClick={() => {
                            window.open(url, '_blank');
                        }}
                    >
                        Read More
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

const RenderCards = () => {
  return (
    <div className="cards-list flex gap-5">
      {blogs.map((blog, index) => (
        <div key={index} className="card-item" style={{ marginBottom: '20px' }}>
          <Card {...blog} />
        </div>
      ))}
    </div>
  );
};

export default function Blog() {

    return (
        <section className="blog-container flex flex-col">
            

            <motion.h1>
                From My Mind to the World
            </motion.h1>
            <div className="cards-infinite-scroll-container m-auto overflow-x-scroll">
                {RenderCards()}
                {RenderCards()}
            </div>
        </section>
    );
}
