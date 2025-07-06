'use client';

import React, {useState} from 'react';
import {Upload, Button, Card, Progress, message, Space, Tag, Image} from 'antd';
import {
  InboxOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type {UploadFile, UploadProps} from 'antd';
import {BaseDA} from '@/api/BaseDA';

const {Dragger} = Upload;

interface FileInfo {
  uid: string;
  id?: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'uploading' | 'done' | 'error';
  progress?: number;
}

function App() {
  const [fileList, setFileList] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File): Promise<void> => {
    const fileInfo: FileInfo = {
      uid: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
    };

    setFileList(prev => [...prev, fileInfo]);
    setUploading(true);

    try {
      let progress = 10;
      const progressInterval = setInterval(() => {
        setFileList(prev =>
          prev.map(item =>
            item.uid === fileInfo.uid && item.status === 'uploading'
              ? {...item, progress: Math.min(progress, 99)}
              : item,
          ),
        );
        if (progress < 90) {
          progress += 5;
        }
      }, 300);

      const uploadedFiles = await BaseDA.uploadFiles([
        {uri: file as Blob, type: file.type, name: file.name},
      ]);

      clearInterval(progressInterval);

      if (uploadedFiles && uploadedFiles.length > 0) {
        const uploadedFile = uploadedFiles[0];
        const newUrl = uploadedFile.originalUrl;

        setFileList(prev =>
          prev.map(item =>
            item.uid === fileInfo.uid
              ? {
                  ...item,
                  id: uploadedFile.id,
                  url: newUrl,
                  status: 'done',
                  progress: 100,
                }
              : item,
          ),
        );
        message.success(`${file.name} uploaded successfully!`);
      } else {
        setFileList(prev =>
          prev.map(item =>
            item.uid === fileInfo.uid
              ? {...item, status: 'error', progress: 0}
              : item,
          ),
        );
        message.error(`${file.name} upload failed.`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setFileList(prev =>
        prev.map(item =>
          item.uid === fileInfo.uid
            ? {...item, status: 'error', progress: 0}
            : item,
        ),
      );
      message.error(`${file.name} upload failed.`);
    } finally {
      setUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    accept: 'image/*',
    beforeUpload: file => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
        return false;
      }

      handleUpload(file);
      return false;
    },
    showUploadList: false,
  };

  const removeFile = async (uid: string) => {
    setFileList(prev => {
      const fileToRemove = prev.find(f => f.uid === uid);
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.uid !== uid);
    });

    const file = fileList.find(f => f.uid === uid);
    if (file && file.id) {
      try {
        const success = await BaseDA.deleteFile(file.id);
        if (success) {
          message.success(`${file.name} removed successfully!`);
        } else {
          message.error(`Failed to remove ${file.name} from server.`);
        }
      } catch (error) {
        console.error('Error deleting file from server:', error);
        message.error(`Failed to remove ${file.name} from server.`);
      }
    } else {
      message.info('File removed from list (not uploaded to server).');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'processing';
      case 'done':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image Upload Studio
          </h1>
          <p className="text-gray-600 text-lg">
            Upload, preview, and manage your images with ease
          </p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8 shadow-lg border-0 rounded-xl overflow-hidden">
          <Dragger
            {...uploadProps}
            className="!bg-gradient-to-r from-blue-50 to-purple-50 !border-2 !border-dashed !border-blue-200 hover:!border-blue-400 transition-all duration-300 rounded-lg">
            <p className="ant-upload-drag-icon mb-4">
              <InboxOutlined className="text-6xl text-blue-400" />
            </p>
            <p className="ant-upload-text text-xl font-semibold text-gray-700 mb-2">
              Click or drag images to this area to upload
            </p>
            <p className="ant-upload-hint text-gray-500">
              Support for single or bulk upload. Strictly prohibit from
              uploading company data or other banned files. Maximum file size:
              10MB per image.
            </p>

            <div className="mt-6">
              <Button
                type="primary"
                icon={<CloudUploadOutlined />}
                size="large"
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                loading={uploading}>
                Select Images
              </Button>
            </div>
          </Dragger>
        </Card>

        {/* File List */}
        {fileList.length > 0 && (
          <Card
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Uploaded Images</span>
                <Tag color="blue">
                  {fileList.length} file{fileList.length !== 1 ? 's' : ''}
                </Tag>
              </div>
            }
            className="shadow-lg border-0 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fileList.map(file => (
                <div
                  key={file.uid}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  {/* Image Preview */}
                  {file.url && (
                    <div className="relative group">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-t-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Space>
                            <Image.PreviewGroup>
                              <Image
                                src={file.url}
                                style={{display: 'none'}}
                                preview={{
                                  mask: (
                                    <Button
                                      type="primary"
                                      shape="circle"
                                      icon={<EyeOutlined />}
                                      className="bg-white bg-opacity-20 border-white text-white hover:bg-opacity-30"
                                    />
                                  ),
                                }}
                              />
                            </Image.PreviewGroup>
                            <Button
                              type="primary"
                              danger
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={() => removeFile(file.uid)}
                              className="bg-red-500 bg-opacity-80 border-red-500 hover:bg-opacity-100"
                            />
                          </Space>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* File Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="font-medium text-gray-900 truncate pr-2"
                        title={file.name}>
                        {file.name}
                      </h3>
                      <Tag color={getStatusColor(file.status)} className="ml-2">
                        {file.status}
                      </Tag>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{formatFileSize(file.size)}</span>
                      <span className="capitalize">
                        {file.type.split('/')[1]}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <Progress
                        percent={file.progress || 0}
                        size="small"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        className="mb-2"
                      />
                    )}

                    {/* Actions */}
                    <div className="flex justify-end">
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => removeFile(file.uid)}
                        className="hover:bg-red-50">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Stats */}
        {fileList.length > 0 && (
          <Card className="mt-6 shadow-lg border-0 rounded-xl bg-gradient-to-r from-green-50 to-blue-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {fileList.filter(f => f.status === 'done').length}
                </div>
                <div className="text-gray-600">Successfully Uploaded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {fileList.filter(f => f.status === 'uploading').length}
                </div>
                <div className="text-gray-600">Currently Uploading</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {formatFileSize(
                    fileList.reduce((acc, file) => acc + file.size, 0),
                  )}
                </div>
                <div className="text-gray-600">Total Size</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
