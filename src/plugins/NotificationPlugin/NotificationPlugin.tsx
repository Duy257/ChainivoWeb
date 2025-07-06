'use client';

import React, {createContext, useContext, ReactNode} from 'react';
import {notification} from 'antd';
import type {NotificationArgsProps} from 'antd';
import type {
  NotificationConfig,
  NotificationContextType,
  QuickNotificationMethods,
} from './types';

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification({
    placement: 'topRight',
    duration: 4.5,
    maxCount: 3,
  });

  const success = (config: NotificationConfig) => {
    api.success({
      message: config.message,
      description: config.description,
      duration: config.duration,
      key: config.key,
      placement: config.placement,
      onClick: config.onClick,
      onClose: config.onClose,
    });
  };

  const error = (config: NotificationConfig) => {
    api.error({
      message: config.message,
      description: config.description,
      duration: config.duration,
      key: config.key,
      placement: config.placement,
      onClick: config.onClick,
      onClose: config.onClose,
    });
  };

  const info = (config: NotificationConfig) => {
    api.info({
      message: config.message,
      description: config.description,
      duration: config.duration,
      key: config.key,
      placement: config.placement,
      onClick: config.onClick,
      onClose: config.onClose,
    });
  };

  const warning = (config: NotificationConfig) => {
    api.warning({
      message: config.message,
      description: config.description,
      duration: config.duration,
      key: config.key,
      placement: config.placement,
      onClick: config.onClick,
      onClose: config.onClose,
    });
  };

  const open = (config: NotificationArgsProps) => {
    api.open(config);
  };

  const destroy = (key?: string) => {
    if (key) {
      api.destroy(key);
    } else {
      api.destroy();
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        info,
        warning,
        open,
        destroy,
      }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};

// Convenience hook for quick notifications
export const useQuickNotification = (): QuickNotificationMethods => {
  const notify = useNotification();

  return {
    success: (message: string, description?: string) =>
      notify.success({message, description}),
    error: (message: string, description?: string) =>
      notify.error({message, description}),
    info: (message: string, description?: string) =>
      notify.info({message, description}),
    warning: (message: string, description?: string) =>
      notify.warning({message, description}),
  };
};
