import React, { useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

// Cartoon character (Tripo mesh, 3.4k tris, merged 1024px texture).
export const AVATAR_URL = "/models/character.glb";

// Height (world units) the character is normalised to, feet at y = 0.
// Scene.jsx sizes it on screen from this number.
export const MODEL_HEIGHT = 2;

export default function Avatar() {
  const { scene } = useGLTF(AVATAR_URL);
  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    model.position.set(0, 0, 0);
    model.scale.setScalar(1);
    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = MODEL_HEIGHT / size.y;
    model.scale.setScalar(s);
    model.position.set(-center.x * s, -box.min.y * s, -center.z * s);
    model.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material.roughness = 0.68;
        o.material.metalness = 0;
        o.material.envMapIntensity = 0.7;
      }
    });
  }, [model]);

  return <primitive object={model} />;
}

useGLTF.preload(AVATAR_URL);
