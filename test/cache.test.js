import {Cache} from "../src/cache";

it('Cache is set to 1 by default', () => {
    let cacher = new Cache()
    cacher.cache('color','red')
    expect(cacher.getCacheSize('color')).toBe(1)
});

it('Cache is set to 0 in case of unpresent value', () => {
    let cacher = new Cache()
    expect(cacher.getCacheSize('color')).toBe(0)
});

it('Cache decrements with each get()', () => {
    let cacher = new Cache()
    cacher.cache('color','red',2)
    expect(cacher.getCacheSize('color')).toBe(2)
    cacher.get('color')
    expect(cacher.getCacheSize('color')).toBe(1)
});

it('Cache is set to 0 after last get()', () => {
    let cacher = new Cache()
    cacher.cache('color','red')
    expect(cacher.getCacheSize('color')).toBe(1)
    cacher.get('color')
    expect(cacher.getCacheSize('color')).toBe(0)
});

it('Cache returns null after last get()', () => {
    let cacher = new Cache()
    cacher.cache('color','red')
    expect(cacher.get('color')).toBe('red')
    expect(cacher.get('color')).toBe(null)
});

it('Cache returns null of unpresent key', () => {
    let cacher = new Cache()
    cacher.cache('color','red')
    expect(cacher.get('number')).toBe(null)
});

it('Cache returns same values in all get()', () => {
    let cacher = new Cache()
    cacher.cache('color','red',2)
    expect(cacher.get('color')).toBe('red')
    expect(cacher.get('color')).toBe('red')
});

it('Count returns objects count', () => {
    let cacher = new Cache()
    cacher.cache('color','red',2)
    cacher.cache('anotherColor','green',2)
    expect(cacher.count()).toBe(2)
});

it('Count doesnt return dead objects', () => {
    let cacher = new Cache()
    cacher.cache('color','red',1)
    cacher.get('color')
    expect(cacher.count()).toBe(0)
});

it('Cache method can update cache size', () => {
    let cacher = new Cache()
    cacher.cache('color','red',1)
    expect(cacher.getCacheSize('color')).toBe(1)
    cacher.cache('color','red',4)
    expect(cacher.getCacheSize('color')).toBe(4)
});

it('Cache stats tracks all the events happening', () => {
    let cacher = new Cache()
    cacher.cache('color','red',3)
    expect(cacher.stats().length).toBe(1)
    cacher.get('color')
    expect(cacher.stats().length).toBe(2)
});

it('Cache stats tracks cache dropping empty value', () => {
    let cacher = new Cache()
    cacher.cache('color','red')
    expect(cacher.stats().length).toBe(1)
    cacher.get('color')
    expect(cacher.stats().length).toBe(3)
});

it('Cache stats are blank before the first action', () => {
    let cacher = new Cache()
    expect(cacher.stats()).toStrictEqual([])
});