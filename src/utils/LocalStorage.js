export const saveDataToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error('Lỗi khi lưu data:', e);
  }
};

export const getDataToLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data;
  } catch (e) {
    console.error('Lỗi khi lấy data:', e);
    return null;
  }
};

export const removeDataToLocalStorage = key => {
  try {
    const data = localStorage.removeItem(key);
    return data;
  } catch (e) {
    console.error('Lỗi khi xóa data:', e);
    return null;
  }
};

export const clearDataToLocalStorage = () => {
  try {
    const data = localStorage.clear();
    return data;
  } catch (e) {
    console.error('Lỗi clear data:', e);
    return null;
  }
};