'use client';

import {useConfirm} from '@/components/utility/ConfirmPlugin';
import {Button} from 'antd';

function MyComponent() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const result = await confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa mục này không?',
    });
    if (result) {
      console.log('Đã xác nhận xóa');
      // Thực hiện logic xóa ở đây
    } else {
      console.log('Đã hủy xóa');
    }
  };

  return (
    <div>
      <Button key="submit" type="primary" onClick={handleDelete}>
        Xác nhận
      </Button>
    </div>
  );
}

export default MyComponent;
