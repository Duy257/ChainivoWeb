import ConfigAPI from '@/config/ConfigAPI';
import {v4 as uuidv4} from 'uuid';

async function getImages({items}: {items: any[]}) {
  if (!items || !items.length) return [];
  const url = ConfigAPI.urlImg;

  for (const item of items) {
    if (item.Img) {
      item.Img = `${url}${item.Img}`;
    }
  }

  return items;
}

export const randomGID = () => uuidv4().replaceAll('-', '');

export {getImages};
