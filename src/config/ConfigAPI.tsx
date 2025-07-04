const hostMapUrl = 'https://server.wini.vn/api/data/';

export default class ConfigAPI {
  static url = 'https://apichanivo.wini.vn/api/';
  static Socketurl = 'https://apichanivo.wini.vn';
  static urlBlockchain = 'https://blockchainapi.innotechjsc.com/api/';
  static pid = '1db6d3afe3c442a7a1366dffa0cea2e0';
  static googleApiKey = 'AIzaSyBrjZpmgCpST9GWPt7fCnr_EiQi-uL9SQM';
  static urlImg = 'https://apichanivo.wini.vn/api/file/img/';
  static adminITM = 'ddb8e94bb5b44fe4bccb8b59976f58bc';
  static gameALTP = 'cf86bc33ef03447fa744eea2bbf31cfc';
  static username_blc = 'admin';
  static password_blc = 'admin123';
  static GEOCODING_API_URL_BY_GOOGLE = (lat: any, lng: any) => {
    // return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${ConfigAPI.googleApiKey}`
    return (
      hostMapUrl +
      `geocode/json?latlng=${lat},${lng}&key=${ConfigAPI.googleApiKey}`
    );
  };

  static getAddressByGoogleKey = (inputText: string) => {
    // console.log('====================================');
    // console.log(hostMapUrl + `place/textsearch/json?&query=${encodeURIComponent(inputText)}&components=country:VN&key=${ConfigAPI.googleApiKey}`);
    // console.log('====================================');
    return (
      hostMapUrl +
      `place/textsearch/json?&query=${encodeURIComponent(
        inputText,
      )}&components=country:VN&key=${ConfigAPI.googleApiKey}`
    );
  };

  static provinceUrl = 'https://esgoo.net/api-tinhthanh/1/0.htm';
  static districtUrl = (cityId: string) =>
    `https://esgoo.net/api-tinhthanh/2/${cityId}.htm`;

  static wardUrl = (districtId: string) =>
    `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`;
}
