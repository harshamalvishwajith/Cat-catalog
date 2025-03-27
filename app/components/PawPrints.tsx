"use client";

import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import { useState, useEffect } from "react";

const PawPrints = () => {
  const [pawPrints, setPawPrints] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPawPrints((prev) => {
        if (prev.length >= 6) return [];
        const newPrint = {
          id: Date.now(),
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8,
        };
        return [...prev, newPrint];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {pawPrints.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute text-gray-300 dark:text-gray-700 z-0"
          style={{ top: paw.y, left: paw.x, fontSize: "2rem" }}
        >
          <FaPaw />
        </motion.div>
      ))}
    </div>
  );
};

export default PawPrints;
