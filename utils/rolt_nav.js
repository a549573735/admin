          // <ul class="c-list">

          //      <li><a href="javascript:;"><i class="icon-caret-right"></i>组织</a>
          //         <dl class="open">
          //            <dd>
          //                 <a href="/organize/architecture">组织架构</a>
          //             </dd>
          //             <dd>
          //                 <a href="/organize/market">市场所</a>
          //             </dd>
          //             <dd>
          //                 <a href="/organize/park">园区</a>
          //             </dd>
          //             <dd>
          //                 <a href="/organize/company">企业</a>
          //             </dd>
          //         </dl>
          //      </li>
          //      <li><a href="/inspect/list"> 网络检查列表</a></li>
          //      <li><a href="/appointment/list"> 预约检查列表</a></li>
          //      <li><a href="/interview/list"> 行政约谈列表</a></li>
          //      <li><a href="/suggestion/list"> 行政建议列表</a></li>
          //      <li><a href="/publicity/list"> 年报公示列表</a></li>
          //      <li><a href="javascript:;"><i class="icon-caret-right"></i> 用户管理</a>
          //          <dl>
          //              <dd>
          //                  <a href="/user/add">角色管理</a>
          //              </dd>
          //              <dd>
          //                  <a href="/user/edit/list">用户列表</a>
          //              </dd>
          //              <dd>
          //                  <a href="/logout">退出</a>
          //              </dd>
          //          </dl>
          //      </li>
          //  </ul>

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
                                                        {href:"/user/add",title:'角色管理'},
                                                        {href:"/user/edit/list",title:'用户列表'},
                                                      {href:"/logout",title:'退出'},

                                                     ]},
               ]

 
};

exports.navData=nav;

















