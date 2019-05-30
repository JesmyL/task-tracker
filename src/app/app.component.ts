import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    fields = [
        {
            id: 'db',
            icon: 'book',
            label: 'База знаний',
        },
        {
            id: 'tasks',
            icon: 'file',
            label: 'Заявки',
        },
        {
            id: 'employee',
            icon: 'people',
            label: 'Сотрудники',
        },
        {
            id: 'clients',
            icon: 'city',
            label: 'Клиенты',
        },
        {
            id: 'actives',
            icon: 'analytics',
            label: 'Активы',
        },
        {
            id: 'settings',
            icon: 'settings',
            label: 'Настройки',
        },
    ];

}
