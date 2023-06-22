//Funzione per la slideshow dei quadri
const slideshow = document.getElementById("slideshow");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = Array.from(document.querySelectorAll(".item"));

let currentIndex = 0;

nextButton.onclick = function () {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlide();
};

prevButton.onclick = function () {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlide();
};

function updateSlide() {
  requestAnimationFrame(() => {
    slideshow.appendChild(items[currentIndex]);
  });
}


//Funzioni di collegamento per i button youtube e tour360
$(document).ready(function () {
  $(".video_tour").click(function () {
    window.open("https://my.matterport.com/show/?m=4pnbaxcsEtK", "_blank");
  });

  $(".tour").click(function () {
    window.open("https://my.matterport.com/show/?m=4pnbaxcsEtK", "_blank");
  });
  $(".yt").click(function () {
    window.open("https://youtu.be/8JK7ojrRYKg", "_blank");
  });
});

//Link partners
$(document).ready(function () {
  $(".p1").on("click touchstart", function () {
    window.open("https://www.cittametropolitana.bo.it/portale/", "_blank");
  });

  $(".p2").on("click touchstart", function () {
    window.open("https://www.foiatonda.it/", "_blank");
  });
  $(".p3").on("click touchstart",function () {
    window.open("https://www.emilbanca.it/", "_blank");
  });
  $(".p4").on("click touchstart",function () {
    window.open("https://www.appenninoslow.it/", "_blank");
  });
  $(".p5").on("click touchstart",function () {
    window.open("https://www.regione.emilia-romagna.it/", "_blank");
  });
  $(".p6").on("click touchstart",function () {
    window.open("https://www.bolognamontana.it/", "_blank");
  });
  $(".p7").on("click touchstart",function () {
    window.open("https://www.lineagotica.eu/", "_blank");
  });
  $(".p8").on("click touchstart",function () {
    window.open("https://www.comune.monzuno.bo.it/home", "_blank");
  });
  $(".p10").on("click touchstart",function () {
    window.open("https://www.savenasettasambro.com/", "_blank");
  });
});
