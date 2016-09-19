define(function (require, exports, module) {

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/admin_handle_tables_company')

    new Vue( {
        'el':'#handle-table',
       data:{
          tablsData: function (){
                     var data= JSON.parse($('.data_tabls').val())
                         data.detals=true
                      return data

          }(),
          parkId:'',
          page:0
       },
       methods:{
              searchData:function (){
                  var that=this;
                  var form={
                    "businesses": $('input[name=businesses]').val(),
                    "company":  $('input[name=company]').val(),
                    "customer":  $('input[name=customer]').val(),
                    "market":  $('#select_market').val(),
                    "page": this.page,
                    "park":  $('#select_park').val(),
                    "producer":  $('input[name=producer]').val(),
                    "product":  $('input[name=product]').val(),
                    "provider":  $('input[name=provider]').val(),
                    "size": 15,
                    "id":$('#select_park').val()
                  }
                this.parkId=$('#select_park').val();

                $.post('/admin/company',form).then(function (data){
                  data.detals=true
                  that.tablsData = data.data
                  console.log(JSON.stringify(data))
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
                      username:$('input[name=admin-username]').val(),
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
          },
          'send-page':function (page){
            this.tablsData.page=page;

           // this.searchData()
            var that=this;
            var form={
                page:page-1,
                id:this.parkId,
                park:this.parkId

            }

            $.post('/admin/company',form).then(function (data){

                  data.detals=true
                  that.tablsData = data.data
                  console.log(that.tablsData.page)  
                  console.log(that.tablsData)

            })

          }

       }
  })

});

















