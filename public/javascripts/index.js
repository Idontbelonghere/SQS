'use strict';

$(() => {
  $('#saveScore').on('click', () => {
    // alert('Score saved.');
    let id = $('#studentId').siblings('input').val();
    let obj = {
      id: id,
      name: $('#studentName').siblings('input').val(),
      total: parseInt($('#totalScore').siblings('input').val()),
      hearing: parseInt($('#hearingScore').siblings('input').val()),
      reading: parseInt($('#readingScore').siblings('input').val()),
      writing: parseInt($('#writingScore').siblings('input').val()),
      class: id.slice(0, id.indexOf('-'))
    };
    console.log(obj);

    $.post('/api/saveScore',obj,(d)=>{
      console.log(d);
      if(d.ok==1){
        console.log('score saved.')
      }
    })

  })
})
