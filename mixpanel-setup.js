(function (f, b) {
    if (!b.__SV) {
        var e, g, i, h;
        window.mixpanel = b;
        b._i = [];
        b.init = function (e, f, c) {
            function g(a, d) {
                var b = d.split(".");
                2 == b.length && ((a = a[b[0]]), (d = b[1]));
                a[d] = function () {
                    a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
                };
            }
            var a = b;
            "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
            a.people = a.people || [];
            a.toString = function (a) {
                var d = "mixpanel";
                "mixpanel" !== c && (d += "." + c);
                a || (d += " (stub)");
                return d;
            };
            a.people.toString = function () {
                return a.toString(1) + ".people (stub)";
            };
            i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
            for (h = 0; h < i.length; h++) g(a, i[h]);
            var j = "set set_once union unset remove delete".split(" ");
            a.get_group = function () {
                function b(c) {
                    d[c] = function () {
                        call2_args = arguments;
                        call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                        a.push([e, call2]);
                    };
                }
                for (var d = {}, e = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]);
                return d;
            };
            b._i.push([e, f, c]);
        };
        b.__SV = 1.2;
        e = f.createElement("script");
        e.type = "text/javascript";
        e.async = !0;
        e.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
        g = f.getElementsByTagName("script")[0];
        g.parentNode.insertBefore(e, g);
    }
})(document, window.mixpanel || []);

mixpanel.init("73f5917b1cd81694b88c7ec7669deaed", {
    debug: true,
    persistence: "localStorage"
});

// Traccia visita pagina
mixpanel.track("Page Viewed", {
    page: window.location.pathname,
    referrer: document.referrer
});


document.addEventListener('DOMContentLoaded', function () {

const startTime = Date.now();

window.addEventListener("beforeunload", function () {
    const timeSpentMs = Date.now() - startTime;
    const timeSpentSeconds = Math.round(timeSpentMs / 1000);

    mixpanel.track("Time Spent on Page", {
        page: window.location.pathname,
        duration_seconds: timeSpentSeconds
    });
});


// Verifica che Mixpanel sia caricato
if (typeof mixpanel !== "undefined") {
    // GitHub
    document.querySelector('a[href*="github.com"]').addEventListener('click', function () {
        mixpanel.track("Click GitHub", { location: "navbar" });
    });

    // Email
    document.querySelector('#email').addEventListener('click', function () {
        mixpanel.track("Click Email", { location: "navbar" });
    });

    // LinkedIn
    document.querySelector('a[href*="linkedin.com"]').addEventListener('click', function () {
        mixpanel.track("Click LinkedIn", { location: "navbar" });
    });

    // Instagram
    document.querySelector('a[href*="instagram.com"]').addEventListener('click', function () {
        mixpanel.track("Click Instagram", { location: "navbar" });
    });

    // Curriculum
    document.querySelector('#curriculum').addEventListener('click', function () {
        mixpanel.track("Click Curriculum", { section: "flip-card" });
    });
}

});