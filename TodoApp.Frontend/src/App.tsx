import React from 'react';
import { Provider as SpectrumProvider, defaultTheme } from '@adobe/react-spectrum';
import { RelayEnvironmentProvider } from 'relay-runtime';
import RelayEnvironment from './relay/RelayEnvironment';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <SpectrumProvider theme={defaultTheme} colorScheme="light">
        <div className="App">
          <TodoApp />
        </div>
      </SpectrumProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
