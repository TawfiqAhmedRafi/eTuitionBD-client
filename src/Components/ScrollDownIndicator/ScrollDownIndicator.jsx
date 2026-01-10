import { motion as MOTION } from "framer-motion";

const ScrollDownIndicator = ({ targetId }) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      // Smooth scroll to the section
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for the container
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  // Animation variants for the arrow
  const arrowVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, 10, 0], 
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
  };

  return (
    <MOTION.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="absolute -bottom-5 md:bottom-5 left-1/2 -translate-x-1/2 cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label="Scroll down to next section"
    >
      {/* Animated arrow with glow effect */}
      <MOTION.svg
        variants={arrowVariants}
        initial="initial"
        animate="animate"
        className="w-8 h-8 text-primary drop-shadow-lg filter blur-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.5))', // Assuming --primary-rgb is defined
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </MOTION.svg>
    </MOTION.div>
  );
};

export default ScrollDownIndicator;