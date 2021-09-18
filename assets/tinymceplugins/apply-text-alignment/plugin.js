/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce apply-text-alignment plugin
  purpose:  apply text alignment
  source:   github.com/WpThemeDev/xidipity/
  (C)	https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("apply_txt_align", function (editor) {
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
    BEGIN: mce toolbar
  */
  editor.addButton("apply_txt_align", {
    type: "splitbutton",
    title: "Align Text",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEwLjY2NjY2NjciIHkxPSIxNiIgeDI9IjIxLjMzMzMzMzMiIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjgiIHkxPSIyNCIgeDI9IjI0IiB5Mj0iMjQiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
    onclick: function () {
      if (frmNotReady() || jsError.Exists()) {
        jsError.Display();
      } else {
        console.clear();
        if (initOk()) {
          if (!submitOk("aln:txt-ct")) {
            jsError.Display();
          }
        } else {
          jsError.Display();
        }
        jsError.Reset();
        jsParm.Reset();
        editor.focus();
      }
    },
    menu: [
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIxNiIgeDI9IjE4LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIyNCIgeDI9IjI0IiB5Mj0iMjQiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
        text: "\xa0Align left",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-lt")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEwLjY2NjY2NjciIHkxPSIxNiIgeDI9IjIxLjMzMzMzMzMiIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjgiIHkxPSIyNCIgeDI9IjI0IiB5Mj0iMjQiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
        text: "\xa0Align Center",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-ct")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEzLjMzMzMzMzMiIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjgiIHkxPSIyNCIgeDI9IjI2LjY2NjY2NjciIHkyPSIyNCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
        text: "\xa0Align Right",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-rt")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIyNCIgeDI9IjIxLjMzMzMzMzMiIHkyPSIyNCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
        text: "\xa0Justify",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-jt")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iMjYuNjY2NjY2NyIgeTE9IjgiIHgyPSIxMiIgeTI9IjgiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyNi42NjY2NjY3IiB5MT0iMTYiIHgyPSIxNy4zMzMzMzMzIiB5Mj0iMTYiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyNi42NjY2NjY3IiB5MT0iMjQiIHgyPSIxMiIgeTI9IjI0IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iNS4zMzMzMzMzMyAxMC42NjY2NjY3IDEwLjY2NjY2NjcgMTYgNS4zMzMzMzMzMyAyMS4zMzMzMzMzIj48L3BvbHlsaW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
        text: "\xa0Indent",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-bi")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNi42NjY2NjY2NyIgeTE9IjI1LjMzMzMzMzMiIHgyPSIyNS4zMzMzMzMzIiB5Mj0iMjUuMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBwb2ludHM9IjIyLjY2NjY2NjcgMjggMjUuMzMzMzMzMyAyNS4zMzMzMzMzIDIyLjY2NjY2NjcgMjIuNjY2NjY2NyI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBhdGggZD0iTTIxLjMzMzMzMzMsNS4zMzMzMzMzMyBMMTIuNjY2NjY2Nyw1LjMzMzMzMzMzIEMxMC4wODkzMzc4LDUuMzMzMzMzMzMgOCw3LjQyMjY3MTE3IDgsMTAgQzgsMTIuNTc3MzI4OCAxMC4wODkzMzc4LDE0LjY2NjY2NjcgMTIuNjY2NjY2NywxNC42NjY2NjY3IEwxMy4zMzMzMzMzLDE0LjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxOC42NjY2NjY3IiB5MT0iMjAiIHgyPSIxOC42NjY2NjY3IiB5Mj0iNS4zMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEzLjMzMzMzMzMiIHkxPSIyMCIgeDI9IjEzLjMzMzMzMzMiIHkyPSI1LjMzMzMzMzMzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
        text: "\xa0Hanging Indent",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-hi")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuMzMzMzMzMyw1LjMzMzMzMzMzIEwxMi42NjY2NjY3LDUuMzMzMzMzMzMgQzEwLjA4OTMzNzgsNS4zMzMzMzMzMyA4LDcuNDIyNjcxMTcgOCwxMCBDOCwxMi41NzczMjg4IDEwLjA4OTMzNzgsMTQuNjY2NjY2NyAxMi42NjY2NjY3LDE0LjY2NjY2NjcgTDEzLjMzMzMzMzMsMTQuNjY2NjY2NyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPGxpbmUgeDE9IjE4LjY2NjY2NjciIHkxPSIyMCIgeDI9IjE4LjY2NjY2NjciIHkyPSI1LjMzMzMzMzMzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTMuMzMzMzMzMyIgeTE9IjIwIiB4Mj0iMTMuMzMzMzMzMyIgeTI9IjUuMzMzMzMzMzMiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI2LjY2NjY2NjY3IiB5MT0iMjUuMzMzMzMzMyIgeDI9IjI1LjMzMzMzMzMiIHkyPSIyNS4zMzMzMzMzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iOS4zMzMzMzMzMyAyOCA2LjY2NjY2NjY3IDI1LjMzMzMzMzMgOS4zMzMzMzMzMyAyMi42NjY2NjY3Ij48L3BvbHlsaW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
        text: "\xa0Paragraph Indent",
        onclick: function () {
          if (frmNotReady() || jsError.Exists()) {
            jsError.Display();
          } else {
            console.clear();
            if (initOk()) {
              if (!submitOk("aln:txt-pi")) {
                jsError.Display();
              }
            } else {
              jsError.Display();
            }
            jsError.Reset();
            jsParm.Reset();
            editor.focus();
          }
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: apply-text-alignment / plugin.js / 21.09.17
*/
