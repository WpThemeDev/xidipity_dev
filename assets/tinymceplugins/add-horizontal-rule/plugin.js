/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-horizontal-rule plugin
  purpose:  insert horizontal rule
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_horz_rule", function (editor) {
  ("use strict");
  /* 
    BEGIN: mce toolbar
  */
  editor.addButton("add_horz_rule", {
    type: "splitbutton",
    title: "Horizontal Rule",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cGF0aCBkPSJNMjYuNjY2NjY2Nyw4IEwyNi42NjY2NjY3LDEzLjMzMzMzMzMgQzI2LjY2NjY2NjcsMTQuMDY5NzEzIDI2LjA2OTcxMywxNC42NjY2NjY3IDI1LjMzMzMzMzMsMTQuNjY2NjY2NyBMNi42NjY2NjY2NywxNC42NjY2NjY3IEM1LjkzMDI4NywxNC42NjY2NjY3IDUuMzMzMzMzMzMsMTQuMDY5NzEzIDUuMzMzMzMzMzMsMTMuMzMzMzMzMyBMNS4zMzMzMzMzMyw4IEM1LjMzMzMzMzMzLDcuMjYzNjIwMzMgNS45MzAyODcsNi42NjY2NjY2NyA2LjY2NjY2NjY3LDYuNjY2NjY2NjcgTDI1LjMzMzMzMzMsNi42NjY2NjY2NyBDMjYuMDY5NzEzLDYuNjY2NjY2NjcgMjYuNjY2NjY2Nyw3LjI2MzYyMDMzIDI2LjY2NjY2NjcsOCBaIiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8bGluZSB4MT0iMTYiIHkxPSIyMCIgeDI9IjE2IiB5Mj0iMjUuMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE4LjY2NjY2NjciIHkxPSIyMi42NjY2NjY3IiB4Mj0iMTMuMzMzMzMzMyIgeTI9IjIyLjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
    menu: [
      {
        text: "Single Narrow",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="aln:ct rul:1x wd:70%" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Single Wide",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="rul:1x" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Double Narrow",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="aln:ct rul:dbl wd:70%" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Double Wide",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="rul:dbl" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Gradient Narrow",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="aln:ct rul:grd wd:70%" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Gradient Wide",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html += '<hr class="rul:grd" />';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Emblem Narrow",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html +=
            '<div class="fx:r fxa:3 fxc:3 fb:100%"><div class="fx:r fxa:2 fxc:3 fb:25% sm)fb:30%"><hr class="wd:100%" /></div><div class="fx:r fxa:3 fxc:3 mar:hrz+1.5 txt:bas-500 fnt:wgt-700 wd:3">/<span style="width:1px;"></span>/</div><div class="fx:r fxa:1 fxc:3 fb:25% sm)fb:30%"><hr class="wd:100%" /></div></div>';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
      {
        text: "Emblem Wide",
        icon: false,
        onclick: function () {
          var html = "<!--  TMPL:HR -->";
          html +=
            '<div class="fx:r fxa:3 fxc:3 fb:100%"><div class="fx:r fxa:2 fxc:3 fb:50%"><hr class="wd:100%" /></div><div class="fx:r fxa:3 fxc:3 mar:hrz+1.5 txt:bas-500 fnt:wgt-700 wd:3">/<span style="width:1px;"></span>/</div><div class="fx:r fxa:1 fxc:3 fb:50%"><hr class="wd:100%" /></div></div>';
          html += "<!-- /TMPL:HR -->";
          editor.insertContent(html);
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-horizontal-rule / plugin.js / 21.09.17
*/
