import React, { useState } from 'react';
import { View, Heading, Divider, Flex } from '@adobe/react-spectrum';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const TodoApp: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleTaskUpdated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <View padding="size-400" maxWidth="800px" margin="0 auto">
      <Heading level={1} marginBottom="size-400">
        Todo App
      </Heading>
      <Divider marginBottom="size-400" />
      
      <Flex direction="column" gap="size-300">
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <TaskList 
          key={refreshKey} 
          onTaskUpdated={handleTaskUpdated} 
        />
      </Flex>
    </View>
  );
};

export default TodoApp;
