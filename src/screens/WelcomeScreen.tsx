import React from 'react';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-50 @[480px]:rounded-xl min-h-80"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4vGglYNR5tzsgpVmCMyWyTfFHf28K6cavKfBUbFsNcg69M-loYUfI4NTXiIz-38VWbblsgBP-KJ2MD8lU4FvL2izGdFq4smM6uKecRpla22PSZJgKF1_5CWhZGm6H3lOBlxmInzfwYCcLdvp_nApJ-P7e1u8ScOwSi2lxpAUlmkdMPbPGlyI5ch52fCjh2BpLk3cd0-sK6ShPOwIIXrLAtd6lH8zq68mYzIAY1RxYDAiNf1tFiIj9Masc911sTYNcKrg-D7WHHRz_")'
              }}
            />
          </div>
        </div>
        <h1 className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
          Bem-vindo ao seu novo estilo de vida
        </h1>
        <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Descubra um mundo de fitness personalizado, aulas envolventes e resultados incríveis. 
          Vamos começar sua jornada de transformação hoje mesmo!
        </p>
      </div>
      <div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1978e5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
            onClick={handleGetStarted}
          >
            <span className="truncate">Começar</span>
          </button>
        </div>
        <div className="h-5 bg-slate-50" />
      </div>
    </div>
  );
};

export default WelcomeScreen;