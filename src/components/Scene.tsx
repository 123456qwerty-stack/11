import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { ChristmasTree } from './ChristmasTree';
import { AtmosphericParticles } from './AtmosphericParticles';
import { GlitterParticles } from './GlitterParticles';
import { Suspense } from 'react';

export function Scene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          minDistance={5} 
          maxDistance={15} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
        />

        <color attach="background" args={['#020a08']} />
        <fog attach="fog" args={['#020a08', 8, 20]} />

        <Suspense fallback={null}>
          <ChristmasTree />
          <AtmosphericParticles />
          <GlitterParticles />
          
          <Environment preset="night" />
          
          <ambientLight intensity={0.2} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={2} 
            castShadow 
            color="#f9e29c"
          />
          <pointLight position={[-5, 5, -5]} intensity={1} color="#062c1e" />

          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
          />

          <EffectComposer enableNormalPass={false}>
            <Bloom 
              luminanceThreshold={0.8} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.4} 
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
