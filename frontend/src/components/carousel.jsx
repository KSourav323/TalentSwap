import React, { useState, useEffect } from 'react';
import '../style/carousel.css';
import { MdOutlineStar } from "react-icons/md";
import { useNavigate} from 'react-router-dom';
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";

const Carousel = ({ trending = [] }) => {
  if (!trending || !trending.length) return null;

  const tr = [trending[trending.length - 1], ...trending, trending[0]]
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function handleTry(item) {
    navigate(`/course/${item}`);
}

useEffect(() => {
  if (isHovered) return;
  handleNext(); 

  const interval = setInterval(() => {
    handleNext();
  }, 3000);
  
  return () => clearInterval(interval);
}, [isHovered]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(trending.length); 
    } 
    else if (currentIndex === tr.length-1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div className="carousel" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',}} onTransitionEnd={handleTransitionEnd}>
        {tr.map((item, index) => (
          <div className="carousel-card" key={index}>
            <div className="card-content">
                <h3>{item?.courseName}</h3>
                <button onClick={() => handleTry(item.courseId)} >Try this</button>
            </div>
            <img
              src={`/images/${item?.category}.jpg`}
              alt={item?.category || 'default'}
              className="slider-img"
              loading="lazy"
            />
            <div className='card-det'>
                <div className='dets'>
                    <p>{item?.courseDesc}</p>
                    <p>by {item?.courseTutor}</p>
                    <p>{item?.rating}<MdOutlineStar className='star'/>/5</p>
                </div>
              <div className='numb'>
                  <p>{item?.number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-btn prev" onClick={handlePrev}>
        <GrCaretPrevious/>
      </button>
      <button className="carousel-btn next" onClick={handleNext}>
        <GrCaretNext/>
      </button>
    </div>
  );
};

export default Carousel;
