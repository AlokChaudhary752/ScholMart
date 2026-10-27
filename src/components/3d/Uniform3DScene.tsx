"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface UniformModelProps {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  mousePosition?: { x: number; y: number };
}

/* -------------------------------------------------------------
 * Floating Dust Particles in Studio Light
 * ------------------------------------------------------------- */
function FloatingParticles({ count = 45 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return coords;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF8533"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------
 * 3D Realistic Human Student Model wearing School Uniform
 * ------------------------------------------------------------- */
function Real3DHumanStudentModel({
  color = "#10233D",
  accentColor = "#FF6500",
  activeItem = "full",
  mousePosition = { x: 0, y: 0 },
}: UniformModelProps) {
  const modelGroupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!modelGroupRef.current) return;
    // Subtle breathing / idle sway
    modelGroupRef.current.position.y = Math.sin(Date.now() * 0.0018) * 0.02 - 0.1;
    // Gentle parallax lean towards cursor
    modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      modelGroupRef.current.rotation.y,
      mousePosition.x * 0.35,
      0.04
    );
    modelGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      modelGroupRef.current.rotation.x,
      mousePosition.y * 0.15,
      0.04
    );
  });

  // Materials with realistic studio shaders
  const skinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E8BEAC"),
        roughness: 0.6,
        metalness: 0.05,
      }),
    []
  );

  const hairMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#221D1A"),
        roughness: 0.45,
        metalness: 0.1,
      }),
    []
  );

  const blazerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.65,
        metalness: 0.08,
      }),
    [color]
  );

  const shirtMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8FAFC"),
        roughness: 0.35,
        metalness: 0.02,
      }),
    []
  );

  const tieMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        roughness: 0.4,
        metalness: 0.15,
      }),
    [accentColor]
  );

  const tieStripeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8FAFC"),
        roughness: 0.4,
      }),
    []
  );

  const trousersMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: activeItem === "sports" ? new THREE.Color("#1E293B") : new THREE.Color(color).clone().multiplyScalar(0.75),
        roughness: 0.7,
        metalness: 0.05,
      }),
    [color, activeItem]
  );

  const beltMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#18181B"),
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E5A93C"),
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  const silverMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E2E8F0"),
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );

  const shoeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#09090B"),
        roughness: 0.25,
        metalness: 0.2,
      }),
    []
  );

  const eyeWhiteMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    []
  );

  const irisMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0x3d2b1f }),
    []
  );

  const isBlazerVisible = activeItem === "full" || activeItem === "blazer";

  return (
    <group ref={modelGroupRef} position={[0, -0.1, 0]}>
      {/* ========================================================
          1. HEAD, FACE & HAIR (REALISTIC HUMAN PROPORTIONS)
         ======================================================== */}
      <group position={[0, 1.48, 0]}>
        {/* Head Cranium */}
        <mesh material={skinMat} scale={[0.88, 1.05, 0.92]}>
          <sphereGeometry args={[0.26, 32, 32]} />
        </mesh>

        {/* Jaw & Chin contour */}
        <mesh material={skinMat} position={[0, -0.11, 0.06]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.13, 0.18, 16]} />
        </mesh>
        <mesh material={skinMat} position={[0, -0.2, 0.12]}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Ears */}
        <mesh material={skinMat} position={[-0.24, -0.02, -0.02]} rotation={[0, -0.2, 0.1]}>
          <capsuleGeometry args={[0.035, 0.08, 6, 12]} />
        </mesh>
        <mesh material={skinMat} position={[0.24, -0.02, -0.02]} rotation={[0, 0.2, -0.1]}>
          <capsuleGeometry args={[0.035, 0.08, 6, 12]} />
        </mesh>

        {/* Student Hair - Top & Sides Volume */}
        <group position={[0, 0.06, -0.02]}>
          <mesh material={hairMat} scale={[0.96, 0.94, 1.05]}>
            <sphereGeometry args={[0.28, 24, 24]} />
          </mesh>
          {/* Smart Side-Parted Fringe/Hair Tuft */}
          <mesh material={hairMat} position={[-0.05, 0.22, 0.14]} rotation={[0.2, -0.3, -0.2]}>
            <boxGeometry args={[0.26, 0.12, 0.18]} />
          </mesh>
          <mesh material={hairMat} position={[0.12, 0.2, 0.13]} rotation={[0.15, 0.25, 0.15]}>
            <boxGeometry args={[0.18, 0.1, 0.14]} />
          </mesh>
        </group>

        {/* Eyes (Sclera + Iris + Pupil) */}
        {/* Left Eye */}
        <group position={[-0.09, 0.02, 0.23]}>
          <mesh material={eyeWhiteMat}>
            <sphereGeometry args={[0.032, 16, 16]} />
          </mesh>
          <mesh material={irisMat} position={[0, 0, 0.022]}>
            <sphereGeometry args={[0.016, 12, 12]} />
          </mesh>
        </group>
        {/* Right Eye */}
        <group position={[0.09, 0.02, 0.23]}>
          <mesh material={eyeWhiteMat}>
            <sphereGeometry args={[0.032, 16, 16]} />
          </mesh>
          <mesh material={irisMat} position={[0, 0, 0.022]}>
            <sphereGeometry args={[0.016, 12, 12]} />
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh material={hairMat} position={[-0.095, 0.07, 0.24]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.075, 0.016, 0.02]} />
        </mesh>
        <mesh material={hairMat} position={[0.095, 0.07, 0.24]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.075, 0.016, 0.02]} />
        </mesh>

        {/* Nose Bridge & Tip */}
        <mesh material={skinMat} position={[0, -0.02, 0.26]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.03, 0.09, 8]} />
        </mesh>

        {/* Subtle Smile Contour */}
        <mesh material={hairMat} position={[0, -0.11, 0.235]}>
          <boxGeometry args={[0.08, 0.012, 0.02]} />
        </mesh>
      </group>

      {/* ========================================================
          2. NECK & SHIRT COLLAR
         ======================================================== */}
      {/* Human Neck */}
      <mesh material={skinMat} position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.26, 24]} />
      </mesh>

      {/* Inner White Shirt Collar Stand */}
      <mesh material={shirtMat} position={[0, 1.14, 0]}>
        <cylinderGeometry args={[0.145, 0.165, 0.18, 24]} />
      </mesh>

      {/* Shirt Collar Lapel Left & Right */}
      <mesh material={shirtMat} position={[-0.14, 1.08, 0.14]} rotation={[0.4, 0.45, -0.3]}>
        <boxGeometry args={[0.18, 0.12, 0.03]} />
      </mesh>
      <mesh material={shirtMat} position={[0.14, 1.08, 0.14]} rotation={[0.4, -0.45, 0.3]}>
        <boxGeometry args={[0.18, 0.12, 0.03]} />
      </mesh>

      {/* ========================================================
          3. SCHOOL TIE (STRIPED INSTITUTIONAL REGALIA)
         ======================================================== */}
      <group position={[0, 0.88, 0.18]}>
        {/* Tie Knot */}
        <mesh material={tieMat} position={[0, 0.19, 0]}>
          <coneGeometry args={[0.08, 0.12, 4]} />
        </mesh>
        {/* Tie Blade Body */}
        <mesh material={tieMat} position={[0, -0.1, 0]}>
          <boxGeometry args={[0.1, 0.52, 0.02]} />
        </mesh>
        {/* Diagonal Regalia School Stripes */}
        <mesh material={tieStripeMat} position={[0, 0.05, 0.012]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
        </mesh>
        <mesh material={tieStripeMat} position={[0, -0.12, 0.012]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
        </mesh>
        {/* Tie Point Tip */}
        <mesh material={tieMat} position={[0, -0.39, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.071, 0.071, 0.02]} />
        </mesh>
        {/* Golden Tie Bar / Clip */}
        <mesh material={goldMat} position={[0, -0.04, 0.018]}>
          <boxGeometry args={[0.11, 0.02, 0.01]} />
        </mesh>
      </group>

      {/* ========================================================
          4. TORSO / BLAZER & SHIRT
         ======================================================== */}
      {/* Inner White Shirt Chest Placket */}
      <mesh material={shirtMat} position={[0, 0.85, 0.06]}>
        <cylinderGeometry args={[0.34, 0.38, 0.6, 24]} />
      </mesh>

      {isBlazerVisible ? (
        /* --- TAILORED EMBROIDERED SCHOOL BLAZER --- */
        <group>
          {/* Main Sculpted Blazer Jacket Torso */}
          <mesh material={blazerMat} position={[0, 0.64, 0]}>
            <cylinderGeometry args={[0.42, 0.45, 0.94, 24]} />
          </mesh>

          {/* Left Notched Lapel */}
          <mesh material={blazerMat} position={[-0.2, 0.86, 0.17]} rotation={[0.2, 0.3, -0.22]}>
            <boxGeometry args={[0.22, 0.52, 0.05]} />
          </mesh>
          {/* Right Notched Lapel */}
          <mesh material={blazerMat} position={[0.2, 0.86, 0.17]} rotation={[0.2, -0.3, 0.22]}>
            <boxGeometry args={[0.22, 0.52, 0.05]} />
          </mesh>

          {/* Left Shoulder & Sleeve (Broad human student shoulder) */}
          <mesh material={blazerMat} position={[-0.52, 0.86, 0]} rotation={[0, 0, 0.1]}>
            <sphereGeometry args={[0.16, 16, 16]} />
          </mesh>
          <mesh material={blazerMat} position={[-0.56, 0.52, 0.02]} rotation={[0.05, 0, 0.16]}>
            <capsuleGeometry args={[0.12, 0.62, 8, 16]} />
          </mesh>
          {/* White Shirt Cuff peeking from left sleeve */}
          <mesh material={shirtMat} position={[-0.64, 0.14, 0.04]} rotation={[0.05, 0, 0.16]}>
            <cylinderGeometry args={[0.1, 0.105, 0.08, 16]} />
          </mesh>

          {/* Right Shoulder & Sleeve */}
          <mesh material={blazerMat} position={[0.52, 0.86, 0]} rotation={[0, 0, -0.1]}>
            <sphereGeometry args={[0.16, 16, 16]} />
          </mesh>
          <mesh material={blazerMat} position={[0.56, 0.52, 0.02]} rotation={[0.05, 0, -0.16]}>
            <capsuleGeometry args={[0.12, 0.62, 8, 16]} />
          </mesh>
          {/* White Shirt Cuff peeking from right sleeve */}
          <mesh material={shirtMat} position={[0.64, 0.14, 0.04]} rotation={[0.05, 0, -0.16]}>
            <cylinderGeometry args={[0.1, 0.105, 0.08, 16]} />
          </mesh>

          {/* School Monogram Crest / Badge (Left Breast Pocket) */}
          <group position={[-0.22, 0.76, 0.24]}>
            {/* Outer Golden Shield Trim */}
            <mesh material={goldMat}>
              <boxGeometry args={[0.12, 0.14, 0.02]} />
            </mesh>
            {/* Inner Embroidered School Shield */}
            <mesh material={tieMat} position={[0, 0, 0.012]}>
              <boxGeometry args={[0.09, 0.11, 0.01]} />
            </mesh>
            {/* Gold Embroidered Star / Emblem Icon */}
            <mesh material={goldMat} position={[0, 0, 0.02]}>
              <sphereGeometry args={[0.024, 8, 8]} />
            </mesh>
          </group>

          {/* Flap Pockets on Waist */}
          <mesh material={blazerMat} position={[-0.25, 0.32, 0.22]} rotation={[0, 0.1, 0]}>
            <boxGeometry args={[0.16, 0.06, 0.03]} />
          </mesh>
          <mesh material={blazerMat} position={[0.25, 0.32, 0.22]} rotation={[0, -0.1, 0]}>
            <boxGeometry args={[0.16, 0.06, 0.03]} />
          </mesh>

          {/* Golden Embossed Blazer Buttons */}
          <mesh material={goldMat} position={[0, 0.52, 0.25]}>
            <sphereGeometry args={[0.035, 16, 16]} />
          </mesh>
          <mesh material={goldMat} position={[0, 0.34, 0.26]}>
            <sphereGeometry args={[0.035, 16, 16]} />
          </mesh>

          {/* Sleeve Buttons (Left & Right) */}
          <mesh material={goldMat} position={[-0.66, 0.2, 0.1]}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>
          <mesh material={goldMat} position={[0.66, 0.2, 0.1]}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>
        </group>
      ) : (
        /* --- CRISP OXFORD SHIRT ONLY MODE --- */
        <group>
          {/* Main Shirt Torso */}
          <mesh material={shirtMat} position={[0, 0.64, 0]}>
            <cylinderGeometry args={[0.38, 0.41, 0.9, 24]} />
          </mesh>
          {/* Left Sleeve */}
          <mesh material={shirtMat} position={[-0.52, 0.54, 0.02]} rotation={[0, 0, 0.16]}>
            <capsuleGeometry args={[0.11, 0.6, 8, 16]} />
          </mesh>
          {/* Right Sleeve */}
          <mesh material={shirtMat} position={[0.52, 0.54, 0.02]} rotation={[0, 0, -0.16]}>
            <capsuleGeometry args={[0.11, 0.6, 8, 16]} />
          </mesh>
        </group>
      )}

      {/* ========================================================
          5. HUMAN HANDS (SKIN TONE, RELAXED NATURAL POSTURE)
         ======================================================== */}
      {/* Left Hand */}
      <group position={[-0.67, 0.02, 0.04]} rotation={[0.1, 0, 0.15]}>
        <mesh material={skinMat}>
          <boxGeometry args={[0.09, 0.13, 0.05]} />
        </mesh>
        {/* Fingers */}
        <mesh material={skinMat} position={[0, -0.09, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.04]} />
        </mesh>
        {/* Thumb */}
        <mesh material={skinMat} position={[0.045, -0.02, 0.02]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.035, 0.07, 0.035]} />
        </mesh>
      </group>

      {/* Right Hand */}
      <group position={[0.67, 0.02, 0.04]} rotation={[0.1, 0, -0.15]}>
        <mesh material={skinMat}>
          <boxGeometry args={[0.09, 0.13, 0.05]} />
        </mesh>
        {/* Fingers */}
        <mesh material={skinMat} position={[0, -0.09, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.04]} />
        </mesh>
        {/* Thumb */}
        <mesh material={skinMat} position={[-0.045, -0.02, 0.02]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.035, 0.07, 0.035]} />
        </mesh>
      </group>

      {/* ========================================================
          6. LEATHER BELT & METALLIC BUCKLE
         ======================================================== */}
      <group position={[0, 0.14, 0]}>
        {/* Black Leather Belt Loop */}
        <mesh material={beltMat}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 24]} />
        </mesh>
        {/* Silver / Gold Belt Buckle */}
        <mesh material={silverMat} position={[0, 0, 0.22]}>
          <boxGeometry args={[0.12, 0.09, 0.025]} />
        </mesh>
        <mesh material={goldMat} position={[0, 0, 0.23]}>
          <boxGeometry args={[0.03, 0.05, 0.015]} />
        </mesh>
      </group>

      {/* ========================================================
          7. TAILORED SCHOOL TROUSERS (HUMAN LEGS & FEET)
         ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Pelvis / Hip Section */}
        <mesh material={trousersMat} position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.41, 0.39, 0.18, 24]} />
        </mesh>

        {/* Left Leg with Center Crease Line */}
        <group position={[-0.2, -0.62, 0]}>
          {/* Thigh & Calf Taper */}
          <mesh material={trousersMat}>
            <cylinderGeometry args={[0.17, 0.135, 1.15, 20]} />
          </mesh>
          {/* Front Ironed Crease Line */}
          <mesh material={trousersMat} position={[0, 0, 0.145]}>
            <boxGeometry args={[0.015, 1.12, 0.015]} />
          </mesh>
        </group>

        {/* Right Leg with Center Crease Line */}
        <group position={[0.2, -0.62, 0]}>
          {/* Thigh & Calf Taper */}
          <mesh material={trousersMat}>
            <cylinderGeometry args={[0.17, 0.135, 1.15, 20]} />
          </mesh>
          {/* Front Ironed Crease Line */}
          <mesh material={trousersMat} position={[0, 0, 0.145]}>
            <boxGeometry args={[0.015, 1.12, 0.015]} />
          </mesh>
        </group>

        {/* ========================================================
            8. POLISHED OXFORD FORMAL SCHOOL SHOES & SOCKS
           ======================================================== */}
        {/* Left Shoe & Ankle */}
        <group position={[-0.2, -1.24, 0.05]}>
          {/* Ankle Sock */}
          <mesh material={beltMat} position={[0, 0.05, -0.05]}>
            <cylinderGeometry args={[0.12, 0.125, 0.1, 16]} />
          </mesh>
          {/* Main Leather Shoe Upper */}
          <mesh material={shoeMat} position={[0, -0.02, 0.06]} scale={[1, 0.7, 1.4]}>
            <sphereGeometry args={[0.135, 16, 16]} />
          </mesh>
          {/* Shoe Sole & Heel */}
          <mesh material={shoeMat} position={[0, -0.08, 0.04]}>
            <boxGeometry args={[0.16, 0.045, 0.34]} />
          </mesh>
        </group>

        {/* Right Shoe & Ankle */}
        <group position={[0.2, -1.24, 0.05]}>
          {/* Ankle Sock */}
          <mesh material={beltMat} position={[0, 0.05, -0.05]}>
            <cylinderGeometry args={[0.12, 0.125, 0.1, 16]} />
          </mesh>
          {/* Main Leather Shoe Upper */}
          <mesh material={shoeMat} position={[0, -0.02, 0.06]} scale={[1, 0.7, 1.4]}>
            <sphereGeometry args={[0.135, 16, 16]} />
          </mesh>
          {/* Shoe Sole & Heel */}
          <mesh material={shoeMat} position={[0, -0.08, 0.04]}>
            <boxGeometry args={[0.16, 0.045, 0.34]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          9. STUDIO CIRCULAR TURNTABLE PODIUM & ILLUMINATION RING
         ======================================================== */}
      <group position={[0, -1.36, 0]}>
        {/* Beveled Turntable Base Platform */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.35, 1.45, 0.08, 36]} />
          <meshStandardMaterial color="#0B132B" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Glowing Brand Accent Ring */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 1.34, 36]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
        </mesh>
        {/* Inner Premium Marble Inset */}
        <mesh position={[0, 0.002, 0]}>
          <cylinderGeometry args={[1.24, 1.24, 0.02, 36]} />
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------
 * Main Exported Component: Uniform3DScene
 * ------------------------------------------------------------- */
export function Uniform3DScene({
  color = "#10233D",
  accentColor = "#FF6500",
  activeItem = "full",
  className = "w-full h-full",
}: {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.35, 4.4]} fov={42} />

        {/* Orbit Controls with soft damping so users can rotate 360° */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={6.0}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.85}
          dampingFactor={0.06}
          enableDamping={true}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />

        {/* Studio 3-Point & Rim Lighting for Photorealistic Rendering */}
        <ambientLight intensity={0.9} />
        {/* Main Key Light */}
        <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" />
        {/* Soft Cool Fill Light */}
        <directionalLight position={[-4, 3, 2]} intensity={0.8} color="#BAE6FD" />
        {/* Warm Golden Rim / Edge Highlight */}
        <directionalLight position={[0, 4, -4]} intensity={1.2} color="#FED7AA" />
        {/* Chest & Face Focus Spotlight */}
        <spotLight
          position={[0, 3.5, 3.2]}
          angle={0.5}
          penumbra={0.9}
          intensity={1.5}
          color="#FFF7ED"
        />

        {/* Atmospheric Floating Studio Particles */}
        <FloatingParticles count={45} />

        {/* Real 3D Human Student Model */}
        <Real3DHumanStudentModel
          color={color}
          accentColor={accentColor}
          activeItem={activeItem}
          mousePosition={mousePos}
        />

        {/* Soft Studio Contact Floor Shadow */}
        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.5}
          scale={5.5}
          blur={2.2}
          far={3}
          color="#0B132B"
        />
      </Canvas>
    </div>
  );
}
export default Uniform3DScene;
