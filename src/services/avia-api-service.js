export default class AviaApiService {

  _apiBase = 'https://front-test.beta.aviasales.ru';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json();
  };

  getSearchId = async () => {
    const res = await this.getResource(`/search`);
    return res;
  };

  getTickets = async (searchId) => {
    const res = await this.getResource('/tickets?searchId=' + searchId);
    return res;
  }

}