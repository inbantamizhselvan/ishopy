import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className='max-w-screen-lg mx-auto p-8'>
      <div className='text-3xl font-bold text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col sm:flex-row gap-16'>
        <img 
          className='w-full md:max-w-[450px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 object-cover' 
          src={assets.about_img} 
          alt="About Us" 
        />
        <div className='flex flex-col pl-2 justify-center gap-6 md:w-2/4 text-gray-700'>
          <p className='text-lg leading-relaxed'>
            At IShopY, we are passionate about harnessing the power of technology to create transformative solutions that drive progress and improve lives. With years of expertise in the clothing industry, our dedicated team works collaboratively to bring innovative ideas to fruition.
          </p>
          <p className='text-lg leading-relaxed'>
            Our commitment to excellence and customer satisfaction sets us apart in the industry. We believe in building long-lasting relationships with our clients by understanding their unique needs and delivering tailor-made solutions that ensure success in a competitive landscape.
          </p>
          <b className='text-gray-800 text-xl'>Our Mission</b>
          <p className='text-lg leading-relaxed'>
            Our mission is to empower businesses with cutting-edge technology solutions that enhance productivity and drive growth. We strive to be a trusted partner in your journey toward digital transformation, providing insights and support every step of the way.
          </p>
        </div>
      </div>
      
      <div className='text-2xl font-bold text-center py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
        {[
          {
            title: "Quality Assurance",
            description: "Our products undergo rigorous testing and quality assurance processes to ensure they meet the highest standards. We are committed to delivering reliable and efficient solutions that you can trust."
          },
          {
            title: "Convenience",
            description: "With user-friendly interfaces and seamless integration, our solutions are designed to fit seamlessly into your existing workflows, making it easier for you to adopt new technologies without disruption."
          },
          {
            title: "Exceptional Customer Service",
            description: "Our team is dedicated to providing outstanding customer support. We are here to assist you 24/7, ensuring that any questions or issues are resolved promptly and efficiently."
          },
        ].map((item, index) => (
          <div key={index} className='flex-1 border p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105'>
            <div className='p-4'>
              <b className='text-lg'>{item.title}:</b>
              <p className='text-gray-600 mt-2'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <NewsLetterBox />
    </div>
  );
}

export default About;
