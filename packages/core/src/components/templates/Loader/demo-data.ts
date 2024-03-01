import {ProcessStatus, ProcessItem} from './types';

export const DEMO_DATA: ProcessItem[] = [
  {
    key: '1645554000001',
    name: 'Process 1',
    disabled: false,
    loading: false,
    notifyMe: true,
    status: ProcessStatus.RUNNING,
    completed: false,
    resolved: false,
    startedDate: '2024-03-01T08:00:00.000Z',
    completedDate: null,
    failedDate: null,
    process: async () => {
      return new Promise(resolve => {
        setTimeout(resolve, 3000);
      });
    },
    onSuccess: () => {
      console.log('Process completed successfully');
    },
    onError: () => {
      console.error('Error occurred during process');
    },
  },
  {
    key: '1645554100001',
    name: 'Process 2',
    disabled: true,
    loading: false,
    notifyMe: false,
    status: ProcessStatus.COMPLETED,
    completed: true,
    resolved: true,
    startedDate: '2023-01-16T10:30:00.000Z',
    completedDate: '2023-01-16T11:45:00.000Z',
    failedDate: null,
    process: async () => {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    },
    onSuccess: () => {
      console.log('Process completed successfully');
    },
    onError: () => {
      console.error('Error occurred during process');
    },
  },
  {
    key: '1645554000000',
    name: 'Process 3',
    disabled: false,
    loading: false,
    notifyMe: true,
    status: ProcessStatus.RUNNING,
    completed: false,
    resolved: false,
    startedDate: '2023-01-17T12:45:00.000Z',
    completedDate: null,
    failedDate: null,
    process: async () => {
      return new Promise(resolve => {
        setTimeout(resolve, 3000);
      });
    },
    onSuccess: () => {
      console.log('Process completed successfully');
    },
    onError: () => {
      console.error('Error occurred during process');
    },
  },
  {
    key: '1645554100000',
    name: 'Process 4',
    disabled: true,
    loading: false,
    notifyMe: false,
    status: ProcessStatus.COMPLETED,
    completed: true,
    resolved: true,
    startedDate: '2023-01-20T09:30:00.000Z',
    completedDate: '2023-01-20T09:35:00.000Z',
    failedDate: null,
    process: async () => {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    },
    onSuccess: () => {
      console.log('Process completed successfully');
    },
    onError: () => {
      console.error('Error occurred during process');
    },
  },
  {
    key: '1645554200000',
    name: 'Process 5',
    disabled: false,
    loading: false,
    notifyMe: true,
    status: ProcessStatus.FAILED,
    completed: true,
    resolved: false,
    startedDate: '2024-03-01T01:00:00.000Z',
    completedDate: null,
    failedDate: '2024-03-01T11:15:00.000Z',
    process: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(reject, 1500);
      });
    },
    onSuccess: () => {
      console.log('Process completed successfully');
    },
    onError: () => {
      console.error('Error occurred during process');
    },
  },
];
