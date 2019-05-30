export interface Prop {
    rgb: string;
    id: number;
    name: string;
}

export interface TaskDto {
    id: number;
    name?: string;
    description?: string;
    comment?: string;
    price?: number;
    taskTypeId?: number;
    statusId?: number;
    priorityId?: number;
    serviceId?: number;
    resolutionDatePlan?: string;
    tags?: number[];
    initiatorId?: number;
    executorId?: number;
    executorGroupId?: number;
}



const url = 'http://intravision-task.test01.intravision.ru';

export const Api = {
    tags: tenantguid => `${url}/api/${tenantguid}/Tags`,
    tasks: (tenantguid, id?) => `${url}/api/${tenantguid}/Tasks${id != null ? `/${id}` : ''}`,
    users: tenantguid => `${url}/api/${tenantguid}/Users`,
    tasksOData: tenantguid => `${url}/odata/tasks?tenantguid=${tenantguid}`,
    statuses: tenantguid => `${url}/api/${tenantguid}/Statuses`,
    services: tenantguid => `${url}/api/${tenantguid}/Services`,
    taskTypes: tenantguid => `${url}/api/${tenantguid}/TaskTypes`,
    priorities: tenantguid => `${url}/api/${tenantguid}/Priorities`,
    userGroups: tenantguid => `${url}/api/${tenantguid}/UserGroups`,
};

export const tenantsUrl = `${url}/api/Tenants`;
