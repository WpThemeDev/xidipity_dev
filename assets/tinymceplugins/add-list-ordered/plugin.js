/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-list-ordered plugin
  purpose:  insert ordered list
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_lst_order", function (editor) {
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
  editor.addButton("add_lst_order", {
    type: "splitbutton",
    title: "Ordered lists",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8bGluZSB4MT0iMTQuNjY2NjY2NyIgeTE9IjgiIHgyPSIyNi42NjY2NjY3IiB5Mj0iOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE0LjY2NjY2NjciIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE2IiB5MT0iMjQiIHgyPSIyNi42NjY2NjY3IiB5Mj0iMjQiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjMzMzMzMzMzLDIxLjMzMzMzMzMgQzUuMzMzMzMzMzMsMTkuODYwNTc0IDYuNTI3MjQwNjcsMTguNjY2NjY2NyA4LDE4LjY2NjY2NjcgQzkuNDcyNzU5MzMsMTguNjY2NjY2NyAxMC42NjY2NjY3LDE5Ljg2MDU3NCAxMC42NjY2NjY3LDIxLjMzMzMzMzMgQzEwLjY2NjY2NjcsMjIuMTIxMzMzMyAxMCwyMi42NjY2NjY3IDkuMzMzMzMzMzMsMjMuMzMzMzMzMyBMNS4zMzMzMzMzMywyNi42NjY2NjY3IEwxMC42NjY2NjY3LDI2LjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSI4IDEzLjMzMzMzMzMgOCA1LjMzMzMzMzMzIDUuMzMzMzMzMzMgOCI+PC9wb2x5bGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
    onclick: function () {
      var html = '<ol><li id="';
      html += randomID;
      html += '"></li></ol>';
      editor.execCommand("mceInsertContent", false, html);
      var newListItem = editor.dom.select("li#" + randomID)[0];
      editor.selection.setCursorLocation(newListItem);
    },
    menu: [
      {
        icon: false,
        text: "Standard",
        onclick: function () {
          var html = '<ol><li id="';
          html += randomID;
          html += '"></li></ol>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Decimal",
        onclick: function () {
          var html = '<ol class="decimal"><li id="';
          html += randomID;
          html += '"></li></ol>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Alpha",
        onclick: function () {
          var html = '<ol class="alpha"><li id="';
          html += randomID;
          html += '"></li></ol>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Roman",
        onclick: function () {
          var html = '<ol class="roman"><li id="';
          html += randomID;
          html += '"></li></ol>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
      {
        icon: false,
        text: "Outline",
        onclick: function () {
          var html = '<ol class="outline"><li id="';
          html += randomID;
          html += '"></li></ol>';
          editor.execCommand("mceInsertContent", false, html);
          var newListItem = editor.dom.select("li#" + randomID)[0];
          editor.selection.setCursorLocation(newListItem);
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-list-ordered / plugin.js / 21.09.17
*/
