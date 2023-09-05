try {
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
} catch {
  console.log("Errore nel next e prev delle slide");
}
function openLink(url) {
  window.open(url, "_blank");
}
try {
  //Funzioni di collegamento per i button youtube e tour360
  $(document).ready(function () {
    $(".video_tour, .tour").click(function () {
      window.open("https://my.matterport.com/show/?m=4pnbaxcsEtK", "_blank");
    });
    $(".yt").click(function () {
      window.open("https://youtu.be/8JK7ojrRYKg", "_blank");
    });
  });
} catch {
  console.error("Errore nei button di collegamento");
}

//Caricamento immagini slideshow
try {
  $(document).ready(function () {
    $(".im1").css(
      "background-image",
      "url(./images/imgSlides/Bertocchiquadro17.jpg)"
    );
    $(".im3").css(
      "background-image",
      "url(./images/imgSlides/Studio_di_piccoli_bimbi_1943_Colliva.jpg)"
    );
    $(".im4").css(
      "background-image",
      "url(./images/imgSlides/Valle_al_mattino__1942.jpg)"
    );
    $(".im5").css("background-image", "url(./images/imgSlides/IMG_0139.jpg)");
    $(".im6").css(
      "background-image",
      "url(./images/imgSlides/La_casa_povera_1944_bertocchi.jpg)"
    );
  });
} catch {
  console.error("Errore nel caricamento delle slides");
}
// Caricamento immagini background smartphone
try {
  function loadBackgroundImages() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 811) {
      document.querySelector(".container").style.backgroundImage =
        "url(./images/imgBackgrounds/La_siepe_verdeLG.jpg)";
      document.querySelector(".second").style.backgroundImage =
        "url(./images/imgBackgrounds/imgBG2.jpg)";
      document.querySelector(".third").style.backgroundImage =
        "linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(../images/imgBackgrounds/1bom1920.jpg)";
    }
  }

  loadBackgroundImages();
} catch {
  console.error("Errore nel caricamento delle immagini per mobile");
}
//Link partners
try {
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
} catch {
  console.error("Errore nello slideshow dei partner");
}
