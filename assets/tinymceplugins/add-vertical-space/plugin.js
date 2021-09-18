/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-vertical-space plugin
  purpose:  apply vertical space
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_vert_space", function (editor) {
  ("use strict");
  /* 
    END: general functions
    BEGIN: mce toolbar
  */
  editor.addButton("add_vert_space", {
    type: "splitbutton",
    title: "Vertical Space",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cGF0aCBkPSJNMTYsNCBMMTYsMTIgTDIwLDggTTEyLDggTDE2LDEyIiBpZD0iU2hhcGUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LDI4IEwxNiwyMCBMMjAsMjQgTTEyLDI0IEwxNiwyMCIgaWQ9IlNoYXBlIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxsaW5lIHgxPSI1LjMzMzMzMzMzIiB5MT0iMTYiIHgyPSI2LjY2NjY2NjY3IiB5Mj0iMTYiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMTMuMzMzMzMzMyIgeTI9IjE2IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTguNjY2NjY2NyIgeTE9IjE2IiB4Mj0iMjAiIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjI1LjMzMzMzMzMiIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
    menu: [
      {
        text: "\xBD Line",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:1/2">&nbsp;</div>');
        },
      },
      {
        text: "\xBE Line",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:3/4">&nbsp;</div>');
        },
      },
      {
        text: "1 Line",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:1">&nbsp;</div>');
        },
      },
      {
        text: "1\xBD Lines",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:1-1/2">&nbsp;</div>');
        },
      },
      {
        text: "2 Lines",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:2">&nbsp;</div>');
        },
      },
      {
        text: "2\xBD Lines",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:2-1/2">&nbsp;</div>');
        },
      },
      {
        text: "3 Lines",
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="vs:3">&nbsp;</div>');
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-vertical-space / plugin.js / 21.09.17
*/
