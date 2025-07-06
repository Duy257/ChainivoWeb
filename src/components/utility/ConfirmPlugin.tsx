'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Modal, Button} from 'antd'; // Assuming Ant Design for UI. If not, please specify.

interface ConfirmContextType {
  confirm: ({
    title,
    content,
    type,
  }: {
    title: string;
    content: string;
    type?: 'normal' | 'delete';
  }) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmData, setConfirmData] = useState<{
    title: string;
    content: string;
    type?: 'normal' | 'delete';
  } | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = ({
    title,
    content,
    type,
  }: {
    title: string;
    content: string;
    type?: 'normal' | 'delete';
  }): Promise<boolean> => {
    return new Promise(resolve => {
      setConfirmData({title, content, type});
      setIsVisible(true);
      setResolvePromise(() => resolve);
    });
  };

  const handleOk = () => {
    setIsVisible(false);
    if (resolvePromise) {
      resolvePromise(true);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    if (resolvePromise) {
      resolvePromise(false);
    }
  };

  return (
    <ConfirmContext.Provider value={{confirm}}>
      {children}
      <Modal
        title={confirmData?.title}
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <p>{confirmData?.content}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}>
          {confirmData?.type === 'delete' ? (
            <>
              <Button key="submit" type="primary" danger onClick={handleOk}>
                Xác nhận
              </Button>
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>
            </>
          ) : (
            <>
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>
              <Button key="submit" type="primary" onClick={handleOk}>
                Xác nhận
              </Button>
            </>
          )}
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context.confirm;
};
