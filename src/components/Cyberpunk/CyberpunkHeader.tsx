import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CyberpunkHeaderProps {}

const CyberpunkHeader: React.FC<CyberpunkHeaderProps> = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<number>(3);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userLevel, setUserLevel] = useState<number>(23);
  const [userXP, setUserXP] = useState<number>(15847);
  const [maxXP, setMaxXP] = useState<number>(18200);
  const [heartRate, setHeartRate] = useState<number>(72);

  // Animated values
  const [scanLineAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [notificationAnim] = useState(new Animated.Value(1));

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate heart rate variation
  useEffect(() => {
    const hrTimer = setInterval(() => {
      setHeartRate(prev => prev + Math.floor(Math.random() * 6) - 3);
    }, 2000);
    return () => clearInterval(hrTimer);
  }, []);

  // Animations
  useEffect(() => {
    // Scan line animation
    const scanAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: width,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Notification pulse
    const notificationPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(notificationAnim, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(notificationAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    scanAnimation.start();
    pulseAnimation.start();
    if (notifications > 0) {
      notificationPulse.start();
    }

    return () => {
      scanAnimation.stop();
      pulseAnimation.stop();
      notificationPulse.stop();
    };
  }, [notifications]);

  const xpPercentage = (userXP / maxXP) * 100;

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', { hour12: false });
  };

  const MenuButton: React.FC<{ onPress: () => void; title: string; color: string }> = ({
    onPress,
    title,
    color,
  }) => (
    <TouchableOpacity
      style={[styles.menuButton, { borderColor: color + '50' }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.menuButtonText, { color }]}>&gt; {title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Animated scan line */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [{ translateX: scanLineAnim }],
          },
        ]}
      />

      {/* Grid background pattern */}
      <View style={styles.gridBackground} />

      <View style={styles.content}>
        {/* Top row - Status bar */}
        <View style={styles.topRow}>
          <View style={styles.statusLeft}>
            <View style={styles.statusItem}>
              <Animated.View
                style={[
                  styles.statusDot,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
              <Text style={styles.statusText}>NEURAL_NET</Text>
            </View>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.statusItem}>
              <Ionicons name="pulse" size={12} color="#ff6b6b" />
              <Text style={styles.heartRateText}>{heartRate} BPM</Text>
            </View>
          </View>

          <View style={styles.statusRight}>
            <View style={styles.statusItem}>
              <Ionicons name="flash" size={12} color="#ffd93d" />
              <Text style={styles.batteryText}>87%</Text>
            </View>
            <View style={styles.signalContainer}>
              <View style={styles.signalBar}>
                <View style={styles.signalFill} />
              </View>
              <Text style={styles.signalText}>SIG</Text>
            </View>
          </View>
        </View>

        {/* Main header */}
        <View style={styles.mainHeader}>
          {/* Left - Menu & User */}
          <View style={styles.leftSection}>
            <TouchableOpacity
              style={styles.menuToggle}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={20} color="#00d4ff" />
            </TouchableOpacity>

            <View style={styles.userSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#00ff41" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.username}>OPERADOR_047</Text>
                <Text style={styles.realName}>Marcus Silva</Text>
              </View>
            </View>
          </View>

          {/* Right - Notifications & Settings */}
          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
              <Ionicons name="notifications" size={20} color="#ff9500" />
              {notifications > 0 && (
                <Animated.View
                  style={[
                    styles.notificationBadge,
                    {
                      transform: [{ scale: notificationAnim }],
                    },
                  ]}
                >
                  <Text style={styles.notificationCount}>{notifications}</Text>
                </Animated.View>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
              <Ionicons name="settings" size={20} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Center - Level & XP */}
        <View style={styles.xpSection}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>NÍVEL </Text>
            <Text style={styles.levelValue}>{userLevel}</Text>
          </View>

          <View style={styles.xpBarContainer}>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, { width: `${xpPercentage}%` }]} />
            </View>
            <Text style={styles.xpText}>
              {userXP.toLocaleString()} / {maxXP.toLocaleString()} XP
            </Text>
          </View>
        </View>

        {/* Quick stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statsLeft}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>SESSÃO ATUAL:</Text>
              <Text style={styles.statValue}>47 MIN</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>CALORIAS:</Text>
              <Text style={styles.statValueGreen}>347 KCAL</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>STREAK:</Text>
              <Text style={styles.statValueYellow}>12 DIAS</Text>
            </View>
          </View>

          <Text style={styles.versionText}>SISTEMA v2.1.7</Text>
        </View>

        {/* Terminal-style notification */}
        <View style={styles.terminalNotification}>
          <Animated.Text style={[styles.terminalText, { opacity: pulseAnim }]}>
            &gt; PROTOCOLO_HIPERTROFIA.exe carregado com sucesso
          </Animated.Text>
        </View>
      </View>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <View style={styles.menuOverlay}>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>MENU PRINCIPAL</Text>

            <View style={styles.menuGrid}>
              <MenuButton
                title="PROTOCOLOS"
                color="#00ff41"
                onPress={() => console.log('Protocolos')}
              />
              <MenuButton
                title="ESTATÍSTICAS"
                color="#a855f7"
                onPress={() => console.log('Estatísticas')}
              />
              <MenuButton
                title="CONQUISTAS"
                color="#ff9500"
                onPress={() => console.log('Conquistas')}
              />
              <MenuButton
                title="PERFIL"
                color="#00d4ff"
                onPress={() => console.log('Perfil')}
              />
            </View>

            <View style={styles.menuFooter}>
              <TouchableOpacity
                style={styles.closeMenuButton}
                onPress={() => setIsMenuOpen(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeMenuText}>FECHAR INTERFACE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#00ff4150',
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 2,
    height: '100%',
    backgroundColor: '#00d4ff',
    opacity: 0.6,
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: '#00ff41',
    borderRadius: 3,
  },
  statusText: {
    color: '#66ff66',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  timeText: {
    color: '#888888',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  heartRateText: {
    color: '#ff6b6b',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  batteryText: {
    color: '#ffd93d',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalBar: {
    width: 16,
    height: 8,
    borderWidth: 1,
    borderColor: '#00ff4150',
  },
  signalFill: {
    height: '100%',
    width: '80%',
    backgroundColor: '#00ff41',
  },
  signalText: {
    color: '#888888',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuToggle: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#00d4ff50',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#00ff41',
    backgroundColor: '#00ff4110',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    gap: 2,
  },
  username: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  realName: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ff950050',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  settingsButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#666666',
  },
  xpSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelLabel: {
    color: '#a855f7',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  levelValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  xpBarContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  xpBar: {
    width: '100%',
    height: 8,
    borderWidth: 1,
    borderColor: '#a855f750',
    backgroundColor: '#000000',
    marginBottom: 4,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#a855f7',
  },
  xpText: {
    color: '#888888',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    marginBottom: 8,
  },
  statsLeft: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    color: '#888888',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  statValue: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statValueGreen: {
    color: '#00ff41',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statValueYellow: {
    color: '#ffd93d',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  versionText: {
    color: '#888888',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  terminalNotification: {
    marginTop: 8,
  },
  terminalText: {
    color: '#00ff41',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  menuOverlay: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#00d4ff30',
    zIndex: 20,
  },
  menuContent: {
    padding: 16,
  },
  menuTitle: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuButton: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderWidth: 1,
  },
  menuButtonText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
    marginTop: 16,
  },
  closeMenuButton: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#666666',
    alignItems: 'center',
  },
  closeMenuText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default CyberpunkHeader;