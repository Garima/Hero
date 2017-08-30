import { NavSubMenuItem } from '../model/nav-sub-menu-item';

export class NavMenuItem {
        id: number;
        name: string;
        link:string;//ask carl to send this
        subNav: NavSubMenuItem[];
}