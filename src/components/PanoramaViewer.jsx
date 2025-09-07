// // PanoramaViewer.jsx
// import React, { useEffect, useRef } from 'react';
// import { Viewer } from '@photo-sphere-viewer/core';
// import '@photo-sphere-viewer/core/index.css';

// const PanoramaViewer = ({ imageUrl }) => {
//   const containerRef = useRef(null);
//   const viewerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Initialize viewer
//     viewerRef.current = new Viewer({
//       container: containerRef.current,
//       panorama: imageUrl,
//       loadingImg: null,
//       defaultLat: 0.3,
//       touchmoveTwoFingers: true,
//     });

//     return () => {
//       // Clean up viewer
//       if (viewerRef.current) {
//         viewerRef.current.destroy();
//         viewerRef.current = null;
//       }
//     };
//   }, [imageUrl]);

//   return (
//     <>
//     <div className="panorama-container">
//     <div
//       ref={containerRef}
//       style={{ width: '80%', height: '600px', border: '1px solid #ccc' }}
//     />
//     </div>
//     </>
//   );
// };

// export default PanoramaViewer;

// PanoramaViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

const PanoramaViewer = ({ imageUrl }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize viewer
    viewerRef.current = new Viewer({
      container: containerRef.current,
      panorama: imageUrl,
      loadingImg: null,
      defaultLat: 0.3,
    //   touchmoveTwoFingers: true,
    
      navbar: false,
    });
  // Use viewer's built-in event
  const handleInteraction = () => {
      console.log('User interacted with the viewer!');
    setIsInteracted(true);
  };

  // 'user-activated' is fired on first interaction (drag, touch, etc.)
  viewerRef.current.addEventListener('user-activated', handleInteraction);


    return () => {
      // Clean up viewer
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl]);
   const handleOverlayDismiss = () => {
    setIsInteracted(true);
  };

  return (
    <>
      <div className="panorama-container">
        {/* {loading && ( */}
        {/* </div> */}
        <div
           className={`panorama-overlay ${isInteracted ? 'active' : ''}`}
           onClick={handleOverlayDismiss}
          // onMouseEnter={handleOverlayDismiss}
        //   style={{ opacity: 0, transition: "opacity 0.6s ease 0s" }}
        >
          {/* <img src="/carviewerloaderimg.png" /> */}
          <span>This is a 360° experience, touch the screen <br />and drag to move around the interior of the <br />new BMW 4 Series Coupe.</span>
        </div>
        {/* )} */}
        <div
          ref={containerRef}
          style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
        />
        <div className=""></div>
      </div>
    </>
  );
};

export default PanoramaViewer;
