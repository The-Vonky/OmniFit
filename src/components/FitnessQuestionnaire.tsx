import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale';
  options: string[];
}

const questions: Question[] = [
  {
    id: 'goal',
    question: 'Qual é o seu principal objetivo?',
    type: 'single',
    options: ['Perder peso', 'Ganhar massa muscular', 'Manter o peso atual', 'Melhorar condicionamento']
  },
  {
    id: 'experience',
    question: 'Qual sua experiência com exercícios?',
    type: 'single',
    options: ['Iniciante (0-6 meses)', 'Intermediário (6 meses - 2 anos)', 'Avançado (2+ anos)', 'Atleta/Competidor']
  },
  {
    id: 'frequency',
    question: 'Quantos dias por semana você pode treinar?',
    type: 'single',
    options: ['1-2 dias', '3-4 dias', '5-6 dias', '7 dias']
  },
  {
    id: 'time',
    question: 'Quanto tempo você tem por treino?',
    type: 'single',
    options: ['30-45 minutos', '45-60 minutos', '60-90 minutos', '90+ minutos']
  },
  {
    id: 'equipment',
    question: 'Que equipamentos você tem acesso?',
    type: 'multiple',
    options: ['Academia completa', 'Halteres em casa', 'Elásticos/Faixas', 'Apenas peso corporal', 'Barra fixa', 'Esteira/Bicicleta']
  },
  {
    id: 'diet_goal',
    question: 'Qual seu objetivo com a dieta?',
    type: 'single',
    options: ['Perder gordura', 'Ganhar massa', 'Manter peso', 'Melhorar saúde geral']
  },
  {
    id: 'restrictions',
    question: 'Você tem alguma restrição alimentar?',
    type: 'multiple',
    options: ['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose', 'Diabético', 'Nenhuma restrição']
  },
  {
    id: 'meals',
    question: 'Quantas refeições você prefere por dia?',
    type: 'single',
    options: ['3 refeições', '4-5 refeições', '6+ refeições', 'Jejum intermitente']
  },
  {
    id: 'cooking',
    question: 'Qual seu nível de habilidade culinária?',
    type: 'single',
    options: ['Básico (sanduíches, saladas)', 'Intermediário (pratos simples)', 'Avançado (qualquer receita)', 'Prefiro não cozinhar']
  },
  {
    id: 'motivation',
    question: 'O quão motivado você se sente? (1-10)',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  }
];

export default function FitnessQuestionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = (questionId: string, answer: string, isMultiple: boolean = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [answer] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex(currentIndex - 1);
      scrollViewRef.current?.scrollTo({ x: (currentIndex - 1) * width, animated: true });
    }
  };

  const isAnswered = (questionId: string) => {
    return answers[questionId] && answers[questionId].length > 0;
  };

  const generatePlan = () => {
    // Aqui você implementaria a lógica para gerar o plano
    console.log('Respostas:', answers);
    alert('Plano personalizado será gerado com base nas suas respostas!');
  };

  if (isCompleted) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ backgroundColor: '#1e293b', borderRadius: 20, padding: 30, alignItems: 'center', width: '100%' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#10b981', marginBottom: 20, textAlign: 'center' }}>
            🎉 Questionário Concluído!
          </Text>
          <Text style={{ fontSize: 16, color: '#94a3b8', marginBottom: 30, textAlign: 'center', lineHeight: 24 }}>
            Agora vamos criar um plano personalizado de treino e dieta especialmente para você!
          </Text>
          <TouchableOpacity
            onPress={generatePlan}
            style={{
              backgroundColor: '#10b981',
              paddingHorizontal: 40,
              paddingVertical: 15,
              borderRadius: 25,
              elevation: 5,
              shadowColor: '#10b981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              Gerar Meu Plano
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      {/* Header com progresso */}
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ color: '#64748b', fontSize: 16 }}>
            {currentIndex + 1} de {questions.length}
          </Text>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <View style={{ height: 8, backgroundColor: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
              <View 
                style={{ 
                  height: '100%', 
                  backgroundColor: '#10b981', 
                  width: `${progress}%`,
                  borderRadius: 4,
                }} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Card da pergunta */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
      >
        {questions.map((question, index) => (
          <Animated.View 
            key={question.id}
            style={{ 
              width,
              flex: 1,
              paddingHorizontal: 20,
              opacity: index === currentIndex ? fadeAnim : 0.3
            }}
          >
            <View style={{
              backgroundColor: '#1e293b',
              borderRadius: 20,
              padding: 30,
              flex: 1,
              marginBottom: 20,
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#f8fafc',
                marginBottom: 30,
                lineHeight: 32,
                textAlign: 'center'
              }}>
                {question.question}
              </Text>

              <View style={{ flex: 1 }}>
                {question.type === 'scale' ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {question.options.map((option) => {
                      const isSelected = answers[question.id]?.includes(option);
                      return (
                        <TouchableOpacity
                          key={option}
                          onPress={() => handleAnswer(question.id, option)}
                          style={{
                            backgroundColor: isSelected ? '#10b981' : '#334155',
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            borderRadius: 50,
                            margin: 5,
                            minWidth: 60,
                            alignItems: 'center',
                            elevation: isSelected ? 5 : 2,
                            shadowColor: isSelected ? '#10b981' : '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                          }}
                        >
                          <Text style={{
                            color: isSelected ? 'white' : '#cbd5e1',
                            fontSize: 18,
                            fontWeight: isSelected ? '600' : '400'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <View>
                    {question.options.map((option) => {
                      const isSelected = answers[question.id]?.includes(option);
                      return (
                        <TouchableOpacity
                          key={option}
                          onPress={() => handleAnswer(question.id, option, question.type === 'multiple')}
                          style={{
                            backgroundColor: isSelected ? '#10b981' : '#334155',
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            borderRadius: 15,
                            marginBottom: 12,
                            elevation: isSelected ? 5 : 2,
                            shadowColor: isSelected ? '#10b981' : '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                          }}
                        >
                          <Text style={{
                            color: isSelected ? 'white' : '#cbd5e1',
                            fontSize: 16,
                            fontWeight: isSelected ? '600' : '400',
                            textAlign: 'center'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Botões de navegação */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20
      }}>
        <TouchableOpacity
          onPress={prevQuestion}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: currentIndex === 0 ? '#334155' : '#475569',
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 25,
            opacity: currentIndex === 0 ? 0.5 : 1
          }}
        >
          <Text style={{ color: '#cbd5e1', fontSize: 16, fontWeight: '500' }}>
            ← Anterior
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={nextQuestion}
          disabled={!isAnswered(currentQuestion.id)}
          style={{
            backgroundColor: isAnswered(currentQuestion.id) ? '#10b981' : '#334155',
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 25,
            opacity: isAnswered(currentQuestion.id) ? 1 : 0.5,
            elevation: isAnswered(currentQuestion.id) ? 5 : 0,
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600'
          }}>
            {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}