/*********************************************************
                   Caricamento immagini                  * 
**********************************************************/
// window.addEventListener("load", function () {
//   const container = document.querySelector(".dcontainer");
//   container.style.backgroundImage =
//     "linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%)), url('./images/imgBackgrounds/A-D.jpg')";
// });
// window.addEventListener("load", function () {
//   const container = document.querySelector(".second");
//   container.style.backgroundImage =
//     "linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%)), url('./images/imgBackgrounds/A-D.jpg')";
// });

/*********************************************************
                   Creazione Galleria                    * 
**********************************************************/
const isSrcsetSupported = "srcset" in new Image();
const swipingThreshold = 5;

let $lightbox;
let images = [];
let currentIndex = 0;
try {
  $(() => {
    initGallery();
    createLightbox();
  });

  function initGallery() {
    const $galleryItems = $(".gallery-item");
    const $galleryThumbs = $galleryItems.find(".thumb");

    const loadThumbnail = (target) => {
      const src = target.dataset.src;
      const srcset = target.dataset.srcset;

      const tempImage = new Image();

      if (isSrcsetSupported && srcset) {
        tempImage.srcset = srcset;
      } else if (src) {
        tempImage.src = src;
      }
      tempImage.onload = function () {
        if (tempImage.srcset) {
          target.srcset = srcset;
        } else if (src) {
          target.src = src;
        }

        target.classList.remove("placeholder");
      };
    };

    if ("IntersectionObserver" in window) {
      const observerOptions = {
        rootMargin: "200px 0px",
      };

      const handleIntersectionObserver = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadThumbnail(entry.target);
            intersectionObserver.unobserve(entry.target);
          }
        });
      };

      const intersectionObserver = new IntersectionObserver(
        handleIntersectionObserver,
        observerOptions
      );

      $galleryThumbs.each((i, el) => intersectionObserver.observe(el));
    } else {
      $galleryThumbs.each((i, el) => loadThumbnail(el));
    }

    $galleryItems.on("click", (e) => {
      const $currentTarget = $(e.currentTarget);

      const $currentGallery = $currentTarget.closest(".gallery");
      const itemIndex = $currentTarget.index();

      openLightbox($currentGallery, itemIndex);
      initSlides();
      addLightboxEventListeners();
    });
  }
} catch {
  console.error("Errore nella creazione della galleria");
}

try {
  function openLightbox($currentGallery, targetIndex) {
    $lightbox.addClass("open");
    $lightbox.parent(".lightbox-wrapper").fadeIn("fast");

    images = [];
    $currentGallery.find(".gallery-item").each((i, element) => {
      const $currentImageEl = $(element).find("img");

      const currentItem = {
        src: $currentImageEl.data("image") || $currentImageEl.data("src"),
        srcFallback: $currentImageEl.data("image-fallback"),
        srcset: $currentImageEl.data("image-srcset"),
        title: $currentImageEl.data("title"),
        text: $currentImageEl.data("text"),
      };

      images.push(currentItem);
    });

    currentIndex = targetIndex;
    showInitialImage(targetIndex);
    updateLightboxHeader(targetIndex);
  }
} catch {
  console.error("Errore nell'openLightbox");
}
try {
  function showInitialImage(index) {
    const $prevSlide = $lightbox.find('.lightbox-slide[data-state="prev"]');
    const $currentSlide = $lightbox.find(
      '.lightbox-slide[data-state="current"]'
    );
    const $nextSlide = $lightbox.find('.lightbox-slide[data-state="next"]');
    const $currentImage = $currentSlide.find(".lightbox-image");
    const $spinner = $currentSlide.find(".spinner");

    loadImage($currentSlide, index);

    $currentImage.hide();
    $spinner.show();

    $currentImage.on("load.currentImage", (e) => {
      loadImage($prevSlide, index - 1);
      loadImage($nextSlide, index + 1);
      $currentImage.off("load.currentImage");
    });
  }
} catch {
  console.error("Errore nell'anteprima");
}
/**************************************
Creazione Box con immagini aperte     * 
***************************************/
function createLightbox() {
  const $lightboxWrapper = $('<div class="lightbox-wrapper">');
  $lightbox = $('<div class="lightbox">');
  const $lightboxHeader = $('<div class="lightbox-header">');
  const $lightboxTitle = $('<div class="lightbox-title"></div>');
  const $lightboxClose = $(
    '<button type="button" class="lightbox-close" aria-label="Close"></button>'
  );
  const $lightboxSub = $('<div class="lightboxSub"></div>');

  $lightboxHeader.append($lightboxTitle, $lightboxClose);
  $lightbox.append($lightboxHeader);

  $lightboxHeader.after($lightboxSub);

  $lightboxSub.append("<p>Tocca l'immagine per vedere il contenuto</p>");

  const $slidesWrapper = $('<div class="lightbox-slides-wrapper"></div>');
  $lightbox.append($slidesWrapper);

  const $prevSlide = $('<div class="lightbox-slide" data-state="prev"></div>');
  const $currentSlide = $(
    '<div class="lightbox-slide" data-state="current"></div>'
  );
  const $nextSlide = $('<div class="lightbox-slide" data-state="next"></div>');
  $slidesWrapper.append($prevSlide, $currentSlide, $nextSlide);

  const $lightboxImage = $(
    '<img id="l-image" class="lightbox-image" src="" alt="" draggable="false">'
  );
  $currentSlide.append($lightboxImage);
  $prevSlide.append($lightboxImage.clone());
  $nextSlide.append($lightboxImage.clone());

  const $spinner = $(
    '<div class="spinner spinner-border" role="status"><span class="sr-only">Loading... </span></div>'
  );
  $currentSlide.append($spinner);
  $prevSlide.append($spinner.clone());
  $nextSlide.append($spinner.clone());

  const $lightboxArrowLeft = $('<div class="lightbox-arrow arrow-left"></div>');
  const $lightboxArrowRight = $(
    '<div class="lightbox-arrow arrow-right"></div>'
  );
  $lightbox.append($lightboxArrowLeft);
  $lightbox.append($lightboxArrowRight);

  const $lightboxFooter = $('<div class="lightbox-footer">');
  $lightbox.append($lightboxFooter);

  $lightbox.appendTo($lightboxWrapper);
  $lightboxWrapper.appendTo($("body"));
  $lightboxClose.on("click", (e) => {
    closeLightbox();
  });
}

function addLightboxEventListeners() {
  $lightbox.find(".lightbox-slide").on("click", (e) => {
    if (e.currentTarget == e.target) closeLightbox();
  });
  $lightbox.find(".lightbox-close").on("click", (e) => {
    closeLightbox();
  });
  $lightbox.find(".lightbox-image").on("click", (e) => {
    openOverlay();
  });
}
function openOverlay() {
  const text = images[currentIndex].text;

  const $overlay = $('<div class="overlay"></div>');
  const $overlayText = $(`<div class="overlay-text"><p>${text}</p></div>`);
  const $closeButton = $('<button class="beautiful-button">CHIUDI</button>');

  $closeButton.on("click", () => {
    closeOverlay();
  });

  $overlay.append($overlayText, $closeButton);
  $overlay.appendTo($("body"));
}

function closeOverlay() {
  $(".overlay").remove();
}

function closeLightbox() {
  const $lightboxWrapper = $(".lightbox-wrapper");
  const $lightboxImage = $lightbox.find(".lightbox-image");
  $lightboxWrapper.removeClass("open").fadeOut("fast", () => {
    $lightboxImage.attr("src", "");
    $lightboxImage.attr("srcset", "");
  });
  $lightbox.find(".lightbox-slide").off();
  $lightbox.find(".lightbox-close").off();
  $lightbox.find(".lightbox-arrow").off();
  $(document).off("keydown.lightbox");
}
function initSlides() {
  const transitionDuration = 400;
  let $currentSlide;
  let currentSlideEl;
  let prevSlideEl;
  let nextSlideEl;

  const updateSlideVariables = () => {
    $currentSlide = $('.lightbox-slide[data-state="current"]');
    currentSlideEl = $currentSlide[0];
    prevSlideEl = document.querySelector('.lightbox-slide[data-state="prev"]');
    nextSlideEl = document.querySelector('.lightbox-slide[data-state="next"]');
  };

  updateSlideVariables();

  const addSlideEventListeners = () => {
    // keyboard event listener
    $(document).on("keydown.lightbox", (e) => {
      if (e.key == "ArrowLeft") {
        showPrevSlide();
        updateLightbox("prev");
      } else if (e.key == "ArrowRight") {
        showNextSlide();
        updateLightbox("next");
      } else if (e.key == "Escape") closeLightbox();
    });

    // click on left arrow
    $lightbox.find(".lightbox-arrow.arrow-left").on("click", (e) => {
      showPrevSlide();
      updateLightbox("prev");
    });

    // click on right arrow
    $lightbox.find(".lightbox-arrow.arrow-right").on("click", (e) => {
      showNextSlide();
      updateLightbox("next");
    });
  };

  removeSlideEventListeners = () => {
    // mouse & touch event listener
    $(currentSlideEl).off("mousedown touchstart");
    $(currentSlideEl).off("mouseup touchend touchcancel");

    // keyboard event listener
    $(document).off("keydown.lightbox");

    // arrow buttons event listener
    $lightbox.find(".lightbox-arrow").off("click");
  };

  const transformSlide = (element, translateX, opacity) => {
    element.style.transform = `translateX(${translateX})`;
    element.style.opacity = opacity;
    element.style.transitionDuration = `${transitionDuration}ms`;
    $(element).off("mousemove touchmove");
    distance = 0;
  };

  const showNextSlide = () => {
    transformSlide(prevSlideEl, "100%", 0);
    transformSlide(currentSlideEl, "-100%", 0);
    transformSlide(nextSlideEl, "0px", 1);
  };

  const showPrevSlide = () => {
    transformSlide(prevSlideEl, "0px", 1);
    transformSlide(currentSlideEl, "100%", 0);
    transformSlide(nextSlideEl, "-100%", 0);
  };

  const updateLightbox = (newSlide) => {
    if (newSlide != "current") removeSlideEventListeners();

    setTimeout(() => {
      // reset transition duration
      [currentSlideEl, nextSlideEl, prevSlideEl].forEach((element) => {
        element.style.transitionDuration = "0ms";
      });

      let index;

      if (newSlide == "next") {
        prevSlideEl.dataset.state = "next";
        nextSlideEl.dataset.state = "current";
        currentSlideEl.dataset.state = "prev";

        index = getLoopedIndex(currentIndex + 1);
        loadImage($(prevSlideEl), index + 1);
      } else if (newSlide == "prev") {
        prevSlideEl.dataset.state = "current";
        currentSlideEl.dataset.state = "next";
        nextSlideEl.dataset.state = "prev";

        index = getLoopedIndex(currentIndex - 1);
        loadImage($(nextSlideEl), index - 1);
      } else {
        return;
      }

      updateSlideVariables();
      addSlideEventListeners();
      updateLightboxHeader(index);

      currentIndex = index;
    }, transitionDuration);
  };

  addSlideEventListeners();
}

function updateLightboxHeader(index) {
  index = getLoopedIndex(index);
  const title = images[index].title;

  $lightbox.find(".lightbox-title").text(title);
  $lightbox.find(".lightbox-numbers").text(index + 1 + "/" + images.length);
}

function loadImage($targetSlide, index) {
  index = getLoopedIndex(index);

  const $currentImage = $targetSlide.find(".lightbox-image");
  const src = isSrcsetSupported ? images[index].src : images[index].srcFallback;
  const srcset = images[index].srcset;

  const tempImage = new Image();

  if (isSrcsetSupported && srcset) {
    tempImage.srcset = srcset;
  } else {
    tempImage.src = src;
  }

  $(tempImage).on("load.loadImage", (e) => {
    if (isSrcsetSupported && srcset) {
      $currentImage.attr("srcset", srcset);
    } else {
      $currentImage.attr("src", src);
    }

    $targetSlide.find(".spinner").hide();
    $currentImage.show();
    $currentImage.off("load.loadImage");
  });
}

function getLoopedIndex(index) {
  if (index > images.length - 1) return 0;
  if (index < 0) return images.length - 1;
  return index;
}

function mapRange(value, fromIn, toIn, fromOut, toOut) {
  return fromOut + ((toOut - fromOut) * (value - fromIn)) / (toIn - fromIn);
}

/*********************************************************
                   Scorrimento slide                     * 
**********************************************************/

var currentSlide = 0;
var slides = document.getElementsByClassName("slider");

function changeSlide(n) {
  currentSlide += n;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[currentSlide].style.display = "block";
}
