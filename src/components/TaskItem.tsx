import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { playTask, pauseTimer, TaskName } from 'actions/tasks.actions';
import { State } from 'types/redux.types';
import { BaseAction } from 'types/base-redux.types';
import { getStringSeconds } from 'components/TasksView';

type Props = {
  name: string;
  counter: number;
  currentTaskName: string;
  playTask({ name }: TaskName): BaseAction;
  pauseTimer({ name }: TaskName): BaseAction;
};

const TaskItem = ({
  name,
  counter,
  currentTaskName,
  playTask,
  pauseTimer
}: Props) => (
  <Flex>
    <TaskNameDiv>{name}</TaskNameDiv>
    <MarginDiv>{getStringSeconds({ seconds: counter })}</MarginDiv>

    {currentTaskName === name ? (
      <MarginDiv>
        <PlayPauseButton onClick={() => pauseTimer({ name })}>
          {/* Pause Icon: */}
          &#10073;&#10073;
        </PlayPauseButton>
      </MarginDiv>
    ) : (
      <MarginDiv>
        <PlayPauseButton onClick={() => playTask({ name })}>
          {/* Play Icon: */}
          &#9658;
        </PlayPauseButton>
      </MarginDiv>
    )}

    <MarginDiv>
      {currentTaskName === name && <ProgressSpan>running...</ProgressSpan>}
    </MarginDiv>
  </Flex>
);

const ProgressSpan = styled.span`
  color: green;
`;

const PlayPauseButton = styled.div`
  width: 50px;
  padding: 2%;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TaskNameDiv = styled.div`
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 600px) {
    width: 58px;
  }
`;

const MarginDiv = styled.div`
  margin: 3px;
`;

const Flex = styled.div`
  display: flex;
  box-shadow: 0 0 2px 0 #fff;
  align-items: center;
  padding-left: 2px;
`;

const mapStateToProps = (state: State) => ({
  currentTaskName: state.currentTask.taskName
});

export default connect(
  mapStateToProps,
  { playTask, pauseTimer }
)(TaskItem);
