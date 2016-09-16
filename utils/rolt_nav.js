


     var nav={
           all:[
            
                {href:'javascript:;','parentTitle':'item1',title:'组织',list:[
                                                        {href:"/organize/architecture",title:'组织架构'},
                                                        {href:"/organize/market",title:'市场所',code:'same_level_manage'},
                                                        {href:"/organize/park",title:'园区',code:'lower_level_manage'},
                                                        {href:"/organize/company",title:'企业'},
                                                       ]},
                {href:'/inspect/list',title:'网络检查列表',code:'network_check_list'},
                {href:'/appointment/list',title:'预约检查列表',code:'appointment_list'},
                {href:'/interview/list',title:'行政约谈列表',code:'interview_list'},
                {href:'/suggestion/list',title:'行政建议列表',code:'suggestion_list'},
                {href:'/publicity/list',title:'年报公示列表',code:'publicity_list'},

                {href:'javascript:;',title:'用户管理',list:[
                                                        {href:"/user/role/list",title:'角色管理'},
                                                        {href:"/user/edit/list",title:'用户列表'},
                                                        {href:"/signout",title:'退出'},

                                                     ]}
               ],
            backStage:[
              {href:"/admin/interface/list",title:'接口管理'}, 
              {href:'javascript:;',title:'单位管理',list:[
                                                        
                                                        {href:"/admin/market",title:'市场所',code:'same_level_manage'},
                                                        {href:"/admin/park",title:'园区',code:'lower_level_manage'},
                                                   
                                                       ]}

           ],
           subAdmin:[

                {href:"/organize/market",title:'市场所',parentTitle:'1', code:'same_level_manage'},
                {href:"/organize/park",title:'园区', parentTitle:'1',code:'lower_level_manage'},
                {href:'/inspect/list',title:'网络检查列表',parentTitle:'2', code:'network_check_list'},
                {href:'/appointment/list',title:'预约检查列表',parentTitle:'3',code:'appointment_list'},
                {href:'/interview/list',title:'行政约谈列表',parentTitle:'4',code:'interview_list'},
                {href:'/suggestion/list',title:'行政建议列表',parentTitle:'5',code:'suggestion_list'},
                {href:'/publicity/list',title:'年报公示列表',parentTitle:'6',code:'publicity_list'}]   

       };



exports.navData=nav;

















