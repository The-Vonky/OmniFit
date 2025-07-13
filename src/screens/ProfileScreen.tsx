import React from 'react';

interface ActivityItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  icon: JSX.Element;
}

interface GoalItem {
  id: string;
  name: string;
  category: string;
  progress: string;
  icon: JSX.Element;
}

interface ProfileScreenProps {
  userName?: string;
  userRole?: string;
  joinedYear?: string;
  profileImage?: string;
  activities?: ActivityItem[];
  goals?: GoalItem[];
  onBackPress?: () => void;
  onNavigate?: (tab: 'home' | 'workouts' | 'progress' | 'profile') => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = "Sophia Carter",
  userRole = "Fitness Enthusiast",
  joinedYear = "2022",
  profileImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmOfJ16rzN8vaFzVpB5v0t6ZhxUZjx3ax4DzssszrGQ3W8z7MkmiVjH1rmEPzO-_Asy5QuPaGdUrZWuEt6IjMVuiLzNcuAez7rN43jhFSLYk7A8CPvyR0xNqx6n_h57PTBP23ERrllHfKObbd1ZAbZe1S-Be0xNYpRCuiTIF3rvsgeJCWmHAEIPAPub5IeA3dnAFkUMxDS7BOaA1WYYMcMyhCEtgAH0dCNbZp1n7ev9cEaD5KlP-Qbo_8UOqgi9ZGLvcwj0TmW5sRh",
  activities = [
    {
      id: '1',
      name: 'Running',
      category: 'Cardio',
      duration: '30 min',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.58,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.35,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z" />
        </svg>
      )
    },
    {
      id: '2',
      name: 'Weightlifting',
      category: 'Strength Training',
      duration: '45 min',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z" />
        </svg>
      )
    },
    {
      id: '3',
      name: 'Yoga',
      category: 'Flexibility',
      duration: '60 min',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.51,73.51,0,0,0-22.17-2.22c4-19.85,1-35.55-2.06-44.86a16.15,16.15,0,0,0-18.79-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.48,94.48,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.15,16.15,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.51,73.51,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.27c3.39,12.57,13.8,36.48,45.33,55.32S113.13,208,128.05,208s42.67,0,74-18.78c31.53-18.84,41.94-42.75,45.33-55.32A16,16,0,0,0,245.83,121.63ZM59.14,72.14a.2.2,0,0,1,.23-.15A70.43,70.43,0,0,1,85.18,83.66,118.65,118.65,0,0,0,80,119.17c0,18.74,3.77,34,9.11,46.28A123.59,123.59,0,0,1,69.57,140C51.55,108.62,55.3,84,59.14,72.14Zm3,103.35C35.47,159.57,26.82,140.05,24,129.7a59.82,59.82,0,0,1,22.5-1.17,129.08,129.08,0,0,0,9.15,19.41,142.28,142.28,0,0,0,34,39.56A114.92,114.92,0,0,1,62.1,175.49ZM128,190.4c-9.33-6.94-32-28.23-32-71.23C96,76.7,118.38,55.24,128,48c9.62,7.26,32,28.72,32,71.19C160,162.17,137.33,183.46,128,190.4ZM170.82,83.66A70.43,70.43,0,0,1,196.63,72a.2.2,0,0,1,.23.15C200.7,84,204.45,108.62,186.43,140a123.32,123.32,0,0,1-19.54,25.48c5.34-12.26,9.11-27.54,9.11-46.28A118.65,118.65,0,0,0,170.82,83.66ZM232,129.72c-2.77,10.25-11.4,29.81-38.09,45.77a114.92,114.92,0,0,1-27.55,12,142.28,142.28,0,0,0,34-39.56,129.08,129.08,0,0,0,9.15-19.41A59.69,59.69,0,0,1,232,129.71Z" />
        </svg>
      )
    }
  ],
  goals = [
    {
      id: '1',
      name: 'Lose 10 lbs',
      category: 'Weight Loss',
      progress: '5 lbs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z" />
        </svg>
      )
    },
    {
      id: '2',
      name: 'Run a marathon',
      category: 'Fitness',
      progress: '10 miles',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z" />
        </svg>
      )
    }
  ],
  onBackPress,
  onNavigate
}) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const handleNavigate = (tab: 'home' | 'workouts' | 'progress' | 'profile') => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
          <div 
            className="text-[#0e141b] flex size-12 shrink-0 items-center cursor-pointer"
            onClick={handleBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Profile
          </h2>
        </div>

        {/* Profile Info */}
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                style={{ backgroundImage: `url("${profileImage}")` }}
              />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                  {userName}
                </p>
                <p className="text-[#4e7097] text-base font-normal leading-normal text-center">
                  {userRole}
                </p>
                <p className="text-[#4e7097] text-base font-normal leading-normal text-center">
                  Joined {joinedYear}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Activity History
        </h2>
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12">
                {activity.icon}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
                  {activity.name}
                </p>
                <p className="text-[#4e7097] text-sm font-normal leading-normal line-clamp-2">
                  {activity.category}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <p className="text-[#0e141b] text-base font-normal leading-normal">
                {activity.duration}
              </p>
            </div>
          </div>
        ))}

        {/* Goals */}
        <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Goals
        </h2>
        {goals.map((goal) => (
          <div key={goal.id} className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12">
                {goal.icon}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
                  {goal.name}
                </p>
                <p className="text-[#4e7097] text-sm font-normal leading-normal line-clamp-2">
                  {goal.category}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <p className="text-[#0e141b] text-base font-normal leading-normal">
                {goal.progress}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-[#e7edf3] bg-slate-50 px-4 pb-3 pt-2">
          <button 
            className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e7097]"
            onClick={() => handleNavigate('home')}
          >
            <div className="text-[#4e7097] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
              </svg>
            </div>
            <p className="text-[#4e7097] text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
          </button>
          <button 
            className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e7097]"
            onClick={() => handleNavigate('workouts')}
          >
            <div className="text-[#4e7097] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z" />
              </svg>
            </div>
            <p className="text-[#4e7097] text-xs font-medium leading-normal tracking-[0.015em]">Workouts</p>
          </button>
          <button 
            className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e7097]"
            onClick={() => handleNavigate('progress')}
          >
            <div className="text-[#4e7097] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z" />
              </svg>
            </div>
            <p className="text-[#4e7097] text-xs font-medium leading-normal tracking-[0.015em]">Progress</p>
          </button>
          <button 
            className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e141b]"
            onClick={() => handleNavigate('profile')}
          >
            <div className="text-[#0e141b] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z" />
              </svg>
            </div>
            <p className="text-[#0e141b] text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </button>
        </div>
        <div className="h-5 bg-slate-50" />
      </div>
    </div>
  );
};

export default ProfileScreen;