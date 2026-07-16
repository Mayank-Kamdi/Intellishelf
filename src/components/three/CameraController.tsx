'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Book } from '@/types';

interface CameraControllerProps {
  selectedBook: Book | null;
  activeCategory: string;
}

export default function CameraController({ selectedBook, activeCategory }: CameraControllerProps) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1.2, 5));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedBook) {
      // Find approximate book arc coordinates (matching the arc logic in SpaceLibrary)
      // Since it's dynamic, we can set target to focus closer and slightly offset
      targetPos.current.set(0, 0.4, 1.8);
      targetLook.current.set(0, 0.2, 0.3);
    } else {
      // Return to default orbit view
      targetPos.current.set(0, 1.0, 4.8);
      targetLook.current.set(0, 0, 0);
    }
  }, [selectedBook, activeCategory]);

  useFrame(() => {
    // 1. Mouse drift influence for cinematic breathing feel
    const pointerInfluenceX = pointer.x * 0.4;
    const pointerInfluenceY = pointer.y * 0.3;

    const actualTargetPos = new THREE.Vector3(
      targetPos.current.x + pointerInfluenceX,
      targetPos.current.y + pointerInfluenceY,
      targetPos.current.z
    );

    // 2. Smoothly lerp camera position
    camera.position.lerp(actualTargetPos, 0.05);

    // 3. Smoothly lerp lookAt target
    currentLook.current.lerp(targetLook.current, 0.05);
    camera.lookAt(currentLook.current);
  });

  return null;
}
