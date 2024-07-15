export const Permissions = {
AdminPermission : {
    page:{
    Statistics : true,
    Clients : true,
    Assistants : true,
    Users : true,
    Campaigns : true,
    Billing : true,
    Settings : true	
    },
    components:{
        clients:{
            add: true,
            update: true,
            delete: true
        },
        users:{
            add: true,
            update: true,
            delete: true
        },
        assistants:{
            add: true,
            update: true,
            delete: true
        },
        campaigns:{
            add: true,
            update: true,
            delete: true
        }
    }
    

},
SaleManagerPermission : {
    page:{
    statistics : true,
    clients : false,
    assistants : false,
    users : true,
    campaigns : true,
    billing : true,
    settings : true	
    },
    components:{
        users:{
            saleperson : {
                add: true,
                update: {
                    rights : false
                },
                delete: true,	
            },
            salemanager : {
                update: {
                    rights : false,
                    status : false
                },	
            }
        },
        campaigns:{
            add: true,
            update: true,
            delete: false
        }
    },
},
SalePersonPermission : {
    page:{
    statistics : true,
    clients : false,
    assistants : false,
    users : true,
    campaign : true,
    billing : false,
    setting : false	
    },
    components:{
        users:{
            saleperson : {
                update: {
                    status : false,
                    rights : false
                },
            },
        }
    }
}

}

