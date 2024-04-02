import React from 'react';
import backgroundVideo from '../../images/Fondo_modeler_slate.mp4'; 

const Fondo_slate = () => {
  const backgroundStyle = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <video
      style={{ ...backgroundStyle, ...videoStyle }}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={backgroundVideo} type="video/mp4" />
      Tu navegador no admite el elemento de video.
    </video>
  );
};

export default Fondo_slate;
