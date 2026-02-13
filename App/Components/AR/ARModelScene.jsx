import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroARPlaneSelector,
  ViroNode,
  Viro3DObject,
  ViroBox, // Fallback object if 3D model fails to load
  ViroMaterials,
} from '@reactvision/react-viro';


// Pre-register materials for performance
ViroMaterials.createMaterials({
  placeholderMat: {
    diffuseColor: '#6366F1',
    lightingModel: 'Blinn',
  },
});

const ARModelScene = (props) => {
  // Capture the selected model from the navigation/scene props passed from the UI
  const { selectedModel } = props.sceneNavigator.viroAppProps;

  // Local state for ultra-fast 60fps gesture updates
  const [scale, setScale] = useState([1, 1, 1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);

  // --- Gesture Handlers ---
  const handlePinch = (pinchState, scaleFactor, source) => {
    // pinchState 3 means the gesture ended. We commit the final scale.
    // For live updates during pinch (pinchState 2), you'd multiply the current scale
    if (pinchState === 3) {
      setScale([
        scale[0] * scaleFactor,
        scale[1] * scaleFactor,
        scale[2] * scaleFactor,
      ]);
    }
  };

  const handleRotate = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      // Update the Y-axis rotation (spinning the object around its vertical center)
      setRotation([rotation[0], rotation[1] + rotationFactor, rotation[2]]);
    }
  };

  const handleDrag = (dragToPos, source) => {
    // Viro natively calculates the new 3D coordinate mapping to the real world
    setPosition(dragToPos);
  };

  return (
    <ViroARScene>
      {/* 1. Lighting is critical. Without it, models look 2D and black */}
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroDirectionalLight 
        color="#ffffff" 
        direction={[0, -1, -0.2]} 
        castsShadow={true} 
      />

      {/* 2. Surface Detection Magic */}
      <ViroARPlaneSelector 
        minHeight={0.1} 
        minWidth={0.1} 
        alignment="Horizontal"
      >
        {/* 3. The Manipulatable Container */}
        <ViroNode
          position={position}
          scale={scale}
          rotation={rotation}
          dragType="FixedToWorld"
          onDrag={handleDrag}
          onPinch={handlePinch}
          onRotate={handleRotate}
        >
          {/* 4. Render the actual model or a fallback box */}
          {selectedModel ? (
            <Viro3DObject
              source={selectedModel.source}
              resources={selectedModel.resources} // e.g., textures/materials
              type={selectedModel.type} // 'VRX', 'GLTF', 'OBJ'
              scale={[0.1, 0.1, 0.1]} // Normalize initial scale based on your asset size
            />
          ) : (
            <ViroBox
              materials={["placeholderMat"]}
              scale={[0.2, 0.2, 0.2]}
            />
          )}
        </ViroNode>
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default ARModelScene;