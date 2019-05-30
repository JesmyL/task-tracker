import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';


import {BrandComponent} from './brand-page/brand-page.component';
import {DbComponent} from './db-page/db-page.component';
import {TasksComponent} from './tasks-page/tasks-page.component';
import {EmployeeComponent} from './employee-page/employee-page.component';
import {ClientsComponent} from './clients-page/clients-page.component';
import {ActivesComponent} from './actives-page/actives-page.component';
import {SettingsComponent} from './settings-page/settings-page.component';
import {TaskEditorComponent} from './task-editor/task-editor.component';

import {SimpleNotificationsModule} from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    {
        path: 'brand',
        component: BrandComponent,
        data: {title: 'BRAND'}
    },
    {
        path: 'db',
        component: DbComponent,
        data: {title: 'База знаний'}
    },
    {
        path: 'tasks',
        component: TasksComponent,
        data: {title: 'Заявки'}
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        data: {title: 'Сотрудники'}
    },
    {
        path: 'clients',
        component: ClientsComponent,
        data: {title: 'Клиенты'}
    },
    {
        path: 'actives',
        component: ActivesComponent,
        data: {title: 'Активы'}
    },
    {
        path: 'settings',
        component: SettingsComponent,
        data: {title: 'Настройки'}
    },
    {
        path: '',
        redirectTo: '/brand',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        BrandComponent,
        DbComponent,
        TasksComponent,
        EmployeeComponent,
        ClientsComponent,
        ActivesComponent,
        SettingsComponent,
        TaskEditorComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
