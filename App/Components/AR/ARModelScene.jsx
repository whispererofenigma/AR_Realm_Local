import React, { useState, useRef } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroSpotLight, 
  ViroARPlane,
  ViroNode,
  Viro3DObject,
  ViroBox,
  ViroMaterials,
  ViroQuad,
} from '@reactvision/react-viro';

ViroMaterials.createMaterials({
  placeholderMat: { diffuseColor: '#6366F1', lightingModel: 'Blinn', shininess: 2.0 },
  shadowCatcher: { lightingModel: 'Constant' },
  targetGrid: { diffuseColor: 'rgba(99, 102, 241, 0.4)', lightingModel: 'Constant' }
});

const ARModelScene = (props) => {
  // NEW: Added the LoadStart and LoadEnd callbacks from our UI
  const { selectedModel, onSurfaceFound, onModelPlaced, onModelLoadStart, onModelLoadEnd } = props.sceneNavigator.viroAppProps;

  const [modelPosition, setModelPosition] = useState(null);
  const [scale, setScale] = useState([1, 1, 1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [planeSize, setPlaneSize] = useState([0.5, 0.5]); 
  const [environmentalLight, setEnvironmentalLight] = useState(400);

  const currentScaleRef = useRef([1, 1, 1]);
  const currentRotationRef = useRef(0);

  const handleLightEstimation = (estimatedIntensity) => {
    const rawIntensity = estimatedIntensity?.intensity ?? estimatedIntensity;
    if (typeof rawIntensity === 'number') {
      const clampedIntensity = Math.max(150, Math.min(rawIntensity, 1200));
      setEnvironmentalLight(clampedIntensity);
    }
  };

  const handlePinch = (pinchState, scaleFactor) => {
    if (pinchState === 2) {
      setScale([
        currentScaleRef.current[0] * scaleFactor,
        currentScaleRef.current[1] * scaleFactor,
        currentScaleRef.current[2] * scaleFactor,
      ]);
    } else if (pinchState === 3) currentScaleRef.current = scale;
  };

  const handleRotate = (rotateState, rotationFactor) => {
    if (rotateState === 2) setRotation([0, currentRotationRef.current - rotationFactor, 0]);
    else if (rotateState === 3) currentRotationRef.current = rotation[1];
  };

  const handleDrag = (dragToPos) => setModelPosition(dragToPos);

  const handleAnchorFound = (anchorMap) => {
    if (onSurfaceFound) onSurfaceFound();
    if (anchorMap.width && anchorMap.height) setPlaneSize([anchorMap.width, anchorMap.height]);
  };

  const handleAnchorUpdated = (anchorMap) => {
    if (anchorMap.width && anchorMap.height) setPlaneSize([anchorMap.width, anchorMap.height]);
  };

  const handleGridTap = (position) => {
    setModelPosition(position);
    if (onModelPlaced) onModelPlaced();
    // If the user selected the fallback cube, it renders instantly, so we tell UI it's done immediately
    if (selectedModel?.type === 'fallback' && onModelLoadEnd) onModelLoadEnd();
  };

  return (
    <ViroARScene onAmbientLightUpdate={handleLightEstimation}>
      <ViroAmbientLight color="#ffffff" intensity={environmentalLight * 0.4} />

      {modelPosition && (
        <ViroSpotLight
          innerAngle={5} outerAngle={90} direction={[0, -1, 0]} 
          position={[modelPosition[0], modelPosition[1] + 3, modelPosition[2]]} 
          color="#ffffff" intensity={environmentalLight} castsShadow={true}
          shadowMapSize={2048} shadowNearZ={0.1} shadowFarZ={6}
          shadowOpacity={Math.min(0.8, environmentalLight / 1000)} 
        />
      )}

      <ViroARPlane minHeight={0.3} minWidth={0.3} onAnchorFound={handleAnchorFound} onAnchorUpdated={handleAnchorUpdated}> 
        {!modelPosition && (
          <ViroQuad position={[0, 0, 0]} rotation={[-90, 0, 0]} width={planeSize[0]} height={planeSize[1]} materials={["targetGrid"]} onClick={handleGridTap} />
        )}
      </ViroARPlane>

      {modelPosition && selectedModel && (
        <ViroNode
          position={modelPosition} scale={scale} rotation={rotation}
          dragType="FixedToWorld" onDrag={handleDrag} onPinch={handlePinch} onRotate={handleRotate}
        >
          <ViroQuad position={[0, -0.001, 0]} rotation={[-90, 0, 0]} width={5} height={5} arShadowReceiver={true} ignoreEventHandling={true} />

          {selectedModel.type !== 'fallback' ? (
            <Viro3DObject
              source={selectedModel.source}
              type={selectedModel.type} 
              scale={selectedModel.scale || [1, 1, 1]} 
              highAccuracyEvents={true} 
              // THE FIX: Hooking into the Viro engine's download lifecycles
              onLoadStart={onModelLoadStart} 
              onLoadEnd={onModelLoadEnd} 
              onError={(e) => console.warn("3D Model Error: ", e)}
            />
          ) : (
            <ViroBox materials={["placeholderMat"]} scale={[0.2, 0.2, 0.2]} position={[0, 0.1, 0]} />
          )}
        </ViroNode>
      )}
    </ViroARScene>
  );
};

export default ARModelScene;