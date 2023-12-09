import React from 'react';
import bigPicture from '../assets/Excel_Interface_Fuseki.png'; // Replace with the actual path to your picture

/**
 * React component for displaying a big picture on the home page.
 * @component
 * @returns {JSX.Element} BigPictureHome component.
 */
function BigPictureHome() {
  return (
    <div>
      <img src={bigPicture} alt="Big Picture" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default BigPictureHome;
