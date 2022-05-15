function t_ready(t) {
    "loading" != document.readyState
        ? t()
        : document.addEventListener
            ? document.addEventListener("DOMContentLoaded", t)
            : document.attachEvent("onreadystatechange", function () {
                "loading" != document.readyState && t();
            });
}

function genhtml() {
    input2code("n-console", ".n-console", "", "", "Hello World");

    inputdropdown("n-type", ".n-type", "alert", "alert");
    inputdropdown("n-type", ".n-type", "console.log", "console.log");
    inputdropdown("n-type", ".n-type", "border-radius", "");
}

t_ready(function () {
    let id = "#test";
    ncinput(id, "По клику", "transform-input", "Введите...");
    ncinput(id, "Левый верхний угол", "top-left-corner", "Введите...");
    ncinput(id, "Правый верхний угол", "top-right-corner", "Введите...");
    ncinput(id, "Правый нижний угол", "bottom-right-corner", "Введите...");
    ncinput(id, "Левый нижний угол", "bottom-left-corner", "Введите...");
    ncinput(id, "Процент увеличения(без %)", "scale", "Введите...");

    document.querySelector("form").addEventListener("input", function (e) {
        e.preventDefault();
        setNewValue()
    });


    let hscode = `${nspan("n-code")}`;
    generatecode(hscode);
    $('[name="transform-input"]').val("скруглять");
    setNewValue()
});