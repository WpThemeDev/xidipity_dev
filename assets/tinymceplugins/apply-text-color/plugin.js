/*
  21.09.16
  WordPress Xidipity Theme
  Tinymce apply-text-color plugin
  purpose:  apply font styles as defined in theme-vars.css
  source:   github.com/WpThemeDev/xidipity/
  (C)	https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("apply_txt_color", function (editor) {
  ("use strict");
  var conStat = "idle";
  var onSubmitCnt = 0;
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
    BEGIN: jsParm object
  */
  var jsParm = {
    EditingHtmlDoc: function () {
      // 21.09.12
      var retValue = false;
      if (this.HtmlDoc !== null) {
        retValue = true;
      }
      return retValue;
    },
    HtmlContent: function () {
      // 21.06.19
      var htmlContentCache = this.HtmlContentCache;
      if (isNull(htmlContentCache)) {
        this.HtmlContentCache = editor.selection.getContent({
          format: "html",
        });
      }
      return this.HtmlContentCache;
    },
    HtmlContentCache: null,
    HtmlDoc: null,
    HtmlInner: function () {
      // 21.06.19
      var HtmlInnerCache = this.HtmlInnerCache;
      var htmlContent = this.HtmlContent();
      var parmNode = this.Node;
      if (isNull(HtmlInnerCache) && !isNull(parmNode)) {
        if (tagCnt(htmlContent) < 2) {
          this.HtmlInnerCache = clrMceAtr(parmNode.innerHTML);
        } else {
          this.HtmlInnerCache = clrMceAtr(htmlContent);
        }
      }
      return this.HtmlInnerCache;
    },
    HtmlInnerCache: null,
    HtmlOuter: function () {
      // 21.06.19
      var htmlOuterCache = this.HtmlOuterCache;
      var htmlContent = this.HtmlContent();
      var parmNode = this.Node;
      if (isNull(htmlOuterCache) && !isNull(parmNode)) {
        if (tagCnt(htmlContent) < 2) {
          this.HtmlOuterCache = clrMceAtr(parmNode.outerHTML);
        } else {
          this.HtmlOuterCache = clrMceAtr(htmlContent);
        }
      }
      return this.HtmlOuterCache;
    },
    HtmlOuterCache: null,
    HtmlRaw: function () {
      // 21.06.19
      var htmlRawCache = this.HtmlRawCache;
      var htmlContent = this.HtmlContent();
      var htmlOuter = this.HtmlOuter();
      if (
        isNull(htmlRawCache) &&
        !isEmpty(htmlContent) &&
        !isEmpty(htmlOuter)
      ) {
        if (hasExpMatch(htmlOuter, "^<(li|td)") || this.IsWording()) {
          this.HtmlRawCache = htmlContent;
        } else {
          this.HtmlRawCache = htmlOuter;
        }
      }
      return this.HtmlRawCache;
    },
    HtmlRawCache: null,
    HtmlUpdate: null,
    IsWording: function () {
      // 21.08.09
      var regExp = "";
      var matchNotFound = true;
      var newHtmlUpdate = this.HtmlContent();
      var isWordingCache = this.IsWordingCache;
      var htmlContent = this.HtmlContent();
      var htmlOuter = this.HtmlOuter();
      var parentNodeHtml = this.ParentNodeHtml();
      var lineCnt = tagCnt(htmlContent);
      if (
        isNull(isWordingCache) &&
        !isEmpty(htmlContent) &&
        !isEmpty(htmlOuter) &&
        lineCnt < 2
      ) {
        regExp =
          "\\s(<(em|i|kbd|s|strong|sub|sup|u)>){1,}" +
          htmlContent +
          "(<\\/(em|i|kbd|s|strong|sub|sup|u)>){1,}";
        if (hasExpMatch(parentNodeHtml, regExp)) {
          matchNotFound = false;
          regExp =
            "(<(em|i|kbd|s|strong|sub|sup|u)>){1,}" +
            htmlContent +
            "(<\\/(em|i|kbd|s|strong|sub|sup|u)>){1,}";
          newHtmlUpdate = getExpValue(parentNodeHtml, regExp);
        }
        // format tag test <t>_
        regExp =
          "(<(em|i|kbd|s|strong|sub|sup|u)>){1,}" +
          htmlContent +
          "(<\\/(em|i|kbd|s|strong|sub|sup|u)>){1,}\\s";
        if (matchNotFound && hasExpMatch(parentNodeHtml, regExp)) {
          matchNotFound = false;
          regExp =
            "(<(em|i|kbd|s|strong|sub|sup|u)>){1,}" +
            htmlContent +
            "(<\\/(em|i|kbd|s|strong|sub|sup|u)>){1,}";
          newHtmlUpdate = getExpValue(parentNodeHtml, regExp);
        }
        // span tag test _<span>
        regExp = "\\s(<span.*?>)" + htmlContent + "(<\\/span>)";
        if (matchNotFound && hasExpMatch(parentNodeHtml, regExp)) {
          matchNotFound = false;
          newHtmlUpdate = htmlOuter;
        }
        // span tag test <span>_
        regExp = "(<span.*?>)" + htmlContent + "(<\\/span>)\\s";
        if (matchNotFound && hasExpMatch(parentNodeHtml, regExp)) {
          matchNotFound = false;
          newHtmlUpdate = htmlOuter;
        }
        // space test _text
        regExp = "\\s(" + htmlContent + ")";
        if (matchNotFound && hasExpMatch(htmlOuter, regExp)) {
          matchNotFound = false;
          newHtmlUpdate = htmlContent;
        }
        // space test text_
        regExp = "(" + htmlContent + ")\\s";
        if (matchNotFound && hasExpMatch(htmlOuter, regExp)) {
          matchNotFound = false;
          newHtmlUpdate = htmlContent;
        }
        if (!matchNotFound) {
          this.HtmlRawCache = newHtmlUpdate;
          console.log(" * ***** CODE MARKER ***** *");
        }
        this.IsWordingCache = !matchNotFound;
      }
      return this.IsWordingCache;
    },
    IsWordingCache: null,
    Node: null,
    NodeName: function () {
      // 21.06.19
      var nodeNameCache = this.NodeNameCache;
      var parmNode = this.Node;
      if (isNull(nodeNameCache) && !isNull(parmNode)) {
        this.NodeNameCache = parmNode.nodeName.toLowerCase();
      }
      return this.NodeNameCache;
    },
    NodeNameCache: null,
    ParentNode: null,
    ParentNodeHtml: function () {
      // 21.06.19
      var parentNodeHtmlCache = this.ParentNodeHtmlCache;
      var parentNode = this.ParentNode;
      if (isNull(parentNodeHtmlCache) && !isNull(parentNode)) {
        this.ParentNodeHtmlCache = clrMceAtr(parentNode.outerHTML);
      }
      return this.ParentNodeHtmlCache;
    },
    ParentNodeHtmlCache: null,
    ParentNodeName: function () {
      // 21.06.19
      var parentNodeNameCache = this.ParentNodeNameCache;
      var parmNode = this.ParentNode;
      if (isNull(parentNodeNameCache) && !isNull(parmNode)) {
        this.ParentNodeNameCache = parmNode.nodeName.toLowerCase();
      }
      return this.ParentNodeNameCache;
    },
    ParentNodeNameCache: null,
    Reset: function () {
      // 21.09.16
      this.HtmlContentCache = null;
      this.HtmlDoc = null;
      this.HtmlInnerCache = null;
      this.HtmlOuterCache = null;
      this.HtmlRawCache = null;
      this.HtmlUpdate = null;
      this.IsWordingCache = null;
      this.Node = null;
      this.NodeIsElementCache = null;
      this.NodeNameCache = null;
      this.ParentNode = null;
      this.ParentNodeHtmlCache = null;
      this.ParentNodeNameCache = null;
      return true;
    },
    SetNode: function (objPrm) {
      // 21.09.12
      if (typeof objPrm === "object" && objPrm !== null) {
        this.Reset();
        this.Node = objPrm;
      }
    },
  };
  /*
    END: jsParm object 
    BEGIN: functions
  */
  function chrCnt(strPrm1, strPrm2) {
    /*
      21.09.09
      purpose:    count strPrm2 matches in string (strPrm1)
      parameters: strPrm1 - string of evaluate (haystack)
                  strPrm2 - regex expression to perform count
      arguments:  none
      returns:    count (-1 = count not performed)
    */
    var retValue = -1;
    if (!isEmpty(strPrm1) && !isEmpty(strPrm2)) {
      var regExp = new RegExp(strPrm2, "g");
      var retValue = (strPrm1.match(regExp) || []).length;
    }
    return retValue;
  }
  function clrMceAtr(strPrm) {
    /*
    21.09.10
    purpose:    identify and remove mce attributes
    parameters: strPrm  - html to evaluate
    arguments:  none
    returns:    string
  */
    var retValue = "";
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("clrMceAtr function missing required parameter.");
      }
      if (hasExpMatch(strPrm, "-mce-")) {
        var regExp = new RegExp(
          /.data-mce-style.*?".*?"|<br data-mce-bogus.*?".*?">/,
          "g"
        );
        retValue = strPrm.replace(regExp, "");
      } else {
        retValue = strPrm;
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function frmNotReady() {
    /*
    21.09.10
    purpose:    determine if content has been selected
    parameters: none
    arguments:  none
    returns:    true / false
  */
    var retValue = true;
    try {
      if (
        isEmpty(
          editor.selection.getContent({
            format: "text",
          })
        )
      ) {
        throw new Error("Content to modify has not been selected.");
      }
      retValue = false;
    } catch (e) {
      jsError.Header = "MESSAGE";
      jsError.Value = e;
    }
    return retValue;
  }
  function getClosedTags(strPrm) {
    /*
      21.09.10      
      purpose:    get closed tags from open tags html string
                  which include class, style, & fmt tags (ie. <u>)
                  ie. <tag1><tag2>############</tag2><tag1>
                  ignore tag which are not part of the binding
                  ie. <tag1><tag2>####<tag3>###<tag3>#####</tag2></tag1>
                  tag3 would be ignored as it is not bound
      parameters: strPrm - html to process
      returns:    string / empty string
    */
    var retValue = "";
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string"
      ) {
        throw new Error("getClosedTags function missing required parameter.");
      }
      if (!isEmpty(strPrm)) {
        var atrItem = "";
        var closeTags = "";
        var atrArray = getExpValue(strPrm, "(?<!w|s)<.(?<!<[/]).*?>", "g");
        if (!isEmpty(atrArray)) {
          atrArray
            .slice()
            .reverse()
            .forEach(function (item, index, array) {
              atrItem = item;
              atrItem = atrItem.replace(/</, "</");
              atrItem = atrItem.replace(/(\s(id=|class=|style=)".*?")/g, "");
              closeTags += atrItem;
            });
          retValue = closeTags;
        }
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function getElementType(strPrm) {
    /*
      21.08.30
      purpose:    evaluate strPrm to determine if the
                  attribute is a class / style / tag (ie. <u>)
      parameters: strPrm - string to evaluate
      returns:    string / empty string
    */
    var retValue = "";
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("getElementType function missing required parameter.");
      }
      switch (true) {
        case hasIdxMatch(strPrm, ";"):
          retValue = "style";
          break;
        case hasExpMatch(strPrm, "\\b(em|i|kbd|s|strong|sub|sup|u)\\b"):
          retValue = "tag";
          break;
        default:
          retValue = "class";
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function getExpValue(strPrm0, strPrm1) {
    /*
      build:      21.09.15
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
  function getOpenTags(strPrm) {
    /*
      21.09.15      
      purpose:    get bound tags from html string
                  which include class, style, & fmt tags (ie. <u>)
                  ie. <tag1><tag2>############</tag2><tag1>
                  ignore tag which are not part of the binding
                  ie. <tag1><tag2>####<tag3>###<tag3>#####</tag2></tag1>
                  tag3 would be ignored as it is not bound
      parameters: strPrm - html to process
      returns:    string / empty string
    */
    var retValue = "";
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("getBoundTags function missing required parameter.");
      }
      if (!isEmpty(strPrm)) {
        var closeItem = "";
        var closeTags = "";
        var openItem = "";
        var openTags = "";
        var atrArray = getExpValue(
          strPrm,
          "(?<!w|s|[A-Za-z0-9 .,!@#$%^&*()-])<.(?<!<[/]).*?>",
          "g"
        );
        if (!isEmpty(atrArray)) {
          atrArray
            .slice()
            .reverse()
            .forEach(function (item, index, array) {
              closeItem = item;
              openItem = item;
              closeItem = closeItem.replace(/</, "</");
              closeItem = closeItem.replace(
                /(\s(id=|class=|style=)".*?")/g,
                ""
              );
              if (hasExpMatch(strPrm, closeTags + closeItem)) {
                closeTags += closeItem;
                openTags = openItem + openTags;
              } else {
                closeTags = closeItem;
                openTags = openItem;
              }
            });
          retValue = openTags;
        }
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function getOpenTagsUpdate(strPrm) {
    /*
      21.09.09
      purpose:    apply/blend/replace selected html attribute/s
                  with input data 
      parameter:  strPrm - data input/s
      arguments:  document open tags ie.<p>, <p><span>, etc.
                  apply/blend/replace flag
      returns:    string / empty string
    */
    var argJobMethod = ""; // apply, blend, replace
    var arrayNewTag = null;
    var arrayNewTagData = "";
    var arrayOldTagData = null;
    var elementType = ""; // class, style, tag
    var newColorClass = "";
    var newColorStyle = "";
    var newFmtTag = "";
    var newStandardClass = "";
    var newStandardStyle = "";
    var newTagData = ""; // prm data
    var oldTagData = ""; // arg data
    var oldTagId = "";
    var priNode = "";
    var regExp = "";
    var retValue = "";
    var tagKey = "";
    try {
      console.log("- ----- ----------- ----- -");
      console.log(" ");
      /* 
    BEGIN: validate prm / set defaults
    */
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("getTagUpdate function missing required parameter.");
      }
      // set defaults
      newTagData = strPrm.trim();
      argJobMethod = "blend";
      /* 
    END:   validate prm / set defaults
    BEGIN: process optional arguments
           * set idx to the # of prms
    */
      var idx = 1;
      while (idx < arguments.length) {
        if (arguments[idx] !== undefined && !isEmpty(arguments[idx])) {
          if (hasExpMatch(arguments[idx], "apply|blend|replace")) {
            argJobMethod = arguments[idx].toLowerCase();
          } else if (
            hasExpMatch(
              arguments[idx],
              "^<(dd|div|dt|h[1-6]|li|p|td|th|em|i|kbd|s|span|strong|sub|sup|u)"
            )
          ) {
            if (
              hasExpMatch(arguments[idx], "^<(em|i|kbd|s|strong|sub|sup|u)>")
            ) {
              oldTagData += arguments[idx];
            } else {
              oldTagData = arguments[idx];
            }
          }
        }
        idx++;
      }
      if (
        !isEmpty(oldTagData) &&
        hasExpMatch(oldTagData, "^<(dd|div|dt|h[1-6]|li|p|td|th|span)")
      ) {
        priNode = getExpValue(
          oldTagData,
          "^<(dd|div|dt|h[1-6]|li|p|td|th|span)",
          "1"
        );
      } else {
        priNode = "<span";
      }
      console.log("* priNode:".padEnd(29, " ") + priNode);
      /* 
    END:   process optional arguments
    BEGIN: process form inputs
    */
      console.log("* argJobMethod:".padEnd(29, " ") + argJobMethod);
      arrayNewTagData = newTagData
        .replace(/\s+/g, " ")
        .replace(/:\s#/g, ":#")
        .replace(/:\s/g, ":")
        .replace(/(;)(\w)/g, "$1 $2")
        .replace(/></g, "> <")
        .replace(/</g, "zZ")
        .replace(/\s/g, ",");
      // console.log("* arrayNewTagData:".padEnd(29, " ") + arrayNewTagData);
      arrayNewTag = arrayNewTagData.split(",");
      arrayNewTag.sort();
      arrayNewTagData = arrayNewTag.join(",");
      newTagData = arrayNewTagData
        .replace(/zZ((em|i|kbd|s|strong|sub|sup|u)>)/g, "<$1")
        .replace(/,/g, " ")
        .replace(/:#/g, ": #")
        .replace(/background:/g, "background-color:");
      console.log("* newTagData:".padEnd(29, " ") + newTagData);
      /* 
    END:   process form inputs
    BEGIN: process openTag argument
    */
      if (!isEmpty(oldTagData) && hasExpMatch(oldTagData, 'id.*?"(.*?)"')) {
        console.log(" ");
        console.log("- ----- ----------- ----- -");
        console.log(" ");
        oldTagId = getExpValue(oldTagData, 'id.*?"(.*?)"', "i", "2");
        oldTagData = oldTagData.replace(/\sid.*?"(.*?)"/i, "");
        console.log("* oldTagId:".padEnd(29, " ") + oldTagId);
      }
      if (argJobMethod !== "replace" && !isEmpty(oldTagData)) {
        arrayOldTagData = getExpValue(
          oldTagData,
          '"(.*?)"|<(em|i|kbd|s|strong|sub|sup|u)>',
          "g"
        );
        oldTagData = "";
        if (!isEmpty(arrayOldTagData)) {
          arrayOldTagData.forEach(function (item, index, array) {
            oldTagData += item + " ";
          });
        }
        oldTagData = oldTagData.replace(/"/g, "");
        oldTagData = oldTagData.trim();
        console.log("* oldTagData:".padEnd(29, " ") + oldTagData);
      } else {
        oldTagData = "";
      }
      /* 
    END:   process openTag argument
    BEGIN: merge attributes
    */
      arrayNewTagData = newTagData.replace(/(:)\s/g, "$1");
      arrayNewTag = arrayNewTagData.split(" ");
      arrayNewTag.forEach(function (item, index, array) {
        //
        console.log(" ");
        console.log("- ----- ----------- ----- -");
        console.log(" ");
        //
        console.log("* row #".padEnd(29, " ") + padNum(index, 2));
        elementType = getElementType(item);
        switch (elementType) {
          case "class":
            tagKey = item.substring(0, item.indexOf(":") + 4);
            break;
          case "style":
            tagKey = item.substring(0, item.indexOf(":") + 1);
            break;
          default:
            tagKey = item;
        }
        console.log("Element Type:".padEnd(29, " ") + elementType);
        console.log("arrayItem:".padEnd(29, " ") + item);
        console.log("tagKey:".padEnd(29, " ") + tagKey);
        //
        console.log(" ");
        console.log("- ----- ----------- ----- -");
        console.log(" ");
        //
        switch (true) {
          case hasIdxMatch(tagKey, "bkg:"):
            console.log("* *** CODE MARKER 1.0 *** *");
            regExp = new RegExp("(bkg:.*?)(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(bkg:.*?)(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            console.log("* *** CODE MARKER 1.1 *** *");
            regExp = new RegExp("background-color:.*?;(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "background-color:.*?;(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case hasIdxMatch(tagKey, "txt:"):
            console.log("* *** CODE MARKER 2.0 *** *");
            regExp = new RegExp("(txt:.*?)(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(txt:.*?)(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            console.log("* *** CODE MARKER 2.1 *** *");
            regExp = new RegExp("(?<!-)color:.*?;(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(?<!-)color:.*?;(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case hasIdxMatch(tagKey, "background-color:"):
            console.log("* *** CODE MARKER 3.0 *** *");
            regExp = new RegExp("background-color:.*?;(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "background-color:.*?;(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            console.log("* *** CODE MARKER 3.1 *** *");
            regExp = new RegExp("(bkg:.*?)(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(bkg:.*?)(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case hasIdxMatch(tagKey, "color:"):
            console.log("* *** CODE MARKER 4.0 *** *");
            regExp = new RegExp("(?<!-)color:.*?;(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(?<!-)color:.*?;(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            console.log("* *** CODE MARKER 4.1 *** *");
            regExp = new RegExp("(txt:.*?)(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, "(txt:.*?)(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case elementType === "class":
            console.log("* *** CODE MARKER 5.0 *** *");
            regExp = new RegExp(tagKey + ".*?(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, tagKey + ".*?(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case elementType === "style":
            console.log("* *** CODE MARKER 6.0 *** *");
            regExp = new RegExp(tagKey + ".*?;(\\s|$)", "g");
            console.log("@ regExp:".padEnd(29, " ") + regExp);
            if (
              !isEmpty(oldTagData) &&
              hasExpMatch(oldTagData, tagKey + ".*?;(\\s|$)")
            ) {
              oldTagData = oldTagData.replace(regExp, "");
              console.log("@ oldTagData:".padEnd(29, " ") + oldTagData);
            }
            break;
          case elementType === "tag":
            // if dup, remove so it can be added
            regExp = new RegExp(tagKey, "g");
            oldTagData = oldTagData.replace(regExp, "");
            console.log("* *** CODE MARKER 7.0 *** *");
            console.log("@ oldTagData:".padEnd(29, " ") + oldTagData.trim());
            break;
          default:
            throw new Error("getTagUpdate processing logic error.");
        }
        // add new item to oldTagData
        oldTagData = oldTagData + " " + item;
        //
        console.log("oldTagData:".padEnd(29, " ") + oldTagData.trim());
        //
      });
      //
      console.log(" ");
      console.log("- ----- ----------- ----- -");
      console.log(" ");
      /* 
    END:   merge attributes
    BEGIN: combine new attributes
    */
      // sort oldTagData, force fmt tags last
      oldTagData = oldTagData.trim();
      var tagArrayData = oldTagData
        .replace(/\s+/g, " ")
        .replace(/:\s#/g, ":#")
        .replace(/:\s/g, ":")
        .replace(/(;)(\w)/g, "$1 $2")
        .replace(/</g, "zZ")
        .replace(/\s/g, ",");
      var arrayNewTag = tagArrayData.split(",");
      arrayNewTag.sort();
      tagArrayData = arrayNewTag.join(",");
      tagArrayData = tagArrayData.replace(
        /zZ((em|i|kbd|s|strong|sub|sup|u)>)/g,
        "<$1"
      );
      console.log("* tagArrayData:".padEnd(29, " ") + tagArrayData);
      arrayNewTag = tagArrayData.split(",");
      console.log("* arrayNewTag Cnt:".padEnd(29, " ") + arrayNewTag.length);
      console.log(" ");
      console.log("* PROCESS: New Tags ***** *");
      arrayNewTag.forEach(function (item, index, array) {
        switch (getElementType(item)) {
          case "class":
            if (hasExpMatch(item, "color:|bkg:|txt:")) {
              newColorClass += item + " ";
            } else {
              newStandardClass += item + " ";
            }
            break;
          case "style":
            if (hasExpMatch(item, "color|bkg|txt")) {
              item = item.replace(/:#/g, ": #");
              newColorStyle += item + " ";
            } else {
              item = item.replace(/:(.*?);/g, ": $1;");
              newStandardStyle += item + " ";
            }
            break;
          default:
            newFmtTag += item;
        }
      });
      newColorClass = newColorClass.trim();
      newStandardClass = newStandardClass.trim();
      newColorStyle = newColorStyle.trim();
      newStandardStyle = newStandardStyle.trim();
      if (!isEmpty(newFmtTag) && hasExpMatch(newFmtTag, "<(strong|em|i)>")) {
        switch (true) {
          case hasIdxMatch(newFmtTag, "<strong>"):
            newFmtTag = newFmtTag.replace(/<(em|i)>/g, "");
            break;
          case hasIdxMatch(newFmtTag, "<em>"):
            newFmtTag = newFmtTag.replace(/<i>/g, "");
            break;
        }
      }
      console.log("* oldTagId:".padEnd(29, " ") + oldTagId);
      console.log("* newColorClass:".padEnd(29, " ") + newColorClass);
      console.log("* newStandardClass:".padEnd(29, " ") + newStandardClass);
      console.log("* newColorStyle:".padEnd(29, " ") + newColorStyle);
      console.log("* newStandardStyle:".padEnd(29, " ") + newStandardStyle);
      console.log("* newFmtTag:".padEnd(29, " ") + newFmtTag);
      //
      console.log(" ");
      console.log("- ----- ----------- ----- -");
      console.log(" ");
      retValue = priNode;
      if (priNode === "<span") {
        if (!isEmpty(oldTagId)) {
          retValue += ' id="' + oldTagId + '"';
        }
        if (!isEmpty(newStandardClass) || !isEmpty(newColorClass)) {
          switch (true) {
            case !isEmpty(newStandardClass) && !isEmpty(newColorClass):
              retValue +=
                ' class="' + newStandardClass + " " + newColorClass + '"';
              break;
            case !isEmpty(newStandardClass):
              retValue += ' class="' + newStandardClass + '"';
              break;
            default:
              retValue += ' class="' + newColorClass + '"';
          }
        }
        if (!isEmpty(newStandardStyle) || !isEmpty(newColorStyle)) {
          switch (true) {
            case !isEmpty(newStandardStyle) && !isEmpty(newColorStyle):
              retValue +=
                ' style="' + newStandardStyle + " " + newColorStyle + '"';
              break;
            case !isEmpty(newStandardStyle):
              retValue += ' style="' + newStandardStyle + '"';
              break;
            default:
              retValue += ' style="' + newColorStyle + '"';
          }
        }
      } else {
        if (!isEmpty(oldTagId)) {
          retValue += ' id="' + oldTagId + '"';
        }
        if (!isEmpty(newStandardClass) || !isEmpty(newStandardStyle)) {
          switch (true) {
            case !isEmpty(newStandardClass) && !isEmpty(newStandardStyle):
              retValue +=
                ' class="' +
                newStandardClass +
                '" style="' +
                newStandardStyle +
                '"';
              break;
            case !isEmpty(newStandardClass):
              retValue += ' class="' + newStandardClass + '"';
              break;
            default:
              retValue += ' style="' + newStandardStyle + '"';
          }
        }
        if (!isEmpty(newColorClass) || !isEmpty(newColorStyle)) {
          retValue += "><span";
          switch (true) {
            case !isEmpty(newColorClass) && !isEmpty(newColorStyle):
              retValue +=
                ' class="' + newColorClass + '" style="' + newColorStyle + '"';
              break;
            case !isEmpty(newColorClass):
              retValue += ' class="' + newColorClass + '"';
              break;
            default:
              retValue += ' style="' + newColorStyle + '"';
          }
        }
      }
      retValue += ">" + newFmtTag;
      // remove orphan spans
      if (hasIdxMatch(retValue, "<span")) {
        retValue = retValue.replace(/<span>/, "");
      }
      console.log("* retValue:".padEnd(29, " ") + retValue);
      console.log(" ");
      console.log("- ----- ----------- ----- -");
      /* 
    END:   combine new attributes
    */
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
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
  function hasIdxMatch(strPrm0, strPrm1) {
    /* 
      21.09.15
      purpose:    check for strPrm1 indexOf match in strPrm0
      parameters: strPrm0 - string to search
                  strPrm1 - string to find
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
        throw new Error("hasIdxMatch function missing required parameter/s.");
      }
      retValue = Boolean(strPrm0.indexOf(strPrm1) !== -1);
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function initOk() {
    /*
    build:      21.09.15
    purpose:    initialize jsParm
    parameters: none
    arguments:  none
    returns:    true/false
  */
    var retValue = false;
    // clear js console
    console.clear();
    // start new log
    console.log("FN  > initOk");
    try {
      var contentNode = editor.selection.getNode();
      var contentNodeName = contentNode.nodeName.toLowerCase();
      var contentNodeHtml = editor.selection.getContent({
        format: "html",
      });
      var parentNode = contentNode;
      var parentNodeName = parentNode.nodeName.toLowerCase();
      var parentNodeHtml;
      var regExp;
      var nodeIsElement = false;
      if (tagCnt(contentNodeHtml) < 2) {
        console.log(" *** * outerHTML:".padEnd(30, " ") + contentNodeHtml);
        // find parent node
        var cnt = 1;
        while (
          !hasExpMatch(
            " dd div dt h1 h2 h3 h4 h5 h6 li p td th ",
            "\\s" + parentNodeName + "\\s"
          )
        ) {
          if (isNull(parentNode.previousSibling)) {
            parentNode = parentNode.parentNode;
          } else {
            parentNode = parentNode.previousSibling;
          }
          parentNodeName = parentNode.nodeName.toLowerCase();
          console.log(" *** * treeNodeName:".padEnd(30, " ") + parentNodeName);
          cnt++;
        }
        console.log(" *** * parentNodeName:".padEnd(30, " ") + parentNodeName);
        parentNodeHtml = clrMceAtr(parentNode.outerHTML);
        console.log(" *** * parentNodeHtml:".padEnd(30, " ") + parentNodeHtml);
        console.log(
          " *** * contentNodeName:".padEnd(30, " ") + contentNodeName
        );
        nodeIsElement = hasExpMatch(
          " em i kbd s strong sub sup u ",
          "\\s" + contentNodeName + "\\s"
        );
        console.log(" *** * nodeIsElement:".padEnd(30, " ") + nodeIsElement);
        if (nodeIsElement) {
          regExp =
            "^<.*?><(em|i|kbd|s|strong|sub|sup|u)>*.*<\\/(em|i|kbd|s|strong|sub|sup|u)><\\/.*?>$";
        } else {
          regExp =
            "^<(p|h[1-6]|div|li|td|th).*?><span.*?>*.*<\\/span><\\/(p|h[1-6]|div|li|td|th)>$";
        }
        if (hasExpMatch(parentNodeHtml, regExp)) {
          jsParm.SetNode(parentNode);
          jsParm.HtmlRawCache = parentNodeHtml;
        } else {
          jsParm.SetNode(contentNode);
        }
        jsParm.ParentNodeHtmlCache = parentNodeHtml;
        console.log("*** * parentNodeHtml:".padEnd(30, " ") + parentNodeHtml);
        jsParm.IsWording();
      }
      console.log("");
      var retValue = true;
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
  function isNull(strPrm) {
    /*
      21.09.09
      purpose:    evaluate strPrm if null
      parameter:  strPrm - string to evaluate
      arguments:  none
      returns:    true/false
    */
    var retValue = false;
    if (strPrm === null) {
      retValue = true;
    }
    return retValue;
  }
  function padNum(strPrm0, strPrm1) {
    /*
    21.09.10
    purpose:    pad leading 0's to number/string
    parameters: strPrm0 - string to pad
                strPrm1 - digits of result
    argument:   pad character
    returns:    string / empty string
  */
    retValue = "";
    try {
      if (
        strPrm0 === undefined ||
        strPrm1 === undefined ||
        strPrm0 === null ||
        strPrm1 === null
      ) {
        throw new Error("padNum function missing required parameter/s.");
      }
      strPrm0 = strPrm0.toString();
      strPrm1 = strPrm1.toString();
      var optChr = "0";
      if (arguments.length === 3) {
        optChr = arguments[2];
      }
      var retValue = strPrm0.toString().padStart(parseInt(strPrm1), optChr);
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function processMultiLine(strPrm0, strPrm1) {
    /*
    21.09.15
    purpose:    process multiline selection
    parameters: strPrm0 - multiline html to process
                strPrm1 - new data inputs
    arguments:  processMethod
    returns:    true/false
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
        throw new Error(
          "processMultiLine function missing required parameter/s."
        );
      }
      console.log("FN  > processMultiLine");
      var processMethod = "blend";
      if (arguments.length === 3) {
        processMethod = arguments[2];
      }
      var arrayData = "";
      var arrayItem = "";
      var prmInputData = strPrm1;
      var prmHtmlContent = strPrm0;
      arrayData = prmHtmlContent.replace(/(\r\n|\n|\r)/g, ",$1,");
      console.log("*** * arrayData:".padEnd(30, " ") + arrayData);
      // remove , between openTag and paired span
      if (hasIdxMatch(arrayData, "span")) {
        arrayData = arrayData
          .replace(/(>)(,)(<span)/g, "$1$3")
          .replace(/(span>)(,)(<)/g, "$1$3");
        console.log(" *#* * arrayData:".padEnd(30, " ") + arrayData);
      }
      var htmlArray = arrayData.split(",");
      var skipTag = false;
      console.log("*** * prmInputData:".padEnd(30, " ") + prmInputData);
      console.log("");
      htmlArray.forEach(function (item, index, array) {
        arrayItem = item.replace(/(\r\n|\n|\r)/g, "");
        console.log(" " + padNum(index, 3));
        console.log("- ----- ----------- ----- -");
        if (isEmpty(arrayItem)) {
          console.log("*** * item: ".padEnd(30, " ") + "CR/LF");
        } else {
          console.log("*** * item: ".padEnd(30, " ") + arrayItem);
        }
        // skip attributes which should not be updated
        switch (true) {
          case isEmpty(arrayItem):
            skipTag = true;
            break;
          case hasExpMatch(
            arrayItem,
            "<(dd|div|dt|h[1-6]|li|p|td|th)(.*?)><span.*?>"
          ):
            skipTag = false;
            break;
          case hasExpMatch(
            arrayItem,
            "<(div|h[1-6]|li|p\\b)(.*?)><\\/(div|h[1-6]|li|p\\b)>"
          ):
            skipTag = true;
            break;
          case hasExpMatch(
            arrayItem,
            "<(blockquote|ol|table|tbody|tfoot|thead|tr|ul)|" +
              "(blockquote|ol|table|tbody|tfoot|thead|tr|ul)>"
          ):
            skipTag = true;
            break;
          default:
            skipTag = false;
        }
        if (skipTag) {
          console.log("* ******* SKIPPED ******* *");
        } else {
          if (processSingleLine(arrayItem, prmInputData, processMethod)) {
            if (jsParm.EditingHtmlDoc()) {
              jsParm.HtmlDoc = jsParm.HtmlDoc.replace(item, jsParm.HtmlUpdate);
            } else {
              array[index] = jsParm.HtmlUpdate;
            }
          }
          console.log("*** * updatedItem:".padEnd(30, " ") + array[index]);
        }
      });
      jsParm.HtmlUpdate = htmlArray.join("");
      console.log("");
      console.log("### * HtmlUpdate:".padEnd(30, " ") + jsParm.HtmlUpdate);
      retValue = true;
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function processSingleLine(strPrm0, strPrm1) {
    /*
    21.09.10
    purpose:    process single/wording line selection
    parameters: strPrm0 - single line html to process
                strPrm1 - new data inputs
    arguments:  processMethod
    returns:    true/false
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
        throw new Error(
          "processSingleLine function missing required parameter/s."
        );
      }
      console.log("FN  > processSingleLine");
      var processMethod = "blend";
      if (arguments.length === 3) {
        processMethod = arguments[2];
      }
      var oldOpenTags = getOpenTags(strPrm0);
      var oldCloseTags = getClosedTags(oldOpenTags);
      var newOpenTags = getOpenTagsUpdate(strPrm1, oldOpenTags, processMethod);
      var newCloseTags = getClosedTags(newOpenTags);
      if (isEmpty(oldOpenTags)) {
        jsParm.HtmlUpdate = newOpenTags + strPrm0.trim() + newCloseTags;
      } else {
        jsParm.HtmlUpdate = strPrm0
          .replace(oldOpenTags, newOpenTags)
          .replace(oldCloseTags, newCloseTags);
      }
      console.log("");
      console.log("*** * htmlUpdate:".padEnd(29, " ") + jsParm.HtmlUpdate);
      retValue = true;
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function submitOk(strPrm) {
    /*
      purpose:    process form inputs against selected html
      parameters: strPrm - input data  
      arguments:  process method
      returns:    true/false
    */
    var retValue = false;
    console.log(" ");
    console.log("FN  > submitOk");
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("Please enter the attributes to change.");
      }
      if (
        !hasExpMatch(strPrm, "<(em|i|kbd|s|strong|sub|sup|u)>") &&
        chrCnt(strPrm, ":") < 1
      ) {
        throw new Error("Attribute/s not formatted correctly.");
      }
      var inputData = strPrm.trim();
      var processMethod = "blend";
      console.log("*** * argumentsLength:".padEnd(30, " ") + arguments.length);
      if (arguments.length === 2) {
        processMethod = arguments[1];
      }
      var htmlContent = jsParm.HtmlContent();
      if (tagCnt(htmlContent) < 2) {
        console.log("*** * HtmlRaw:".padEnd(30, " ") + jsParm.HtmlRaw());
        console.log("*** * inputData:".padEnd(30, " ") + inputData);
        console.log("*** * processMethod:".padEnd(30, " ") + processMethod);
        if (processSingleLine(jsParm.HtmlRaw(), inputData, processMethod)) {
          editor.execCommand("mceReplaceContent", false, jsParm.HtmlUpdate);
          editor.undoManager.add();
        }
        retValue = true;
      } else {
        console.log("### # HtmlContent:".padEnd(30, " ") + htmlContent);
        // check for table edit
        if (hasExpMatch(htmlContent, "^<table.*?>")) {
          jsParm.HtmlDoc = editor.getContent();
        }
        if (processMultiLine(htmlContent, inputData)) {
          console.log(
            "### # editingDoc:".padEnd(30, " ") + jsParm.EditingHtmlDoc()
          );
          switch (true) {
            case jsParm.EditingHtmlDoc():
              editor.setContent(jsParm.HtmlDoc);
              break;
            case hasExpMatch(jsParm.HtmlUpdate, "^(<ol>|<ul>)"):
              jsParm.HtmlUpdate = jsParm.HtmlUpdate.replace(
                /(<ol>|<\/ol>|<ul>|<\/ul>)/g,
                ""
              ).trim();
              editor.execCommand("mceReplaceContent", false, jsParm.HtmlUpdate);
              break;
            default:
              editor.execCommand("mceReplaceContent", false, jsParm.HtmlUpdate);
          }
          editor.undoManager.add();
        }
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  function tagCnt(strPrm) {
    /*
      21.09.11
      purpose:    count tags contained in parameter
      parameters: strPrm - string to evaluate
      arguments:  open / close flag
      returns:    number
    */
    var retValue = -1;
    try {
      if (
        strPrm === undefined ||
        strPrm === null ||
        typeof strPrm !== "string" ||
        strPrm === ""
      ) {
        throw new Error("tagCnt function missing required parameter.");
      }
      var tagOpt = "open";
      if (arguments.length === 2) {
        tagOpt = arguments[1].toLowerCase();
        if (!hasIdxMatch(" open close closed ", tagOpt)) {
          tagOpt = "open";
        }
      }
      if (tagOpt !== "open") {
        retValue = chrCnt(strPrm, "<\\/(dd|div|dt|h[1-6]|li|p|td|th)>");
      } else {
        retValue = chrCnt(strPrm, "<(dd|div|dt|h[1-6]|li|p|td|th)");
      }
    } catch (e) {
      jsError.Value = e;
    }
    return retValue;
  }
  /* 
    END: general functions
    BEGIN: specific functions
  */
  function getNamedColor(strPrm) {
    /*
      purpose:    convert named color to hex
      parameter:  strPrm - named color
      arguments:  none
      returns:    string / empty string
    */
    var retValue = "";
    if (
      strPrm !== undefined &&
      strPrm !== null &&
      typeof strPrm === "string" &&
      strPrm.trim() !== ""
    ) {
      try {
        strPrm = strPrm.toLowerCase();
        var colorList = {
          aliceblue: "#f0f8ff",
          antiquewhite: "#faebd7",
          aqua: "#00ffff",
          aquamarine: "#7fffd4",
          azure: "#f0ffff",
          beige: "#f5f5dc",
          bisque: "#ffe4c4",
          black: "#000000",
          blanchedalmond: "#ffebcd",
          blue: "#0000ff",
          blueviolet: "#8a2be2",
          brown: "#a52a2a",
          burlywood: "#deb887",
          cadetblue: "#5f9ea0",
          chartreuse: "#7fff00",
          chocolate: "#d2691e",
          coral: "#ff7f50",
          cornflowerblue: "#6495ed",
          cornsilk: "#fff8dc",
          crimson: "#dc143c",
          cyan: "#00ffff",
          darkblue: "#00008b",
          darkcyan: "#008b8b",
          darkgoldenrod: "#b8860b",
          darkgray: "#a9a9a9",
          darkgreen: "#006400",
          darkkhaki: "#bdb76b",
          darkmagenta: "#8b008b",
          darkolivegreen: "#556b2f",
          darkorange: "#ff8c00",
          darkorchid: "#9932cc",
          darkred: "#8b0000",
          darksalmon: "#e9967a",
          darkseagreen: "#8fbc8f",
          darkslateblue: "#483d8b",
          darkslategray: "#2f4f4f",
          darkturquoise: "#00ced1",
          darkviolet: "#9400d3",
          deeppink: "#ff1493",
          deepskyblue: "#00bfff",
          dimgray: "#696969",
          dodgerblue: "#1e90ff",
          firebrick: "#b22222",
          floralwhite: "#fffaf0",
          forestgreen: "#228b22",
          fuchsia: "#ff00ff",
          gainsboro: "#dcdcdc",
          ghostwhite: "#f8f8ff",
          gold: "#ffd700",
          goldenrod: "#daa520",
          gray: "#808080",
          green: "#008000",
          greenyellow: "#adff2f",
          honeydew: "#f0fff0",
          hotpink: "#ff69b4",
          indianred: "#cd5c5c",
          indigo: "#4b0082",
          ivory: "#fffff0",
          khaki: "#f0e68c",
          lavender: "#e6e6fa",
          lavenderblush: "#fff0f5",
          lawngreen: "#7cfc00",
          lemonchiffon: "#fffacd",
          lightblue: "#add8e6",
          lightcoral: "#f08080",
          lightcyan: "#e0ffff",
          lightgoldenrodyellow: "#fafad2",
          lightgrey: "#d3d3d3",
          lightgreen: "#90ee90",
          lightpink: "#ffb6c1",
          lightsalmon: "#ffa07a",
          lightseagreen: "#20b2aa",
          lightskyblue: "#87cefa",
          lightslategray: "#778899",
          lightsteelblue: "#b0c4de",
          lightyellow: "#ffffe0",
          lime: "#00ff00",
          limegreen: "#32cd32",
          linen: "#faf0e6",
          magenta: "#ff00ff",
          maroon: "#800000",
          mediumaquamarine: "#66cdaa",
          mediumblue: "#0000cd",
          mediumorchid: "#ba55d3",
          mediumpurple: "#9370d8",
          mediumseagreen: "#3cb371",
          mediumslateblue: "#7b68ee",
          mediumspringgreen: "#00fa9a",
          mediumturquoise: "#48d1cc",
          mediumvioletred: "#c71585",
          midnightblue: "#191970",
          mintcream: "#f5fffa",
          mistyrose: "#ffe4e1",
          moccasin: "#ffe4b5",
          navajowhite: "#ffdead",
          navy: "#000080",
          oldlace: "#fdf5e6",
          olive: "#808000",
          olivedrab: "#6b8e23",
          orange: "#ffa500",
          orangered: "#ff4500",
          orchid: "#da70d6",
          palegoldenrod: "#eee8aa",
          palegreen: "#98fb98",
          paleturquoise: "#afeeee",
          palevioletred: "#d87093",
          papayawhip: "#ffefd5",
          peachpuff: "#ffdab9",
          peru: "#cd853f",
          pink: "#ffc0cb",
          plum: "#dda0dd",
          powderblue: "#b0e0e6",
          purple: "#800080",
          rebeccapurple: "#663399",
          red: "#ff0000",
          rosybrown: "#bc8f8f",
          royalblue: "#4169e1",
          saddlebrown: "#8b4513",
          salmon: "#fa8072",
          sandybrown: "#f4a460",
          seagreen: "#2e8b57",
          seashell: "#fff5ee",
          sienna: "#a0522d",
          silver: "#c0c0c0",
          skyblue: "#87ceeb",
          slateblue: "#6a5acd",
          slategray: "#708090",
          snow: "#fffafa",
          springgreen: "#00ff7f",
          steelblue: "#4682b4",
          tan: "#d2b48c",
          teal: "#008080",
          thistle: "#d8bfd8",
          tomato: "#ff6347",
          turquoise: "#40e0d0",
          violet: "#ee82ee",
          wheat: "#f5deb3",
          white: "#ffffff",
          whitesmoke: "#f5f5f5",
          yellow: "#ffff00",
          yellowgreen: "#9acd32",
        };
        if (typeof colorList[strPrm] !== undefined) {
          retValue = colorList[strPrm];
          if (retValue === undefined) {
            retValue = "";
          }
        }
      } catch (e) {
        jsError.Value = e;
      }
    }
    return retValue;
  }
  function isHex(strPrm) {
    retValue = false;
    if (
      strPrm !== undefined &&
      strPrm !== null &&
      typeof strPrm === "string" &&
      strPrm !== ""
    ) {
      strPrm = strPrm.replace(/#/, "");
      var numVal = parseInt(strPrm, 16);
      retValue = numVal.toString(16) === strPrm;
    }
    return retValue;
  }
  function isNamedColor(strPrm) {
    /*
      purpose:    test for named color
      parameters: strPrm - string to test
      arguments:  none
      returns:    true / false
    */
    var retValue = false;
    if (strPrm !== undefined && strPrm !== null && typeof strPrm === "string") {
      retValue = !isEmpty(getNamedColor(strPrm));
    }
    return retValue;
  }
  /* 
    END: specific functions
    BEGIN: mce toolbar
  */
  editor.addButton("apply_txt_color", {
    title: "Apply Color",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cGF0aCBkPSJNMjUuMzMzMzMzMyw0IEwyMCw0IEMxOC41MjcyNDA3LDQgMTcuMzMzMzMzMyw1LjE5MzkwNzMzIDE3LjMzMzMzMzMsNi42NjY2NjY2NyBMMTcuMzMzMzMzMywyMi42NjY2NjY3IEMxNy4zMzMzMzMzLDI1LjYxMjE4NTMgMTkuNzIxMTQ4LDI4IDIyLjY2NjY2NjcsMjggQzI1LjYxMjE4NTMsMjggMjgsMjUuNjEyMTg1MyAyOCwyMi42NjY2NjY3IEwyOCw2LjY2NjY2NjY3IEMyOCw1LjE5MzkwNzMzIDI2LjgwNjA5MjcsNCAyNS4zMzMzMzMzLDQiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNy4zMzMzMzMzLDkuOCBMMTQuNjY2NjY2Nyw3LjEzMzMzMzMzIEMxMy42MjUzMzM3LDYuMDkyMzE0ODMgMTEuOTM3MzMyOSw2LjA5MjMxNDgzIDEwLjg5Niw3LjEzMzMzMzMzIEw3LjEyNTMzMzMzLDEwLjkwNCBDNi4wODQzMTQ4MywxMS45NDUzMzI5IDYuMDg0MzE0ODMsMTMuNjMzMzMzNyA3LjEyNTMzMzMzLDE0LjY3NDY2NjcgTDE5LjEyNTMzMzMsMjYuNjc0NjY2NyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTkuNzMzMzMzMzMsMTcuMzMzMzMzMyBMNi42NjY2NjY2NywxNy4zMzMzMzMzIEM1LjE5MzkwNzMzLDE3LjMzMzMzMzMgNCwxOC41MjcyNDA3IDQsMjAgTDQsMjUuMzMzMzMzMyBDNCwyNi44MDYwOTI3IDUuMTkzOTA3MzMsMjggNi42NjY2NjY2NywyOCBMMjIuNjY2NjY2NywyOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPGxpbmUgeDE9IjIyLjY2NjY2NjciIHkxPSIyMi42NjY2NjY3IiB4Mj0iMjIuNjY2NjY2NyIgeTI9IjIyLjY4IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    onClick: function () {
      // sys variables
      conStat = "idle";
      onSubmitCnt = 0;
      if (frmNotReady() || jsError.Exists()) {
        console.log("*** * frmNotReady:".padEnd(30, " ") + "true");
        jsError.Display();
      } else {
        editor.windowManager.open({
          title: "Color Tool",
          body: [
            {
              type: "container",
              html: '<table style="border-collapse: collapse; table-layout:fixed; width:400px;"><tbody><tr><td><button id="#282726" style="background-color:#282726; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#504e4b" style="background-color:#504e4b; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#797571" style="background-color:#797571; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#a19c96" style="background-color:#a19c96; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#c9c3bc" style="background-color:#c9c3bc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#d4cfc9" style="background-color:#d4cfc9; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#dfdbd7" style="background-color:#dfdbd7; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#e9e7e4" style="background-color:#e9e7e4; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f4f3f2" style="background-color:#f4f3f2; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#faf9f8" style="background-color:#faf9f8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#980000" style="background-color:#980000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ff0000" style="background-color:#ff0000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ff9900" style="background-color:#ff9900; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ffff00" style="background-color:#ffff00; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#00ff00" style="background-color:#00ff00; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#00ffff" style="background-color:#00ffff; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#4a86e8" style="background-color:#4a86e8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#0000ff" style="background-color:#0000ff; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#9900ff" style="background-color:#9900ff; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ff00ff" style="background-color:#ff00ff; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#e6b8af" style="background-color:#e6b8af; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f4cccc" style="background-color:#f4cccc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#fce5cd" style="background-color:#fce5cd; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#fff2cc" style="background-color:#fff2cc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#d9ead3" style="background-color:#d9ead3; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#d0e0e3" style="background-color:#d0e0e3; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#c9daf8" style="background-color:#c9daf8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#cfe2f3" style="background-color:#cfe2f3; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#d9d2e9" style="background-color:#d9d2e9; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ead1dc" style="background-color:#ead1dc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#dd7e6b" style="background-color:#dd7e6b; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ea9999" style="background-color:#ea9999; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f9cb9c" style="background-color:#f9cb9c; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ffe599" style="background-color:#ffe599; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#b6d7a8" style="background-color:#b6d7a8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#a2c4c9" style="background-color:#a2c4c9; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#a4c2f4" style="background-color:#a4c2f4; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#9fc5e8" style="background-color:#9fc5e8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#b4a7d6" style="background-color:#b4a7d6; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#d5a6bd" style="background-color:#d5a6bd; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#cc4125" style="background-color:#cc4125; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#e06666" style="background-color:#e06666; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f6b26b" style="background-color:#f6b26b; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ffd966" style="background-color:#ffd966; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#93c47d" style="background-color:#93c47d; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#76a5af" style="background-color:#76a5af; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#6d9eeb" style="background-color:#6d9eeb; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#6fa8dc" style="background-color:#6fa8dc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#8e7cc3" style="background-color:#8e7cc3; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#c27ba0" style="background-color:#c27ba0; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#a61c00" style="background-color:#a61c00; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#cc0000" style="background-color:#cc0000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#e69138" style="background-color:#e69138; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f1c232" style="background-color:#f1c232; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#6aa84f" style="background-color:#6aa84f; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#45818e" style="background-color:#45818e; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#3c78d8" style="background-color:#3c78d8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#3d85c6" style="background-color:#3d85c6; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#674ea7" style="background-color:#674ea7; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#a64d79" style="background-color:#a64d79; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#85200c" style="background-color:#85200c; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#990000" style="background-color:#990000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#b45f06" style="background-color:#b45f06; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#bf9000" style="background-color:#bf9000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#38761d" style="background-color:#38761d; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#134f5c" style="background-color:#134f5c; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#1155cc" style="background-color:#1155cc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#0b5394" style="background-color:#0b5394; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#351c75" style="background-color:#351c75; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#741b47" style="background-color:#741b47; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#5b0f00" style="background-color:#5b0f00; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#660000" style="background-color:#660000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#783f04" style="background-color:#783f04; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#7f6000" style="background-color:#7f6000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#274e13" style="background-color:#274e13; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#0c343d" style="background-color:#0c343d; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#1c4587" style="background-color:#1c4587; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#073763" style="background-color:#073763; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#20124d" style="background-color:#20124d; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#4c1130" style="background-color:#4c1130; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr><td><button id="#000000" style="background-color:#000000; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#ffffff" style="background-color:#ffffff; border:solid 1px #c9c3bc; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#006682" style="background-color:#006682; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#007fa3" style="background-color:#007fa3; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#3399b5" style="background-color:#3399b5; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#66b2c8" style="background-color:#66b2c8; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#c03613" style="background-color:#c03613; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f04318" style="background-color:#f04318; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f36946" style="background-color:#f36946; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td><td><button id="#f68e74" style="background-color:#f68e74; border-radius: 50%; cursor:pointer; margin:2px; height:25px; width:25px;" type="button">&nbsp;</button></td></tr><tr style="height:80px;"><td style="vertical-align:middle;" colspan="1"><button id="swatch_id" style="background-color:#ffffff; border: 1px solid #c9c3bc; border-radius: 10%; height:30px; width:30px;" type="button">&nbsp;</button></td><td style="vertical-align:middle;" colspan="5"><input type="text" id="input_id" name="ico_tag" value="" style="font-family:monospace; border: 1px solid #c9c3bc; width:90%;"></td><td style="padding-left: 6px; vertical-align:middle;" colspan="4"><input type="checkbox" id="checkbox_id" name="background_color" value=""><label for="checkbox_id">Background color</label></tr><tr style="height:20px;"><td style="font-size: 75%; vertical-align:middle;" colspan="10"><a href="https://doc.xidipity.com/reference/palette/named-colors/" target="_blank" rel="noopener noreferrer">Named colors</a></td></tr></tbody></table>',
            },
          ],
          onClick: function (ev) {
            if (conStat === "idle") {
              console.clear();
              conStat = "active";
            }
            console.log("*** * onSubmitCnt:".padEnd(30, " ") + onSubmitCnt);
            var evTargetId = ev.target.id;
            var inputData = "";
            if (
              onSubmitCnt === 0 &&
              !isEmpty(evTargetId) &&
              !hasExpMatch(evTargetId, "mce")
            ) {
              console.log(" ");
              console.log("### * onClick * ###");
              console.log(" ");
              try {
                console.log("*** * evTargetId:".padEnd(30, " ") + evTargetId);
                var inputIdElement = document.getElementById("input_id").value;
                if (!isEmpty(inputIdElement)) {
                  inputIdElement = inputIdElement.toLowerCase().trim();
                }
                var swatchIdElement = document.getElementById("swatch_id");
                switch (true) {
                  case hasIdxMatch(evTargetId, "#"):
                    //
                    console.log("*** * Grid clicked");
                    document.getElementById("input_id").value = evTargetId;
                    swatchIdElement.style.backgroundColor = evTargetId;
                    inputData = evTargetId;
                    break;
                  case evTargetId === "swatch_id":
                    //
                    console.log("*** * Swatch clicked");
                    inputIdElement = inputIdElement.toLowerCase();
                    switch (true) {
                      case isHex(inputIdElement):
                        swatchIdElement.style.backgroundColor = inputIdElement;
                        inputData = inputIdElement;
                        break;
                      case isNamedColor(inputIdElement):
                        var namedColorHex = getNamedColor(inputIdElement);
                        swatchIdElement.style.backgroundColor = namedColorHex;
                        inputData = namedColorHex;
                        break;
                      default:
                        editor.windowManager.alert("ALERT: Invalid color.");
                    }
                    console.log("*** * inputData:".padEnd(30, " ") + inputData);
                    break;
                  case evTargetId === "checkbox_id":
                    //
                    console.log("*** * Checkbox clicked");
                    break;
                  case evTargetId === "input_id":
                    //
                    console.log("*** * Input clicked");
                    break;
                  default:
                    console.log("*** * Other Event");
                }
              } catch (e) {
                jsError.Value = e;
                jsError.Display();
              }
            }
          },
          onSubmit: function () {
            if (conStat === "idle") {
              console.clear();
              conStat = "active";
            }
            if (onSubmitCnt === 0) {
              console.log(" ");
              console.log("### * onSubmit * ###");
              console.log(" ");
              var checkBoxId = document.getElementById("checkbox_id");
              var inputIdElement = document.getElementById("input_id").value;
              if (!isEmpty(inputIdElement)) {
                inputIdElement = inputIdElement.toLowerCase().trim();
              }
              var prmInputData = "";
              try {
                if (!isEmpty(inputIdElement)) {
                  switch (true) {
                    case isHex(inputIdElement):
                      inputData = inputIdElement;
                      break;
                    case isNamedColor(inputIdElement):
                      inputData = getNamedColor(inputIdElement);
                      break;
                    default:
                      throw new Error("Invalid color.");
                  }
                  prmInputData = inputData;
                  console.log(
                    "*** * jsParmInputData:".padEnd(30, " ") + prmInputData
                  );
                }
                if (isEmpty(prmInputData)) {
                  // jsError.Header = "ALERT";
                  throw new Error("Missing valid color selection/input.");
                } else {
                  if (initOk()) {
                    if (checkBoxId.checked) {
                      inputData = "background-color: " + prmInputData + ";";
                    } else {
                      inputData = "color: " + prmInputData + ";";
                    }
                    if (!submitOk(inputData)) {
                      jsError.Display();
                    }
                  } else {
                    jsError.Display();
                  }
                }
              } catch (e) {
                jsError.Value = e;
                jsError.Display();
              }
              // advance onSubmit click count
              onSubmitCnt++;
              editor.focus();
            }
          },
        });
        document.getElementById("input_id").focus();
      }
    },
  });
});
/* 
  END: mce toolbar
  EOF: apply-text-color / plugin.js / 21.09.16
*/
