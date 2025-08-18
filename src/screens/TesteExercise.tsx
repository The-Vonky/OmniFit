import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Modal, 
  TextInput,
  Alert,
  Dimensions,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Dados do exercício
const exerciseData = {
  id: 1,
  name: 'Supino Reto Barra',
  category: 'PEITO',
  targetMuscles: ['Peitoral Maior', 'Tríceps', 'Deltoide Anterior'],
  currentWeight: 60,
  targetSets: 4,
  targetReps: '10-12',
  completedSets: [],
  videoUrl: 'https://example.com/supino-reto.gif', // URL do GIF
  technique: [
    'Deite no banco com os pés apoiados no chão',
    'Segure a barra com pegada pronada, um pouco mais larga que os ombros',
    'Retire a barra do suporte e posicione sobre o peito',
    'Desça controladamente até tocar levemente o peito',
    'Empurre a barra para cima contraindo o peitoral'
  ]
};

const motivationalMessages = [
  "Vai com tudo, você consegue! 💪",
  "Essa série tá no papo! 🔥",
  "Focada no objetivo, sempre! ✨",
  "Você tá arrasando hoje! 🌟",
  "Mais uma série dominada! 👑"
];

const ExerciseScreen = () => {
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showDropsetModal, setShowDropsetModal] = useState(false);
  const [showTechniqueModal, setShowTechniqueModal] = useState(false);
  const [tempWeight, setTempWeight] = useState(exerciseData.currentWeight.toString());
  const [tempReps, setTempReps] = useState('');
  const [dropsetReps, setDropsetReps] = useState('');
  const [dropsetWeight, setDropsetWeight] = useState('');
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animações
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    let interval;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
      Alert.alert('🔥 Bora!', 'Descanso acabou! Vamos pra próxima série!');
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const startRest = () => {
    setIsResting(true);
    setRestTimer(90); // 1:30 de descanso
  };

  const completeSet = (reps, weight, hasDropset = false, dropsetData = null) => {
    const setData = {
      set: currentSet,
      reps: parseInt(reps),
      weight: parseFloat(weight),
      hasDropset,
      dropset: dropsetData
    };

    const newCompletedSets = [...completedSets, setData];
    setCompletedSets(newCompletedSets);

    if (currentSet < exerciseData.targetSets) {
      setCurrentSet(currentSet + 1);
      startRest();
    }

    // Mensagem motivacional
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    Alert.alert('🎉 Série completa!', randomMessage);
  };

  const handleQuickComplete = () => {
    setTempWeight(exerciseData.currentWeight.toString());
    setTempReps('');
    setShowAdjustModal(true);
  };

  const handleDropsetComplete = () => {
    if (!tempReps || !tempWeight) {
      Alert.alert('Opa!', 'Preenche os dados da série normal primeiro! 😊');
      return;
    }
    setDropsetWeight((parseFloat(tempWeight) * 0.75).toString()); // 25% menos peso
    setShowDropsetModal(true);
  };

  const confirmSet = () => {
    if (!tempReps || !tempWeight) {
      Alert.alert('Opa!', 'Preenche peso e reps aí! 😊');
      return;
    }
    completeSet(tempReps, tempWeight);
    setShowAdjustModal(false);
    setTempReps('');
  };

  const confirmDropset = () => {
    if (!dropsetReps || !dropsetWeight) {
      Alert.alert('Opa!', 'Preenche os dados do dropset! 💪');
      return;
    }
    
    const dropsetData = {
      reps: parseInt(dropsetReps),
      weight: parseFloat(dropsetWeight)
    };
    
    completeSet(tempReps, tempWeight, true, dropsetData);
    setShowAdjustModal(false);
    setShowDropsetModal(false);
    setTempReps('');
    setDropsetReps('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.exerciseName}>{exerciseData.name}</Text>
        <Text style={styles.category}>{exerciseData.category}</Text>
      </View>
      <TouchableOpacity 
        style={styles.helpButton}
        onPress={() => setShowTechniqueModal(true)}
      >
        <Text style={styles.helpIcon}>?</Text>
      </TouchableOpacity>
    </View>
  );

  const VideoSection = () => (
    <View style={styles.videoContainer}>
      <LinearGradient
        colors={['rgba(139,92,246,0.1)', 'rgba(0,255,247,0.1)']}
        style={styles.videoPlaceholder}
      >
        <Text style={styles.videoText}>🎬 GIF do Exercício</Text>
        <Text style={styles.videoSubtext}>Execução perfeita da técnica</Text>
      </LinearGradient>
    </View>
  );

  const CurrentSetInfo = () => (
    <View style={styles.currentSetContainer}>
      <LinearGradient
        colors={['rgba(0,255,247,0.1)', 'rgba(139,92,246,0.1)']}
        style={styles.currentSetCard}
      >
        <View style={styles.setHeader}>
          <Text style={styles.setTitle}>SÉRIE ATUAL</Text>
          <Animated.Text style={[
            styles.setNumber,
            { transform: [{ scale: pulseAnim }] }
          ]}>
            {currentSet}/{exerciseData.targetSets}
          </Animated.Text>
        </View>
        
        <View style={styles.targetInfo}>
          <View style={styles.targetItem}>
            <Text style={styles.targetLabel}>META</Text>
            <Text style={styles.targetValue}>{exerciseData.targetReps} reps</Text>
          </View>
          <View style={styles.targetItem}>
            <Text style={styles.targetLabel}>PESO</Text>
            <Text style={styles.targetValue}>{exerciseData.currentWeight}kg</Text>
          </View>
        </View>

        {isResting && (
          <View style={styles.restContainer}>
            <Text style={styles.restLabel}>DESCANSO</Text>
            <Animated.Text style={[
              styles.restTimer,
              { 
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1]
                })
              }
            ]}>
              {formatTime(restTimer)}
            </Animated.Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );

  const ActionButtons = () => (
    <View style={styles.actionContainer}>
      <TouchableOpacity 
        style={styles.quickButton}
        onPress={handleQuickComplete}
        disabled={isResting}
      >
        <LinearGradient
          colors={isResting ? ['#555', '#333'] : ['#10B981', '#059669']}
          style={styles.quickButtonGradient}
        >
          <Text style={styles.quickButtonText}>
            {isResting ? 'DESCANSANDO...' : 'COMPLETAR SÉRIE'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.dropsetButton}
        onPress={handleDropsetComplete}
        disabled={isResting}
      >
        <LinearGradient
          colors={isResting ? ['#555', '#333'] : ['#8B5CF6', '#EC4899']}
          style={styles.dropsetButtonGradient}
        >
          <Text style={styles.dropsetButtonText}>+ DROPSET</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const SetHistory = () => (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>SÉRIES COMPLETADAS</Text>
      {completedSets.map((set, index) => (
        <View key={index} style={styles.historyItem}>
          <LinearGradient
            colors={['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.05)']}
            style={styles.historyCard}
          >
            <Text style={styles.historyText}>
              Série {set.set}: {set.reps} reps × {set.weight}kg
              {set.hasDropset && (
                <Text style={styles.dropsetText}>
                  {' '}+ Dropset: {set.dropset.reps} reps × {set.dropset.weight}kg
                </Text>
              )}
            </Text>
            <Text style={styles.historyCheck}>✓</Text>
          </LinearGradient>
        </View>
      ))}
    </View>
  );

  const MuscleInfo = () => (
    <View style={styles.muscleContainer}>
      <Text style={styles.muscleTitle}>MÚSCULOS TRABALHADOS</Text>
      <View style={styles.muscleList}>
        {exerciseData.targetMuscles.map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Modais
  const AdjustModal = () => (
    <Modal visible={showAdjustModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(13,13,13,0.95)', 'rgba(0,0,0,0.95)']}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Registrar Série</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Repetições</Text>
              <TextInput
                style={styles.input}
                value={tempReps}
                onChangeText={setTempReps}
                keyboardType="numeric"
                placeholder="12"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                value={tempWeight}
                onChangeText={setTempWeight}
                keyboardType="numeric"
                placeholder="60"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowAdjustModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmSet}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.confirmButtonGradient}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  const DropsetModal = () => (
    <Modal visible={showDropsetModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(13,13,13,0.95)', 'rgba(0,0,0,0.95)']}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Registrar Dropset</Text>
            <Text style={styles.modalSubtitle}>
              Série normal: {tempReps} reps × {tempWeight}kg
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Reps no Dropset</Text>
              <TextInput
                style={styles.input}
                value={dropsetReps}
                onChangeText={setDropsetReps}
                keyboardType="numeric"
                placeholder="8"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Peso Dropset (kg)</Text>
              <TextInput
                style={styles.input}
                value={dropsetWeight}
                onChangeText={setDropsetWeight}
                keyboardType="numeric"
                placeholder="45"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowDropsetModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmDropset}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  style={styles.confirmButtonGradient}
                >
                  <Text style={styles.confirmButtonText}>Registrar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  const TechniqueModal = () => (
    <Modal visible={showTechniqueModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(13,13,13,0.95)', 'rgba(0,0,0,0.95)']}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Técnica Perfeita</Text>
            
            <ScrollView style={styles.techniqueScroll}>
              {exerciseData.technique.map((step, index) => (
                <View key={index} style={styles.techniqueStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowTechniqueModal(false)}
            >
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                style={styles.confirmButtonGradient}
              >
                <Text style={styles.confirmButtonText}>Entendi!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <VideoSection />
        <CurrentSetInfo />
        <ActionButtons />
        <SetHistory />
        <MuscleInfo />
        <View style={{ height: 50 }} />
      </ScrollView>

      <AdjustModal />
      <DropsetModal />
      <TechniqueModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  category: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 2,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139,92,246,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  // Video Section
  videoContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  videoPlaceholder: {
    height: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  videoSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },

  // Current Set
  currentSetContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  currentSetCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,255,247,0.3)',
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  setTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  setNumber: {
    color: '#00FFF7',
    fontSize: 24,
    fontWeight: '900',
  },
  targetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  targetItem: {
    alignItems: 'center',
  },
  targetLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  targetValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  restContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  restLabel: {
    color: '#EC4899',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  restTimer: {
    color: '#EC4899',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 8,
  },

  // Action Buttons
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  quickButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dropsetButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropsetButtonGradient: {
    padding: 12,
    alignItems: 'center',
  },
  dropsetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // History
  historyContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  historyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  historyItem: {
    marginBottom: 8,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  dropsetText: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '500',
  },
  historyCheck: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
  },

  // Muscle Info
  muscleContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  muscleTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  muscleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    backgroundColor: 'rgba(139,92,246,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    maxHeight: height * 0.8,
  },
  modalContent: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#8B5CF6',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  modalButtonText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    padding: 16,
  },
  confirmButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalCloseButton: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  // Technique Modal
  techniqueScroll: {
    maxHeight: 300,
    marginBottom: 20,
  },
  techniqueStep: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});

export default ExerciseScreen;