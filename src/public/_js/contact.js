(function ($) {

  const utm = location.search.replace('?', '&')
  const Messages = $('#form-status')

  $('#contactForm').on('submit', function (e) {
    e.preventDefault()

    const fields = $(this).serialize() + utm
    db_save({utm, fields: $(this).serialize()}, fields)
  })

  function db_save(data, fields) {
    $.ajax({
      url: '/lead',
      type: 'POST',
      dataType: '',
      data,
      beforeSend: function (xhr) {
        $(Messages).html('<p>Enviando...</p>')
      },
      success: function (data) {
        console.log('stored in db:', data)
        send_to_webhook(fields)
      }
    })
  }

  function send_to_webhook(data) {
    $.ajax({
      url: 'https://hooks.zapier.com/hooks/catch/11179028/bz6xrwq/',
      dataType: 'json',
      data,
      beforeSend: function (xhr) {
        // $(Messages).html('<p>Enviando...</p>')
      },
      success: function (data) {
        console.log('response from webhook', data)
        $(Messages).html('<p>Enviado exitosamente.</p>')
        window.location.href = "/agradecimientos/"
      }
    })
  }


})(jQuery)