export type MenuItem = {
	id?: number;
	name?: string;
	icon?: string;
	to?: string;
	object?: string;
	badge?: number;
	pinned?: boolean;
	recently?: boolean;
	items?: MenuItem[];
	separator?: boolean;
	component?: string;
};
