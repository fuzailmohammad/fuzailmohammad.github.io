import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import * as THREE from 'three';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationId: number | null = null;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.23;
        colors[i * 3 + 1] = 0.51;
        colors[i * 3 + 2] = 0.96;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.58;
        colors[i * 3 + 1] = 0.29;
        colors[i * 3 + 2] = 0.91;
      } else {
        colors[i * 3] = 0.92;
        colors[i * 3 + 1] = 0.38;
        colors[i * 3 + 2] = 0.65;
      }

      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.008,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    camera.position.z = 4;

    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.001;

      if (particlesMesh) {
        particlesMesh.rotation.y = time * 0.5;
        particlesMesh.rotation.x = Math.sin(time * 0.3) * 0.2;

        const positions = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          positions[i3 + 1] = Math.sin(time + positions[i3]) * 0.5;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40" />
      
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          variants={itemVariants}
        >
          <span className="block">Hi, I'm</span>
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mohammad Fuzail
          </span>
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6"
          variants={itemVariants}
        >
          Senior Flutter Developer | Mobile Application Specialist
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Crafting exceptional mobile experiences with Flutter. Transforming ideas into 
          production-grade applications that serve 100,000+ users worldwide.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.a
            href="./Mohammad Fuzail - Flutter Developer.pdf"
            download="Mohammad_Fuzail_Resume.pdf"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center">
              <Download className="mr-2" size={20} />
              Download Resume
            </span>
          </motion.a>

          <motion.a
            href="mailto:mohdfuzail00786@gmail.com"
            className="group relative inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <Mail className="mr-2" size={20} />
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full mx-auto flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
};