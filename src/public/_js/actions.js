(function ($) {
  $(document).ready(function () {
    const leadsTable = $('#leads-table'),
      landingSelect = $('#landing-select'),
      inputDate = $('#input-date')

    $(landingSelect).on('change', function (e) {
      location.search = `landingId=${e.target.value}`
      $(inputDate).removeAttr('disabled')
    })

    $(inputDate).on('change', function (e) {
      location.search = `${location.search}&createdAt=${e.target.value}`
    })

    /** Lock date filter if !landing select */
    if (!getUrlVars()['landingId']) {
      $(inputDate).attr('disabled', true)
    }

    /** Get landing list */
    $.ajax({
      url: '/landing',
      success: function (response) {
        if (response.length > 0) {
          $.each(response, function (i, item) {
            const option = document.createElement('option')
            option.value = item.id
            $(option).text(item.name)

            if (getUrlVars()['landingId'] && item.id === parseInt(getUrlVars()['landingId'])) {
              $(option).attr('selected', true)
            }

            $(landingSelect).append(option)
          })
        }
      }
    })

    /** Get leads */
    function get_leads(q) {
      $.ajax({
        url: `/lead${q}`,
        contentType: 'application/json',
        beforeSend: function () {
          $(leadsTable).addClass('muted')
        },
        success: function (response) {
          if (response.length > 0) {
            $.each(response, function (i, item) {
              let row = document.createElement('tr')

              const createdAt = new Date(item.createdAt)
              const date = `${createdAt.getDate()}/${(createdAt.getMonth() + 1)}/${createdAt.getFullYear()}`

              $(row).html(`
                <td>${date}</td>
                <td>
                    <pre>${JSON.stringify(JSON.parse(item.fields), false, 2)}</pre>
                </td>
                <td>
                    <pre>${JSON.stringify(JSON.parse(item.utm), false, 2)}</pre>
                </td>
              `)

              $(leadsTable).find('tbody').html('').append(row)
            })
          } else {
            $(leadsTable).find('tbody').html('')
          }

          setTimeout(function () {
            $(leadsTable).removeClass('muted')
          }, 1000)
        }
      })
    }

    function getUrlVars() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }

    // let query = '?'
    // if (getUrlVars()['landingId']) {
    //   query += `landingId=${parseInt(getUrlVars()['landingId'], 10)}`
    // } else if (getUrlVars()['createdAt']) {
    //   query += `&createdAt=${getUrlVars()['createdAt']}`
    // }

    if (location.search) {
      get_leads(location.search)
    }
  })
})(jQuery)