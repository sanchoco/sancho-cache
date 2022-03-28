"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCache = exports.Cache = void 0;
class Cache {
    constructor(option) {
        this.cache = {};
        this.defaultExp = (option === null || option === void 0 ? void 0 : option.exp) || 10 ** 13;
        this.defaultInterval = (option === null || option === void 0 ? void 0 : option.interval) || 0;
        // interval exp check
        if (this.defaultInterval > 0) {
            setInterval(() => {
                for (const key in this.cache) {
                    this.checkExp(key);
                }
            }, this.defaultInterval);
        }
    }
    set(key, value, exp) {
        this.cache[key] = {
            value,
            expire: exp ? new Date(Date.now() + exp) : new Date(this.defaultExp)
        };
    }
    get(key) {
        this.checkExp(key);
        if (this.cache[key])
            return this.cache[key]['value'];
        else
            return undefined;
    }
    del(key) {
        if (this.cache[key])
            delete this.cache[key];
    }
    checkExp(key) {
        if (this.cache[key]) {
            const data = this.cache[key];
            if (data.expire.getTime() < new Date().getTime()) {
                this.del(key);
            }
        }
    }
}
exports.Cache = Cache;
exports.globalCache = new Cache();
