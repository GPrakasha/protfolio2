import React, { useEffect, useRef } from 'react';
import './contact.scss';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Button from '../Button';
import { NAV_ITEM_ID } from '../../config';
import emailjs from '@emailjs/browser';

const variants = {
  initial: {
    opacity: 0,
    y: 200,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [error, setError] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  useEffect(() => {
    emailjs.init({
      publicKey: 'UdKixZYIBlY2NNwtE',
      blockHeadless: true,
      blockList: {
        list: ['foo@emailjs.com', 'bar@emailjs.com'],
        watchVariable: 'userEmail',
      },
      limitRate: {
        id: 'app',
        throttle: 10000,
      },
    });
  }, []);

  useEffect(() => {
    console.log('formRef', formRef);
  },[formRef.current]);

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Validation function
  const validateForm = () => {
    const newErrors: any = {};
    const formData = new FormData(formRef.current!);

    // Name validation
    if (!formData.get('name')) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const email = formData.get('email');
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email as string)) {
      newErrors.email = 'Email is invalid';
    }

    // Message validation
    if (!formData.get('message')) {
      newErrors.message = 'Message is required';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Don't proceed if there are validation errors
    }
    
    emailjs.sendForm('service_iacn8ka', 'template_y0w3pkj', formRef.current ?? '', 'UdKixZYIBlY2NNwtE').then(
      (result) => {
        formRef.current?.reset();
        showSuccessMessage();
      },
      (error) => {
        setError(error.text);
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    );
  };

  return (
    <motion.section
      ref={ref}
      className="contact grid justify-center items-center md:gap-20 gap-10 bg-indigo-950 md:grid-cols-2 grid-cols-1 px-4 py-10"
      id={NAV_ITEM_ID.CONTACT}
      variants={variants}
      initial="initial"
      exit="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.5 }}
      key={NAV_ITEM_ID.CONTACT}
    >
      <motion.div
        variants={variants}
        className="text-container text-primary-color md:col-span-1 col-row-1 self-end md:self-center mb-3"
      >
        <h1 className="md:text-7xl text-5xl text-center md:text-left mb-5 md:mb-auto">Let's work together</h1>
        <motion.div variants={variants} className="item mb-4">
          <h2 className="text-2xl">Email</h2>
          <span className="text-tertiary-color pt-0">gnanaudayan.prakasha@gmail.com</span>
        </motion.div>
        <motion.div variants={variants} className="item mb-4">
          <h2 className="text-2xl">Address</h2>
          <span className="text-tertiary-color pt-0">Bangalore, India</span>
        </motion.div>
        <motion.div variants={variants} className="item mb-4">
          <h2 className="text-2xl">Phone</h2>
          <span className="text-tertiary-color pt-0">+91 9482907053</span>
        </motion.div>
      </motion.div>

      <motion.div className="contact-form md:col-span-1 col-row-1 self-start md:self-center">
        <motion.div
          className="phoneSvg"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0,
            transition: {
              delay: 0,
              duration: 3,
            },
           }}
        exit={{ opacity: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 32.666 32.666" className='m-auto'>
            <motion.path
              strokeWidth={0.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { 
                pathLength: 1,
                transition: {
                  duration: 3,
             }} : {}}
              exit={{ pathLength: 0 }}
              d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
            M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
            C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
            c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
            c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
            c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
            c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
            c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
            c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
            c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
            c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
            l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
            C32.666,7.326,25.339,0,16.333,0z"
            />
          </svg>
        </motion.div>

        <AnimatePresence>
          <motion.form
            ref={formRef}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    zIndex: 2,
                    transition: { delay: 3, duration: 0.4 },
                  }
                : {}
            }
            onSubmit={handleContact}
            className="gap-y-5 flex flex-col text-primary-color"
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className='flex flex-col'>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`input ${validationErrors.name ? 'input-error' : ''}`}
                onChange={validateForm}
              />
              {validationErrors.name && (
                <motion.div 
                  initial={{ 
                    opacity: 0,
                    y: '-10px',
                  }}
                  animate={{ 
                    opacity: 1,
                    y: '0',
                  }}
                  exit={{ opacity: 0 }}
                className="error-message text-red-400 mt-2">{validationErrors.name}</motion.div>
              )}
            </div>

            <div className='flex flex-col'>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`input ${validationErrors.email ? 'input-error' : ''}`}
                onChange={() => {
                  setValidationErrors({
                    ...validationErrors,
                    email: '',
                  });
                }}
              />
              {validationErrors.email && (
                <motion.div 
                  initial={{ 
                    opacity: 0,
                    y: '-10px',
                  }}
                  animate={{ 
                    opacity: 1,
                    y: '0',
                  }}
                  exit={{ opacity: 0 }}
                className="error-message text-red-400 mt-2">{validationErrors.email}</motion.div>
              )}
            </div>

            <div className='flex flex-col'>
              <textarea
                name="message"
                placeholder="Message"
                className={`input text-primary-color ${validationErrors.message ? 'input-error' : ''}`}
                onChange={() => {
                  setValidationErrors({
                    ...validationErrors,
                    message: '',
                  });
                }}
              />
              {validationErrors.message && (
                <motion.div 
                  initial={{ 
                    opacity: 0,
                    y: '-10px',
                  }}
                  animate={{ 
                    opacity: 1,
                    y: '0',
                  }}
                  exit={{ opacity: 0 }}
                className="error-message text-red-400 mt-2">{validationErrors.message}</motion.div>
              )}
            </div>

            <Button buttonVariant={'primary'} type="submit">
              Submit
            </Button>
          </motion.form>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={`toast-message absolute flex justify-center items-center text-white p-2 rounded-md bg-teal-500 ${
          error ? 'bg-danger-color' : 'bg-success-color'
        }`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: (showSuccess || error) ? 1 : 0,
          right: (showSuccess || error) ? '20px' : '-250px',
        }}
        exit={{
          opacity: 0,
          top: '-100px',
        }}
        transition={{ duration: 0.5 }}
      >
        <span>
          {error ? error : 'Message sent successfully'}
        </span>
      </motion.div>
    </motion.section>
  );
}
