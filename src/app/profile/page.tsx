'use client';

import useSWR from 'swr';
import {fetcher} from '@/api/fetcher';
import {Typography, Spin, Alert} from 'antd';

const {Title, Paragraph} = Typography;

// Đây là một API endpoint giả lập. Bạn cần thay thế bằng API thật của mình.
// Ví dụ: /api/user/profile
const API_URL = 'https://api.github.com/users/vercel';

const ProfilePage = () => {
  const {data, error, isLoading} = useSWR(API_URL, fetcher);

  if (isLoading) {
    return <Spin size="large" style={{display: 'block', marginTop: '50px'}} />;
  }

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description="Không thể tải dữ liệu hồ sơ."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{padding: '20px'}}>
      <Title level={2}>Hồ sơ người dùng</Title>
      {data && (
        <div>
          <img
            src={data.avatar_url}
            alt="User Avatar"
            style={{width: '100px', borderRadius: '50%'}}
          />
          <Title level={4} style={{marginTop: '10px'}}>
            {data.name} (@{data.login})
          </Title>
          <Paragraph>{data.bio}</Paragraph>
          <Paragraph>
            <strong>Followers:</strong> {data.followers} |{' '}
            <strong>Following:</strong> {data.following}
          </Paragraph>
          <Paragraph>
            <strong>Public Repos:</strong> {data.public_repos}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
