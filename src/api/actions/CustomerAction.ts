import ConfigAPI from '@/config/ConfigAPI';
import {DataController} from '../BaseController';
import {BaseDA} from '@/api/BaseDA';
import {setData} from '@/store/reducers/CustomerReducer';
import {
  StorageContanst,
  TransactionStatus,
  TransactionType,
} from '@/config/Contanst';
import {saveDataToLocalStorage} from '@/utils/LocalStorage';
import store from '@/store/store';

export class CustomerAction {
  static updateDeviceToken = async (deviceToken: string) => {
    const controller = new DataController('Customer');
    // TODO: Implement device token update logic
    const res = await controller.edit([
      // {
      //   Id: store.getState().customer.data?.Id,
      //   DeviceToken: deviceToken,
      // },
    ]);
    return res;
  };

  static getInfor = async () => {
    const res = await BaseDA.get(ConfigAPI.url + 'data/getInfo', {
      headers: {module: 'Customer', pid: ConfigAPI.pid},
    });

    if (res.code === 200) {
      const info = res.data;
      saveDataToLocalStorage(StorageContanst.CustomerId, res.data.Id);

      store.dispatch(setData({stateName: 'data', data: info}));

      await getShop(res.data.Id);
      //#region rank
      await getRankInfo(info);
    }

    return res;
  };
}

async function getShop(id: string) {
  const shopDA = new DataController('Shop');
  const res = await shopDA.getById(id);
  if (res.code === 200) {
  }
}

async function getRankInfo(info: any) {
  const rankInfo = store.getState().customer.rankInfo ?? {
    totalReward: 0,
    totalScore: 0,
    achievedRank: null,
    RanksData: [],
  };
  if (!rankInfo.achievedRank) {
    // Gọi tất cả API cùng lúc với Promise.all
    const [totalRewardRes, resSum] = await Promise.all([
      // 1. Tính tổng điểm tất cả
      new DataController('HistoryReward').group({
        reducers:
          'LOAD * GROUPBY 1 @CustomerId REDUCE SUM 1 @Value AS TotalReward',
        searchRaw: `@CustomerId: {${info.Id}} ((@Status: [${TransactionStatus.success}] @Value: [0 +inf]) | (@Status: [${TransactionStatus.pending} ${TransactionStatus.success}] @Value: [-inf 0]))`,
      }),
      // 2. Tính tổng điểm từ hoa hồng và nhiệm vụ
      new DataController('HistoryReward').group({
        reducers:
          'LOAD * GROUPBY 1 @CustomerId REDUCE SUM 1 @Value AS TotalReward',
        searchRaw: `@CustomerId: {${info.Id}} (@Type: [${TransactionType.hoahong}] | @Type: [${TransactionType.mission}]) @Status: [${TransactionStatus.success}]`,
      }),
    ]);
    // Xử lý kết quả tổng điểm hiển thị
    if (totalRewardRes.code === 200 && totalRewardRes.data.length > 0) {
      rankInfo.totalReward = totalRewardRes.data[0].TotalReward || 0;
    }
    // Xử lý kết quả điểm để tính rank
    let totalScore = 0;
    if (resSum.code === 200 && resSum.data.length > 0) {
      totalScore = resSum.data[0].TotalReward || 0;
    }

    // 3. Lấy thông tin config rank
    const RankController = new DataController('ConfigRank');
    const resRank = await RankController.getAll();
    // Xử lý rank và xác định rank hiện tại
    if (resRank.code === 200 && resRank.data.length > 0) {
      const ranksData = resRank.data;
      // Sắp xếp ranks theo điểm số tăng dần
      const sortedRanks = [...ranksData].sort(
        (a, b) => parseFloat(a.Score) - parseFloat(b.Score),
      );
      rankInfo.RanksData = sortedRanks;
      // Tìm rank hiện tại dựa trên điều kiện

      for (const rank of sortedRanks) {
        const requiredScore = parseFloat(rank.Score);
        // Kiểm tra điều kiện điểm số
        if (totalScore >= requiredScore) {
          rankInfo.achievedRank = rank;
        }
      }
    }
  }

  // Only dispatch rankInfo update, customer data is already dispatched in getInfor()
  // store.dispatch(setData({stateName: 'rankInfo', data: rankInfo}));
}
