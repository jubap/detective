var Detective = function() {
    var e = "https://handson.eniwine.com.br/api/descubraoassassino/",
        a = {};
    return {
        getData: function(o) {
            $.when($.ajax({
                url: e,
                type: "GET"
            }).done(function(e) {
                e = JSON.parse(e), a.misterioId = e.misterioId
            }), $.ajax({
                url: `${e}locais`,
                type: "GET"
            }).done(function(e) {
                e = JSON.parse(e), a.locais = e
            }), $.ajax({
                url: `${e}armas`,
                type: "GET"
            }).done(function(e) {
                e = JSON.parse(e), a.armas = e
            }), $.ajax({
                url: `${e}criminosos`,
                type: "GET"
            }).done(function(e) {
                e = JSON.parse(e), a.suspeitos = e
            })).then(function() {
                o()
            })
        },
        sendTeoria: function(o) {
            teoria = {
                IdSuspeito: $(a.s).find(":radio:checked").data("id"),
                IdArma: $(a.a).find(":radio:checked").data("id"),
                IdLocal: $(a.l).find(":radio:checked").data("id"),
                IdMisterio: a.misterioId
            }, $.ajax({
                url: `${e}`,
                type: "POST",
                data: teoria
            }).done(function(e) {
                e = JSON.parse(e), o(e)
            })
        },
        setup: function() {
            Detective.getData(function() {
                a.end = !1, 
                a.s = $("#listSuspeitos"), 
                a.a = $("#listArmas"), 
                a.l = $("#listLocais"), 
                a && (a.suspeitos && $(a.suspeitos).each((e, i) => {
                    o(i, a.s, "info")
                }), a.locais && $(a.locais).each((e, i) => {
                    o(i, a.l, "primary")
                }), a.armas && $(a.armas).each((e, i) => {
                    o(i, a.a, "success")
                })), $("form").submit(e => {
                    e.preventDefault(), a.end || Detective.sendTeoria(function(e) {
                        0 == e ? (a.end = !0, $("#erro").hide().html(""), $(".modal-body").html("<p>Parabéns!<br>Gostaria jogar novamente ?</p>"), 
                        $("#modal").modal()) : 1 == e ? ($("#lbSuspeitos").hide().html("Não é o Suspeito").fadeIn("slow"), 
                        $("#lbLocais").hide().html("Local").fadeIn("slow"), 
                        $("#lbArmas").hide().html("Arma").fadeIn("slow")) : 2 == e ? ($("#lbSuspeitos").hide().html("Suspeito").fadeIn("slow"), 
                        $("#lbLocais").hide().html("Não é o Local").fadeIn("slow"), 
                        $("#lbArmas").hide().html("Arma").fadeIn("slow")) : ($("#lbSuspeitos").hide().html("Suspeito").fadeIn("slow"), 
                        $("#lbLocais").hide().html("Local").fadeIn("slow"), 
                        $("#lbArmas").hide().html("Não é a Arma").fadeIn("slow"))
                    })
                }), $("#reload").click(() => {
                    window.history.back()
                })
            })
        }
    };

    function o(e, a, o) {
        $(a).append(`<label class="btn  btn-${o} btn-sm">\n        <input type="radio" name="op${a[0].id}" id="${e.Nome}" data-id="${e.Id}" autocomplete="off" required> ${e.Nome}\n      </label>`)
    }
}();
Detective.setup();