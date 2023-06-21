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
    window.location.href = "https://my.matterport.com/show/?m=4pnbaxcsEtK";
  });

  $(".tour").click(async function () {
    window.location.href = "https://my.matterport.com/show/?m=4pnbaxcsEtK";
  });
  $(".yt").click(async function () {
    window.location.href = "https://youtu.be/8JK7ojrRYKg";
  });
});
