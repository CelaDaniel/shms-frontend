export interface IDashboardTab {
    nrActive: number;
    nrTotal: number;
}

export interface IRevenueData {
    datasets: IDataset[];
    labels: string[];
}

export interface IDataset {
    label: string;
    data: number[];
}
