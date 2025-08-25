import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'input' | 'slider';
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  unit?: string;
  category: 'perfil' | 'físico' | 'saúde' | 'treino' | 'dieta' | 'lifestyle';
}

const questions: Question[] = [
  // PERFIL BÁSICO
  {
    id: 'age',
    question: 'Qual sua idade?',
    type: 'slider',
    min: 16,
    max: 80,
    unit: 'anos',
    category: 'perfil'
  },
  {
    id: 'gender',
    question: 'Qual seu sexo biológico?',
    type: 'single',
    options: ['Masculino', 'Feminino'],
    category: 'perfil'
  },
  {
    id: 'height',
    question: 'Qual sua altura?',
    type: 'slider',
    min: 140,
    max: 220,
    unit: 'cm',
    category: 'físico'
  },
  {
    id: 'weight',
    question: 'Qual seu peso atual?',
    type: 'slider',
    min: 40,
    max: 200,
    unit: 'kg',
    category: 'físico'
  },
  {
    id: 'body_fat',
    question: 'Você sabe seu percentual de gordura corporal?',
    type: 'single',
    options: ['Muito baixo (5-10%)', 'Baixo (10-15%)', 'Normal (15-20%)', 'Alto (20-25%)', 'Muito alto (25%+)', 'Não sei'],
    category: 'físico'
  },
  {
    id: 'target_weight',
    question: 'Qual seu peso objetivo?',
    type: 'slider',
    min: 40,
    max: 200,
    unit: 'kg',
    category: 'físico'
  },

  // HISTÓRICO DE SAÚDE
  {
    id: 'health_conditions',
    question: 'Você tem alguma condição de saúde?',
    type: 'multiple',
    options: ['Diabetes tipo 1', 'Diabetes tipo 2', 'Hipertensão', 'Problemas cardíacos', 'Problemas na tireoide', 'Artrite/Problemas articulares', 'Lesões anteriores', 'Nenhuma'],
    category: 'saúde'
  },
  {
    id: 'injuries',
    question: 'Você tem alguma lesão ou limitação física?',
    type: 'multiple',
    options: ['Problemas no joelho', 'Problemas nas costas/lombar', 'Problemas no ombro', 'Problemas no punho', 'Problemas no pescoço', 'Outras lesões', 'Nenhuma limitação'],
    category: 'saúde'
  },
  {
    id: 'medications',
    question: 'Você toma algum medicamento regularmente?',
    type: 'single',
    options: ['Sim, afeta meu treino', 'Sim, mas não afeta', 'Não tomo medicamentos'],
    category: 'saúde'
  },

  // EXPERIÊNCIA E OBJETIVOS
  {
    id: 'main_goal',
    question: 'Qual seu objetivo PRINCIPAL?',
    type: 'single',
    options: ['Perder gordura rapidamente', 'Perder gordura mantendo músculos', 'Ganhar massa muscular', 'Ganhar peso/massa geral', 'Melhorar performance esportiva', 'Melhorar saúde geral', 'Recomposição corporal'],
    category: 'treino'
  },
  {
    id: 'secondary_goals',
    question: 'Objetivos secundários (pode marcar vários):',
    type: 'multiple',
    options: ['Aumentar força', 'Melhorar resistência', 'Aumentar flexibilidade', 'Melhorar postura', 'Reduzir estresse', 'Melhorar sono', 'Aumentar energia'],
    category: 'treino'
  },
  {
    id: 'experience_level',
    question: 'Há quanto tempo você treina CONSISTENTEMENTE?',
    type: 'single',
    options: ['Nunca treinei', '1-3 meses', '3-6 meses', '6-12 meses', '1-2 anos', '2-5 anos', '5+ anos'],
    category: 'treino'
  },
  {
    id: 'training_types',
    question: 'Que tipos de treino você já fez?',
    type: 'multiple',
    options: ['Musculação', 'Cardio (esteira/bicicleta)', 'Funcional/CrossFit', 'Pilates/Yoga', 'Natação', 'Corrida', 'Artes marciais', 'Esportes coletivos', 'Nunca treinei'],
    category: 'treino'
  },

  // PREFERÊNCIAS DE TREINO
  {
    id: 'workout_frequency',
    question: 'Quantos dias por semana você REALMENTE pode treinar?',
    type: 'single',
    options: ['1-2 dias (fins de semana)', '3 dias alternados', '4 dias', '5 dias', '6 dias', '7 dias (todos os dias)'],
    category: 'treino'
  },
  {
    id: 'workout_time',
    question: 'Quanto tempo você tem DISPONÍVEL por treino?',
    type: 'single',
    options: ['15-30 min (express)', '30-45 min', '45-60 min', '60-90 min', '90+ min (sem pressa)'],
    category: 'treino'
  },
  {
    id: 'preferred_time',
    question: 'Qual o melhor horário para você treinar?',
    type: 'single',
    options: ['Manhã (6h-10h)', 'Meio-dia (10h-14h)', 'Tarde (14h-18h)', 'Noite (18h-22h)', 'Madrugada (22h+)', 'Varia muito'],
    category: 'treino'
  },
  {
    id: 'training_location',
    question: 'Onde você vai treinar principalmente?',
    type: 'single',
    options: ['Academia completa', 'Academia básica (sem todos equipamentos)', 'Em casa (com equipamentos)', 'Em casa (só peso corporal)', 'Ao ar livre', 'Varia conforme o dia'],
    category: 'treino'
  },
  {
    id: 'equipment_access',
    question: 'Que equipamentos você tem acesso?',
    type: 'multiple',
    options: ['Barras e anilhas livres', 'Halteres variados', 'Máquinas de musculação', 'Esteira/bicicleta ergométrica', 'Elásticos/faixas', 'TRX/fitas de suspensão', 'Kettlebells', 'Barra fixa', 'Apenas peso corporal'],
    category: 'treino'
  },
  {
    id: 'workout_preferences',
    question: 'Que tipo de treino você PREFERE?',
    type: 'multiple',
    options: ['Treinos curtos e intensos', 'Treinos longos e moderados', 'Muito peso e poucas repetições', 'Peso moderado e muitas repetições', 'Exercícios compostos (agachamento, supino)', 'Exercícios isolados (rosca, tríceps)', 'Treino em grupo/parceiro', 'Treino sozinho'],
    category: 'treino'
  },

  // ESTILO DE VIDA
  {
    id: 'activity_level',
    question: 'Qual seu nível de atividade FORA do treino?',
    type: 'single',
    options: ['Muito sedentário (escritório, pouco movimento)', 'Levemente ativo (caminhadas ocasionais)', 'Moderadamente ativo (10k+ passos/dia)', 'Muito ativo (trabalho físico/esporte)', 'Extremamente ativo (atleta/trabalho braçal)'],
    category: 'lifestyle'
  },
  {
    id: 'sleep_quality',
    question: 'Como está sua qualidade de sono?',
    type: 'single',
    options: ['Péssima (menos de 5h/insônia)', 'Ruim (5-6h inquietas)', 'Regular (6-7h com interrupções)', 'Boa (7-8h qualidade ok)', 'Excelente (8h+ sono profundo)'],
    category: 'lifestyle'
  },
  {
    id: 'stress_level',
    question: 'Qual seu nível de estresse atual?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    category: 'lifestyle'
  },

  // DIETA DETALHADA
  {
    id: 'current_diet',
    question: 'Como você descreveria sua alimentação atual?',
    type: 'single',
    options: ['Muito ruim (fast food, industrializados)', 'Ruim (pouca variedade, irregular)', 'Regular (tenta comer bem às vezes)', 'Boa (maioria das refeições saudáveis)', 'Excelente (controlada e balanceada)'],
    category: 'dieta'
  },
  {
    id: 'diet_restrictions',
    question: 'Você tem restrições ou preferências alimentares?',
    type: 'multiple',
    options: ['Vegetariano', 'Vegano', 'Sem glúten (celíaco)', 'Sem lactose (intolerante)', 'Low carb', 'Cetogênica', 'Diabético', 'Hipertensão (baixo sódio)', 'Sem restrições'],
    category: 'dieta'
  },
  {
    id: 'food_allergies',
    question: 'Você tem alergia a algum alimento?',
    type: 'multiple',
    options: ['Amendoim/castanhas', 'Frutos do mar', 'Ovos', 'Leite/derivados', 'Soja', 'Glúten', 'Outras alergias', 'Nenhuma alergia'],
    category: 'dieta'
  },
  {
    id: 'meal_frequency',
    question: 'Quantas refeições você consegue fazer por dia?',
    type: 'single',
    options: ['2 refeições (jejum intermitente)', '3 refeições tradicionais', '4-5 refeições menores', '6+ refeições (bodybuilder)', 'Varia muito (irregular)'],
    category: 'dieta'
  },
  {
    id: 'cooking_ability',
    question: 'Qual sua habilidade na cozinha?',
    type: 'single',
    options: ['Não sei cozinhar nada', 'Só o básico (ovos, macarrão)', 'Intermediário (alguns pratos)', 'Avançado (cozinho bem)', 'Expert (chef caseiro)'],
    category: 'dieta'
  },
  {
    id: 'meal_prep',
    question: 'Você tem tempo para preparar refeições?',
    type: 'single',
    options: ['Nunca (sempre pedindo)', 'Raramente (fins de semana)', 'Às vezes (quando dá tempo)', 'Frequentemente (maioria dos dias)', 'Sempre (gosto de cozinhar)'],
    category: 'dieta'
  },
  {
    id: 'budget_food',
    question: 'Qual seu orçamento mensal para alimentação?',
    type: 'single',
    options: ['Muito baixo (até R$300)', 'Baixo (R$300-500)', 'Médio (R$500-800)', 'Alto (R$800-1200)', 'Sem limite específico'],
    category: 'dieta'
  },
  {
    id: 'water_intake',
    question: 'Quanta água você bebe por dia?',
    type: 'single',
    options: ['Menos de 1L', '1-1.5L', '1.5-2L', '2-3L', 'Mais de 3L', 'Não sei/não controlo'],
    category: 'dieta'
  },
  {
    id: 'supplements',
    question: 'Você toma algum suplemento atualmente?',
    type: 'multiple',
    options: ['Whey protein', 'Creatina', 'Multivitamínico', 'Vitamina D', 'Ômega 3', 'BCAA', 'Pre-treino', 'Outros', 'Nenhum'],
    category: 'dieta'
  },

  // MOTIVAÇÃO E COMPROMISSO
  {
    id: 'motivation_level',
    question: 'Qual seu nível de motivação ATUAL?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    category: 'lifestyle'
  },
  {
    id: 'previous_attempts',
    question: 'Você já tentou emagrecer/ganhar massa antes?',
    type: 'single',
    options: ['Nunca tentei', 'Tentei 1-2 vezes', 'Tentei várias vezes', 'Sempre estou tentando', 'Já consegui mas voltou tudo'],
    category: 'lifestyle'
  },
  {
    id: 'biggest_challenges',
    question: 'Quais são seus maiores desafios?',
    type: 'multiple',
    options: ['Falta de tempo', 'Falta de motivação', 'Não sei o que fazer', 'Falta de dinheiro', 'Problemas de saúde', 'Falta de apoio familiar', 'Ansiedade/compulsão', 'Trabalho muito estressante'],
    category: 'lifestyle'
  },
  {
    id: 'timeline',
    question: 'Em quanto tempo você quer ver resultados significativos?',
    type: 'single',
    options: ['1 mês (urgente)', '2-3 meses (rápido)', '3-6 meses (realista)', '6-12 meses (sem pressa)', 'Mais de 1 ano (foco saúde)'],
    category: 'lifestyle'
  }
];

export default function DetailedFitnessQuestionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: string, answer: string | number, isMultiple: boolean = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a: any) => a !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: answer };
      }
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isAnswered = (questionId: string) => {
    const answer = answers[questionId];
    return answer !== undefined && answer !== null && (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const generateDetailedPlan = () => {
    console.log('Respostas completas:', answers);
    Alert.alert(
      '🎯 Plano Personalizado',
      'Agora sim! Com essas informações detalhadas podemos criar um plano REALMENTE personalizado!',
      [{ text: 'Continuar' }]
    );
  };

  const categoryColors: Record<string, string> = {
    perfil: '#60a5fa',
    físico: '#10b981', 
    saúde: '#f87171',
    treino: '#fb923c',
    dieta: '#22c55e',
    lifestyle: '#a855f7'
  };

  if (isCompleted) {
    return (
      <LinearGradient
        colors={['#0f172a', '#1e3a8a', '#0f172a']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.completionContainer}>
            <Text style={styles.completionEmoji}>🎯</Text>
            <Text style={styles.completionTitle}>
              Análise Completa{'\n'}Finalizada!
            </Text>
            <Text style={styles.completionDescription}>
              Agora temos <Text style={styles.highlight}>{Object.keys(answers).length} dados específicos</Text> sobre você!
            </Text>
            <Text style={styles.completionSubtext}>
              Com essas informações detalhadas, podemos criar um plano REALMENTE personalizado, considerando suas limitações, preferências e objetivos específicos.
            </Text>
            <TouchableOpacity onPress={generateDetailedPlan} style={styles.completionButton}>
              <LinearGradient
                colors={['#10b981', '#14b8a6']}
                style={styles.completionButtonGradient}
              >
                <Text style={styles.completionButtonText}>🚀 Gerar Plano Personalizado</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <LinearGradient
      colors={['#0f172a', '#1e3a8a', '#0f172a']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Header com progresso */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentIndex + 1} de {questions.length}
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
          <Text style={[styles.categoryText, { color: categoryColors[currentQuestion.category] }]}>
            📊 {currentQuestion.category.toUpperCase()}
          </Text>
        </View>

        {/* Container do card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <ScrollView style={styles.answersContainer} showsVerticalScrollIndicator={false}>
              {currentQuestion.type === 'slider' ? (
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderValueContainer}>
                    <Text style={styles.sliderValue}>
                      {answers[currentQuestion.id] || currentQuestion.min}
                    </Text>
                    <Text style={styles.sliderUnit}>{currentQuestion.unit}</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={currentQuestion.min}
                    maximumValue={currentQuestion.max}
                    value={answers[currentQuestion.id] || currentQuestion.min}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, Math.round(value))}
                    minimumTrackTintColor="#10b981"
                    maximumTrackTintColor="#475569"
                    thumbStyle={styles.sliderThumb}
                  />
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>{currentQuestion.min}{currentQuestion.unit}</Text>
                    <Text style={styles.sliderLabel}>{currentQuestion.max}{currentQuestion.unit}</Text>
                  </View>
                </View>
              ) : currentQuestion.type === 'scale' ? (
                <View style={styles.scaleContainer}>
                  {currentQuestion.options!.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleAnswer(currentQuestion.id, option)}
                        style={[
                          styles.scaleButton,
                          isSelected ? styles.scaleButtonSelected : styles.scaleButtonUnselected
                        ]}
                      >
                        <Text style={[
                          styles.scaleButtonText,
                          { color: isSelected ? '#ffffff' : '#cbd5e1' }
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.optionsContainer}>
                  {currentQuestion.options!.map((option) => {
                    const isSelected = Array.isArray(answers[currentQuestion.id]) 
                      ? answers[currentQuestion.id]?.includes(option)
                      : answers[currentQuestion.id] === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleAnswer(currentQuestion.id, option, currentQuestion.type === 'multiple')}
                        style={[
                          styles.optionButton,
                          isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected
                        ]}
                      >
                        <View style={styles.optionContent}>
                          {currentQuestion.type === 'multiple' && (
                            <View style={[
                              styles.checkbox,
                              isSelected ? styles.checkboxSelected : styles.checkboxUnselected
                            ]}>
                              {isSelected && <View style={styles.checkboxInner} />}
                            </View>
                          )}
                          <Text style={[
                            styles.optionText,
                            { color: isSelected ? '#ffffff' : '#cbd5e1' }
                          ]}>
                            {option}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>

            {/* Dica para múltipla escolha */}
            {currentQuestion.type === 'multiple' && (
              <Text style={styles.multipleHint}>
                💡 Você pode selecionar múltiplas opções
              </Text>
            )}
          </View>
        </View>

        {/* Botões de navegação */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={prevQuestion}
            disabled={currentIndex === 0}
            style={[
              styles.navButton,
              currentIndex === 0 ? styles.navButtonDisabled : styles.navButtonEnabled
            ]}
          >
            <Text style={[
              styles.navButtonText,
              { color: currentIndex === 0 ? '#64748b' : '#cbd5e1' }
            ]}>
              ← Anterior
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextQuestion}
            disabled={!isAnswered(currentQuestion.id)}
            style={[
              styles.nextButton,
              !isAnswered(currentQuestion.id) && styles.nextButtonDisabled
            ]}
          >
            {isAnswered(currentQuestion.id) ? (
              <LinearGradient
                colors={['#10b981', '#14b8a6']}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima →'}
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.nextButtonTextDisabled}>
                {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima →'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  progressText: {
    color: '#94a3b8',
    fontWeight: '500',
    fontSize: 14,
  },
  progressBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 32,
  },
  answersContainer: {
    maxHeight: 400,
  },
  sliderContainer: {
    paddingVertical: 16,
  },
  sliderValueContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10b981',
  },
  sliderUnit: {
    fontSize: 18,
    color: '#94a3b8',
    marginLeft: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 16,
  },
  sliderThumb: {
    backgroundColor: '#10b981',
    width: 24,
    height: 24,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  scaleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  scaleButton: {
    width: (screenWidth - 120) / 5 - 8,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleButtonSelected: {
    backgroundColor: '#10b981',
  },
  scaleButtonUnselected: {
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.5)',
  },
  scaleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionButtonSelected: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  optionButtonUnselected: {
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    borderColor: 'rgba(100, 116, 139, 0.5)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  checkboxUnselected: {
    borderColor: '#94a3b8',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#10b981',
  },
},