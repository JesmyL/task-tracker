import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, BehaviorSubject, of, Observable} from 'rxjs';
import {filter, switchMap, first, tap, map, publishReplay, refCount} from 'rxjs/operators';
import {Api, Prop, TaskDto, tenantsUrl} from './api.model';

@Injectable()
export class ApiService {

    private _tenants$: BehaviorSubject<string> = new BehaviorSubject('');
    public tenants$: Observable<string> = this._tenants$.asObservable()
        .pipe(
            publishReplay(1),
            refCount()
        );

    private _priorities$: BehaviorSubject<Prop[]> = new BehaviorSubject([]);
    public priorities$: Observable<Prop[]> = this._priorities$.asObservable()
        .pipe(
            publishReplay(1),
            refCount()
        );

    private _statuses$: BehaviorSubject<Prop[]> = new BehaviorSubject([]);
    public statuses$: Observable<Prop[]> = this._statuses$.asObservable()
        .pipe(
            publishReplay(1),
            refCount()
        );

    private _taskItems$: BehaviorSubject<TaskDto[]> = new BehaviorSubject([]);
    public taskItems$: Observable<TaskDto[]> = this._taskItems$.asObservable()
        .pipe(
            publishReplay(1),
            refCount()
        );

    private _editTask$: Subject<number> = new Subject();
    public editTask$: Observable<number> = this._editTask$.asObservable()
        .pipe(
            publishReplay(1),
            refCount()
        );

    constructor(private _http: HttpClient) {
        if (localStorage.tenants == null) {
            this._http.get(tenantsUrl).subscribe((tenants: string) => {
                localStorage.tenants = tenants;
                this._tenants$.next(tenants);
            });
        } else {
            this._tenants$.next(localStorage.tenants);
        }

        this.getProperty$('priorities').subscribe(this._priorities$);
        this.getProperty$('statuses').subscribe(this._statuses$);

        this.statuses$.subscribe();

        this.getProperty$('tasksOData')
            .subscribe(tasksOData => this._taskItems$.next(tasksOData.value));
    }

    public getProperty$(propertyName, data?) {
        return propertyName in Api ?
            this.tenants$
                .pipe(
                    filter(data => !!data),
                    first(),
                    switchMap(tenants => this._http.get(Api[propertyName](tenants, data)))
                ) :
            of(null);
    }

    editTask(taskId) {
        this._editTask$.next(taskId);
    }

    sendNewTask$(name, description) {
        return this.tenants$
            .pipe(
                filter(data => !!data && !!name && !!description),
                first(),
                switchMap(tenants => this._http.post(Api.tasks(tenants), {name, description})
                    .pipe(
                        switchMap(taskId => this._http.get(Api.tasks(tenants, taskId))),
                        tap((newTask: TaskDto) => {
                            this._taskItems$.next(this._taskItems$.getValue().concat([newTask]));
                            this.editTask(newTask.id);
                        }),
                    ))
            );
    }

    sendEditedTask$(task: TaskDto) {
        return this.tenants$
            .pipe(
                filter(data => !!data && !!task && !!task.id),
                first(),
                switchMap(tenants => this._http.put(Api.tasks(tenants), task)
                    .pipe(
                        switchMap(taskId => this._http.get(Api.tasks(tenants, task.id))),
                        tap((editedTask: TaskDto) => {
                            const tasks = this._taskItems$.getValue();
                            const index = tasks.findIndex(task => task.id === editedTask.id);
                            tasks[index] = editedTask;

                            this._taskItems$.next(tasks);
                        }),
                        map((editedTask: TaskDto) => editedTask),
                    ))
            );
    }
}
