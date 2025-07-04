import { DataController } from "../BaseController";

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
      return [];
    }
  }

  async fetch(config: {
    page?: number;
    size?: number;
    searchRaw?: string;
    filter?: string;
    sortby?: Array<{ prop: string; direction?: "ASC" | "DESC" }>;
  }) {
    try {
      const response = await this.controller.aggregateList(config);
      if (response.code === 200) {
        return {
          data: response.data,
          totalCount: response.totalCount,
        };
      }
    } catch (error) {
      return {
        data: [],
        totalCount: 0,
      };
    }
  }

  async fetchOne(id: string) {
    try {
      const response = await this.controller.getById(id);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  }

  async create(data: any) {
    try {
      const response = await this.controller.add(data);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  }

  async update(data: Array<{ [p: string]: any }>) {
    try {
      const response = await this.controller.edit(data);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
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
      return null;
    }
  }
}

export default BaseAction;
