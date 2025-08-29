; (function () {
  $(document).ready(function () {

    var animateScroll = function (_this, event) {
      event.preventDefault();
      var id  = $(_this).attr('href'),
          top = $(id).offset().top-70;
      $('body,html').animate({scrollTop: top}, 1000);
    };

    $(".navbar-nav").on("click","a", function (event) {
      animateScroll(this, event);
      if (window.innerWidth < 992) {
        $('.navbar-collapse').collapse('hide');
      }
    });

    $(".navbar").on("click", ".navbar-brand", function (event) {
      animateScroll(this, event);
    });

    $("#about").on("click","a.nav-vac", function (event) {
      animateScroll(this, event);
    });

    $(".goto-command").on("click", function (event) {
      $('#customSwitch1').click();
    });

    $("#customSwitch1").on("click", function (event) {
      $(this).parent().toggleClass('checked')
      $('.tab').toggleClass('d-none');
    });

    $('.navbar-brand').on("click", function (e) {
      $('.modal').modal('hide');
    });

    $('.modal').on("hidden.bs.modal", function (e) {
      if($('.modal:visible').length) {
        $('body').addClass('modal-open');
      }
    }).on("show.bs.modal", function (e) {

      $(this).find('.modal-dialog').addClass($(e.relatedTarget).data('pos'));
      
      if($('.modal:visible').length) {
      }
    });

    $(".nav").find(".active").removeClass("active");
    $('a[href="' + location.pathname + '"]').addClass("active");


    var setModalSendContent = function (isBtn=false, title=undefined) {
      if (title === undefined) {
        var linkTxt = "Вернуться";
        var selectVal = isBtn ? "Junior-разработчик" : "Другое"
      } else {
        var linkTxt = "Вернуться к вакансии " + title;
        var selectVal = title;
      }

      $("#send-modal #back-to-modal").text(linkTxt);
      $("#send-modal .c-choice-dropdown select").val(selectVal).change();
      $("#send-modal .c-choice-dropdown select").trigger("click");
    };

    $(document).on("click", ".btn-primary", function () {
      $("#otherTxt").css("display", "none");
      var title = $(this).data('title');
      setModalSendContent(true, title);
    });

    $(document).on("click", "#otherVac", function () {
      $("#otherTxt").css("display", "block");
      setModalSendContent();
    });
    document.querySelectorAll('.card-collapsible').forEach(card => {
      card.addEventListener('click', function (e) {
        if (e.target.classList.contains('show-more-btn')) return;
        this.classList.toggle('open');
      });
    });
  });
})();