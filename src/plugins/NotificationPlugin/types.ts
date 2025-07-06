import type {NotificationArgsProps} from 'antd';

export interface NotificationConfig {
  message: string;
  description?: string;
  duration?: number;
  key?: string;
  placement?: 
    | 'top' 
    | 'topLeft' 
    | 'topRight' 
    | 'bottom' 
    | 'bottomLeft' 
    | 'bottomRight';
  onClick?: () => void;
  onClose?: () => void;
}

export interface NotificationContextType {
  success: (config: NotificationConfig) => void;
  error: (config: NotificationConfig) => void;
  info: (config: NotificationConfig) => void;
  warning: (config: NotificationConfig) => void;
  open: (config: NotificationArgsProps) => void;
  destroy: (key?: string) => void;
}

export interface QuickNotificationMethods {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
}
