import { ActionStatus } from '../enums/action-status.model';

export interface IAction {
    id: number;
    action: string;
    description: string;
    requestMethod: string;
    status: ActionStatus;
    error: string;
    statusCode: number;
    createdAt: string;
    createdBy: string;
}
