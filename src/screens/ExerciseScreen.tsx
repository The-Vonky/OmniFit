import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Dumbbell, 
  Calendar, 
  User 
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  image: string;
}

const ExerciseScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Bicep Curls',
      equipment: 'Dumbbells',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Bench Press',
      equipment: 'Barbell',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '3',
      name: 'Push-ups',
      equipment: 'Bodyweight',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '4',
      name: 'Pull-ups',
      equipment: 'Pull-up bar',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '5',
      name: 'Squats',
      equipment: 'Bodyweight',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '6',
      name: 'Shoulder Press',
      equipment: 'Dumbbells',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '7',
      name: 'Deadlifts',
      equipment: 'Barbell',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '8',
      name: 'Lunges',
      equipment: 'Bodyweight',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '9',
      name: 'Rows',
      equipment: 'Dumbbells',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '10',
      name: 'Plank',
      equipment: 'Bodyweight',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop&crop=center'
    }
  ];

  const filterOptions = [
    { id: 'muscle', label: 'Muscle Group' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'difficulty', label: 'Difficulty' }
  ];

  const handleBackPress = () => {
    console.log('Voltando para tela anterior...');
  };

  const handleExercisePress = (exercise: Exercise) => {
    console.log(`Exercício selecionado: ${exercise.name}`);
  };

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId === selectedFilter ? '' : filterId);
    console.log(`Filtro selecionado: ${filterId}`);
  };

  const handleNavPress = (screen: string) => {
    console.log(`Navegando para: ${screen}`);
  };

  return (
    <div 
      className="min-h-screen bg-[#161118] text-white flex flex-col justify-between"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center bg-[#161118] p-4 pb-2 justify-between">
          <button 
            onClick={handleBackPress}
            className="text-white flex w-12 h-12 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Exercises
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-3 p-3 overflow-x-auto">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterPress(filter.id)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 transition-colors ${
                selectedFilter === filter.id 
                  ? 'bg-red-500 text-white' 
                  : 'bg-[#332839] text-white hover:bg-[#423449]'
              }`}
            >
              <p className="text-sm font-medium leading-normal">{filter.label}</p>
            </button>
          ))}
        </div>

        {/* Exercise List */}
        <div className="flex-1">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handleExercisePress(exercise)}
              className="flex items-center gap-4 bg-[#161118] px-4 min-h-[72px] py-2 w-full hover:bg-[#1f1726] transition-colors"
            >
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-14 h-14"
                style={{ backgroundImage: `url(${exercise.image})` }}
              />
              <div className="flex flex-col justify-center text-left">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  {exercise.name}
                </p>
                <p className="text-[#b09db9] text-sm font-normal leading-normal line-clamp-2">
                  {exercise.equipment}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-[#332839] bg-[#231c27] px-4 pb-3 pt-2">
          <button
            onClick={() => handleNavPress('home')}
            className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-white hover:bg-white/10 transition-colors p-2"
          >
            <div className="text-white flex h-8 items-center justify-center">
              <Home size={24} fill="currentColor" />
            </div>
          </button>
          
          <button
            onClick={() => handleNavPress('exercises')}
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#b09db9] hover:text-white transition-colors p-2"
          >
            <div className="flex h-8 items-center justify-center">
              <Dumbbell size={24} />
            </div>
          </button>
          
          <button
            onClick={() => handleNavPress('calendar')}
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#b09db9] hover:text-white transition-colors p-2"
          >
            <div className="flex h-8 items-center justify-center">
              <Calendar size={24} />
            </div>
          </button>
          
          <button
            onClick={() => handleNavPress('profile')}
            className="flex flex-1 flex-col items-center justify-end gap-1 text-[#b09db9] hover:text-white transition-colors p-2"
          >
            <div className="flex h-8 items-center justify-center">
              <User size={24} />
            </div>
          </button>
        </div>
        <div className="h-5 bg-[#231c27]"></div>
      </div>
    </div>
  );
};

export default ExerciseScreen;