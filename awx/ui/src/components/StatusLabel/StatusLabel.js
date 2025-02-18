import 'styled-components/macro';
import React from 'react';
import { t } from '@lingui/macro';
import { oneOf } from 'prop-types';
import { Label, Tooltip } from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  SyncAltIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  MinusCircleIcon,
} from '@patternfly/react-icons';
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
`;

const RunningIcon = styled(SyncAltIcon)`
  animation: ${Spin} 1.75s linear infinite;
`;

const colors = {
  success: 'green',
  successful: 'green',
  failed: 'red',
  error: 'red',
  running: 'blue',
  pending: 'blue',
  waiting: 'grey',
  disabled: 'grey',
  canceled: 'orange',
};
const icons = {
  success: CheckCircleIcon,
  successful: CheckCircleIcon,
  failed: ExclamationCircleIcon,
  error: ExclamationCircleIcon,
  running: RunningIcon,
  pending: ClockIcon,
  waiting: ClockIcon,
  disabled: MinusCircleIcon,
  canceled: ExclamationTriangleIcon,
};

export default function StatusLabel({ status, tooltipContent = '' }) {
  const upperCaseStatus = {
    success: t`Success`,
    successful: t`Successful`,
    failed: t`Failed`,
    error: t`Error`,
    running: t`Running`,
    pending: t`Pending`,
    waiting: t`Waiting`,
    disabled: t`Disabled`,
    canceled: t`Canceled`,
  };
  const label = upperCaseStatus[status] || t`Undefined`;
  const color = colors[status] || 'grey';
  const Icon = icons[status];

  const renderLabel = () => (
    <Label variant="outline" color={color} icon={Icon ? <Icon /> : null}>
      {label}
    </Label>
  );

  return (
    <>
      {tooltipContent ? (
        <Tooltip content={tooltipContent} position="top">
          {renderLabel()}
        </Tooltip>
      ) : (
        renderLabel()
      )}
    </>
  );
}

StatusLabel.propTypes = {
  status: oneOf([
    'success',
    'successful',
    'failed',
    'error',
    'running',
    'pending',
    'waiting',
    'disabled',
    'canceled',
  ]).isRequired,
};
