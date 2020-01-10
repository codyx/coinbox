import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

const GenericAnim = ({
  onComplete, fileName, height, width,
}) => {
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
              height={height}
              width={width}
              isClickToPauseDisabled
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
  height: '100%',
  width: '100%',
};

GenericAnim.propTypes = {
  onComplete: PropTypes.func,
  fileName: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GenericAnim;
