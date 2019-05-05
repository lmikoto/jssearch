interface IOption {
    keys?: string[];
    ignoreCase?: boolean;
    sort?: boolean;
    resultNum?: number;
    maxDistance?: number;
}
export declare function getRecursion(a: string, b: string): number;
export declare function getSearchData(datas: any[], searchStr?: string, option?: IOption): any[];
export {};
