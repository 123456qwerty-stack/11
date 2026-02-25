import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AtmosphericParticles() {
  const count = 200;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    const gold = new THREE.Color('#d4af37');
    const emerald = new THREE.Color('#062c1e');

    for (let i = 0; i < count; i++) {
      // Spread particles in a large box
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 15 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Randomly choose between gold and emerald
      const color = Math.random() > 0.7 ? gold : emerald;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.05 + 0.02;
      speeds[i] = Math.random() * 0.01 + 0.005;
    }

    return { positions, colors, sizes, speeds };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Gentle falling motion
      positions[i * 3 + 1] -= particles.speeds[i];
      
      // Subtle horizontal drift
      positions[i * 3] += Math.sin(time * 0.5 + i) * 0.002;
      positions[i * 3 + 2] += Math.cos(time * 0.5 + i) * 0.002;

      // Reset if they fall too low
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 10;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
