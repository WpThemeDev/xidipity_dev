/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-list-ordered plugin
  purpose:  insert unordered list
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_lst_unorder", function (editor) {
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
  editor.addButton("add_lst_unorder", {
    type: "splitbutton",
    title: "Unordered lists",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iMTIiIHkxPSI4IiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjgiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjE2IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTIiIHkxPSIyNCIgeDI9IjI2LjY2NjY2NjciIHkyPSIyNCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjYuNjY2NjY2NjciIHkxPSI4IiB4Mj0iNi42NjY2NjY2NyIgeTI9IjguMDEzMzMzMzMiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI2LjY2NjY2NjY3IiB5MT0iMTYiIHgyPSI2LjY2NjY2NjY3IiB5Mj0iMTYuMDEzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjYuNjY2NjY2NjciIHkxPSIyNCIgeDI9IjYuNjY2NjY2NjciIHkyPSIyNC4wMTMzMzMzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    onclick: function () {
      var html = '<ul><li id="';
      html += randomID;
      html += '"></li></ul>';
      editor.execCommand("mceInsertContent", false, html);
      var newListItem = editor.dom.select("li#" + randomID)[0];
      editor.selection.setCursorLocation(newListItem);
    },
    menu: [
      {
        icon: false,
        text: "Standard",
        onclick: function () {
          var html = '<ul><li id="';
          html += randomID;
          html += '"></li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Circle",
        onclick: function () {
          var html = '<ul class="circle"><li id="';
          html += randomID;
          html += '"></li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Dash",
        onclick: function () {
          var html = '<ul class="dash"><li id="';
          html += randomID;
          html += '"></li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Square",
        onclick: function () {
          var html = '<ul class="square"><li id="';
          html += randomID;
          html += '"></li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Mixed",
        onclick: function () {
          var html = '<ul class="mixed"><li id="';
          html += randomID;
          html += '"></li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Unmarked",
        onclick: function () {
          var html = '<ul class="no-bullets"><li id="';
          html += randomID;
          html += '">&nbsp;</li></ul>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem, 0);
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-list-unordered / plugin.js / 21.09.17
*/
