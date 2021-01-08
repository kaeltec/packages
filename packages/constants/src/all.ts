export const Domain = 'kaelbot.com';

export function makeSubdomain(name: string): string {
  return `${name}.${Domain}`;
}

export function concatProtocol(domain: string, protocol = 'https'): string {
  return `${protocol.replace(/[^A-Za-z-.]/gi, '')}://${domain}`;
}

export function makeUrl(options: MakeUrlOptions = {}): string {
  const { path, protocol, subdomain } = options;
  const pathMaked = typeof path === 'string' ? `/${path}` : '';
  const domain =
    typeof subdomain === 'string' ? makeSubdomain(subdomain) : Domain;

  return `${concatProtocol(domain, protocol)}${pathMaked}`;
}

interface MakeUrlOptions {
  path?: string;
  protocol?: string;
  subdomain?: string;
}
