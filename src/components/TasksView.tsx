import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import sum from 'lodash/fp/sum';

import { State } from 'types/redux.types';
import { BaseAction } from 'types/base-redux.types';

import TaskItem from 'components/TaskItem';
import { addTask, TaskName } from 'actions/tasks.actions';
import { Task, TasksState } from 'reducers/tasks.reducer';

const TasksView = ({ addTask, tasks }: Props) => {
  const [taskName, setTaskName] = useState('');

  const onChangeInput = (value: string) => {
    setTaskName(value);
  };

  const onClickAddTask = () => {
    addTask({ name: taskName });
    setTaskName('');
  };

  const onKeyPressTaskName = (event: React.KeyboardEvent): void => {
    if (event.keyCode === 13) {
      addTask({ name: taskName });
      setTaskName('');
    }
  };

  const totalTimer = sum(Object.values(tasks).map(task => task.counter));

  return (
    <FlexCenterWrapper>
      <ContainerDiv>
        <h4>Current Time: {getStringSeconds({ seconds: totalTimer })}</h4>

        <AddTaskDiv>
          <TaskNameInput
            value={taskName}
            onChange={e => onChangeInput(e.currentTarget.value)}
            placeholder="Task name..."
            onKeyDown={onKeyPressTaskName}
          />

          <AddTaskButton onClick={onClickAddTask}>ADD</AddTaskButton>
        </AddTaskDiv>

        <ul>
          {Object.values(tasks).map((task: Task) => (
            <TaskItem key={task.name} name={task.name} counter={task.counter} />
          ))}
        </ul>
      </ContainerDiv>
    </FlexCenterWrapper>
  );
};

type Props = {
  currentValue: number;
  addTask({ name }: TaskName): BaseAction;
  tasks: TasksState;
};

export type Seconds = {
  seconds: number;
};

export const getStringSeconds = ({ seconds }: Seconds) => {
  const dateObject = new Date();

  dateObject.setHours(0);
  dateObject.setMinutes(0);
  dateObject.setSeconds(seconds);

  return dateObject.toTimeString().substr(0, 8);
};

const ContainerDiv = styled.div`
  width: 800px;
  background-color: #dcd8d8;
  padding: 5px;
  border-radius: 3px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const FlexCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  @media only screen and (max-width: 600px) {
    padding: 2%;
  }
`;

const AddTaskButton = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: #fff;
  box-shadow: 0 0 2px 2px lawngreen;
  margin-left: 2%;
  cursor: pointer;
`;

const TaskNameInput = styled.input`
  box-shadow: 0 0 2px 0 dodgerblue;
  border: none;
  padding: 2px;
  font-size: 1.2em;
  width: 30vw;

  :focus {
    box-shadow: 0 0 2px 2px dodgerblue;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const AddTaskDiv = styled.div`
  display: flex;
  padding: 2%;
`;

const mapStateToProps = (state: State) => ({
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { addTask }
)(TasksView);
