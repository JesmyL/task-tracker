import {Component, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {ApiService} from '../api.service';
import {TaskDto, Prop} from '../api.model';
import {switchMap, takeUntil, filter} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

@Component({
    selector: 'app-task-editor',
    templateUrl: './task-editor.component.html',
    styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnDestroy {

    task: TaskDto = null;
    newComment = '';
    statuses: Prop[];
    users: Prop[];
    private _currentStatusRgb = 0;

    private _destroy$: Subject<void> = new Subject();

    constructor(private _apiService: ApiService) {
        this._apiService.editTask$
            .pipe(
                switchMap((taskId: number) => {
                    return taskId == null ?
                        of(null) :
                        taskId === 0 ? of({
                            name: '',
                            description: ''
                        }) : this._apiService.getProperty$('tasks', taskId);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe((task: TaskDto) => {
                this.currentStatusRgb = task == null ? 0 : task.statusId;
                this.task = task;
                this.newComment = '';
            });

        this._apiService.statuses$
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(statuses => this.statuses = statuses);

        this._apiService.getProperty$('users')
            .pipe(
                filter(() => !this.users),
                takeUntil(this._destroy$)
            )
            .subscribe(users => this.users = users);
    }

    ngOnDestroy() {
        this._destroy$.next();
    }

    set currentStatusRgb(value: any) {
        this._currentStatusRgb = parseInt(value, 10);
    }

    get currentStatusRgb() {
        return this._currentStatusRgb;
    }

    close() {
        this._apiService.editTask(null);
    }

    create(name, description) {
        if (name && description) {
            this._apiService.sendNewTask$(name, description).subscribe();
        }
    }

    edit(statusId, executorId) {
        const task: TaskDto = {
            id: this.task.id,
            statusId: parseInt(statusId || this.task.statusId, 10),
            executorId: parseInt(executorId || this.task.executorId, 10),
        };

        if (this.newComment) {
            task.comment = this.newComment;
        }

        if (task.statusId !== this.task.statusId || task.executorId !== this.task.executorId || this.newComment) {
            this._apiService.sendEditedTask$(task)
                .subscribe((editedTask: TaskDto) => {
                    this.task = editedTask;
                    this.newComment = '';
                });
        }
    }

    badgeRgb() {
        const status = this.statuses.find((s: Prop) => s.id === this.currentStatusRgb);
        return status == null ? 'transparent' : status.rgb;
    }
}
