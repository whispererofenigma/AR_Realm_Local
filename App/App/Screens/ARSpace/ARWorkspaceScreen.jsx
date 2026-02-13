import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { Text, useTheme, Icon } from 'react-native-basic-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '@/Constants/PixelRatio';
import Button from '@/Components/Common/Button'; 
import ARModelScene from '@/Components/AR/ARModelScene';

const ARWorkspaceScreen = ({ navigation }) => {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  
  // Enforcing your highly optimized stylesheet initialization
  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);
  
  const [activeModel, setActiveModel] = useState(null);

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARModelScene }}
        viroAppProps={{ selectedModel: activeModel }}
        style={styles.arView}
      />

      <View style={styles.uiOverlay} pointerEvents="box-none">
        
        <View style={styles.header} pointerEvents="box-none">
          <Button
            variant="secondary"
            size="small"
            style={styles.backBtn}
            icon={<Icon name="arrow-left" type="Feather" color={colors.textPrimary} />}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.instructionBadge}>
            <Text style={styles.instructionText}>
              Scan a flat surface, then tap to place
            </Text>
          </View>
        </View>

        <View style={styles.bottomControls} pointerEvents="box-none">
           <Button 
             title="Spawn Test Box"
             variant="primary"
             onPress={() => setActiveModel(null)}
             style={styles.actionBtn}
           />
        </View>

      </View>
    </View>
  );
};

// All dynamic UI properties (colors, insets) are handled inside the factory
const createStyles = (colors, insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  arView: {
    flex: 1,
  },
  uiOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    // Dynamic inset handling built right into the memoized object
    paddingTop: insets.top + verticalScale(16), 
  },
  backBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  instructionBadge: {
    marginLeft: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: colors.overlayMedium,
  },
  instructionText: {
    fontFamily: 'Montserrat-Medium', 
    fontSize: moderateScale(12),
    color: colors.textPrimary,
  },
  bottomControls: {
    paddingHorizontal: scale(24),
    // Dynamic inset handling built right into the memoized object
    paddingBottom: insets.bottom + verticalScale(32), 
  },
  actionBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  }
});

export default ARWorkspaceScreen;