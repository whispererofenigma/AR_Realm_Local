import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { Text, useTheme, Icon, AppButton } from 'react-native-basic-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from '@/Constants/PixelRatio';
import ARModelScene from '@/Components/AR/ARModelScene';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveModel, fetchRemoteModels } from '@/Redux/reducer/ARModels';

const ARWorkspaceScreen = ({ navigation }) => {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);
  
  const dispatch = useDispatch();
  const { activeModel, modelCatalog, isLoading } = useSelector(state => state.arModels);

  const [isSurfaceFound, setIsSurfaceFound] = useState(false);
  const [isModelPlaced, setIsModelPlaced] = useState(false);
  
  // NEW: State to track the 3D asset download progress
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    dispatch(fetchRemoteModels());
  }, [dispatch]);

  // --- Dynamic UX Text Logic ---
  let instructionText = "Scanning for a flat surface...";
  if (isSurfaceFound && !activeModel) instructionText = "Surface found! Select a model below.";
  if (isSurfaceFound && activeModel && !isModelPlaced) instructionText = "Tap the purple floor grid to place!";
  // Update the badge text when the model is downloading vs when it is ready
  if (isModelPlaced && isDownloading) instructionText = "Preparing 3D Asset...";
  if (isModelPlaced && !isDownloading) instructionText = "Pinch to zoom, drag to move.";

  const renderThumbnail = ({ item }) => {
    const isSelected = activeModel?.id === item.id;
    return (
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => dispatch(setActiveModel(item))}
        style={[styles.thumbnailCard, isSelected && styles.thumbnailCardSelected]}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnailImage} />
        <View style={styles.thumbnailLabelContainer}>
          <Text style={styles.thumbnailLabel} numberOfLines={1}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARModelScene }}
        viroAppProps={{ 
          selectedModel: activeModel,
          onSurfaceFound: () => setIsSurfaceFound(true),
          onModelPlaced: () => setIsModelPlaced(true),
          // Pass the state toggles down to the 3D scene
          onModelLoadStart: () => setIsDownloading(true),
          onModelLoadEnd: () => setIsDownloading(false),
        }} 
        style={styles.arView}
      />

      <View style={styles.uiOverlay} pointerEvents="box-none">
        
        {/* Top Header */}
        <View style={styles.header} pointerEvents="box-none">
          <AppButton
            style={styles.backBtn}
            leftIcon={<Icon name="arrow-left" type="Feather" color="#ffffff" size={20} />}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.instructionBadge}>
            <Text style={styles.instructionText}>{instructionText}</Text>
          </View>
        </View>

        {/* NEW: Centered Loading HUD */}
        {/* This only appears while the 3D model is actively downloading and compiling */}
        {isDownloading && (
          <View style={styles.centerHUD} pointerEvents="none">
            <ActivityIndicator size="large" color="#4ADE80" />
            <Text style={styles.hudText}>Downloading Model...</Text>
          </View>
        )}

        {/* Bottom Carousel */}
        <View style={styles.bottomCarouselContainer} pointerEvents="box-none">
          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={modelCatalog}
              keyExtractor={item => item.id}
              renderItem={renderThumbnail}
              contentContainerStyle={styles.carouselContent}
            />
          )}
        </View>

      </View>
    </View>
  );
};

const createStyles = (colors, insets) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  arView: { flex: 1 },
  uiOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: scale(16), paddingTop: insets.top + verticalScale(16), 
  },
  backBtn: {
    width: moderateScale(40), height: moderateScale(40), borderRadius: moderateScale(20), 
    paddingHorizontal: 0, paddingVertical: 0, marginHorizontal: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  instructionBadge: {
    marginLeft: scale(16), paddingHorizontal: scale(16), paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20), backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  instructionText: {
    fontFamily: 'Montserrat-Medium', fontSize: moderateScale(12), color: '#ffffff',
  },
  // --- HUD Styling ---
  centerHUD: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: moderateScale(14),
    color: '#ffffff',
    marginTop: verticalScale(12),
  },
  // -------------------
  bottomCarouselContainer: {
    width: '100%', paddingBottom: insets.bottom + verticalScale(16), 
  },
  loader: { marginBottom: verticalScale(32) },
  carouselContent: { paddingHorizontal: scale(16) },
  thumbnailCard: {
    width: moderateScale(80), height: moderateScale(100),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: moderateScale(12),
    marginRight: scale(12), overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)', 
  },
  thumbnailCardSelected: {
    borderColor: '#4ADE80', 
  },
  thumbnailImage: {
    width: '100%', height: moderateScale(70), resizeMode: 'cover',
    backgroundColor: '#ffffff', 
  },
  thumbnailLabelContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  thumbnailLabel: {
    fontFamily: 'Montserrat-SemiBold', fontSize: moderateScale(9), color: '#ffffff',
    paddingHorizontal: scale(4),
  }
});

export default ARWorkspaceScreen;