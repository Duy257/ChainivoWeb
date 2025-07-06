import {DataController} from '../BaseController';

class CustomerAction {
  controller = new DataController('Customer');

  static updateDeviceToken = async (deviceToken: string) => {
    const controller = new DataController('Customer');
    const res = await controller.edit([
      // {
      //   Id: store.getState().customer.data?.Id,
      //   DeviceToken: deviceToken,
      // },
    ]);
    return res;
  };
}

export default CustomerAction;
