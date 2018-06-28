lock = false;
$(document).ready(function()
{
    $("#lock").toggle();
    var container = $("#slideshow");
    container.slick(
    {
        accessibility: true,
        arrows: false,
        dots: true,
        infinite: false,
        appendDots: $("#footer"),
        draggable: false
    });

    var dot1 = $("#slick-slide-control00");
    dot1.click();

    editors = {
        "grid-code": "",
        "form-code": "",
        "table-code": "",
        "nav-code": ""
    };

    for (name in editors)
    {
        editors[name] = CodeMirror.fromTextArea(document.getElementById(name),
        {
            lineNumbers: true,
            extraKeys:
            {
                "Ctrl-Space": "autocomplete"
            },
            mode: "text/html",
            value: document.documentElement.innerHTML
        });

    }

    keys = {};

    $(document).keydown(function(event)
    {
        keys[event.which] = true;
        if (keys[16] && keys[17] && keys[76])
        {
            lock = !lock;
            $("#lock").toggle();
        }
    });

    $(document).keyup(function(event)
    {
        delete keys[event.which];
        if (!lock)
        {
            if (event.which == 37 || event.which == 33)
                container.slick("slickPrev");
            if (event.which == 39 || event.which == 34)
                container.slick("slickNext");
        }
    });

    update("grid");
    update("form");
    update("table");
    update("nav");
});

function update(editor_name)
{
    // console.log(editor_name + "-code");
    var html = editors[editor_name + "-code"].getValue();
    var jquery = '<script src="js/jquery-3.3.1.min.js"><\/script>';
    var bsCss = '<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />';
    var bsJs = '<script type="text/javascript" src="js/bootstrap.min.js"><\/script>';
    var content = "javascript:'" + bsCss + jquery + bsJs + html + "'";
    // $("#grid-html").html(html);
    $("#" + editor_name + "-html").attr("src", content)
    // console.log(html);
}

function getBootstrap()
{
    window.location = "https://getbootstrap.com/";
}