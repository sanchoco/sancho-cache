type cacheData = { value: any, expire: Date };
type cacheOption = { exp?: number, interval?: number };

export class Cache {
  private cache: {[k: string]: cacheData};
  private defaultExp: number;
  private defaultInterval: number;
  constructor(option?: cacheOption) {
    this.cache = {};
    this.defaultExp = option?.exp || 10**13;
    this.defaultInterval = option?.interval || 0;

    // interval exp check
    if (this.defaultInterval > 0) {
      setInterval(() => {
        for (const key in this.cache) {
          this.checkExp(key);
        }
      }, this.defaultInterval);
    }
  }

  set(key: string, value: any, exp?: number) {
    this.cache[key] = {
      value,
      expire: exp ? new Date(Date.now() + exp) : new Date(this.defaultExp)
    };
  }

  get(key: string) {
    this.checkExp(key);
    if (this.cache[key]) return this.cache[key]['value'];
    else return undefined;
  }

  del(key: string) {
    if (this.cache[key])
      delete this.cache[key];
  }

  private checkExp(key: string) {
    if (this.cache[key]) {
      const data = this.cache[key];
      if (data.expire.getTime() < new Date().getTime()) {
        this.del(key);
      }
    }
  }
}

export const globalCache = new Cache();