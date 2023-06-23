// Caricamento immagini di sfondo
window.addEventListener("load", function () {
  const container = document.querySelector(".container");
  container.style.backgroundImage =
    "linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%)), url('../images/imgBackgrounds/A-D.png')";
});

//Link partners
$(document).ready(function () {
  $(".p1").on("click touchstart", function () {
    window.open("https://www.cittametropolitana.bo.it/portale/", "_blank");
  });

  $(".p2").on("click touchstart", function () {
    window.open("https://www.foiatonda.it/", "_blank");
  });
  $(".p3").on("click touchstart", function () {
    window.open("https://www.emilbanca.it/", "_blank");
  });
  $(".p4").on("click touchstart", function () {
    window.open("https://www.appenninoslow.it/", "_blank");
  });
  $(".p5").on("click touchstart", function () {
    window.open("https://www.regione.emilia-romagna.it/", "_blank");
  });
  $(".p6").on("click touchstart", function () {
    window.open("https://www.bolognamontana.it/", "_blank");
  });
  $(".p7").on("click touchstart", function () {
    window.open("https://www.lineagotica.eu/", "_blank");
  });
  $(".p8").on("click touchstart", function () {
    window.open("https://www.comune.monzuno.bo.it/home", "_blank");
  });
  $(".p10").on("click touchstart", function () {
    window.open("https://www.savenasettasambro.com/", "_blank");
  });
});
