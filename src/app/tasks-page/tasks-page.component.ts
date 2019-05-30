import {Component, OnDestroy} from '@angular/core';
import {ApiService} from '../api.service';
import {Prop} from '../api.model';
import {Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";

@Component({
    selector: 'app-tasks-page',
    templateUrl: './tasks-page.component.html',
    styleUrls: ['./tasks-page.component.scss']
})
export class TasksComponent implements OnDestroy {
    tasks = [];
    priorities: Prop[] = [];

    private _destroy$: Subject<void> = new Subject();

    constructor(private _apiService: ApiService) {
        this._apiService.taskItems$
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(tasks => this.tasks = tasks);
        this._apiService.priorities$
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(priorities => this.priorities = priorities);
    }

    ngOnDestroy() {
        this._destroy$.next();
    }

    editTask(taskId: number) {
        this._apiService.editTask(taskId);
    }

    newTask() {
        this._apiService.editTask(0);
    }

    priorityRgb(taskId: number) {
        const priority: Prop = this.priorities.find((p: Prop) => p.id === taskId);
        return priority == null ? 'transparent' : priority.rgb;
    }
}
