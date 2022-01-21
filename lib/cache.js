// cache

/**
 * great references: https://developer.mozilla.org/en-US/docs/Web/API/Cache, https://stackoverflow.com/questions/14266730/js-how-to-cache-a-variable
 */
class Cache {
    clear() {
        this.current = Object.create(null);
    }

    has(key) {
        if (typeof key != 'string') return false;
        return !!this.current[key];
    }

    get(key) {
        if (typeof key != 'string') return false;

        const val = this.current[key];
        if (!val) return val;
        const { value, expires } = val;

        if (expires && Date.now() >= expires) {
            delete this.current[key];
            return this.stale ? value : undefined;
        }

        return value;
    }

    delete(key) {
        if (typeof key !== 'string') return false;

        delete this.current[key];

        return true;
    }

    
}

module.exports = Cache;