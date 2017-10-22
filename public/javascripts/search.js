'use strict';

$(function(){
  $('#searchScore').on('click', function(){
    let studentId = $('#studentId').siblings('input').val();
    $.getJSON('/api/searchScore?id='+studentId,(d)=>{
      if(d.ok==1){
        let scoreArr = d.result;
        scoreArr.forEach(function(val,idx,arr){
          let tr = '<tr><th>'+(idx+1)+'</th>'+
                   '<td>'+val.name+'</td>'+
                   '<td>'+val.id+'</td>'+
                   '<td>'+val.total+'</td>'+
                   '<td>'+val.hearing+'</td>'+
                   '<td>'+val.reading+'</td>'+
                   '<td>'+val.writing+'</td></tr>';

          $('#resultTables').append($(tr));
        })
      }else{
        alert('something goes wrong.')
      }
    })
  })
})
