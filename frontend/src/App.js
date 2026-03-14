import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { LandingPage } from './landing';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <LandingPage onLaunch={() => setShowApp(true)} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505] animate-in fade-in duration-1000">
      {/* Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <PipelineUI />
      </div>
      
      {/* Floating Toolbar and Submit */}
      <PipelineToolbar onReturnHome={() => setShowApp(false)} />
      <SubmitButton />
    </div>
  );
}

export default App;
