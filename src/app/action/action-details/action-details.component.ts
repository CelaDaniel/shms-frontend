import { Component, OnInit } from '@angular/core';
import { ActionResponseType, ActionService } from '../action.service';
import { ActivatedRoute } from '@angular/router';
import { IAction } from '../action.model';

@Component({
    selector: 'app-action-details',
    templateUrl: './action-details.component.html',
    styleUrls: ['./action-details.component.scss'],
})
export class ActionDetailsComponent implements OnInit {
    action: IAction | null = null;

    constructor(
        protected actionService: ActionService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.actionService.getById(id).subscribe({
            next: (res: ActionResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IAction = res.body?.data!;
                this.action = data;
                console.log(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
