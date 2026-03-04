// @ts-ignore
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeBackground.css';

// Floating particles component
const FloatingParticles = () => {
  const particlesRef = useRef();
  const particlesCount = 1000;
  
  const positions = useMemo(() => {
    const positionsArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const r = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positionsArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positionsArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positionsArray[i * 3 + 2] = r * Math.cos(phi);
    }
    return positionsArray;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      // @ts-ignore
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#AC8968"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Animated sphere component
const AnimatedSphere = () => {
  const sphereRef = useRef();
  const coreRef = useRef();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // @ts-ignore
      sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      // @ts-ignore
      sphereRef.current.rotation.y += 0.001;
    }
    if (coreRef.current) {
      // @ts-ignore
      coreRef.current.rotation.y += 0.002;
      // @ts-ignore
      coreRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3E362E"
          distort={0.2}
          speed={0.8}
          roughness={0.1}
          metalness={0.2}
          emissive="#865D36"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </Sphere>

      <Sphere ref={coreRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#93785B"
          emissive="#AC8968"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
};

// Animated rings component
const AnimatedRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame(() => {
    if (ring1Ref.current) {
      // @ts-ignore
      ring1Ref.current.rotation.z += 0.0005;
      // @ts-ignore
      ring1Ref.current.rotation.x += 0.0003;
    }
    if (ring2Ref.current) {
      // @ts-ignore
      ring2Ref.current.rotation.y += 0.0008;
      // @ts-ignore
      ring2Ref.current.rotation.x += 0.0004;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshStandardMaterial 
          color="#AC8968" 
          emissive="#865D36"
          emissiveIntensity={0.1}
          transparent 
          opacity={0.15} 
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#93785B" 
          emissive="#3E362E"
          emissiveIntensity={0.1}
          transparent 
          opacity={0.1} 
        />
      </mesh>
    </group>
  );
};

// Decorative spheres component
const DecorativeSpheres = () => {
  const spheres = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.8;
      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 1.2,
          Math.sin(angle) * radius
        ],
        color: i % 3 === 0 ? "#AC8968" : i % 3 === 1 ? "#93785B" : "#A69080"
      });
    }
    return items;
  }, []);

  return (
    <group>
      {spheres.map((sphere, i) => (
        <mesh key={i} 
// @ts-ignore
        position={sphere.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive={sphere.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main ThreeBackground component
const ThreeBackground = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ 
        alpha: true, 
        antialias: true,
        powerPreference: "default"
      }}
      className="three-canvas"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#AC8968" />
        <pointLight position={[-10, -5, -10]} intensity={0.3} color="#865D36" />
        
        <AnimatedSphere />
        <AnimatedRings />
        <FloatingParticles />
        <DecorativeSpheres />
        
        <Stars 
          radius={30} 
          depth={40} 
          count={300} 
          factor={3} 
          saturation={0} 
          fade 
          speed={0.5}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.2}
          rotateSpeed={0.3}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeBackground;