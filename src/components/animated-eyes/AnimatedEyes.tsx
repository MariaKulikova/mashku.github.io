import React, { useEffect, useRef, useState } from 'react';
import styles from './animated-eyes.module.css';

interface PupilPosition {
  x: number;
  y: number;
}

const AnimatedEyes: React.FC = () => {
  const [leftPupilPos, setLeftPupilPos] = useState<PupilPosition>({ x: 0, y: 0 });
  const [rightPupilPos, setRightPupilPos] = useState<PupilPosition>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!svgRef.current) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      
      // Centers of each eye based on the original SVG
      const leftEyeCenter = { x: svgRect.left + (95.1602 / 413) * svgRect.width, y: svgRect.top + (47.6494 / 96) * svgRect.height };
      const rightEyeCenter = { x: svgRect.left + (317.678 / 413) * svgRect.width, y: svgRect.top + (47.6494 / 96) * svgRect.height };

      // Calculate movement for left eye
      const leftAngle = Math.atan2(event.clientY - leftEyeCenter.y, event.clientX - leftEyeCenter.x);
      const leftDistance = Math.sqrt(
        Math.pow(event.clientX - leftEyeCenter.x, 2) + 
        Math.pow(event.clientY - leftEyeCenter.y, 2)
      );

      // Calculate movement for right eye
      const rightAngle = Math.atan2(event.clientY - rightEyeCenter.y, event.clientX - rightEyeCenter.x);
      const rightDistance = Math.sqrt(
        Math.pow(event.clientX - rightEyeCenter.x, 2) + 
        Math.pow(event.clientY - rightEyeCenter.y, 2)
      );

      // Limit movement radius
      const maxMovement = 24;
      const leftMovement = Math.min(leftDistance / 20, maxMovement);
      const rightMovement = Math.min(rightDistance / 20, maxMovement);

      // Calculate new positions
      setLeftPupilPos({
        x: leftMovement * Math.cos(leftAngle),
        y: leftMovement * Math.sin(leftAngle)
      });

      setRightPupilPos({
        x: rightMovement * Math.cos(rightAngle),
        y: rightMovement * Math.sin(rightAngle)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150); // Blink duration
    }, 3000); // Blink every 3 seconds

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={styles.eyes}
      width="413"
      height="96"
      viewBox="0 0 413 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        {/* Mask for left eye */}
        <mask id="leftEyeMask">
          <rect width="413" height="96" fill="black" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.164062 47.6495C1.22525 48.8902 2.58224 50.4218 4.22285 52.1664C8.71372 56.9421 15.3274 63.3116 23.8138 69.6811C40.7887 82.4221 65.2344 95.1476 95.1603 95.1476C125.086 95.1476 149.532 82.4221 166.507 69.6811C174.993 63.3116 181.607 56.9421 186.098 52.1664C187.738 50.4218 189.095 48.8902 190.157 47.6495C189.095 46.4087 187.738 44.8771 186.098 43.1325C181.607 38.3569 174.993 31.9874 166.507 25.6178C149.532 12.8769 125.086 0.151367 95.1603 0.151367C65.2344 0.151367 40.7887 12.8769 23.8138 25.6178C15.3274 31.9874 8.71372 38.3569 4.22285 43.1325C2.58224 44.8771 1.22525 46.4087 0.164062 47.6495Z"
            fill="white"
          />
        </mask>
        
        {/* Mask for right eye */}
        <mask id="rightEyeMask">
          <rect width="413" height="96" fill="black" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M412.674 47.6495C411.613 48.8902 410.256 50.4218 408.615 52.1664C404.124 56.9421 397.51 63.3116 389.024 69.6811C372.049 82.4221 347.603 95.1476 317.678 95.1476C287.752 95.1476 263.306 82.4221 246.331 69.6811C237.845 63.3116 231.231 56.9421 226.74 52.1664C225.1 50.4218 223.743 48.8902 222.681 47.6495C223.743 46.4087 225.1 44.8771 226.74 43.1325C231.231 38.3569 237.845 31.9874 246.331 25.6178C263.306 12.8769 287.752 0.151367 317.678 0.151367C347.603 0.151367 372.049 12.8769 389.024 25.6178C397.51 31.9874 404.124 38.3569 408.615 43.1325C410.256 44.8771 411.613 46.4087 412.674 47.6495Z"
            fill="white"
          />
        </mask>
      </defs>
      
      <g id="Logo">
        {/* Eye backgrounds with blinking animation */}
        <g style={{ 
           clipPath: isBlinking ? 'inset(45% 0)' : 'inset(0 0)', 
           transition: 'clip-path 0.15s ease-in-out' 
        }}>
          <path
            id="Eye_left"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.164062 47.6495C1.22525 48.8902 2.58224 50.4218 4.22285 52.1664C8.71372 56.9421 15.3274 63.3116 23.8138 69.6811C40.7887 82.4221 65.2344 95.1476 95.1603 95.1476C125.086 95.1476 149.532 82.4221 166.507 69.6811C174.993 63.3116 181.607 56.9421 186.098 52.1664C187.738 50.4218 189.095 48.8902 190.157 47.6495C189.095 46.4087 187.738 44.8771 186.098 43.1325C181.607 38.3569 174.993 31.9874 166.507 25.6178C149.532 12.8769 125.086 0.151367 95.1603 0.151367C65.2344 0.151367 40.7887 12.8769 23.8138 25.6178C15.3274 31.9874 8.71372 38.3569 4.22285 43.1325C2.58224 44.8771 1.22525 46.4087 0.164062 47.6495Z"
            fill="white"
          />
          <path
            id="Eye_right"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M412.674 47.6495C411.613 48.8902 410.256 50.4218 408.615 52.1664C404.124 56.9421 397.51 63.3116 389.024 69.6811C372.049 82.4221 347.603 95.1476 317.678 95.1476C287.752 95.1476 263.306 82.4221 246.331 69.6811C237.845 63.3116 231.231 56.9421 226.74 52.1664C225.1 50.4218 223.743 48.8902 222.681 47.6495C223.743 46.4087 225.1 44.8771 226.74 43.1325C231.231 38.3569 237.845 31.9874 246.331 25.6178C263.306 12.8769 287.752 0.151367 317.678 0.151367C347.603 0.151367 372.049 12.8769 389.024 25.6178C397.51 31.9874 404.124 38.3569 408.615 43.1325C410.256 44.8771 411.613 46.4087 412.674 47.6495Z"
            fill="white"
          />
        </g>
        
        {/* Pupils with masks */}
        <g mask="url(#leftEyeMask)" 
           style={{ opacity: isBlinking ? 0 : 1, transition: 'opacity 0.15s ease-in-out' }}>
          <g transform={`translate(${leftPupilPos.x}, ${leftPupilPos.y})`}>
            <g transform={`scale(${isHovered ? 1.1 : 1})`}
               style={{ transformOrigin: '95.1602px 47.6494px', transition: 'transform 0.3s ease-in-out' }}>
            <path
              id="Pupil_left_2"
              d="M125.16 47.6494C125.16 64.218 111.729 77.6494 95.1602 77.6494C78.5916 77.6494 65.1602 64.218 65.1602 47.6494C65.1602 31.0809 78.5916 17.6494 95.1602 17.6494C111.729 17.6494 125.16 31.0809 125.16 47.6494Z"
              fill="black"
              className={styles.pupil}
            />
            </g>
          </g>
        </g>
        
        <g mask="url(#rightEyeMask)"
           style={{ opacity: isBlinking ? 0 : 1, transition: 'opacity 0.15s ease-in-out' }}>
          <g transform={`translate(${rightPupilPos.x}, ${rightPupilPos.y})`}>
            <g transform={`scale(${isHovered ? 1.1 : 1})`}
               style={{ transformOrigin: '317.678px 47.6494px', transition: 'transform 0.3s ease-in-out' }}>
            <path
              id="Pupil_left"
              d="M347.678 47.6494C347.678 64.218 334.246 77.6494 317.678 77.6494C301.109 77.6494 287.678 64.218 287.678 47.6494C287.678 31.0809 301.109 17.6494 317.678 17.6494C334.246 17.6494 347.678 31.0809 347.678 47.6494Z"
              fill="black"
              className={styles.pupil}
            />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default AnimatedEyes;