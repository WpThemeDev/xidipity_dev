/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-template plugin
  purpose:  insert html snippet
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_template", function (editor) {
  ("use strict");
  /* 
    BEGIN: mce toolbar
  */
  editor.addButton("add_template", {
    title: "Add Template",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSI1LjMzMzMzMzMzIiB5PSI1LjMzMzMzMzMzIiB3aWR0aD0iMjEuMzMzMzMzMyIgaGVpZ2h0PSI1LjMzMzMzMzMzIiByeD0iMS4zMzMzMzMzMyI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSI1LjMzMzMzMzMzIiB5PSIxNiIgd2lkdGg9IjgiIGhlaWdodD0iMTAuNjY2NjY2NyIgcng9IjEuMzMzMzMzMzMiPjwvcmVjdD4KICAgICAgICAgICAgPGxpbmUgeDE9IjE4LjY2NjY2NjciIHkxPSIxNiIgeDI9IjI2LjY2NjY2NjciIHkyPSIxNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE4LjY2NjY2NjciIHkxPSIyMS4zMzMzMzMzIiB4Mj0iMjYuNjY2NjY2NyIgeTI9IjIxLjMzMzMzMzMiIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxOC42NjY2NjY3IiB5MT0iMjYuNjY2NjY2NyIgeDI9IjI2LjY2NjY2NjciIHkyPSIyNi42NjY2NjY3IiBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    onclick: function () {
      editor.windowManager.open({
        title: "Add Template",
        body: [
          {
            type: "container",
            html: '<form method="post" style="font-family:sans-serif;font-size:16px;"> <label for="tmpl">Code:</label><br /><textarea type="text" id="tmpl_id" name="txt_tag" value="" rows="10" cols="60" style="font-family:monospace; border: 1px solid #e9e7e4; margin-bottom:10px; white-space:pre-wrap;"></textarea><br /><input type="checkbox" id="blk_id" name="code_block" value=""><label for="code_block" style="font-size:smaller;margin-left:6px;">Add as code block</label></form>',
          },
        ],
        onSubmit: function () {
          console.clear();
          var tmpl_tag = document.getElementById("tmpl_id").value;
          var tmpl_content = "";
          if (tmpl_tag.length > 0) {
            if (document.getElementById("blk_id").checked) {
              var lines = tmpl_tag.split("\n");
              tmpl_content = '<pre class="dsp:line-nums">';
              var i;
              for (i = 0; i < lines.length; i++) {
                tmpl_content += "<var>";
                tmpl_content += encodeURI(lines[i]).replace(
                  /%(\w\w)/g,
                  "&#x$1;"
                );
                tmpl_content += "</var>\n";
              }
              tmpl_content += "</pre>";
            } else {
              tmpl_content = tmpl_tag.replace("`ts*`t", "`t");
            }
            editor.execCommand("mceInsertRawHTML", false, tmpl_content);
          }
        },
      });
      document.getElementById("tmpl_id").focus();
    },
  });
});
/* 
  END: mce toolbar
  EOF: add-template / plugin.js / 21.09.17
*/
