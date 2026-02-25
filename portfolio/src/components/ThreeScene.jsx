import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Ring } from "@react-three/drei";

// Sphère principale distordue
function DistortedSphere() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#7C3AED"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Anneau orbitant */}
      <Ring args={[1.9, 2.05, 64]} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <meshStandardMaterial color="#A78BFA" transparent opacity={0.3} />
      </Ring>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[4, 4, 4]}  intensity={3}   color="#7C3AED" />
          <pointLight position={[-4, -2, 3]} intensity={1.5} color="#A78BFA" />
          <pointLight position={[0, -4, 2]}  intensity={0.8} color="#5B21B6" />

          <DistortedSphere />
        </Canvas>
      </Suspense>
    </div>
  );
}
