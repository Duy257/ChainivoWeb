import {DataController} from '../BaseController';
import {getImages, randomGID} from '../handleData';

type DataObject = Record<string, unknown>;

class BaseAction {
  private controller: DataController;

  constructor(module: string) {
    this.controller = new DataController(module);
  }

  async getAll() {
    try {
      const response = await this.controller.getAll();
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in getAll:', error);
      return [];
    }
  }

  async fetch(config: {
    page?: number;
    size?: number;
    searchRaw?: string;
    filter?: string;
    sortby?: Array<{prop: string; direction?: 'ASC' | 'DESC'}>;
  }) {
    try {
      const response = await this.controller.aggregateList(config);
      if (response.code === 200) {
        let data = await getImages({items: response.data});
        return {
          data,
          totalCount: response.totalCount,
        };
      }
      return {
        data: [],
        totalCount: 0,
      };
    } catch (error) {
      console.error('Error in fetch:', error);
      return {
        data: [],
        totalCount: 0,
      };
    }
  }

  async fetchOne(id: string) {
    try {
      const response = await this.controller.getById(id);
      if (response.code === 200 && response.data) {
        let data = await getImages({items: [response.data]});
        return data[0];
      }
    } catch (error) {
      console.error('Error in fetchOne:', error);
      return null;
    }
  }

  async create(data: Array<DataObject>) {
    try {
      const newData = {
        ...data,
        DateCreated: new Date().getTime(),
        Id: randomGID(),
      };
      const response = await this.controller.add(newData);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in create:', error);
      return null;
    }
  }

  async update(data: Array<DataObject>) {
    try {
      const response = await this.controller.edit(data);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in update:', error);
      return null;
    }
  }

  async delete(ids: string[]) {
    try {
      const response = await this.controller.delete(ids);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in delete:', error);
      return null;
    }
  }
}

export default BaseAction;
