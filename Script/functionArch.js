/*********************************************************
                   Caricamento immagini                  * 
**********************************************************/
window.addEventListener("load", function () {
  const container = document.querySelector(".dcontainer");
  container.style.backgroundImage =
    "linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%)), url('../images/imgBackgrounds/A-D.png')";
});
window.addEventListener("load", function () {
  const container = document.querySelector(".second");
  container.style.backgroundImage =
    "linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%)), url('../images/imgBackgrounds/A-D.png')";
});

/*********************************************************
                   Immagini da poter aprire              * 
**********************************************************/
const isSrcsetSupported = "srcset" in new Image();
const swipingThreshold = 5;

let $lightbox;
let images = [];
let currentIndex = 0;
let wasSwiping = false;
let isMagnifierOpen = false;

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
    };

    images.push(currentItem);
  });

  currentIndex = targetIndex;
  showInitialImage(targetIndex);
  updateLightboxHeader(targetIndex);
}

function showInitialImage(index) {
  const $prevSlide = $lightbox.find('.lightbox-slide[data-state="prev"]');
  const $currentSlide = $lightbox.find('.lightbox-slide[data-state="current"]');
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

function createLightbox() {
  // ------------------------- //
  // Creazione elementi DOM,
  // append del lightbox
  // ------------------------- //

  const $lightboxWrapper = $('<div class="lightbox-wrapper">');
  $lightbox = $('<div class="lightbox">');

  const $lightboxHeader = $('<div class="lightbox-header">');
  const $lightboxNumbers = $('<div class="lightbox-numbers"></div>');
  const $lightboxTitle = $('<div class="lightbox-title"></div>');
  const $lightboxClose = $(
    '<button type="button" class="lightbox-close" aria-label="Close"></button>'
  );
  const $magnifyButton = $(
    '<button type="button" class="magnify-button"><i class="fa fa-search-plus"></i></button>'
  );
  $magnifyButton.on("click", (e) => {
    handleMagnifyClick();
  });

  $lightboxHeader.append(
    $lightboxNumbers,
    $magnifyButton,
    $lightboxTitle,
    $lightboxClose
  );
  $lightbox.append($lightboxHeader);

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
    if (e.currentTarget == e.target && !wasSwiping) closeLightbox();
    closeMagnifier();
  });
  $lightbox.find(".lightbox-close").on("click", (e) => {
    closeLightbox();
  });
}

function handleMagnifyClick() {
  const $currentSlide = $lightbox.find('.lightbox-slide[data-state="current"]');
  const $currentImage = $currentSlide.find(".lightbox-image");

  const img = $currentImage[0];
  const zoom = 3;
  let glass, w, h, bw;

  if ($currentSlide.find(".img-magnifier-glass").length > 0) {
    closeMagnifier();
    return;
  }

  // Create magnifier glass
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  // Insert magnifier glass
  $currentSlide[0].insertBefore(glass, img);

  // Set background properties for the magnifier glass
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  // Execute a function when someone moves the magnifier glass over the image
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  // Also for touch screens
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    // Prevent any other actions that may occur when moving over the image
    e.preventDefault();
    // Get the cursor's x and y positions
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    // Prevent the magnifier glass from being positioned outside the image
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    // Set the position of the magnifier glass relative to the image
    glass.style.left = img.offsetLeft + x - w + "px";
    glass.style.top = img.offsetTop + y - h + "px";
    // Set the updated background size for the magnifier glass
    glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
    // Display what the magnifier glass "sees"
    glass.style.backgroundPosition =
      "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    // Set the cursor to the magnifier glass
    document.body.style.cursor = "auto";
  }
  function closeMagnifier() {
    const $currentSlide = $lightbox.find(
      '.lightbox-slide[data-state="current"]'
    );
    const magnifierGlass = $currentSlide.find(".img-magnifier-glass")[0];
    if (magnifierGlass) {
      $currentSlide[0].removeChild(magnifierGlass);
    }
  }

  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    // Get the x and y positions of the image
    a = img.getBoundingClientRect();
    // Calculate the cursor's x and y coordinates, relative to the image
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    // Consider any page scrolling
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
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

  const resetSlide = () => {
    transformSlide(prevSlideEl, "-100%", 0);
    transformSlide(currentSlideEl, "0px", 1);
    transformSlide(nextSlideEl, "100%", 0);
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

  const handleMouseUpOrTouchEnd = (event) => {
    const slideChangeThreshold = 150;

    if (distance < -slideChangeThreshold) {
      showNextSlide();
      updateLightbox("next");
    } else if (distance > slideChangeThreshold) {
      showPrevSlide();
      updateLightbox("prev");
    } else {
      resetSlide();
      updateLightbox("current");
    }
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
