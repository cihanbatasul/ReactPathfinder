import React from "react";
import tutorial from "../../constants/tutorial.json";
import {motion} from 'framer-motion'
interface TutorialPageProps {
  index: number;
}


const TutorialPage: React.FC<TutorialPageProps> = ({ index }) => {
  const data = [tutorial.intro, tutorial.algorithm, tutorial.walls]
    const pageData = data[index-1]
  // Ensure index is within a valid range
  if (!data.length) {
    return (
      <div>
        <h3>Page not found</h3>
        <p>The requested tutorial page does not exist.</p>
      </div>
    );
  }


  return (
    <motion.div 
    initial={{opacity: 0, scale: 0}}
    animate={{opacity: 1, scale: 1}}
    transition={{duration: 0.3}}
    className="flex flex-col items-center gap-5 p-2 justify-center text-black text-center">
      <motion.h3 
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.4}}
      className="text-xl font-semibold">{pageData.title}</motion.h3>
      <motion.p
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.5}}>{pageData.answer}</motion.p>
      {data[index -1].pic !== "" ? <motion.img initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.6}} className="rounded-lg " src={data[index -1].pic}/> : null}
    </motion.div>
  );
};

export default TutorialPage;