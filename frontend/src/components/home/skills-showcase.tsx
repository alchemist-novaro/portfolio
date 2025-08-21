import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "Machine Learning", percentage: 95, color: "#3b82f6", icon: "🤖" },
  { name: "Generative AI", percentage: 95, color: "#06b6d4", icon: "🎨" },
  { name: "AI Agents", percentage: 90, color: "#10b981", icon: "🧠" },
  { name: "Computer Vision", percentage: 80, color: "#8b5cf6", icon: "👁️" },
  { name: "Serverless Computing", percentage: 95, color: "#f59e0b", icon: "⚡" },
  { name: "Cloud Engineering", percentage: 80, color: "#ef4444", icon: "☁️" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function SkillsShowcase() {
  // Create conic gradient for radial chart
  const createConicGradient = () => {
    let gradient = "conic-gradient(from 0deg, ";
    let currentDegree = 0;
    
    // Calculate total percentage for proportional distribution
    const totalPercentage = skills.reduce((sum, skill) => sum + skill.percentage, 0);
    
    skills.forEach((skill, index) => {
      // Calculate proportional degrees based on skill percentage
      const proportionalPercentage = (skill.percentage / totalPercentage) * 100;
      const degrees = (proportionalPercentage / 100) * 360;
      const endDegree = currentDegree + degrees;
      
      gradient += `${skill.color} ${currentDegree}deg ${endDegree}deg`;
      if (index < skills.length - 1) gradient += ", ";
      
      currentDegree = endDegree;
    });
    
    gradient += ")";
    return gradient;
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Professional Skills
        </motion.h2>
        
        {/* Radial Skills Chart with badges on the right */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 mb-16">
          {/* Skills Circle */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            {/* Outer circle container */}
            <div className="absolute inset-0 rounded-full border-8 border-border"></div>
            
            {/* Skill visualization circle */}
            <motion.div 
              className="absolute inset-4 rounded-full"
              style={{
                background: createConicGradient(),
              }}
              initial={{ rotate: -90, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
            
            {/* Center content */}
            <motion.div 
              className="absolute inset-12 rounded-full bg-background flex flex-col items-center justify-center border-4 border-primary shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: "spring",
                stiffness: 200,
              }}
            >
              <div className="text-2xl font-bold text-primary">Skills</div>
            </motion.div>
          </motion.div>

          {/* Skills badges on the right side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={tagVariants}
                whileHover="hover"
                data-testid={`skill-tag-${skill.name.toLowerCase().replace(' ', '-')}`}
              >
                <Badge 
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium cursor-pointer text-white hover:shadow-lg transition-all duration-300 hover:opacity-90 min-w-40 justify-start"
                  style={{ 
                    backgroundColor: skill.color
                  }}
                >
                  <span className="mr-2">{skill.icon}</span>
                  <span className="flex-1">{skill.name}</span>
                  <span className="ml-2 text-xs opacity-90">{skill.percentage}%</span>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
