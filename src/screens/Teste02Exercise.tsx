import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
//import { ExerciseData } from '../../App';

/* interface Teste02ExerciseProps {
  exerciseName: string;
  exerciseData: ExerciseData;
  onBack: () => void;
  onAdjustValue: (type: keyof ExerciseData, change: number) => void;
  onUpdateExerciseData: (data: ExerciseData) => void;
} */

const Teste02Exercise: React.FC<Teste02ExerciseProps> = ({
  exerciseName,
  exerciseData,
  onBack,
  onAdjustValue,
  onUpdateExerciseData,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [dropsetEnabled, setDropsetEnabled] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDropsetToggle = () => {
    setDropsetEnabled(!dropsetEnabled);
  };

  const handleCompleteExercise = () => {
    Alert.alert(
      'Exercício concluído!',
      'Parabéns por completar este exercício.',
      [
        { text: 'OK', onPress: onBack }
      ]
    );
  };

  const handleEditValue = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSaveEdit = () => {
    if (editingField && tempValue) {
      const newData = { ...exerciseData };
      
      if (editingField === 'series') {
        newData.series = parseInt(tempValue) || exerciseData.series;
      } else if (editingField === 'weight') {
        newData.weight = parseInt(tempValue) || exerciseData.weight;
      } else if (editingField === 'reps') {
        newData.reps = tempValue || exerciseData.reps;
      }
      
      onUpdateExerciseData(newData);
    }
    
    setEditingField(null);
    setTempValue('');
  };

  const exerciseTips = [
    {
      category: 'Pegada',
      text: 'Mantenha as mãos um pouco mais largas que a largura dos ombros, com pegada firme mas sem apertar demais.',
    },
    {
      category: 'Postura',
      text: 'Peito estufado, omoplatas retraídas e pés bem apoiados no chão. Mantenha o core contraído durante todo o movimento.',
    },
    {
      category: 'Execução',
      text: 'Descida controlada em 2-3 segundos, pausa no peito e explosão na subida. Evite fazer bouncing na barra.',
    },
    {
      category: 'Equipamento',
      text: 'Ajuste a altura do banco para que seus pés toquem o chão confortavelmente, mantendo a curva lombar natural.',
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.exerciseHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.exerciseTitle}>{exerciseName}</Text>
        
        <TouchableOpacity 
          style={styles.favoriteBtn} 
          onPress={handleFavoriteToggle}
        >
          <Text style={[styles.favoriteBtnText, isFavorite && styles.favoriteBtnActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gifContainer}>
        <Text style={styles.exerciseGif}>
          Demonstração em vídeo{'\n'}
          <Text style={styles.gifSubtext}>GIF/vídeo será carregado aqui</Text>
        </Text>
      </View>

      <View style={styles.controlsSection}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Séries</Text>
          <View style={styles.controlGroup}>
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('series', -1)}
            >
              <Text style={styles.controlBtnText}>−</Text>
            </TouchableOpacity>
            
            {editingField === 'series' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                onBlur={handleSaveEdit}
                onSubmitEditing={handleSaveEdit}
                keyboardType="numeric"
                autoFocus
                selectTextOnFocus
              />
            ) : (
              <TouchableOpacity 
                style={styles.controlValue}
                onPress={() => handleEditValue('series', exerciseData.series.toString())}
              >
                <Text style={styles.controlValueText}>{exerciseData.series}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('series', 1)}
            >
              <Text style={styles.controlBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Repetições</Text>
          <View style={styles.controlGroup}>
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('reps', -1)}
            >
              <Text style={styles.controlBtnText}>−</Text>
            </TouchableOpacity>
            
            {editingField === 'reps' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                onBlur={handleSaveEdit}
                onSubmitEditing={handleSaveEdit}
                autoFocus
                selectTextOnFocus
              />
            ) : (
              <TouchableOpacity 
                style={styles.controlValue}
                onPress={() => handleEditValue('reps', exerciseData.reps)}
              >
                <Text style={styles.controlValueText}>{exerciseData.reps}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('reps', 1)}
            >
              <Text style={styles.controlBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Carga</Text>
          <View style={styles.controlGroup}>
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('weight', -5)}
            >
              <Text style={styles.controlBtnText}>−</Text>
            </TouchableOpacity>
            
            {editingField === 'weight' ? (
              <TextInput
                style={styles.editInput}
                value={tempValue}
                onChangeText={setTempValue}
                onBlur={handleSaveEdit}
                onSubmitEditing={handleSaveEdit}
                keyboardType="numeric"
                autoFocus
                selectTextOnFocus
              />
            ) : (
              <TouchableOpacity 
                style={styles.controlValue}
                onPress={() => handleEditValue('weight', exerciseData.weight.toString())}
              >
                <Text style={styles.controlValueText}>{exerciseData.weight} kg</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.controlBtn} 
              onPress={() => onAdjustValue('weight', 5)}
            >
              <Text style={styles.controlBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dropsetSection}>
          <View style={styles.dropsetToggle}>
            <Text style={styles.dropsetLabel}>Drop set</Text>
            <TouchableOpacity 
              style={[styles.toggleSwitch, dropsetEnabled && styles.toggleSwitchActive]}
              onPress={handleDropsetToggle}
            >
              <View style={[styles.toggleIndicator, dropsetEnabled && styles.toggleIndicatorActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>Como executar</Text>
        
        {exerciseTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={styles.tipCategory}>{tip.category}</Text>
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.actionBtn} onPress={handleCompleteExercise}>
        <Text style={styles.actionBtnText}>Exercício concluído</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  backBtnText: {
    color: '#007aff',
    fontSize: 18,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    color: '#ffffff',
  },
  favoriteBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtnText: {
    color: '#8e8e93',
    fontSize: 18,
  },
  favoriteBtnActive: {
    color: '#ff3b30',
  },
  gifContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  exerciseGif: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  gifSubtext: {
    fontSize: 12,
    opacity: 0.6,
  },
  controlsSection: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  controlGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  controlValue: {
    minWidth: 60,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
  },
  controlValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
  editInput: {
    minWidth: 60,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#007aff',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  dropsetSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
  },
  dropsetToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropsetLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    backgroundColor: '#2c2c2e',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#30d158',
  },
  toggleIndicator: {
    width: 26,
    height: 26,
    backgroundColor: '#ffffff',
    borderRadius: 13,
    alignSelf: 'flex-start',
  },
  toggleIndicatorActive: {
    alignSelf: 'flex-end',
  },
  tipsSection: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  tipItem: {
    marginBottom: 16,
  },
  tipCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007aff',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#8e8e93',
    lineHeight: 20,
  },
  actionBtn: {
    backgroundColor: '#30d158',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Teste02Exercise;