define(function (require, exports, module) {

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/admin_handle_tables_company')




    new Vue( {
        'el':'#admin-company',
       data:{
          tablsData: function (){
                     var data= JSON.parse($('.data_tabls').val())
                         data.detals=true
                      return data

          }(),
          parkId:'',
          page:0,
          marketId:'',
          selectsubset:''
       },
       methods:{
              searchData:function (){
                  var that=this;
                  var form={
                    "businesses": $('input[name=businesses]').val(),
                    "companyName":  $('input[name=company]').val(),
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
                  
                })

          },createCompany:function(event){


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
                      mail:$('.admin-email').val(),
                      admin:$('.admin-admin').val(),
                      id: $('.admin-id').val(),

                }
                var that=this;


               var checked=Common.checkEmpty($('#modal-addCompany').find('input[type=text]'))

               var checkEmail=Common.checkEmail($('.admin-email'));

               if(checked.state=='false'){
                  alert(checked.message)  
                  return false 
               }
            
               if(checkEmail.state=='false'){
                  alert(checked.message)  
                  return false 
               }

                if($('.admin-type').val()=='modify'){

                    $.post('/admin/company/modify',form).then(function (data){


                          if(data.success){
                       
                            alert('修改成功')

                          }else {
                            console.log(data.errMessage)
                            alert('修改失败')
                          }
                    })

                }else {

                    $.post('/api/company/add',form).then(function (data){

                          if(data.success){
                           $('#modal-addCompany').find('input').val('')
                           $('#modal-addCompany').find('select').val('0')
                            alert('新增成功')
                           
                          }else {
               
                            alert(data.errMessage)
                          }

                    })

                }
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
                id:'',
                park:''
            }

            $.post('/admin/company',form).then(function (data){

                  data.detals=true
                  that.tablsData = data.data

            })

          },'send-selectId':function (data){

                this.parkId=data.parkId;
                this.marketId=data.marketId;
                this.selectsubset=data.selectIds;

                console.log(JSON.stringify(this.selectsubset))

          }

       }
  })

});

















