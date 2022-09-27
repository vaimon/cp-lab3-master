class Cache {
    constructor() {
        this._cacheDictionary = new Map()
        this._statsList = []
    }

    cache(key, value, cacheSize = 1) {
        this._cacheDictionary.set(key, {value: value, cacheSize: cacheSize})
        this._statsList.push(`VALUE_CACHED: ${key}: ${value}, cache size: ${cacheSize}`)
    }

    getCacheSize(key){
        if(this._cacheDictionary.has(key)){
            return this._cacheDictionary.get(key).cacheSize
        }
        return 0
    }

    get(key){
        if(this._cacheDictionary.has(key)){
            let cachedValue = this._cacheDictionary.get(key)
            cachedValue.cacheSize -= 1
            this._statsList.push(`VALUE_GOT: ${key}: ${cachedValue.value}, cache size left: ${cachedValue.cacheSize}`)
            if(cachedValue.cacheSize === 0){
                this._cacheDictionary.delete(key)
                this._statsList.push(`CACHE_EXPIRED: ${key}: ${cachedValue.value}. The pair was deleted.`)
            }
            return cachedValue.value
        }
        return null
    }

    count(){
        return this._cacheDictionary.size
    }

    stats(){
        return this._statsList
    }

}

export {Cache}