export class StatusOrder {
  static new = 1;
  static proccess = 2;
  static success = 3;
  static cancel = 4;
}
export class CustomerType {
  static student = 2;
  static teacher = 1;
}
export class CustomerRankType {
  static normal = 2;
  static vip = 1;
}

export class CustomerStatus {
  static active = 1;
  static locked = 2;
}

export class StorageContanst {
  static CustomerId = 'CustomerId';
  static ShopId = 'ShopId';
  static RecentCourse = 'recent_course';
  static accessToken = 'accessToken';
  static CartItems = 'cart_items';
  static refreshToken = 'refreshToken';
  static timeRefresh = 'timeRefresh';
}
export class ExamType {
  static Try = 2;
  static Real = 1;
  static quiz = 3;
}
export class StatusExam {
  static fail = 2;
  static passed = 1;
}
export class groupRole {
  static admin = 1;
  static subadmin = 2;
  static member = 3;
}
export class groupMemberRoleStatus {
  static invited = 0;
  static joined = 2;
}
export class FollowStatus {
  static Accept = 1;
  static Reject = 2;
  static Pending = 3;
  static None = 0;
}
export class GameStatus {
  static Completed = 1;
  static Pending = 2;
  static Locked = 3;
}

export class Title {
  static New = 'Đơn hàng mới';
  static Processing = 'Đơn hàng đang xử lý';
  static Cancel = 'Đơn hàng hủy';
  static Done = 'Đơn hàng hoàn thành';
  static Search = 'Tìm kiếm';
  static Register = 'Đăng ký shop';
  static Shop = 'Shop';
  static MyProduct = 'Sản phẩm của tôi';
  static CreateMyProduct = 'Tạo mới sản phẩm';
  static SelectProduct = 'Chọn danh mục';
  static SelectLabel = 'Chọn nhãn hiệu';
  static SelectOrigin = 'Chọn xuất xứ';
  static Report = 'Báo cáo cửa hàng';
  static Edit = 'Chỉnh sửa thông tin shop';
  static CreateReviewOrder = 'Đánh giá đơn hàng';
  static ManagePromorion = 'QL khuyến mại';
}
export class NumberStatusIcon {
  static One = 1;
}

export class TypeMenuReview {
  static Product = 'Product';
  static Order = 'Order';
}

export class TypeMenuPorduct {
  static Init = { id: 0, name: 'Khởi tạo' };
  static InStock = { id: 1, name: 'Hoạt động' };
  static OutOfStock = { id: 2, name: 'Hết hàng' };
  static Pending = { id: 3, name: 'Chờ duyệt' };
  static Violation = { id: 4, name: 'Vi phạm' };
  static Disable = { id: 5, name: 'Ẩn' };
}

export class ChartType {
  static MakeMoney = 'Báo cáo doanh thu';
  static ProductData = 'Báo cáo sản phẩm';
  static OrderData = 'Báo cáo đon hàng';
}

export class TypeMenuShop {
  static User = 'Cá nhân';
  static Afiliate = 'Afiliate';
  static Shop = 'Shop';
  static Wallet = 'Wallet';
}

export class TransactionType {
  static hoahong = 1;
  static tranfer = 2;
  static Withdraw = 3;
  static Gift = 4;
  static mission = 5;
  static WithDrawMoney = 6;
}
export class TransactionStatus {
  static success = 2;
  static pending = 1;
  static failed = 3;
}

// map MissonType with values 1,2,3,4 for Login, Like, Share, Order
export class MissionType {
  static Login = 1;
  static Like = 2;
  static Share = 3;
  static Order = 4;
}
export class PaymentType {
  static COD = 1;
  static vnPay = 2;
}
