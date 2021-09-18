/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-multiple-columns plugin
  purpose:  add multiple columns container
  source:   github.com/WpThemeDev/xidipity/
  (C)	https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_multi_cols", function (editor) {
  ("use strict");
  /*
    BEGIN: functions
  */
  var randomID = getRandomID();
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
  editor.addButton("add_multi_cols", {
    type: "splitbutton",
    title: "Multi Column",
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjgiIHgyPSIxMi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjUuMzMzMzMzMzMiIHkxPSIxMy4zMzMzMzMzIiB4Mj0iMTIuNjY2NjY2NyIgeTI9IjEzLjMzMzMzMzMiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI1LjMzMzMzMzMzIiB5MT0iMTguNjY2NjY2NyIgeDI9IjEyLjY2NjY2NjciIHkyPSIxOC42NjY2NjY3IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjI0IiB4Mj0iMTIuNjY2NjY2NyIgeTI9IjI0IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTkuMzMzMzMzMyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE5LjMzMzMzMzMiIHkxPSIxMy4zMzMzMzMzIiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjEzLjMzMzMzMzMiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxOS4zMzMzMzMzIiB5MT0iMTguNjY2NjY2NyIgeDI9IjI2LjY2NjY2NjciIHkyPSIxOC42NjY2NjY3IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTkuMzMzMzMzMyIgeTE9IjI0IiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjI0IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    menu: [
      {
        icon: false,
        text: "•\xa0Auto 2 Column",
        onclick: function () {
          var html = "<!--  TMPL:AUTO/COL -->";
          html += '<table class="cols:auto-2"><tr><td id="';
          html += randomID;
          html += '"></td></tr></table>';
          html += "<!-- /TMPL:AUTO/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: false,
        text: "•\xa0Auto 3 Column",
        onclick: function () {
          var html = "<!--  TMPL:AUTO/COL -->";
          html += '<table class="cols:auto-3"><tr><td id="';
          html += randomID;
          html += '"></td></tr></table>';
          html += "<!-- /TMPL:AUTO/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: false,
        text: "•\xa0Auto 4 Column",
        onclick: function () {
          var html = "<!--  TMPL:AUTO/COL -->";
          html += '<table class="cols:auto-4"><tr><td id="';
          html += randomID;
          html += '"></td></tr></table>';
          html += "<!-- /TMPL:AUTO/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: false,
        text: "•\xa0Fixed 2 Column",
        onclick: function () {
          var html = "<!--  TMPL:FIXED/COL -->";
          html += '<table class="cols:fixed-2"><tr><td id="';
          html += randomID;
          html += '">&nbsp;</td><td>&nbsp;</td></tr></table>';
          html += "<!-- /TMPL:FIXED/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: false,
        text: "•\xa0Fixed 3 Column",
        onclick: function () {
          var html = "<!--  TMPL:FIXED/COL -->";
          html += '<table class="cols:fixed-3"><tr><td id="';
          html += randomID;
          html += '">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table>';
          html += "<!-- /TMPL:FIXED/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: false,
        text: "•\xa0Fixed 4 Column",
        onclick: function () {
          var html = "<!--  TMPL:FIXED/COL -->";
          html += '<table class="cols:fixed-4"><tr><td id="';
          html += randomID;
          html +=
            '">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table>';
          html += "<!-- /TMPL:FIXED/COL -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-multiple-columns / plugin.js / 21.09.17
*/
