import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-screen bg-transparent">
      <PipelineToolbar />
      <div className="flex-1 overflow-hidden relative">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
