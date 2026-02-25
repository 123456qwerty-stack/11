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

function Ornaments() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ornaments = useMemo(() => {
    const items = [];
    const colors = ['#d4af37', '#f9e29c', '#ffffff', '#ff4444'];
    
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 4;
      const radius = (1 - height / 4.5) * 2.5;
      
      items.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.08 + Math.random() * 0.12
      });
    }
    return items;
  }, []);

  return (
    <>
      {ornaments.map((orn, i) => (
        <mesh 
          key={i} 
          position={orn.position as [number, number, number]} 
          castShadow
          onPointerOver={() => setHovered(i)}
          onPointerOut={() => setHovered(null)}
          onClick={(e) => {
            e.stopPropagation();
            confetti({
              particleCount: 20,
              spread: 50,
              origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
              colors: [orn.color, '#d4af37'],
            });
          }}
        >
          <sphereGeometry args={[orn.size * (hovered === i ? 1.5 : 1), 16, 16]} />
          <meshStandardMaterial 
            color={orn.color} 
            metalness={1} 
            roughness={0.05} 
            emissive={orn.color}
            emissiveIntensity={hovered === i ? 2 : 0.3}
          />
        </mesh>
      ))}
    </>
  );
}
