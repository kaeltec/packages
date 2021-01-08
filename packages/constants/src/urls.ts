import { makeUrl } from './all';

export default {
  Site: makeUrl(),
  Api: makeUrl({ subdomain: 'api' }),
  Dashboard: makeUrl({ subdomain: 'dash' }),
  Webhook: makeUrl({ subdomain: 'webhook' }),
  Gateway: makeUrl({ subdomain: 'gateway', protocol: 'wss' }),
};
