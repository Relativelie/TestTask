function ncinput(rec, title, name, placeholder) {
  let line =
    '<div class="t-input-group t-input-group_in" data-input-lid="' +
    name +
    '"> <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="" style="">' +
    title +
    '</div> <div class="t-input-block"> <input type="text" name="' +
    name +
    '" class="t-input js-tilda-rule " value="" placeholder="' +
    placeholder +
    '" data-tilda-req="1" style="color:#221e1e; border:2px solid #0058ff; background-color:#f8f7f8; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;"> <div class="t-input-error"></div> </div> </div>';

  $(rec + " .t-form__inputsbox").append(line);
  // $('[name="' + name + '"]').val(placeholder);
}

function removeBreaks(code) {
  code = code.replace(/(\r\n|\n|\r)/gm, "<1br />");
  re1 = /<1br \/><1br \/>/gi;
  code = code.replace(re1, " ");
  re2 = /\<1br \/>/gi;
  code = code.replace(re2, " ");
  re3 = /\s +/g;
  code = code.replace(re3, " ");
  re4 = /<2br \/>/gi;
  code = code.replace(re4, "\n\n");
  return code;
}

function input2code(input, iclass, txt1, txt2, val1, repl, repl2) {
  let url = $('[name="' + input + '"]').val();

  if (repl != undefined) {
    url = url.replace(repl, repl2);
  }
  $(iclass).text(txt1 + url + txt2);
  if (url == "") {
    $(iclass).text(val1);
  }
}

function calcBorderValues() {
  const topLeft = $('[name="top-left-corner"]').val().length == 0 ? 0 : $('[name="top-left-corner"]').val();
  const topRight = $('[name="top-right-corner"]').val().length == 0 ? 0 : $('[name="top-right-corner"]').val();
  const bottomLeft = $('[name="bottom-right-corner"]').val().length == 0 ? 0 : $('[name="bottom-right-corner"]').val();
  const bottomRight = $('[name="bottom-left-corner"]').val().length == 0 ? 0 : $('[name="bottom-left-corner"]').val();
  return `const square = document.querySelector(".tn-atom");
  const convertToInt = (str) => {
      const newValue = str.slice(0, -2);
      return parseInt(newValue)
  }
  
  square.addEventListener("click", function (square) {
      const allBorders = [
          ["borderTopLeftRadius", "${topLeft}px"],
          ["borderTopRightRadius", "${topRight}px"],
          ["borderBottomRightRadius", "${bottomLeft}px"],
          ["borderBottomLeftRadius", "${bottomRight}px"],
      ];
      let activeBorder = "";
      let prevActiveBorder = "";
      let activeBorderValue=""
      const activeBorderStyle = square.target.style[0]
      if (activeBorderStyle === undefined) {
          activeBorder = allBorders[0][0];
          activeBorderValue = allBorders[0][1]
      } else {
          for(let i=0; i<allBorders.length; i++) {
              const borderValue = convertToInt(square.target.style[allBorders[i][0]])
              console.log(borderValue)
              if (borderValue > 0) {
                  prevActiveBorder = allBorders[i][0];
                  const number = i === allBorders.length-1 ? -1 : i;
                  activeBorder = allBorders[number + 1][0];
                  activeBorderValue = allBorders[number + 1][1]
              }
          }
      }
      square.target.style[prevActiveBorder] = "0"
      square.target.style[activeBorder] = activeBorderValue;
  })
`
}

function calcScaleValue() {
  const scale = $('[name="scale"]').val().length == 0 ? 1 : (parseInt($('[name="scale"]').val()) + 100)/100;
  return `const square = document.querySelector(".tn-atom");
  const convertToInt = (str) => {
      const newValue = str.slice(6, -1);
      console.log(typeof newValue)
      return parseFloat(newValue)
  }
  square.addEventListener("click", function (square) {
      const scaleVal = convertToInt(square.target.style.transform)
      console.log(scaleVal)
      if (scaleVal!== NaN && (scaleVal > 1 || scaleVal < 1)) {
          square.target.style.transform = "scale(1)";
      } else square.target.style.transform = "scale(${scale})"
  })
`
}

function setNewValue() {
  const value = $('[name="transform-input"]').val();
  if (value.toLowerCase() === "скруглять") {
    $('[data-input-lid="scale"]').hide();
    $('[data-input-lid="top-left-corner"]').show();
    $('[data-input-lid="top-right-corner"]').show();
    $('[data-input-lid="bottom-right-corner"]').show();
    $('[data-input-lid="bottom-left-corner"]').show();
    $(".n-code").text(calcBorderValues())
  } else if (value.toLowerCase() === "менять размер") {
    $('[data-input-lid="scale"]').show()
    $('[data-input-lid="top-left-corner"]').hide();
    $('[data-input-lid="top-right-corner"]').hide();
    $('[data-input-lid="bottom-right-corner"]').hide();
    $('[data-input-lid="bottom-left-corner"]').hide();
    $(".n-code").text(calcScaleValue())
  }

}

function nspan(nolimclass, nolimdefault) {
  nolimclass = `<span class="hljs-id ${nolimclass}">${typeof nolimdefault == "undefined" ? "" : nolimdefault
    }</span>`;
  return nolimclass;
}

function nspan1(nolimclass) {
  nolimclass = `<span class="hljs-id ${nolimclass}">`;
  return nolimclass;
}

function nspan2() {
  return `</span>`;
}

function inputdropdown(i, iclass, iff, valmain) {
  let url = $('[name="' + i + '"]').val();

  if (url == iff) {
    $(iclass).text(valmain);
  }
}

function ncdropdown(rec, title, name, options) {
  var line =
    '<div class="t-input-group t-input-group_sb" data-input-lid=""> <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no" field="" style="">' +
    title +
    '</div> <div class="t-input-block"> <div class="t-select__wrapper "> <select name="' +
    name +
    '" class="t-select js-tilda-rule " data-tilda-req="1" style="color:#221e1e; border:2px solid #0058ff; background-color:#f8f7f8; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;">';

  options = options.split(";");
  for (let i = 0; i < options.length; i++) {
    line += '<option value="' + options[i] + '">' + options[i] + "</option> ";
  }
  line += '</select> </div> <div class="t-input-error"></div> </div> </div>';
  $(rec + " .t-form__inputsbox").append(line);
}

function generatecode(code) {
  code = code.replace(
    /<style>/gm,
    '<span class="hljs-tag">&lt;<span class="hljs-title">style</span>&gt;</span>'
  );
  code = code.replace(
    /<\/style>/gm,
    '<span class="hljs-tag">&lt;/<span class="hljs-title">style</span>&gt;</span>'
  );

  code = code.replace(
    /<script>/gm,
    '<span class="hljs-tag">&lt;<span class="hljs-title">script</span>&gt;</span>'
  );
  code = code.replace(
    /<\/script>/gm,
    '<span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>'
  );

  code = removeBreaks(code);
  code = `<pre><span class="nlcopybtn">Копировать код</span><code class="auto hljs xml">${code}</pre>`;

  $(`.myCode`).html(code);
}
