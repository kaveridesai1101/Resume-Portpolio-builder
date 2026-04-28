import { useEffect } from 'react';
import useResumeStore from '../store/resumeStore';
import StepIndicator from '../components/form/StepIndicator';
import PersonalInfo from '../components/form/PersonalInfo';
import Education from '../components/form/Education';
import Skills from '../components/form/Skills';
import Projects from '../components/form/Projects';
import Experience from '../components/form/Experience';
import RoleSelection from '../components/form/RoleSelection';
import Navbar from '../components/layout/Navbar';

export default function Onboarding() {
  const { currentStep, setStep } = useResumeStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfo />;
      case 2: return <Education />;
      case 3: return <Skills />;
      case 4: return <Projects />;
      case 5: return <Experience />;
      case 6: return <RoleSelection />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px 80px' }}>
        <StepIndicator currentStep={currentStep} onStepClick={(s) => s < currentStep && setStep(s)} />
        
        <div className="card glass-strong page-enter" style={{ padding: '40px' }}>
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
