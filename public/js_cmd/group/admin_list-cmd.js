define(function (require, exports, module) {

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/handle_tables_company')

    new Vue( {
        'el':'#handle-table',
       data:{
          tablsData: function (){
                     var data= JSON.parse($('.data_tabls').val())
                         data.detals=true
                      return data

          }(),
          parkId:''
       },
       methods:{
              searchData:function (){
                var that=this;
                  var form={
                    "businesses": $('input[name=businesses]').val(),
                    "company":  $('input[name=company]').val(),
                    "customer":  $('input[name=customer]').val(),
                    "market":  $('#select_market').val(),
                    "page": 0,
                    "park":  $('#select_park').val(),
                    "producer":  $('input[name=producer]').val(),
                    "product":  $('input[name=product]').val(),
                    "provider":  $('input[name=provider]').val(),
                    "size": 15
                  }
          
                $.post('/api/organize/company/list',form).then(function (data){
                  data.detals=true
                  that.tablsData= data
                  console.log(data)
                })

          },createCompany:function(){

                var form={
                      address:$('input[name=admin-address]').val(),
                      belongId:this.parkId,
                      businesses:$('input[name=admin-businesses]').val(),
                      certificate:$('input[name=admin-certificate]').val(),
                      expireDate:$('input[name=admin-expireDate]').val(),
                      contact:$('input[name=admin-contact]').val(),
                      name:$('input[name=admin-company]').val(),
                      phone:$('input[name=admin-phone]').val(),
                }

                $.post('/api/company/add',form).then(function (data){


                      if(data.success){
                        alert('新增成功')
                      }else {
                        console.log(data.errMessage)
                        alert('新增失败')
                      }

                })
           }
       },events:{

          'send-select-admin':function (id){
             this.parkId=id;
          }

       }
  })

});

















