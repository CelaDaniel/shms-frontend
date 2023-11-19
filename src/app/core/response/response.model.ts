export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface IArrayResponse<T> {
    code: number;
    message: string;
    data: IData<T>;
}

export interface IData<T> {
    content: T[];
    pageable: IPagination;
}

export interface IPagination {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}
