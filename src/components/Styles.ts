export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  // Card base
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  cardGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },

  // Header
  header: {
    marginBottom: 10,
  },
  greetingCard: {
    marginBottom: 0,
  },
  greetingContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  greetingInfo: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#00FFF7',
    marginBottom: 4,
    fontFamily: 'Orbitron-Bold',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Orbitron-Regular',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000',
  },

  // Motivation Card
  motivationCard: {
    alignItems: 'center' as const,
  },
  motivationTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF00D4',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
    color: '#FFFFFF',
  },

  // Reminder Card
  reminderCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#10B981',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 8,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  checkButtonChecked: {
    backgroundColor: '#10B981',
  },
  checkMark: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },

  // Notification Bar
  notificationBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 16,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#EF4444',
  },

  // Workout Card
  workoutCard: {},
  workoutHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#F59E0B',
    marginBottom: 4,
    fontFamily: 'Orbitron-Bold',
  },
  workoutTime: {
    fontSize: 12,
    color: '#666666',
  },
  workoutType: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
  },
  workoutTypeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    color: '#F59E0B',
  },
  workoutDetails: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 20,
  },
  workoutDetail: {
    alignItems: 'center' as const,
    gap: 6,
  },
  workoutDetailIcon: {
    fontSize: 16,
  },
  workoutDetailText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center' as const,
  },
  startWorkoutBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center' as const,
    backgroundColor: '#F59E0B',
  },
  startWorkoutText: {
    color: '#000',
    fontWeight: '700' as const,
    fontSize: 16,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },

  // Diet Card
  dietCard: {},
  dietHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#7C3AED',
    fontFamily: 'Orbitron-Bold',
  },
  caloriesMain: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#7C3AED',
  },
  macroGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#7C3AED',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },

  // Progress Card
  progressCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#00FFF7',
    marginBottom: 8,
    fontFamily: 'Orbitron-Bold',
  },
  progressStats: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  progressStat: {
    alignItems: 'flex-start' as const,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#00FFF7',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666666',
  },
  progressRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 255, 247, 0.2)',
    borderWidth: 8,
    borderColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#00FFF7',
  },

  // Tip Card
  tipCard: {},
  tipTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#F59E0B',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CCCCCC',
  },

  // Assistant Button
  assistantBtn: {
    position: 'absolute' as const,
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  assistantBtnGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: '#7C3AED',
  },
  assistantIcon: {
    fontSize: 24,
  },

  // Toast
  toast: {
    position: 'absolute' as const,
    top: 80,
    left: 20,
    right: 20,
    zIndex: 1001,
    borderRadius: 25,
    overflow: 'hidden' as const,
  },
  toastContent: {
    backgroundColor: 'rgba(13, 13, 13, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center' as const,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  },
};

export default styles;