// Animation configuration constants for consistency and maintainability
const ANIMATION_CONFIG = {
  // Smooth easing curve for natural motion
  EASE: [0.76, 0, 0.24, 1] as const,
  DURATIONS: {
    FAST: 0.8,
    NORMAL: 1,
    SLOW: 1.2,
  },
  DELAYS: {
    SHORT: 0.2,
    MEDIUM: 0.7,
  },
} as const;

/**
 * Navigation bar slide-in animation from top
 * Used for navbar entrance animation
 */
export const navVariants = {
  hidden: { 
    y: "-100%", 
    transition: { 
      ease: ANIMATION_CONFIG.EASE, 
      duration: ANIMATION_CONFIG.DURATIONS.NORMAL 
    } 
  },
  visible: { 
    y: 0, 
    transition: { 
      ease: ANIMATION_CONFIG.EASE, 
      duration: ANIMATION_CONFIG.DURATIONS.NORMAL, 
      delay: ANIMATION_CONFIG.DELAYS.MEDIUM 
    } 
  }
} as const;

/**
 * Fade-in opacity animation
 * Used for smooth element appearances
 */
export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.NORMAL, 
      delay: ANIMATION_CONFIG.DELAYS.SHORT 
    }
  },
} as const;

/**
 * Slide up animation using transform for better performance
 * Used for page transitions and modal exits
 * Note: Using transform instead of top property to avoid layout shifts
 */
export const slideUp = {
  initial: {
    y: 0
  },
  exit: {
    y: "-100vh",
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.FAST, 
      ease: ANIMATION_CONFIG.EASE, 
      delay: ANIMATION_CONFIG.DELAYS.SHORT 
    }
  }
} as const;

/**
 * Additional utility animation variants for common use cases
 */

/**
 * Fade in/out animation with full opacity
 * Alternative to the partial opacity variant above
 */
export const fadeInOut = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.NORMAL 
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.FAST 
    }
  }
} as const;

/**
 * Scale animation for hover effects and modal appearances
 */
export const scaleVariants = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.FAST,
      ease: ANIMATION_CONFIG.EASE
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.FAST,
      ease: ANIMATION_CONFIG.EASE
    }
  }
} as const;

/**
 * Slide in from left animation
 */
export const slideInLeft = {
  initial: {
    x: "-100%",
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.NORMAL,
      ease: ANIMATION_CONFIG.EASE
    }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { 
      duration: ANIMATION_CONFIG.DURATIONS.FAST,
      ease: ANIMATION_CONFIG.EASE
    }
  }
} as const;
