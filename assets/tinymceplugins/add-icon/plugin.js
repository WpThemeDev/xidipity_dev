/*
  21.09.18
  WordPress Xidipity Theme
  Tinymce add-icon plugin
  purpose:  apply font styles as defined in theme-vars.css
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_icon", function (editor, url) {
  ("use strict");
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
    BEGIN: jsIcon object
  */
  var jsIcon = {
    IconHtml: function () {
      //
      console.log(" OBJ > IconHtml");
      //
      var retValue = "";
      try {
        var classAttributes = "";
        var iconSizeIdx = this.Size;
        console.log("  iconSizeIdx: " + iconSizeIdx);
        var marginLeftIdx = this.MarginLeft;
        console.log("  marginLeftIdx: " + marginLeftIdx);
        var marginRightIdx = this.MarginRight;
        console.log("  marginRightIdx: " + marginRightIdx);
        switch (true) {
          case marginLeftIdx > 0 && marginRightIdx > 0 && iconSizeIdx > 0:
            classAttributes =
              this.MarginLeftHtml() +
              " " +
              this.MarginRightHtml() +
              " " +
              this.SizeHtml();
            break;
          case marginLeftIdx > 0 && marginRightIdx > 0:
            classAttributes =
              this.MarginLeftHtml() + " " + this.MarginRightHtml();
            break;
          case marginRightIdx > 0:
            classAttributes = this.MarginRightHtml();
            break;
          case marginLeftIdx > 0:
            classAttributes = this.MarginLeftHtml();
            break;
          case iconSizeIdx > 0:
            classAttributes = this.SizeHtml();
            break;
        }
        console.log(" classAttributes: " + classAttributes);
        var inputTag = this.Tag;
        // update google icon fonts
        retValue = inputTag
          .replace(/span/g, "i")
          .replace(/>\s/, ">")
          .replace(/\s</, "<");
        console.log(" inputTag: " + retValue);
        if (!isEmpty(classAttributes)) {
          retValue =
            '<span class="' + classAttributes + '">' + retValue + "</span>";
        }
      } catch (e) {
        jsError.Value = e;
      }
      console.log(" retValue: " + retValue);
      return retValue;
    },
    MarginLeft: 0,
    MarginLeftHtml: function () {
      //
      console.log("OBJ > MarginLeftHtml");
      //
      var retValue = "";
      var marginLeftIdx = this.MarginLeft;
      switch (marginLeftIdx) {
        case 1:
          retValue = "mar:lt+0.125";
          break;
        case 2:
          retValue = "mar:lt+0.25";
          break;
        case 3:
          retValue = "mar:lt+0.5";
          break;
        case 4:
          retValue = "mar:lt+0.75";
          break;
        case 5:
          retValue = "mar:lt+1";
          break;
      }
      console.log("marginLeftIdx: " + marginLeftIdx);
      console.log("retValue: " + retValue);
      return retValue;
    },
    MarginRight: 0,
    MarginRightHtml: function () {
      //
      console.log("OBJ > MarginRightHtml");
      //
      var retValue = "";
      var marginRightIdx = this.MarginRight;
      switch (marginRightIdx) {
        case 1:
          retValue = "mar:rt+0.125";
          break;
        case 2:
          retValue = "mar:rt+0.25";
          break;
        case 3:
          retValue = "mar:rt+0.5";
          break;
        case 4:
          retValue = "mar:rt+0.75";
          break;
        case 5:
          retValue = "mar:rt+1";
          break;
      }
      console.log("marginRightIdx: " + marginRightIdx);
      console.log("retValue: " + retValue);
      return retValue;
    },
    Size: 0,
    SizeHtml: function () {
      //
      console.log("OBJ > SizeHtml");
      //
      var retValue = "";
      var iconSizeIdx = this.Size;
      switch (iconSizeIdx) {
        case 1:
          retValue = "fnt:siz-md-1x";
          break;
        case 2:
          retValue = "fnt:siz-lg";
          break;
        case 3:
          retValue = "fnt:siz-lg-1x";
          break;
        case 4:
          retValue = "fnt:siz-lg-2x";
          break;
        case 5:
          retValue = "fnt:siz-lg-3x";
          break;
        case 6:
          retValue = "fnt:siz-lg-4x";
          break;
        case 7:
          retValue = "fnt:siz-lg-5x";
          break;
      }
      console.log("iconSizeIdx: " + iconSizeIdx);
      console.log("retValue: " + retValue);
      return retValue;
    },
    Tag: "",
  };
  /*
    END: jsIcon object 
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
  function hasExpMatch(strPrm0, strPrm1) {
    /*
      21.08.30
      purpose:    validate strPrm1 match in strPrm0
                  search is case insensitive.
      parameters: strPrm0 - string to search
                  strPrm1 - regex
      arguments:  none
      returns:    true / false
    */
    var retValue = false;
    try {
      if (
        strPrm0 === undefined ||
        strPrm1 === undefined ||
        strPrm0 === null ||
        strPrm1 === null ||
        typeof strPrm0 !== "string" ||
        typeof strPrm1 !== "string" ||
        strPrm0 === "" ||
        strPrm1 === ""
      ) {
        console.log("# ### expMatch strPrm0:".padEnd(30, " ") + strPrm0);
        console.log("# ### expMatch strPrm1:".padEnd(30, " ") + strPrm1);
        throw new Error("hasExpMatch function missing required parameter/s.");
      }
      var regExp = new RegExp(strPrm1, "gi");
      retValue = regExp.test(strPrm0);
    } catch (e) {
      jsError.Value = e;
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
  /* 
    END: general functions
    BEGIN: mce toolbar
  */
  editor.addButton("add_icon", {
    title: "Add Icon",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iMjAiIHkxPSIxMC42NjY2NjY3IiB4Mj0iMjAuMDEzMzMzMyIgeTI9IjEwLjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjUuMzMzMzMzMzMiIHk9IjUuMzMzMzMzMzMiIHdpZHRoPSIyMS4zMzMzMzMzIiBoZWlnaHQ9IjIxLjMzMzMzMzMiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjMzMzMzMzMzLDIwIEwxMC42NjY2NjY3LDE0LjY2NjY2NjcgQzExLjkwNDI3MSwxMy40NzU3ODE0IDEzLjQyOTA2MjQsMTMuNDc1NzgxNCAxNC42NjY2NjY3LDE0LjY2NjY2NjcgTDIxLjMzMzMzMzMsMjEuMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE4LjY2NjY2NjcsMTguNjY2NjY2NyBMMjAsMTcuMzMzMzMzMyBDMjEuMjM3NjA0MywxNi4xNDI0NDggMjIuNzYyMzk1NywxNi4xNDI0NDggMjQsMTcuMzMzMzMzMyBMMjYuNjY2NjY2NywyMCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
    onclick: function () {
      editor.windowManager.open({
        title: "Add Icon",
        body: [
          {
            type: "container",
            html: '<form method="post" style="font-family:sans-serif;font-size:16px;width:500px;"><table style="border-collapse:separate; border-spacing:16px; padding-right:16px;width:100%"><tbody style="border-color: transparent;"><tr><td style="width:33.3333%"><label for="ico_siz" style="line-height:200%;">Size:</label><br /><select id="sz_id" style="border:1px solid #e9e7e4;"><option>default</option><option>+1/2</option><option>+1</option><option>+2</option><option>+3</option><option>+4</option><option>+5</option><option>+6</option></select></td><td style="width:33.3333%"><label for="margin_lt" style="line-height:200%;">Margin left:</label><br /><select id="lt_id" style="border:1px solid #e9e7e4;"><option>none</option><option>+1</option><option>+2</option><option>+3</option><option>+4</option><option>+5</option></select></td><td style="width:33.3333%; text-align: right;"><div style="text-align: left;"><label for="margin_rt" style="line-height:200%;">Margin right:</label><br /><select id="rt_id" style="border:1px solid #e9e7e4;"><option>none</option><option>+1</option><option>+2</option><option>+3</option><option>+4</option><option>+5</option></select></div></td></tr><tr><td colspan="3"><label for="icon" style="line-height:200%;">Icon Tag:</label><br /><input type="text" id="tag_id" name="ico_tag" value="" style="font-family:monospace; border: 1px solid #e9e7e4; width:100%;"></td></tr></tbody></table></form>',
          },
        ],
        onSubmit: function () {
          // icon object
          try {
            var iconTag = document.getElementById("tag_id").value;
            if (isEmpty(iconTag)) {
              throw new Error("Missing required icon tag.");
            }
            jsIcon.Size = document.getElementById("sz_id").selectedIndex;
            jsIcon.MarginLeft = document.getElementById("lt_id").selectedIndex;
            jsIcon.MarginRight = document.getElementById("rt_id").selectedIndex;
            jsIcon.Tag = iconTag;
            if (jsError.Exists()) {
              jsError.Display();
              editor.focus();
            } else {
              var iconHtml = jsIcon.IconHtml();
              console.log(" iconHtml: " + iconHtml);
              editor.execCommand("mceInsertRawHTML", false, iconHtml);
            }
          } catch (e) {
            jsError.Value = e;
            jsError.Display();
            editor.focus();
          }
        },
      });
      console.clear();
      document.getElementById("tag_id").focus();
    },
  });
});
/* 
  END: mce toolbar
  EOF: add-icon / plugin.js / 21.09.18
*/
