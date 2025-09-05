import React from 'react';
import { View, Heading, Flex, Text, Well } from '@adobe/react-spectrum';
import { useLazyLoadQuery } from 'relay-runtime';
import { getAllTasksQuery } from '../relay/queries/GetAllTasksQuery';
import { GetAllTasksQuery } from '../relay/__generated__/GetAllTasksQuery.graphql';
import TaskItem from './TaskItem';

interface TaskListProps {
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTaskUpdated }) => {
  const data = useLazyLoadQuery<GetAllTasksQuery>(
    getAllTasksQuery,
    {}
  );

  const tasks = data.getAllTasks?.edges || [];

  return (
    <View>
      <Heading level={3} marginBottom="size-200">
        Tasks ({tasks.length})
      </Heading>
      
      {tasks.length === 0 ? (
        <Well>
          <Text>No tasks yet. Add one above to get started!</Text>
        </Well>
      ) : (
        <Flex direction="column" gap="size-100">
          {tasks.map(({ node: task }) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
            />
          ))}
        </Flex>
      )}
    </View>
  );
};

export default TaskList;
