import React, { useState } from 'react';
import './blog.scss';
import { motion } from 'framer-motion';
import Button from '../Button';
import post1 from '../../assets/post1.png';
import post3 from '../../assets/post3.png';

type Blog = {
    url: string;
    image: string;
    title?: string;
    description?: string;
};

const blogs: Blog[] = [
    {
        image: post1, // No image for this post
        url: 'https://www.linkedin.com/posts/prakasha-g_webdevelopment-collaboration-programming-activity-7268928617710006272-vWE4?utm_source=share&utm_medium=member_desktop',
        title: 'My journey as a developer',
        description: `🚀 Hey Developers,

I wanted to share a few insights that have helped my work beyond coding. 

The path to become a better developer ins't enough in mastering new frameworks, it's about understanding the bigger picture and how we impact the team, product and the end-users. 🙌`,
    },
    {
        image: 'https://media.giphy.com/media/QQQoLTqkm7v3y/giphy.gif', // Giphy image for Post 2
        url: 'https://www.linkedin.com/posts/prakasha-g_war-between-code-quality-and-product-delivery-activity-7247474208375484416-kq-U?utm_source=share&utm_medium=member_desktop',
        title: 'War between code quality and product Delivery',
        description: `🚀 Hey Developers,

Are you compromising on code quality to meet delivery timelines?

checkout this article on how improving dev estimates can help during the crucial times without compromising code quality.`,
    },
    {
        image: post3,
        url: 'https://www.linkedin.com/posts/prakasha-g_ux-frontend-developer-activity-7240639237392384001-aO-R?utm_source=share&utm_medium=member_desktop',
        title: 'Why Frontend engineers need UX',
        description: '✨ Excited to share my first post on the importance of UX for frontend engineers!!!',
    },
];

const detailsVariants = {
    hidden: {
        opacity: 0,
        x: '-10%',
        y: '-10%',
        width: '200px',
        display: 'none',
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        width: window.innerWidth < 768 ? "100%" : '400px',
        display: 'block',
        transition: {
            duration: .3,
        },
    },
}

const detailsContainerVariants = {
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
        width: window.innerWidth < 768 ? "100%" : '400px',
        display: 'block',
        transition: {
            duration: 0.3,
        }
    },
};

const Card = ({
    url,
    image,
    title,
    description,
}: Blog) => {

    const [isHovered, setIsHovered] = useState(window.innerWidth < 768);
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
            <div className="card-content flex md:flex-row flex-col">
                <div className='relative h-full'>
                    {image ? (
                        <img src={image} alt="Card Thumbnail" />
                    ) : (
                        <div className="no-image-placeholder">No Image</div>
                    )}
                    <motion.div 
                        className='title-container absolute border-2 border-indigo-400 bg-secondary-color text-white p-2 truncate'
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                            opacity: isHovered ? 0 : 1,
                            y: isHovered ? -20 : 0,
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            y: { type: 'spring', stiffness: 400, damping: 10 },
                        }}
                    >
                        {title}
                    </motion.div>
                </div>
                <motion.div 
                    className='flex md:flex-col details-container ml-3'
                    variants={detailsContainerVariants}
                    initial={
                        isHovered ? 'visible' : 'hidden'
                    }
                    animate={
                        isHovered ? 'visible' : 'hidden'
                    }
                >
                    <motion.h4 
                        animate={isHovered ? "visible" : "hidden"}
                        initial="hidden"
                        variants={detailsVariants}
                        viewport={{ once: false, amount: 0.5 }}
                    >
                        {title}
                    </motion.h4>
                    <motion.span animate={isHovered ? "visible" : "hidden"} initial="hidden" variants={detailsVariants} className='line-clamp-3'>{description}</motion.span>
                    <motion.div
                        initial="hidden"
                        animate={isHovered ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: { delay: 0.3 },
                            },
                        }}
                    >
                        <Button
                            className='w-1/2 mt-3'
                            buttonVariant="primary"
                            onClick={() => window.open(url, '_blank')}
                        >
                            Read More
                        </Button>
                    </motion.div>
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
            <motion.h1 className='text-3xl md:text-6xl text-center m-auto md:mb-auto mb-3 text-primary-color'>
                From My Mind to the World
            </motion.h1>
            <div className="cards-infinite-scroll-container m-auto mt-0 overflow-x-scroll w-full">
                {RenderCards()}
                {RenderCards()}
            </div>
        </section>
    );
}
