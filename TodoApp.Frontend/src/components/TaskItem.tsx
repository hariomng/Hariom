import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  Flex, 
  Checkbox, 
  ButtonGroup,
  ActionButton,
  DialogTrigger,
  Dialog,
  Content,
  Header,
  Divider,
  Footer
} from '@adobe/react-spectrum';
import { useMutation } from 'relay-runtime';
import { UpdateTaskStatusMutation } from '../relay/__generated__/UpdateTaskStatusMutation.graphql';
import { updateTaskStatusMutation } from '../relay/mutations/UpdateTaskStatusMutation';
import { TaskStatus } from '../relay/__generated__/GetAllTasksQuery.graphql';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string | null;
  };
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [updateTaskStatus] = useMutation<UpdateTaskStatusMutation>(updateTaskStatusMutation);

  const handleStatusToggle = async () => {
    const newStatus = task.status === TaskStatus.PENDING 
      ? TaskStatus.COMPLETED 
      : TaskStatus.PENDING;

    setIsUpdating(true);
    
    try {
      await updateTaskStatus({
        variables: {
          input: {
            id: task.id,
            status: newStatus,
          },
        },
        onCompleted: () => {
          onTaskUpdated();
        },
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View
      padding="size-200"
      backgroundColor="gray-50"
      borderRadius="medium"
      borderWidth="thin"
      borderColor="gray-300"
    >
      <Flex direction="row" alignItems="center" gap="size-200">
        <Checkbox
          isSelected={task.status === TaskStatus.COMPLETED}
          onChange={handleStatusToggle}
          isDisabled={isUpdating}
        />
        
        <Flex direction="column" flex="1" gap="size-50">
          <Text
            UNSAFE_style={{
              textDecoration: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
              opacity: task.status === TaskStatus.COMPLETED ? 0.7 : 1,
            }}
          >
            {task.title}
          </Text>
          
          {task.description && (
            <Text
              size="S"
              color="gray-600"
              UNSAFE_style={{
                textDecoration: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
                opacity: task.status === TaskStatus.COMPLETED ? 0.7 : 1,
              }}
            >
              {task.description}
            </Text>
          )}
          
          <Text size="S" color="gray-500">
            Created: {formatDate(task.createdAt)}
            {task.updatedAt && ` • Updated: ${formatDate(task.updatedAt)}`}
          </Text>
        </Flex>
        
        <ButtonGroup>
          <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <ActionButton>Details</ActionButton>
            <Dialog>
              <Heading>Task Details</Heading>
              <Divider />
              <Content>
                <Flex direction="column" gap="size-200">
                  <Text><strong>Title:</strong> {task.title}</Text>
                  {task.description && (
                    <Text><strong>Description:</strong> {task.description}</Text>
                  )}
                  <Text><strong>Status:</strong> {task.status}</Text>
                  <Text><strong>Created:</strong> {formatDate(task.createdAt)}</Text>
                  {task.updatedAt && (
                    <Text><strong>Updated:</strong> {formatDate(task.updatedAt)}</Text>
                  )}
                </Flex>
              </Content>
              <Footer>
                <ButtonGroup>
                  <Button variant="cta" onPress={() => setIsOpen(false)}>
                    Close
                  </Button>
                </ButtonGroup>
              </Footer>
            </Dialog>
          </DialogTrigger>
        </ButtonGroup>
      </Flex>
    </View>
  );
};

export default TaskItem;
