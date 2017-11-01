$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: !0,
        submitError: function(t, e, a) {},
        submitSuccess: function(t, e) {
            e.preventDefault();
            var a = $("input#name").val(),
                c = $("input#email").val(),
                s = $("input#phone").val(),
                n = $("textarea#message").val(),
                o = a;
            o.indexOf(" ") >= 0 && (o = a.split(" ").slice(0, -1).join(" ")), $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: a,
                    phone: s,
                    email: c,
                    message: n
                },
                cache: !1,
                success: function() {
                    $("#success").html("<div class='alert alert-contact'>"), $("#success > .alert-contact"), $("#success > .alert-contact").append("Muchas gracias!, pronto estaremos en contacto!"), $("#success > .alert-contact").append("</div>"), $("#contactForm").trigger("reset")
                },
                error: function() {
                    $("#success").html("<div class='alert alert-contact'>"), $("#success > .alert-contact"), $("#success > .alert-contact").append("Ups!, el servidor no está respondiendo, por favor intentá nuevamente!"), $("#success > .alert-contact").append("</div>"), $("#contactForm").trigger("reset")
                }
            })
        },
        filter: function() {
            return $(this).is(":visible")
        }
    }), $('a[data-toggle="tab"]').click(function(t) {
        t.preventDefault(), $(this).tab("show")
    })
}), $("#name").focus(function() {
    $("#success").html("")
});

