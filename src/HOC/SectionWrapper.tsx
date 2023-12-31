import { styles } from '../styles'
import { motion } from 'framer-motion'

const SectionWrapper = (Component: any) => {
  
  return function HOC() {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >

        <Component />
      </motion.section>
    );
  };
};

export default SectionWrapper;