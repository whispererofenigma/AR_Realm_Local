import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { Text, useTheme, Icon, AppButton } from 'react-native-basic-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '@/Constants/PixelRatio';
import ARModelScene from '@/Components/AR/ARModelScene';

const ARWorkspaceScreen = ({ navigation }) => {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  
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
          <AppButton
            style={styles.backBtn}
            leftIcon={<Icon name="arrow-left" type="Feather" color={colors.textPrimary} />}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.instructionBadge}>
            <Text style={styles.instructionText}>
              Scan a flat surface, then tap to place
            </Text>
          </View>
        </View>

        <View style={styles.bottomControls} pointerEvents="box-none">
           <AppButton 
             title="Spawn Test Box"
             onPress={() => setActiveModel(null)}
             style={styles.actionBtn}
             textStyle={styles.actionBtnText}
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
    paddingTop: insets.top + verticalScale(16), 
  },
  backBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0, // AppButton adds default margins, this resets it
    backgroundColor: colors.cardBackground, // Mimics the "secondary" variant
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: insets.bottom + verticalScale(32), 
  },
  actionBtn: {
    backgroundColor: colors.primary, // Mimics the "primary" variant
    marginHorizontal: 0, // Resets AppButton default margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  actionBtnText: {
    fontFamily: 'Montserrat-Medium', 
    fontSize: moderateScale(14),
    color: colors.white,
  }
});

export default ARWorkspaceScreen;