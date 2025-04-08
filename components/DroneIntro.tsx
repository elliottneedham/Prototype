// components/DroneIntro.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const PATH_POINTS = [
  { x: 0, z: 30 },
  { x: 0, z: 10 },
  { x: -10, z: -10 },
  { x: -10, z: -30 },
  { x: 0, z: -50 },
];

const BLOCK_SPACING = 4;
const TREE_SPACING = 8;

const randomSize = (): [number, number, number] => [
  1 + Math.random() * 3,
  3 + Math.random() * 7,
  1 + Math.random() * 3,
];

const randomColor = () => `hsl(${Math.random() * 360}, 30%, 75%)`;

const Building = ({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [startTime] = useState(() => Math.random() * 2);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const growTime = t - startTime;
    const scaleY = Math.min(growTime * 3, size[1]);
    meshRef.current.scale.set(size[0], scaleY, size[2]);
    meshRef.current.position.y = scaleY / 2;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} castShadow>
    <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
    <meshStandardMaterial color={'#8B4513'} />
    <mesh position={[0, 0.6, 0]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshStandardMaterial color={'#228B22'} />
    </mesh>
  </mesh>
);

const Road = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
    <planeGeometry args={[200, 5]} />
    <meshStandardMaterial color="#2c2c2c" />
  </mesh>
);

const DroneCamera = () => {
  const camRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    if (!camRef.current) return;
    const t = clock.getElapsedTime();
    const pathLength = PATH_POINTS.length;
    const speed = 0.01;
    const index = Math.min(Math.floor(t / 2), pathLength - 2);
    const progress = (t / 2) % 1;

    const current = PATH_POINTS[index];
    const next = PATH_POINTS[index + 1];

    const camX = current.x + (next.x - current.x) * progress;
    const camZ = current.z + (next.z - current.z) * progress;

    camRef.current.position.set(camX, 2, camZ);
    camRef.current.lookAt(camX, 0, camZ - 10);
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 2, 30]} />;
};

const DroneIntro = ({ onFinish }: { onFinish: () => void }) => {
  const [show, setShow] = useState(true);
  const [buildings] = useState(() => {
    const city = [];
    for (let z = 30; z > -100; z -= BLOCK_SPACING) {
      city.push({ position: [-6, 0, z] as [number, number, number], size: randomSize(), color: randomColor() });
      city.push({ position: [6, 0, z] as [number, number, number], size: randomSize(), color: randomColor() });
    }
    return city;
  });

  const [trees] = useState(() => {
    const treeList = [];
    for (let z = 30; z > -100; z -= TREE_SPACING) {
      treeList.push([-9, 0, z] as [number, number, number]);
      treeList.push([9, 0, z] as [number, number, number]);
    }
    return treeList;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, backgroundColor: '#e5e5e5' }}
        >
          <Canvas shadows>
            <DroneCamera />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <planeGeometry args={[200, 200]} />
              <meshStandardMaterial color="#e5e5e5" />
            </mesh>

            {/* Road */}
            <Road />

            {/* Buildings */}
            {buildings.map((b, i) => (
              <Building key={i} position={b.position} size={b.size} color={b.color} />
            ))}

            {/* Trees */}
            {trees.map((pos, i) => (
              <Tree key={i} position={pos} />
            ))}
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DroneIntro;