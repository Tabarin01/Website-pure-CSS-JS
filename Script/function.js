//Funzione per la slideshow dei quadri
document.getElementById("next").onclick = function () {
  requestAnimationFrame(() => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slideshow").appendChild(lists[0]);
  });
};

document.getElementById("prev").onclick = function () {
  requestAnimationFrame(() => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slideshow").prepend(lists[lists.length - 1]);
  });
};

//Funzioni di collegamento per i button youtube e tour360
$(document).ready(function () {
  $(".video_tour").click(async function () {
    window.open("https://my.matterport.com/show/?m=4pnbaxcsEtK", "_blank");
  });

  $(".tour").click(async function () {
    window.open("https://my.matterport.com/show/?m=4pnbaxcsEtK", "_blank");
  });
  $(".yt").click(async function () {
    window.open("https://youtu.be/8JK7ojrRYKg", "_blank");
  });
});

//Link partners
$(document).ready(function () {
  $(".p1").click(async function () {
    window.open("https://www.cittametropolitana.bo.it/portale/", "_blank");
  });

  $(".p2").click(async function () {
    window.open("https://www.foiatonda.it/", "_blank");
  });
  $(".p3").click(async function () {
    window.open("https://www.emilbanca.it/", "_blank");
  });
  $(".p4").click(async function () {
    window.open("https://www.appenninoslow.it/", "_blank");
  });
  $(".p5").click(async function () {
    window.open("https://www.regione.emilia-romagna.it/", "_blank");
  });
  $(".p6").click(async function () {
    window.open("https://www.bolognamontana.it/", "_blank");
  });
  $(".p7").click(async function () {
    window.open("https://www.lineagotica.eu/", "_blank");
  });
  $(".p8").click(async function () {
    window.open("https://www.comune.monzuno.bo.it/home", "_blank");
  });
  $(".p10").click(async function () {
    window.open("https://www.savenasettasambro.com/", "_blank");
  });
});
