

var nav={
        subAdmin:[
            
                {href:'javascript:;',title:'组织',list:[
                                                        {href:"/organize/architecture",title:'组织架构'},
                                                        {href:"/organize/market",title:'市场所'},
                                                        {href:"/organize/park",title:'园区'},
                                                        {href:"/organize/company",title:'企业'},

                                                       ]},
                {href:'/inspect/list',title:'网络检查列表'},
                {href:'/appointment/list',title:'预约检查列表'},
                {href:'/interview/list',title:'行政约谈列表'},
                {href:'/suggestion/list',title:'行政建议列表'},
                {href:'/publicity/list',title:'年报公示列表'},

                {href:'javascript:;',title:'用户管理',list:[
                                                        {href:"/user/role/list",title:'角色管理'},
                                                        {href:"/user/edit/list",title:'用户列表'},
                                                        {href:"/signout",title:'退出'},

                                                     ]},
               ],
        parkAdmin:[
              {href:'javascript:;',title:'组织',list:[
                                                        {href:"/park",title:'企业'},

                                                     ]},
              {href:'/park/publicity',title:'年报公示列表'},

              {href:'javascript:;',title:'用户管理',list:[
                                                        {href:"/user/role/list",title:'角色管理'},
                                                        {href:"/user/edit/list",title:'用户列表'},
                                                        {href:"/signout",title:'退出'},

                                                     ]},

        ],
        backStage:[
              {href:'/publicity/list',title:'接口管理'},
              {href:'javascript:;',title:'单位管理',list:[
                                                         
                                                        {href:"/company/market",title:'市场所'},
                                                        {href:"/company/park",title:'园区'},
                                                   

                                                       ]},


        ]       
               
};

exports.navData=nav;

















