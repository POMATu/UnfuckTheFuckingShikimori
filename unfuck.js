// ==UserScript==
// @name         Unfuck The Fucking Shikimori
// @namespace    https://shikimori.one/
// @version      2024.08.31.5
// @description  1337 domination tools over normies
// @author       nikola2222,pomatu,SoyGPT
// @updateURL    https://github.com/POMATu/UnfuckTheFuckingShikimori/blob/slave/unfuck.js
// @downloadURL  https://github.com/POMATu/UnfuckTheFuckingShikimori/blob/slave/unfuck.js
// @match        *://shikimori.org/*
// @match        *://shikimori.one/*
// @match        *://shikimori.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @grant        none
// ==/UserScript==


function injectUnfuckPayload(fn) {
  const script = document.createElement('script');
  script.textContent = '(' + fn.toString() + ')();';
  document.documentElement.appendChild(script);
  script.remove();
}

injectUnfuckPayload(function() {

// page context




const UNFUCK_DEBUG = true;
const SUBMIT_ON_PREVIEW_ERROR = true;

async function  unfuckLooper() {

    if (window.location.href.includes("/dialogs/")) { if (UNFUCK_DEBUG) console.log("Ayase not working in dialogs"); else return; }
                if (window.location.href.includes("/edit/styles")) return;

         // START: STYLING NOODLES block

          // Check if the CSS is already injected
          if (!document.getElementById('dynamic-textarea-styles')) {
              var style = document.createElement('style');
              style.id = 'dynamic-textarea-styles';
              style.innerHTML = `
                 .unfucked textarea {
                       transition: background-color 0.3s ease;
                 }

              `;
              document.head.appendChild(style);
          }

    // based codebase
    async function findMats(textArea) {
        var mats = [];
        try {
            const response = await fetch('https://raw.githubusercontent.com/shikimori/shikimori/master/config/app/abusive_words.yml');

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                window.flash.error(`Не могу загрузить список мата`);
                throw new Error('Network response was not ok ' + response.statusText);
            }
            let text = await response.text(); // Extract the response body as plain text

            let textAreaLc = textArea.toLowerCase();
            let arrayMats = text.replace(/[\n\r]/g, '').split('- ');
            for (var i = 0; i < arrayMats.length; i++) {
                if (arrayMats[i].length > 0 && textAreaLc.includes(arrayMats[i])) {

                    if (UNFUCK_DEBUG) console.log("Found initial mat:" + arrayMats[i]);

                    mats.push(arrayMats[i]);
                }
            }

        } catch (error) {
            // Handle errors here
            console.error("There was a problem with the abusive words processing:", error);
            window.flash.error(`Не могу обработать список мата`);
        }
        return mats;
    }


        $('.simple_form.b-form').each(function() {
            // Check if the current .simple_form.b-form element has the 'colors-darkened' class
            if (!$(this).hasClass('unfucked')) {

              		var rootOfForm = this;

                  $(this).find('.markers').each(function () {


                  const span = document.createElement('span');
                  span.setAttribute('data-direction', 'top');
                  //span.className = 'unfuckme';

                  var img = document.createElement('img');
                  img.src = '/system/users/x32/6942.png'; // Replace with your image URL
                  img.style.cursor = 'pointer';
                    img.style.maxWidth = "18px";
                    img.style.maxHeight = "18px";
                    img.style.minWidth = "18px";
                    img.style.minHeight = "18px";
                    img.style.position = 'inherit';
                    img.style.margin = 'auto';
                  //img.style.position = 'absolute';
                  //img.style.marginLeft = '30px'; // Adjust the margin-right as needed
           				//img.style.marginTop = '-14px';
                  img.style.display = 'none';

                  img.style.filter = 'saturate(0)';
									span.appendChild(img);

                  img.addEventListener('click', () => {
                      let textAreaElement = $(rootOfForm).find('.editor-area');
        			  let matArea = textAreaElement.val();

                      if (matArea.length <= 0) {
                          window.flash.error('В форме отсутствует текст');
                          return;
                      }

                      // sometimes i wonder what i am doing with my life
                      findMats(matArea).then(mats => {
                          for (const mat of mats) {
                              // Create a dynamic regex pattern for each item
                              const regex = new RegExp(`(${mat})`, 'ig');

                              // Perform the replacement
                              matArea = matArea.replace(regex, '\u200B$1\u200B');
                          }

                          textAreaElement.val(matArea);
                          window.flash.notice('Метод обхода применен');
                          textAreaElement.hide().fadeIn();
                          textAreaElement.focus();
                      });

                  });

                  		$(this).prepend(span);
                  		$(img).hide().fadeIn();
           				});

                // Get all textarea elements within the current .simple_form.b-form
                $(this).find('textarea').each(function() {
                    // Get the current background color
                    var currentColor = $(this).css('background-color');

                    // Function to darken a color
                    var color = currentColor;
                    var amount = 15;  // Adjust '15' to change darkness level
                    // Convert color to RGB
                    var rgb = color.match(/\d+/g).map(Number);
                    // Calculate the new color
                    var darkerColor = `rgb(${Math.max(0, rgb[0] - amount)}, ${Math.max(0, rgb[1] - amount)}, ${Math.max(0, rgb[2] - amount)})`;

                    // Apply the new background color
                    $(this).data('original-background-color', currentColor);
                    $(this).data('darker-background-color', darkerColor);

                    // Set the initial background color
                    if ($(this).is(':focus'))
                        $(this).css('background-color', darkerColor);
                });

                // Add the class to the current .simple_form.b-form element to mark that the operation has been performed
                $(this).addClass('unfucked');
            }
        });

        // Add event listeners to handle focus and blur
        $(document).on('focus', 'textarea', function() {
            var darkerColor = $(this).data('darker-background-color');
            $(this).css('background-color', darkerColor);
        });

        $(document).on('blur', 'textarea', function() {
            var originalColor = $(this).data('original-background-color');
            $(this).css('background-color', originalColor);
        });


        // END: STYLING NOODLES block


    // START: SUBMIT HOOK block

    $('.simple_form.b-form').off('submit').on('submit', function(e) {

				let textAreaElement = $(this).find('.editor-area');
        let textArea = textAreaElement.val();

        let jsonObject = {
                comment: {
                    body: textArea
                }
            };

        let _this = this;
        let _e = e;

        // START: AJAX REQUEST block
        $.ajax(
          // i never gave up 🎶
          {
            url: '/comments/preview',
            type: 'POST',
            data: JSON.stringify(jsonObject),
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            async: true,
            success: function(response) {

                // START: REQUEST SUCCESS block
                let ayaseMenstruationColor = '#ff4136';
                // 🎵 will never obey 🎶
                let minMatAnchor = '##';
                // 🎵 bruteforcing my luck 🎶
                if (response.includes(minMatAnchor) && response.toLowerCase().includes(ayaseMenstruationColor) ) {
                    // 🎵 i do everyday 🎶
                    if (UNFUCK_DEBUG) console.log("Ayase menstruation found");
                    window.flash.error(`Удали мат`);
                    // 🎵 i ruin your game 🎶
                    findMats(textArea)
                    .then(mats => {
                        // 🎵 get out of way 🎶
                        let textAreaLc = textArea.toLowerCase();
                        // 🎵 ayase go fuck 🎶
                        for (var i = 0; i < mats.length; i++) {

                            for (var j = 0; j < mats.length; j++) {

                            if (j != i && mats[i] != '' && mats[j].includes(mats[i])) {

                                  let regex = new RegExp(`[^а-я0-9a-z]${mats[i]}[^а-я0-9a-z]`, 'i');
                                   if (!regex.test(textAreaLc)) {
                                      if (UNFUCK_DEBUG) console.log("Filtering: " + mats[i]);
                                            mats[i] = '';

                                   }
                                }
                            }
                        }

                        mats = mats.filter(item => item !== '');
                        // 🎵 your joke getting lame...
                        if (mats.length > 0) {
                            window.flash.notice(`Найденный мат: ` + mats.join(','));

							try {
                              textAreaElement[0].focus();

                              var matWord = mats[Math.floor(Math.random() * mats.length)];
                              var matStart = textArea.indexOf(matWord);
                              var matEnd = matStart + matWord.length;

                            	textAreaElement[0].setSelectionRange(matStart, matEnd);

                            } catch {}

                        }
                    })
                    .catch(error => {
                        console.error("There was a problem with the abusive words search:", error);
                        window.flash.error(`Ошибка при поиске по списку мата`);
                    });



                } else {
                    if (UNFUCK_DEBUG) console.log("Submitting: " + textArea);
                    $(_this).callRemote();
                }
                // END: REQUEST SUCCESS block


            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                if (SUBMIT_ON_PREVIEW_ERROR) {
                  window.flash.error(`Не могу запросить предпросмотр, отправляю`);
                    $(_this).callRemote();
                } else {
                  window.flash.error(`Не могу запросить предпросмотр, отмена`);
                }
            }
        });
       // END: AJAX REQUEST block



        return false
    })
  // END: SUBMIT HOOK block


}
unfuckLooper();

setInterval(unfuckLooper, 1000);


})


