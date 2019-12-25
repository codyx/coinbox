import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

const GenericAnim = ({ onComplete, fileName }) => {
  const [animationData, setAnimationData] = useState(null);
  const loadAnimationData = async () => {
    const data = await import(`../../../public/assets/${fileName}`);
    setAnimationData(data.default);
  };

  useEffect(() => {
    loadAnimationData();
  }, []);

  return (
    <div className="login-anim-container">
      {
        animationData
          ? (
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData,
              }}
              eventListeners={[
                {
                  eventName: 'complete',
                  callback: onComplete,
                },
              ]}
            />
          )
          : null
      }
    </div>
  );
};

GenericAnim.defaultProps = {
  onComplete: () => {},
};

GenericAnim.propTypes = {
  onComplete: PropTypes.func,
  fileName: PropTypes.string.isRequired,
};

export default GenericAnim;
