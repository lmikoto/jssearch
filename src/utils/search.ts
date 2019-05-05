import { cloneDeep, filter, get } from 'lodash'

type Distance = number[][]

interface IOption {
    keys?: string[] // 搜索的key值
    ignoreCase?: boolean // 是否忽略大小写
    sort?: boolean
    resultNum?: number // 结果显示的数量
    maxDistance?: number // 允许容错的最大编辑距离
}

export function getRecursion(a: string, b: string) {
    const lenA = a.length
    const lenB = b.length
    const d: Distance = []
    d[0] = []
    for (let j = 0; j <= lenB; j++) {
        d[0].push(j)
    }
    for (let i = 0; i <= lenA; i++) {
        if (d[i]) {
            d[i][0] = i
        } else {
            d[i] = []
            d[i][0] = i
        }
    }
    for (let i = 1; i <= lenA; i++) {
        for (let j = 1; j <= lenB; j++) {
            if (a[i - 1] === b[j - 1]) {
                d[i][j] = d[i - 1][j - 1]
            } else {
                const m1 = d[i - 1][j] + 1
                const m2 = d[i][j - 1] + 1
                const m3 = d[i - 1][j - 1] + 1
                d[i][j] = Math.min(m1, m2, m3)
            }
        }
    }
    return d[lenA][lenB]
}

const defaultOption = {
    keys: [],
    ignoreCase: true,
    sort: true,
    resultNum: undefined,
    maxDistance: undefined,
}

function cmp(a: any, b: any) {
    return a.mikodistance - b.mikodistance
}

export function getSearchData(datas: any[], searchStr: string = '', option: IOption = defaultOption) {
    const op = { ...defaultOption, ...option }
    const tempDatas = cloneDeep(datas)
    let result: any[] = []
    // 计算编辑距离
    for (const data of tempDatas) {
        let min = Infinity
        for (const key of op.keys) {
            const v: string = get(data, key, '')
            const d = getRecursion(v, searchStr)
            if (d < min) {
                min = d
            }
        }
        data.mikodistance = min
    }
    if (op.maxDistance) {
        result = filter(tempDatas, (d: any) => {
            // @ts-ignore
            return d.mikodistance <= op.maxDistance
        })
    }
    if (op.sort) {
        result = result.sort(cmp)
    }
    if (op.resultNum) {
        result = result.slice(0, op.resultNum)
    }
    return result
}
