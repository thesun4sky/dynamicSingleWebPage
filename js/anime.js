function init() {

    const nextBtn1 = document.querySelector(".slider1 .nav .next");
    const prevBtn1 = document.querySelector(".slider1 .nav .prev");
    const items1 = document.querySelectorAll(".slider1 .item");

    const nextBtn2 = document.querySelector(".slider2 .nav .next");
    const prevBtn2 = document.querySelector(".slider2 .nav .prev");
    const items2 = document.querySelectorAll(".slider2 .item");

    const nextBtn3 = document.querySelector(".slider3 .nav .next");
    const prevBtn3 = document.querySelector(".slider3 .nav .prev");
    const items3 = document.querySelectorAll(".slider3 .item");

    let current = 0;
  
    function anim(current, next, callback) {
      const currentImgs = current.querySelectorAll(".img");
      const currentText = current.querySelectorAll(".content .letter");
      const nextImgs = next.querySelectorAll(".img");
      const nextText = next.querySelectorAll(".content .letter");
  
      const duration = 400;
      const offset = "-=" + 300;
      const imgOffset = duration*.8;
  
      const tl = anime.timeline({
        easing: "easeInOutQuint",
        duration: duration,
        complete: callback
      });
  
      // Add children
      tl.add({
        targets: currentText,
        translateY: [0, '-.75em'],
        /*clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'],*/
        opacity: [1, 0],
        easing: "easeInQuint",
        duration: 200,
        delay: (el, i) => 10 * (i + 1)
      })
        .add(
          {
            targets: currentImgs[0],
            translateY: -600,
            rotate: [0, '-15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          offset
        )
        .add(
          {
            targets: currentImgs[1],
            translateY: -600,
            rotate: [0, '15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: currentImgs[2],
            translateY: -600,
            rotate: [0, '-15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: currentImgs[3],
            translateY: -600,
            rotate: [0, '15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add({
          targets: current,
          opacity: 0,
          duration: 10,
          easing: "easeInCubic"
        })
        .add(
          {
            targets: next,
            opacity: 1,
            duration: 10
          },
          offset
        )
        .add(
          {
            targets: nextImgs[0],
            translateY: [600, 0],
            rotate: ['15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          offset
        )
        .add(
          {
            targets: nextImgs[1],
            translateY: [600, 0],
            rotate: ['-15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextImgs[2],
            translateY: [600, 0],
            rotate: ['15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextImgs[3],
            translateY: [600, 0],
            rotate: ['-15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextText,
            translateY: ['.75em', 0],
            /*clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)','polygon(0 0, 100% 0, 100% 100%, 0% 100%)'],*/
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 600,
            delay: (el, i) => 10 * (i + 1)
          },
          offset
        );
    }
  
    let isPlaying = false;
  
    function updateSlider(newIndex) {
      const currentItem = items2[current];
      const newItem = items2[newIndex];
  
      function callback() {
        currentItem.classList.remove("is-active");
        newItem.classList.add("is-active");
        current = newIndex;
        isPlaying = false;
      }
  
      anim(currentItem, newItem, callback);
    }


    function showSlider1() {
        const currentItem = items1[0];
        const newItem = items1[1];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 1;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }


    function hideSlider1() {
        const currentItem = items1[1];
        const newItem = items1[0];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 0;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }


    function showSlider2() {
        const currentItem = items2[0];
        const newItem = items2[1];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 1;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }


    function hideSlider2() {
        const currentItem = items2[1];
        const newItem = items2[0];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 0;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }


    function showSlider3() {
        const currentItem = items3[0];
        const newItem = items3[1];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 1;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }


    function hideSlider3() {
        const currentItem = items3[1];
        const newItem = items3[0];

        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = 0;
            isPlaying = false;
        }

        anim(currentItem, newItem, callback);
    }
  
    function next() {
      if (isPlaying) return;
      isPlaying = true;
      const newIndex = current === items2.length - 1 ? 0 : current + 1;
      updateSlider(newIndex);
    }
  
    function prev() {
      if (isPlaying) return;
      isPlaying = true;
      const newIndex = current === 0 ? items2.length - 1 : current - 1;
      updateSlider(newIndex);
    }
  
    nextBtn1.onclick = showSlider1;
    prevBtn1.onclick = hideSlider1;

    nextBtn2.onclick = showSlider2;
    prevBtn2.onclick = hideSlider2;

    nextBtn3.onclick = showSlider3;
    prevBtn3.onclick = hideSlider3;
  }

  document.addEventListener("DOMContentLoaded", init);
  