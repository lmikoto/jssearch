import { getRecursion, getSearchData } from './utils/search'

export { getRecursion, getSearchData }

const testD = [
    {
        a: 1,
        b: 2,
        c: {
            d: 3,
            f: 4,
        },
    },
    {
        a: '哈哈啊',
        b: '嘤嘤嘤',
        c: {
            d: '111',
            f: 4,
        },
    },
]
const option = {
    keys: ['a', 'b', 'c.d'],
}

getSearchData(testD, '1', option)
