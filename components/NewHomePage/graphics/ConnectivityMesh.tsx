'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Line, Sphere } from '@react-three/drei';
import { useScroll, useTransform } from 'framer-motion';

function ConnectionLines({ count = 50, scrollProgress }: { count?: number; scrollProgress: any }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ));
    }
    return p;
  }, [count]);

  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 5) {
          l.push({ start: points[i], end: points[j], opacity: 1 - dist / 5 });
        }
      }
    }
    return l;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const scrollVal = scrollProgress.get();
    
    // Dramatic rotation on scroll
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + (scrollVal * 15);
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1 + (scrollVal * 5);
    
    // Dramatic expansion/zoom on scroll
    const scaleValue = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02 + (scrollVal * 4);
    groupRef.current.scale.setScalar(scaleValue);
    
    // Move towards the camera as you scroll
    groupRef.current.position.z = scrollVal * 10;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={[line.start, line.end]}
            color="#fbbf24"
            lineWidth={0.5}
            transparent
            opacity={line.opacity * 0.2}
          />
        ))}
        {points.map((point, i) => (
          <Sphere key={i} position={point} args={[0.04, 16, 16]}>
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.4} />
          </Sphere>
        ))}
      </group>
    </Float>
  );
}

function Rig() {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.current.x * 4, mouse.current.y * 2, 12), 0.04);
    camera.lookAt(0, 0, 0);
  });
}

export const ConnectivityMesh = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <ConnectionLines count={60} scrollProgress={scrollYProgress} />
        <Rig />
      </Canvas>
    </div>
  );
};
