import { Injectable } from '@angular/core';

interface IBreadcrumb {
    label: string;
    url: string;
}

@Injectable()
export class BreadcrumbService {
    public breadcrumbItem;
    private itemBreadcrums:IBreadcrumb[] = [{ label: 'Home', url: ''}];

    constructor() {
    }

    setBreadcrumbs(pages) {
        this.itemBreadcrums = [{ label: 'Home', url: ''}];
        for (let entry of pages) {
            this.itemBreadcrums.push(entry);
        }
    }
    getBreadcrumbs(){
        return this.itemBreadcrums;
    }
}