import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function Atom({ position, color, size, label }: { position: [number, number, number], color: string, size: number, label: string }) {
  return (
    <group position={position}>
      <Sphere args={[size, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={0.2} />
      </Sphere>
      <Text
        position={[0, 0, size + 0.1]}
        fontSize={size * 0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Bond({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...end), new THREE.Vector3(...start));
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end)).multiplyScalar(0.5);
  
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <Cylinder args={[0.05, 0.05, length, 8]}>
        <meshStandardMaterial color="#666" metalness={0.5} opacity={0.6} transparent />
      </Cylinder>
    </mesh>
  );
}

function Molecule() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  // Simplified L-Arginine-like structure for visual appeal
  const atoms = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], color: '#3b82f6', size: 0.3, label: 'N' },
    { position: [0.8, 0.5, 0] as [number, number, number], color: '#666', size: 0.4, label: 'C' },
    { position: [1.6, 0, 0.5] as [number, number, number], color: '#666', size: 0.4, label: 'C' },
    { position: [2.4, 0.5, -0.2] as [number, number, number], color: '#ef4444', size: 0.35, label: 'O' },
    { position: [0.8, 1.5, 0.2] as [number, number, number], color: '#666', size: 0.4, label: 'C' },
    { position: [1.5, 2.2, -0.3] as [number, number, number], color: '#3b82f6', size: 0.3, label: 'N' },
  ], []);

  const bonds = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [1, 4], [4, 5]
  ], []);

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {atoms.map((atom, i) => (
          <Atom key={i} {...atom} />
        ))}
        {bonds.map((bond, i) => (
          <Bond key={i} start={atoms[bond[0]].position} end={atoms[bond[1]].position} />
        ))}
      </Float>
    </group>
  );
}

export default function MoleculeViewer() {
  return (
    <div className="w-full h-[400px] bg-slate-950/20 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Molecule />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
