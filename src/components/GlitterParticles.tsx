import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GlitterParticles() {
  const count = 300;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);

    const gold = new THREE.Color('#f9e29c');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Initial positions in a cylinder around the tree
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 4;
      const height = Math.random() * 10 - 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Colors: Bright gold and pure white for "glitter"
      const color = Math.random() > 0.5 ? gold : white;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.02 + Math.random() * 0.04; // Faster than atmospheric particles
      radii[i] = radius;
    }

    return { positions, colors, phases, speeds, radii };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Rising and swirling motion
      const phase = particles.phases[i] + time * particles.speeds[i] * 5;
      const radius = particles.radii[i] + Math.sin(time * 0.5 + i) * 0.2;
      
      positions[i * 3] = Math.cos(phase) * radius;
      positions[i * 3 + 1] += particles.speeds[i]; // Rising
      positions[i * 3 + 2] = Math.sin(phase) * radius;

      // Reset if they rise too high
      if (positions[i * 3 + 1] > 8) {
        positions[i * 3 + 1] = -2;
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
        size={0.04} // Smaller than atmospheric particles
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
