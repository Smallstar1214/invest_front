import * as Icons from 'tabler-icons-react';

export const SidebarMenu = [
    {
        group: '',
        contents: [
            {
                name: 'Dashboard',
                icon: <Icons.Template />,
                path: '/dashboard',
            },
        ]
    },
    {
        group: 'Section 1',
        contents: [
            {
                name: 'Investors',
                icon: <Icons.UserPlus />,
                path: '/investors',
            },
            {
                name: 'Risk Profile',
                icon: <i className='bi bi-bar-chart' />,
                path: '/risk-profile',
            },
        ]
    },
    {
        group: 'Section 2',
        contents: [
            {
                name: 'Opportunities',
                icon: <i className='bi bi-graph-up-arrow fs-5' /> ,
                path: '/opportunities',
                childrens: [
                    {
                        name: 'New Opportunities',
                        path: '/opportunities/new',
                        grp_name: "opportunities",
                    },
                    {
                        name: 'Active Investments',
                        path: '/opportunities/active-investments',
                        grp_name: "opportunities",
                    },
                ]
            },
        ]
    },
    {
        group: 'Section 3',
        contents: [
            {
                name: 'Documents',
                icon: <Icons.File />,
                path: '/documents',
            },
        ]
    },
    {
        group: 'Section 4',
        contents: [
            {
                name: 'Accounts and Security',
                icon: <Icons.UserSearch />,
                path: '/accounts-and-security',
            },
        ]
    },
    
]