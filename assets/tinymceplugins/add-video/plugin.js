/*
  21.09.18
  WordPress Xidipity Theme
  Tinymce add-video plugin
  purpose:  apply font styles as defined in theme-vars.css
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_video", function (editor, url) {
  ("use strict");
  var randomID = getRandomID();
  /* 
    // 21.09.12
    BEGIN: jsError object
  */
  var jsError = {
    Value: null,
    Header: "ERROR",
    Message: function () {
      var retValue = null;
      if (this.Value !== null) {
        retValue = this.Value.message;
      }
      return retValue;
    },
    Line: function () {
      var retValue = null;
      var errorStack = this.Value.stack;
      var arrayDetail = "";
      var stackDetail = "";
      if (errorStack !== null) {
        arrayDetail = errorStack.split("\n");
        stackDetail = arrayDetail[1];
        if (stackDetail !== null) {
          stackDetail = stackDetail.trim();
          arrayDetail = stackDetail.match(/([0-9]{1,4}:[0-9]{1,3})([)]|$)/);
          if (arrayDetail === null) {
            retValue = stackDetail;
          } else {
            retValue = arrayDetail[1];
          }
        }
      }
      return retValue;
    },
    Display: function () {
      switch (true) {
        case this.Value === null:
          // called by mistake :/
          break;
        case this.Message() === null:
          editor.windowManager.alert("Error Message can not be Displayed. :/");
          break;
        case this.Line() === null:
          editor.windowManager.alert(this.Message());
          break;
        case this.Header !== "ERROR":
          editor.windowManager.alert(this.Header + " - " + this.Message());
          break;
        default:
          editor.windowManager.alert(
            this.Header + " #" + this.Line() + " - " + this.Message()
          );
      }
      this.Reset();
      return true;
    },
    Reset: function () {
      this.Value = null;
      this.Header = "ERROR";
      return true;
    },
    Exists: function () {
      return this.Value !== null;
    },
  };
  /* 
    END: jsError object
    BEGIN: jsVideo object
  */
  var jsVideo = {
    ar: function () {
      var htmlValue = "";
      switch (document.getElementById("ar_tag").selectedIndex) {
        case 1:
          htmlValue = "ar:1x1";
          break;
        case 2:
          htmlValue = "ar:3x2";
          break;
        case 3:
          htmlValue = "ar:4x3";
          break;
        case 4:
          htmlValue = "ar:7x5";
          break;
        case 5:
          htmlValue = "ar:16x9";
          break;
        case 6:
          htmlValue = "ar:16x10";
          break;
        case 7:
          htmlValue = "ar:17x9";
          break;
        case 8:
          htmlValue = "ar:21x9";
          break;
        default:
          htmlValue = "ar:16x9";
      }
      return htmlValue;
    }, // aspect ratio
    brand: function () {
      var htmlValue = document.getElementById("id_tag").value;
      var brandIdx = document.getElementById("brand_tag").selectedIndex;
      switch (true) {
        case !isEmpty(htmlValue.match(/vimeo/)):
          htmlValue = "vimeo";
          break;
        case !isEmpty(htmlValue.match(/video/)):
          htmlValue = "html5";
          break;
        case !isEmpty(htmlValue.match(/youtube/)):
          htmlValue = "youtube";
          break;
        case brandIdx == 1:
          htmlValue = "vimeo";
          break;
        default:
          htmlValue = "youtube";
      }
      return htmlValue;
    }, // brand
    id: function () {
      var idValue = document.getElementById("id_tag").value;
      switch (true) {
        case !isEmpty(idValue.match(/vimeo/)):
          idValue = getExpValue(idValue, "vimeo.com/(.+)", "is", 1);
          break;
        case !isEmpty(idValue.match(/video/)):
          idValue = getExpValue(idValue, "/(?!.*/)(.+)", "is", 1);
          break;
        case !isEmpty(idValue.match(/youtube/)):
          idValue = getExpValue(idValue, "=(.*?)(&|$)", "is", 1);
          break;
      }
      return idValue;
    }, // video id
    html: function () {
      var htmlValue = "";
      var videoHtml;
      if (!isEmpty(this.id())) {
        switch (this.brand()) {
          case "vimeo":
            videoHtml =
              '<!--  TMPL:VIDEO/VIMEO --><div id="' +
              randomID +
              '" class="bdr:so-2x bdr:bas+2 bkg:content cnr:arch-sm wd:100% web[dsp:none]"><div class="#AR#"><div class="ar:content fx:rw fxa:3 fxb:3 fxc:3"><div class="aln:txt-ct fnt:wgt+1 fnt:siz-lg-1x sm)fnt:siz-lg-2x fx:break">Vimeo Video</div><div class="aln:txt-ct fnt:wgt+1 fx:break">ID: #ID#</div><div class="aln:txt-ct fnt:siz-lg-5x sm)fnt:siz-lg-6x fx:break"><i class="icon:video_solid"></i></div></div></div></div><div class="mce[dsp:none]"><div class="ar:container #AR#"><iframe src="https://player.vimeo.com/video/#ID#" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div><!-- /TMPL:VIDEO/VIMEO -->';
            htmlValue = videoHtml
              .replace(/#AR#/g, this.ar())
              .replace(/#ID#/g, this.id());
            break;
          case "html5":
            var videoLink = document.getElementById("id_tag").value;
            videoHtml =
              '<!--  TMPL:VIDEO/HTML5 --><div id="' +
              randomID +
              '" class="bdr:so-2x bdr:bas+2 bkg:content cnr:arch-sm wd:100% web[dsp:none]"><div class="#AR#"><div class="ar:content fx:rw fxa:3 fxb:3 fxc:3"><div class="aln:txt-ct fnt:wgt+1 fnt:siz-lg-1x sm)fnt:siz-lg-2x fx:break">HTML5 Video</div><div class="aln:txt-ct fnt:wgt+1 fx:break">ID: #ID#</div><div class="aln:txt-ct fnt:siz-lg-5x sm)fnt:siz-lg-6x fx:break"><i class="icon:video_solid"></i></div></div></div></div><div class="mce[dsp:none]"><div class="ar:container #AR#"><video class="ht:auto wd:100%" autoplay="false" preload="auto" loop="loop" muted="false" controls="controls" width="300" height="150"><source src="#LINK#" type="video/mp4" alt="Xidipity HTML5 Video" /></video></div></div><!-- /TMPL:VIDEO/HTML5 -->';
            htmlValue = videoHtml
              .replace(/#AR#/g, this.ar())
              .replace(/#ID#/g, this.id())
              .replace(/#LINK#/g, videoLink);
            break;
          default:
            videoHtml =
              '<!--  TMPL:VIDEO/YOUTUBE --><div id="' +
              randomID +
              '" class="bdr:so-2x bdr:bas+2 bkg:content cnr:arch-sm wd:100% web[dsp:none]"><div class="#AR#"><div class="ar:content fx:rw fxa:3 fxb:3 fxc:3"><div class="aln:txt-ct fnt:wgt+1 fnt:siz-lg-1x sm)fnt:siz-lg-2x fx:break">Youtube Video</div><div class="aln:txt-ct fnt:wgt+1 fx:break">ID: #ID#</div><div class="aln:txt-ct fnt:siz-lg-5x sm)fnt:siz-lg-6x fx:break"><i class="icon:video_solid"></i></div></div></div></div><div class="mce[dsp:none]"><div class="ar:container #AR#"><iframe src="https://www.youtube.com/embed/#ID#" frameborder="0" allowfullscreen autoplay=1></iframe></div></div><!-- /TMPL:VIDEO/YOUTUBE -->';
            htmlValue = videoHtml
              .replace(/#AR#/g, this.ar())
              .replace(/#ID#/g, this.id());
        }
      }
      return htmlValue;
    }, // video html
  };
  /*
    END: jsVideo object 
    BEGIN: functions
  */
  function getExpValue(strPrm0, strPrm1) {
    /*
      21.09.15
      purpose:    get value defined by regex
      arguments:  strPrm0 - string to evalute
                  strPrm1 - regex
      arguments:  search options
                    (expOpt) option ie. g = global
                    (grpNum) result # (default - 0)
                    () demChr for multiple occurrences
                      - NONE ie. <i><u>
                      - chr ie. "," = a,b,c
      returns:    array / string / empty string
    */
    var retValue = "";
    //
    try {
      var demChr = "";
      var expArray;
      var expOpt = "";
      var regExp = "";
      var grpNum = 0;
      if (
        strPrm0 === undefined ||
        strPrm1 === undefined ||
        strPrm0 === null ||
        strPrm1 === null ||
        typeof strPrm0 !== "string" ||
        typeof strPrm1 !== "string" ||
        strPrm0.trim() === "" ||
        strPrm1.trim() === ""
      ) {
        console.log("# ### expMatch strPrm0:".padEnd(30, " ") + strPrm0);
        console.log("# ### expMatch strPrm1:".padEnd(30, " ") + strPrm1);
        throw new Error("getExpValue function missing required parameter.");
      }
      // idx is the # of prms
      var idx = 2;
      while (idx < arguments.length) {
        if (arguments[idx] !== undefined) {
          switch (true) {
            case hasExpMatch(arguments[idx], "A|D|g|i|j|m|s|u|U|x|X"):
              expOpt = arguments[idx];
              break;
            case hasExpMatch(arguments[idx], "[1-9]"):
              grpNum = parseInt(arguments[idx], 10);
              break;
            default:
              demChr = arguments[idx];
          }
        }
        idx++;
      }
      // if delimiter, scope must be global
      if (!isEmpty(demChr) && !hasIdxMatch("_" + expOpt, "g")) {
        expOpt += "g";
      }
      if (grpNum > 0) {
        --grpNum;
        if (grpNum < 0) {
          grpNum = 0;
        } else {
          // if grpNum, demChr must be ""
          demChr = "";
        }
        if (!hasIdxMatch("_" + expOpt, "g")) {
          expOpt = expOpt.replace("g", "");
        }
      }
      // check for a match & extract
      if (hasExpMatch(strPrm0, strPrm1)) {
        regExp = new RegExp(strPrm1, expOpt);
        if (isEmpty(demChr)) {
          if (expOpt === "g" && grpNum < 1) {
            retValue = strPrm0.match(regExp);
          } else {
            retValue = strPrm0.match(regExp)[grpNum];
          }
        } else {
          if (demChr === "NONE") {
            demChr = "";
          }
          expArray = strPrm0.match(regExp, expOpt);
          expArray.forEach(function (item, index, array) {
            retValue += item + demChr;
          });
          if (demChr !== "") {
            retValue = retValue.slice(0, -1);
          }
        }
      }
    } catch (e) {
      jsError.Value = e;
    }
    if (retValue === undefined) {
      retValue = "";
    }
    return retValue;
  }
  function isEmpty(strPrm) {
    /*
      21.09.09
      purpose:    evaluate strPrm to determine if it
                  contains data
      parameter:  strPrm - string to evaluate
      arguments:  none
      returns:    true/false
    */
    return !strPrm || 0 === strPrm.length;
  }
  function getRandomID() {
    /*
    21.09.11
    purpose:    generate radom ID
    parameters: none
    arguments:  number of digits
    returns:    string / empty string
  */
    var digitNum = 5;
    if (arguments.length === 1) {
      digitNum = parseInt(arguments[0]);
    }
    return (Math.random().toString(26) + "000000000").substr(4, digitNum);
  }
  /* 
    END: general functions
    BEGIN: mce toolbar
  */
  editor.addButton("add_video", {
    title: "Add Video",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSI1LjMzMzMzMzMzIiB5PSI1LjMzMzMzMzMzIiB3aWR0aD0iMjEuMzMzMzMzMyIgaGVpZ2h0PSIyMS4zMzMzMzMzIiByeD0iMi42NjY2NjY2NyI+PC9yZWN0PgogICAgICAgICAgICA8bGluZSB4MT0iMTAuNjY2NjY2NyIgeTE9IjUuMzMzMzMzMzMiIHgyPSIxMC42NjY2NjY3IiB5Mj0iMjYuNjY2NjY2NyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjIxLjMzMzMzMzMiIHkxPSI1LjMzMzMzMzMzIiB4Mj0iMjEuMzMzMzMzMyIgeTI9IjI2LjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI1LjMzMzMzMzMzIiB5MT0iMTAuNjY2NjY2NyIgeDI9IjEwLjY2NjY2NjciIHkyPSIxMC42NjY2NjY3IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjIxLjMzMzMzMzMiIHgyPSIxMC42NjY2NjY3IiB5Mj0iMjEuMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjIxLjMzMzMzMzMiIHkxPSIxMC42NjY2NjY3IiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjEwLjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyMS4zMzMzMzMzIiB5MT0iMjEuMzMzMzMzMyIgeDI9IjI2LjY2NjY2NjciIHkyPSIyMS4zMzMzMzMzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    onclick: function () {
      editor.windowManager.open({
        title: "Add Video",
        body: [
          {
            type: "container",
            html: '<form method="post" style="font-family:sans-serif;font-size:16px;width:300px;"><table><tbody><tr><td style="vertical-align: middle;">Video ID/Link:&nbsp;</td><td><input type="text" id="id_tag" name="id_tag" value="" style="font-family:monospace; border: 1px solid #e9e7e4; width:100%;"></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td style="vertical-align: middle;">Aspect Ratio:&nbsp;</td><td><select id="ar_tag" style="border:1px solid #e9e7e4;"><option>default&nbsp;</option><option>1x1</option><option>3x2</option><option>4x3</option><option>7x5</option><option>16x9</option><option>16x10</option><option>17x9</option><option>21x9</option></select></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td style="vertical-align: middle;">Source:&nbsp;</td><td><select id="brand_tag" style="border:1px solid #e9e7e4;"><option>You Tube&nbsp;</option><option>Vimeo</option><option>Html5</option></select></td></tr></tbody></table></form>',
          },
        ],
        onSubmit: function () {
          // video object
          console.clear();
          var htmlVideo = jsVideo.html();
          try {
            if (isEmpty(htmlVideo)) {
              throw new Error("Missing video ID/file path.");
            } else {
              editor.execCommand("mceInsertContent", false, htmlVideo);
            }
          } catch (e) {
            jsError.Value = e;
            jsError.Display();
          }
        },
      });
      jsError.Reset();
      document.getElementById("id_tag").focus();
    },
  });
});
/* 
  END: mce toolbar
  EOF: add-video / plugin.js / 21.09.18
*/
