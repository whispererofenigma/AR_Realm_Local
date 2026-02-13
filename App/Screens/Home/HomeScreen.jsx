import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Icon, AppButton } from 'react-native-basic-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from '@/Constants/PixelRatio';

const HomeScreen = ({ navigation }) => {
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  // Enforcing your highly optimized stylesheet initialization
  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          AR Realm
        </Text>
        <Text style={styles.subtitle}>
          Explore 3D models in your physical space.
        </Text>

        <AppButton
          title="Launch AR Workspace"
          leftIcon={<Icon name="box" type="Feather" color={colors.white} style={styles.btnIcon} />}
          onPress={() => navigation.navigate('ARWorkspace')}
          style={styles.launchBtn}
          textStyle={styles.launchBtnText}
        />
      </View>
    </View>
  );
};

// All dynamic UI properties (colors, insets) are handled inside the factory
const createStyles = (colors, insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // Safely replacing SafeAreaView with exact hardware insets
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: moderateScale(32),
    marginBottom: verticalScale(8),
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: verticalScale(48),
    color: colors.textSecondary,
  },
  launchBtn: {
    width: '100%',
    height: verticalScale(56),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary, // AppButton defaults to primary, explicit definition for safety
    marginHorizontal: 0,
  },
  launchBtnText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: moderateScale(16),
    color: colors.white,
  },
  btnIcon: {
    marginRight: moderateScale(8),
  }
});

export default HomeScreen;