import React, { useState } from 'react';
import { 
  View, 
  TextField, 
  TextArea, 
  Button, 
  Flex, 
  Heading,
  ButtonGroup 
} from '@adobe/react-spectrum';
import { useMutation } from 'relay-runtime';
import { CreateTaskMutation } from '../relay/__generated__/CreateTaskMutation.graphql';
import { createTaskMutation } from '../relay/mutations/CreateTaskMutation';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createTask] = useMutation<CreateTaskMutation>(createTaskMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    try {
      await createTask({
        variables: {
          input: {
            title: title.trim(),
            description: description.trim() || null,
          },
        },
        onCompleted: () => {
          setTitle('');
          setDescription('');
          onTaskAdded();
        },
      });
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View padding="size-300" backgroundColor="gray-100" borderRadius="medium">
      <Heading level={3} marginBottom="size-200">
        Add New Task
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="size-200">
          <TextField
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Enter task title..."
            isRequired
            width="100%"
          />
          
          <TextArea
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Enter task description (optional)..."
            width="100%"
            rows={3}
          />
          
          <ButtonGroup>
            <Button
              type="submit"
              variant="cta"
              isDisabled={!title.trim() || isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </Button>
          </ButtonGroup>
        </Flex>
      </form>
    </View>
  );
};

export default AddTaskForm;
