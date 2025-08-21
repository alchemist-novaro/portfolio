import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ExperienceData } from "@/types/constants";

const experienceData: ExperienceData[] = [
  {
    title: "Senior AI Solutions Architect",
    company: "TechCorp Innovation Labs",
    location: "San Francisco, CA",
    period: "2022 - Present",
    type: "Full-time",
    description: "Led development of enterprise AI solutions, reducing operational costs by 40% and improving efficiency across 15+ client organizations.",
    achievements: [
      "Architected and deployed 25+ machine learning models in production",
      "Led a team of 8 AI engineers and data scientists",
      "Increased client satisfaction scores by 35%",
      "Reduced model inference time by 60% through optimization"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Kubernetes", "MLOps"]
  },
  {
    title: "Machine Learning Engineer",
    company: "DataVision Technologies",
    location: "New York, NY",
    period: "2020 - 2022",
    type: "Full-time",
    description: "Developed and optimized ML pipelines for real-time data processing, handling 10M+ daily transactions with 99.9% uptime.",
    achievements: [
      "Built automated ML pipeline reducing deployment time by 80%",
      "Implemented real-time fraud detection system",
      "Mentored 5 junior engineers",
      "Published 3 research papers on deep learning optimization"
    ],
    technologies: ["Python", "Apache Spark", "Docker", "GCP", "Scikit-learn", "Kafka"]
  },
  {
    title: "AI Research Scientist",
    company: "Academic Research Institute",
    location: "Boston, MA",
    period: "2018 - 2020",
    type: "Full-time",
    description: "Conducted cutting-edge research in natural language processing and computer vision, contributing to breakthrough publications.",
    achievements: [
      "Published 8 peer-reviewed papers in top-tier conferences",
      "Developed novel attention mechanisms for NLP",
      "Secured $2M in research funding",
      "Won Best Paper Award at ICML 2019"
    ],
    technologies: ["Python", "PyTorch", "CUDA", "R", "LaTeX", "Jupyter"]
  },
  {
    title: "Data Scientist",
    company: "FinTech Innovations",
    location: "Chicago, IL",
    period: "2016 - 2018",
    type: "Full-time",
    description: "Applied statistical modeling and machine learning to financial data, improving trading algorithms and risk assessment models.",
    achievements: [
      "Increased trading algorithm profitability by 25%",
      "Reduced risk assessment errors by 45%",
      "Built automated reporting dashboard",
      "Led data strategy for 3 product launches"
    ],
    technologies: ["Python", "R", "SQL", "Tableau", "NumPy", "Pandas"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ExperienceSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Over 8 years of experience building innovative AI solutions that transform businesses and drive growth across diverse industries.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experienceData.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden border-l-4 border-l-primary/50 group-hover:border-l-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - Main Info */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-bright-primary transition-colors">
                          {experience.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-medium">{experience.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{experience.period}</span>
                          </div>
                          <Badge variant="outline">{experience.type}</Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-bright-primary" />
                          <span className="font-medium">Key Achievements</span>
                        </div>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Technologies */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Technologies & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs hover:bg-primary/20 transition-colors"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>

                      {/* Timeline Indicator */}
                      <div className="hidden md:block mt-8">
                        <div className="relative">
                          <div className="h-20 w-px bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years Experience", value: "8+" },
            { label: "Projects Completed", value: "50+" },
            { label: "Models Deployed", value: "25+" },
            { label: "Research Papers", value: "11" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl font-bold text-bright-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}