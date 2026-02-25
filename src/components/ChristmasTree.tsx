import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import confetti from 'canvas-confetti';

export function ChristmasTree() {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural tree layers
  const layers = [
    { radius: 2.5, height: 2, y: 0 },
    { radius: 2, height: 1.8, y: 1.2 },
    { radius: 1.5, height: 1.5, y: 2.2 },
    { radius: 1, height: 1.2, y: 3 },
    { radius: 0.5, height: 0.8, y: 3.6 },
  ];

  return (
    <group ref={groupRef}>
      {/* Trunk */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 12]} />
        <meshStandardMaterial color="#2d1b0d" roughness={0.8} />
      </mesh>

      {/* Foliage Layers */}
      {layers.map((layer, i) => (
        <mesh 
          key={i} 
          position={[0, layer.y, 0]} 
          castShadow 
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            if (groupRef.current) {
              groupRef.current.rotation.y += Math.PI / 4;
            }
          }}
        >
          <coneGeometry args={[layer.radius, layer.height, 32]} />
          <meshStandardMaterial 
            color="#062c1e" 
            roughness={0.2} 
            metalness={0.4} 
            emissive="#03140e"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Star on Top */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 4.2, 0]} rotation={[0, 0, Math.PI / 5]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color="#ffd700" 
            emissive="#ffd700" 
            emissiveIntensity={2} 
            metalness={1} 
            roughness={0.1} 
          />
          <pointLight color="#ffd700" intensity={5} distance={3} />
        </mesh>
      </Float>

      {/* Decorative Ornaments */}
      <Ornaments />

      {/* Magical Sparkles */}
      <Sparkles 
        count={100} 
        scale={6} 
        size={2} 
        speed={0.4} 
        color="#d4af37" 
        opacity={0.8} 
      />
    </group>
  );
}

function DetailedOrnament({ position, color, size, index }: { position: [number, number, number], color: string, size: number, index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Swaying animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle swaying based on index to offset them
      meshRef.current.rotation.z = Math.sin(time + index) * 0.1;
      meshRef.current.rotation.x = Math.cos(time * 0.8 + index) * 0.05;
    }
  });

  // Randomly choose a shape type based on index
  const shapeType = index % 3; // 0: Sphere, 1: Teardrop, 2: Diamond

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: [color, '#d4af37'],
        });
      }}
    >
      {/* Ornament Body */}
      <mesh castShadow scale={hovered ? 1.3 : 1} rotation={shapeType === 1 ? [Math.PI, 0, 0] : [0, 0, 0]}>
        {shapeType === 0 && <sphereGeometry args={[size, 24, 24]} />}
        {shapeType === 1 && <coneGeometry args={[size, size * 2, 24]} />}
        {shapeType === 2 && <octahedronGeometry args={[size, 0]} />}
        
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.2}
        />
      </mesh>

      {/* Ornament Cap (Gold) */}
      <mesh position={[0, size * 0.9, 0]}>
        <cylinderGeometry args={[size * 0.3, size * 0.4, size * 0.3, 12]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
      </mesh>

      {/* Hanging String (Subtle) */}
      <mesh position={[0, size * 1.5, 0]}>
        <cylinderGeometry args={[0.005, 0.005, size, 8]} />
        <meshStandardMaterial color="#d4af37" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

function Ornaments() {
  const ornaments = useMemo(() => {
    const items = [];
    // Luxury palette: Gold, Emerald, Soft Gold, White
    const colors = ['#d4af37', '#062c1e', '#f9e29c', '#ffffff'];
    
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 4;
      const radius = (1 - height / 4.5) * 2.5;
      
      items.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.08 + Math.random() * 0.1
      });
    }
    return items;
  }, []);

  return (
    <>
      {ornaments.map((orn, i) => (
        <DetailedOrnament 
          key={i} 
          index={i}
          position={orn.position} 
          color={orn.color} 
          size={orn.size} 
        />
      ))}
    </>
  );
}
