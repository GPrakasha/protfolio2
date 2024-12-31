import React, { useState } from 'react';
import './blog.scss';
import { motion } from 'framer-motion';
import Button from '../Button';
import post1 from '../../assets/post1.png';
import post3 from '../../assets/post3.png';
import { useDevice } from '../../hooks/useDevice';

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

const Card = ({
    url,
    image,
    title,
    description,
}: Blog) => {
    const { isMobile } = useDevice();
    const handleHover = (hovered: boolean) => {
        if(isMobile) return;
        // setIsHovered(hovered);
    }

    const handleCardClick = () => {
        window.open(url, '_blank');
    }


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
            width: isMobile < 768 ? "100%" : '100%',
            display: '-webkit-box',
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
            width: isMobile < 768 ? "100%" : '360px',
            display: 'flex',
            transition: {
                duration: 0.3,
            }
        },
    };

    const [isHovered, setIsHovered] = useState(true);
    return (
        <motion.div
            className="card rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1 }}
            onHoverStart={() => handleHover(true)}
            onHoverEnd={() => handleHover(false)}
        >
            <div className="card-content flex md:flex-row flex-col h-full">
                <div className='relative h-full'>
                    {image ? (
                        <motion.img src={image} alt="Card Thumbnail" className='rounded cursor-pointer' onClick={handleCardClick} />
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
                    className='flex flex-col details-container h-full ml-0 md:ml-3'
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
                        className='text-tertiary-color text-xl font-medium line-clamp-1 mt-2 mb-1'
                    >
                        {title}
                    </motion.h4>
                    <motion.span animate={isHovered ? "visible" : "hidden"} initial="hidden" variants={detailsVariants} className='md:line-clamp-10 line-clamp-4 text-wrap text-primary-color'>{description}</motion.span>
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
                        className='md:w-1/2 w-full mt-auto'
                    >
                        <Button
                            className='w-full'
                            buttonVariant="primary"
                            onClick={handleCardClick}
                        >
                            Read More
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const RenderCards = (id) => {
  return (
    <div className="cards-list flex gap-5" key={id}>
      {blogs.map((blog, index) => (
        <div key={`${index}_${id}`} className="card-item">
          <Card {...blog} />
        </div>
      ))}
    </div>
  );
};

export default function Blog() {
    const { isMobile } = useDevice();
    return (
        <section className="blog-container flex flex-col">
            <motion.h1 className='text-3xl md:text-5xl text-center mx-auto mt-24 md:mb-20 mb-6 text-primary-color'>
                From My Mind to the World
            </motion.h1>
            <div className="cards-infinite-scroll-container m-auto mb-auto mt-0 md:mt-10 overflow-x-scroll md:overflow-x-hidden w-full hide-scrollbar py-5">
                {RenderCards(0)}
                {
                    !isMobile &&
                        <>
                        {RenderCards(1)}
                        {RenderCards(2)}
                        </>
                }
            </div>
        </section>
    );
}
