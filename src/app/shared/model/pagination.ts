export interface Ipagination<T> {
    pageIndex:number
    pageSize:number
    count:number
    result:T[]
}
