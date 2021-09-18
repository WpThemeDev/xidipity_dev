/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-misc-opts plugin
  purpose:  insert miscellaneous options
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
tinymce.PluginManager.add("add_misc_opts", function (editor) {
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
  editor.addButton("add_misc_opts", {
    type: "splitbutton",
    title: "Misc Tools",
    icon: false,
    image:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cGF0aCBkPSJNNCwyOCBMOS4zMzMzMzMzMywyOCBMMjYuNjY2NjY2NywxMC42NjY2NjY3IEMyOC4xMzk0MjYsOS4xOTM5MDczMyAyOC4xMzk0MjYsNi44MDYwOTI2NyAyNi42NjY2NjY3LDUuMzMzMzMzMzMgQzI1LjE5MzkwNzMsMy44NjA1NzQgMjIuODA2MDkyNywzLjg2MDU3NCAyMS4zMzMzMzMzLDUuMzMzMzMzMzMgTDQsMjIuNjY2NjY2NyBMNCwyOCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPGxpbmUgeDE9IjE5LjMzMzMzMzMiIHkxPSI3LjMzMzMzMzMzIiB4Mj0iMjQuNjY2NjY2NyIgeTI9IjEyLjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSIxNiAxMC42NjY2NjY3IDkuMzMzMzMzMzMgNCA0IDkuMzMzMzMzMzMgMTAuNjY2NjY2NyAxNiI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjkuMzMzMzMzMzMiIHkxPSIxMC42NjY2NjY3IiB4Mj0iNy4zMzMzMzMzMyIgeTI9IjEyLjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSIyMS4zMzMzMzMzIDE2IDI4IDIyLjY2NjY2NjcgMjIuNjY2NjY2NyAyOCAxNiAyMS4zMzMzMzMzIj48L3BvbHlsaW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMjEuMzMzMzMzMyIgeTE9IjIyLjY2NjY2NjciIHgyPSIxOS4zMzMzMzMzIiB5Mj0iMjQuNjY2NjY2NyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
    menu: [
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTYgMTdoM2wyLTRWN0g1djZoM3ptOCAwaDNsMi00VjdoLTZ2NmgzeiIvPjwvc3ZnPg==",
        text: "\xa0Block Quote",
        onclick: function () {
          var seltxt = editor.selection.getContent({
            format: "text",
          });
          if (seltxt.length > 0) {
            editor.execCommand(
              "mceReplaceContent",
              false,
              "<blockquote><p>{$selection}</p></blockquote>"
            );
          } else {
            var html = "<!--  TMPL:BLOCKQUOTE -->";
            html += '<blockquote><p id="';
            html += randomID;
            html += '"></p></blockquote>';
            html += "<!-- /TMPL:BLOCKQUOTE -->";
            editor.execCommand("mceInsertContent", false, html);
            var newTag = editor.dom.select("p#" + randomID)[0];
            editor.selection.setCursorLocation(newTag);
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIwLjVDMTIgMjEuMzI4NCAxMS4zMjg0IDIyIDEwLjUgMjJDOS42NzE1NyAyMiA5IDIxLjMyODQgOSAyMC41QzkgMTkuNjcxNiA5LjY3MTU3IDE5IDEwLjUgMTlDMTEuMzI4NCAxOSAxMiAxOS42NzE2IDEyIDIwLjVaIiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik0xNyAyMC41QzE3IDIxLjMyODQgMTYuMzI4NCAyMiAxNS41IDIyQzE0LjY3MTYgMjIgMTQgMjEuMzI4NCAxNCAyMC41QzE0IDE5LjY3MTYgMTQuNjcxNiAxOSAxNS41IDE5QzE2LjMyODQgMTkgMTcgMTkuNjcxNiAxNyAyMC41WiIgZmlsbD0iIzIxMjEyMSIvPgo8cGF0aCBkPSJNMjIgMjAuNUMyMiAyMS4zMjg0IDIxLjMyODQgMjIgMjAuNSAyMkMxOS42NzE2IDIyIDE5IDIxLjMyODQgMTkgMjAuNUMxOSAxOS42NzE2IDE5LjY3MTYgMTkgMjAuNSAxOUMyMS4zMjg0IDE5IDIyIDE5LjY3MTYgMjIgMjAuNVoiIGZpbGw9IiMyMTIxMjEiLz4KPHBhdGggZD0iTTE0LjkwNzEgMTguMDcwN0wxMy43NDA5IDE1LjIyNUg1Ljg4NDkxTDQuMDg1NzQgMTkuNjc0M0M0LjAwOTE0IDE5Ljg2NTYgMy44OTk4OCAyMC4wMjQ5IDMuNzUwMzQgMjAuMTM1N0MzLjU5ODk2IDIwLjI0NzggMy40MjAzOCAyMC4zIDMuMjI1MDUgMjAuM0MyLjk2MDg5IDIwLjMgMi43MjYwMyAyMC4yMzM4IDIuNTU4NjMgMjAuMDY2NEMyLjQwMTY4IDE5LjkwOTUgMi4zMjA0NSAxOS43MDMxIDIuMzAwNzQgMTkuNDY2NkwyLjMwMDA1IDE5LjQ1ODNWMTkuMzc1QzIuMzAwMDUgMTkuMjY5MiAyLjMwODIyIDE5LjE2OCAyLjMzNTMxIDE5LjA4NjdMMi4zMzk1MSAxOS4wNzQyTDguOTM5MzUgMi45MjU3MUM5LjAxODA2IDIuNzI5MjggOS4xMzcwMyAyLjU2ODMgOS4zMDE2MSAyLjQ1ODU4QzkuNDY2MDggMi4zNDg5MyA5LjY2MTAxIDIuMjk5OTkgOS44NzUwNSAyLjI5OTk5QzEwLjA3OTkgMi4yOTk5OSAxMC4yNjQ4IDIuMzYxMiAxMC40MTg2IDIuNDg4MzVDMTAuNTgxIDIuNTkzMjQgMTAuNzAyNyAyLjczODYxIDEwLjc4MjggMi45MTg3NkwxMC43ODUyIDIuOTI0MjRMMTcuMjM5NiAxOC43MDQ1QzE2Ljc4OTYgMTguMjY4NCAxNi4xNzYxIDE4IDE1LjUgMThDMTUuMjk1NyAxOCAxNS4wOTcyIDE4LjAyNDUgMTQuOTA3MSAxOC4wNzA3Wk02LjYyMTQyIDEzLjM1SDEyLjk3NzFMOS43NzYzOCA1LjUzMTE3TDYuNjIxNDIgMTMuMzVaIiBmaWxsPSIjMjEyMTIxIi8+Cjwvc3ZnPgo=",
        text: "\xa0Citation",
        onclick: function () {
          editor.execCommand(
            "mceReplaceContent",
            false,
            "<cite>{$selection}</cite>"
          );
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGJhc2VQcm9maWxlPSJ0aW55IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkuOTMgMTMuNWg0LjE0TDEyIDcuOTh6TTIwIDJINGMtMS4xIDAtMiAuOS0yIDJ2MTZjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY0YzAtMS4xLS45LTItMi0yem0tNC4wNSAxNi41bC0xLjE0LTNIOS4xN2wtMS4xMiAzSDUuOTZsNS4xMS0xM2gxLjg2bDUuMTEgMTNoLTIuMDl6Ii8+PC9zdmc+",
        text: "\xa0Frame Text",
        onclick: function () {
          var seltxt = editor.selection.getContent({
            format: "text",
          });
          if (seltxt.length > 0) {
            editor.execCommand(
              "mceReplaceContent",
              false,
              '<table class="frame"><tr><td>{$selection}</td></tr></table>'
            );
          } else {
            var html = "<!--  TMPL:FRAME -->";
            html += '<table class="frame"><tr><td id="';
            html += randomID;
            html += '"></td></tr></table>';
            html += "<!-- /TMPL:FRAME -->";
            editor.execCommand("mceInsertContent", false, html);
            var newTag = editor.dom.select("td#" + randomID)[0];
            editor.selection.setCursorLocation(newTag);
          }
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5LjEgKDg2MTQ0KSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5pY19mbHVlbnRfbmV3c18yNF9yZWd1bGFyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IvCflI0tUHJvZHVjdC1JY29ucyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImljX2ZsdWVudF9uZXdzXzI0X3JlZ3VsYXIiIGZpbGw9IiMyMTIxMjEiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC43NSwyMCBMNS4yNSwyMCBDMy41MTY5Njg1NCwyMCAyLjEwMDc1NDA3LDE4LjY0MzU0NTIgMi4wMDUxNDQ3OSwxNi45MzQ0MjM5IEwyLDE2Ljc1IEwyLDYuMjUgQzIsNS4wNTkxMzYwMSAyLjkyNTE2MTU5LDQuMDg0MzU1MDggNC4wOTU5NTExOSw0LjAwNTE5MDgxIEw0LjI1LDQgTDE2Ljc1LDQgQzE3Ljk0MDg2NCw0IDE4LjkxNTY0NDksNC45MjUxNjE1OSAxOC45OTQ4MDkyLDYuMDk1OTUxMTkgTDE5LDYuMjUgTDE5LDcgTDE5Ljc1LDcgQzIwLjk0MDg2NCw3IDIxLjkxNTY0NDksNy45MjUxNjE1OSAyMS45OTQ4MDkyLDkuMDk1OTUxMTkgTDIyLDkuMjUgTDIyLDE2Ljc1IEMyMiwxOC40ODMwMzE1IDIwLjY0MzU0NTIsMTkuODk5MjQ1OSAxOC45MzQ0MjM5LDE5Ljk5NDg1NTIgTDE4Ljc1LDIwIEw1LjI1LDIwIEwxOC43NSwyMCBaIE01LjI1LDE4LjUgTDE4Ljc1LDE4LjUgQzE5LjY2ODE3MzQsMTguNSAyMC40MjExOTIzLDE3Ljc5Mjg4OTcgMjAuNDk0MTk4OCwxNi44OTM1MjcyIEwyMC41LDE2Ljc1IEwyMC41LDkuMjUgQzIwLjUsOC44NzAzMDQyMyAyMC4yMTc4NDYxLDguNTU2NTA5MDQgMTkuODUxNzcwNiw4LjUwNjg0NjYyIEwxOS43NSw4LjUgTDE5LDguNSBMMTksMTYuMjUgQzE5LDE2LjYyOTY5NTggMTguNzE3ODQ2MSwxNi45NDM0OTEgMTguMzUxNzcwNiwxNi45OTMxNTM0IEwxOC4yNSwxNyBDMTcuODcwMzA0MiwxNyAxNy41NTY1MDksMTYuNzE3ODQ2MSAxNy41MDY4NDY2LDE2LjM1MTc3MDYgTDE3LjUsMTYuMjUgTDE3LjUsNi4yNSBDMTcuNSw1Ljg3MDMwNDIzIDE3LjIxNzg0NjEsNS41NTY1MDkwNCAxNi44NTE3NzA2LDUuNTA2ODQ2NjIgTDE2Ljc1LDUuNSBMNC4yNSw1LjUgQzMuODcwMzA0MjMsNS41IDMuNTU2NTA5MDQsNS43ODIxNTM4OCAzLjUwNjg0NjYyLDYuMTQ4MjI5NDQgTDMuNSw2LjI1IEwzLjUsMTYuNzUgQzMuNSwxNy42NjgxNzM0IDQuMjA3MTEwMjcsMTguNDIxMTkyMyA1LjEwNjQ3Mjc5LDE4LjQ5NDE5ODggTDUuMjUsMTguNSBMMTguNzUsMTguNSBMNS4yNSwxOC41IFogTTEyLjI0NjAwODcsMTQuNSBMMTUuMjUyMjQsMTQuNSBDMTUuNjY2NDUzNiwxNC41IDE2LjAwMjI0LDE0LjgzNTc4NjQgMTYuMDAyMjQsMTUuMjUgQzE2LjAwMjI0LDE1LjYyOTY5NTggMTUuNzIwMDg2MSwxNS45NDM0OTEgMTUuMzU0MDEwNiwxNS45OTMxNTM0IEwxNS4yNTIyNCwxNiBMMTIuMjQ2MDA4NywxNiBDMTEuODMxNzk1MSwxNiAxMS40OTYwMDg3LDE1LjY2NDIxMzYgMTEuNDk2MDA4NywxNS4yNSBDMTEuNDk2MDA4NywxNC44NzAzMDQyIDExLjc3ODE2MjUsMTQuNTU2NTA5IDEyLjE0NDIzODEsMTQuNTA2ODQ2NiBMMTIuMjQ2MDA4NywxNC41IEwxNS4yNTIyNCwxNC41IEwxMi4yNDYwMDg3LDE0LjUgWiBNOS4yNDMyODMyNiwxMS4wMDQ0NzY3IEM5LjY1NzQ5NjgyLDExLjAwNDQ3NjcgOS45OTMyODMyNiwxMS4zNDAyNjMyIDkuOTkzMjgzMjYsMTEuNzU0NDc2NyBMOS45OTMyODMyNiwxNS4yNSBDOS45OTMyODMyNiwxNS42NjQyMTM2IDkuNjU3NDk2ODIsMTYgOS4yNDMyODMyNiwxNiBMNS43NDc3NiwxNiBDNS4zMzM1NDY0NCwxNiA0Ljk5Nzc2LDE1LjY2NDIxMzYgNC45OTc3NiwxNS4yNSBMNC45OTc3NiwxMS43NTQ0NzY3IEM0Ljk5Nzc2LDExLjM0MDI2MzIgNS4zMzM1NDY0NCwxMS4wMDQ0NzY3IDUuNzQ3NzYsMTEuMDA0NDc2NyBMOS4yNDMyODMyNiwxMS4wMDQ0NzY3IFogTTguNDkzMjgzMjYsMTIuNTA0NDc2NyBMNi40OTc3NiwxMi41MDQ0NzY3IEw2LjQ5Nzc2LDE0LjUgTDguNDkzMjgzMjYsMTQuNSBMOC40OTMyODMyNiwxMi41MDQ0NzY3IFogTTEyLjI0NjAwODcsMTEuMDA0NDc2NyBMMTUuMjUyMjQsMTEuMDA0NDc2NyBDMTUuNjY2NDUzNiwxMS4wMDQ0NzY3IDE2LjAwMjI0LDExLjM0MDI2MzIgMTYuMDAyMjQsMTEuNzU0NDc2NyBDMTYuMDAyMjQsMTIuMTM0MTcyNSAxNS43MjAwODYxLDEyLjQ0Nzk2NzcgMTUuMzU0MDEwNiwxMi40OTc2MzAxIEwxNS4yNTIyNCwxMi41MDQ0NzY3IEwxMi4yNDYwMDg3LDEyLjUwNDQ3NjcgQzExLjgzMTc5NTEsMTIuNTA0NDc2NyAxMS40OTYwMDg3LDEyLjE2ODY5MDMgMTEuNDk2MDA4NywxMS43NTQ0NzY3IEMxMS40OTYwMDg3LDExLjM3NDc4MSAxMS43NzgxNjI1LDExLjA2MDk4NTggMTIuMTQ0MjM4MSwxMS4wMTEzMjM0IEwxMi4yNDYwMDg3LDExLjAwNDQ3NjcgTDE1LjI1MjI0LDExLjAwNDQ3NjcgTDEyLjI0NjAwODcsMTEuMDA0NDc2NyBaIE01Ljc0Nzc2LDcuNTAyNDcyMzggTDE1LjI1MjI0LDcuNTAyNDcyMzggQzE1LjY2NjQ1MzYsNy41MDI0NzIzOCAxNi4wMDIyNCw3LjgzODI1ODgyIDE2LjAwMjI0LDguMjUyNDcyMzggQzE2LjAwMjI0LDguNjMyMTY4MTQgMTUuNzIwMDg2MSw4Ljk0NTk2MzM0IDE1LjM1NDAxMDYsOC45OTU2MjU3NiBMMTUuMjUyMjQsOS4wMDI0NzIzOCBMNS43NDc3Niw5LjAwMjQ3MjM4IEM1LjMzMzU0NjQ0LDkuMDAyNDcyMzggNC45OTc3Niw4LjY2NjY4NTk0IDQuOTk3NzYsOC4yNTI0NzIzOCBDNC45OTc3Niw3Ljg3Mjc3NjYxIDUuMjc5OTEzODgsNy41NTg5ODE0MiA1LjY0NTk4OTQ0LDcuNTA5MzE4OTkgTDUuNzQ3NzYsNy41MDI0NzIzOCBMMTUuMjUyMjQsNy41MDI0NzIzOCBMNS43NDc3Niw3LjUwMjQ3MjM4IFoiIGlkPSLwn46oLUNvbG9yIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
        text: "\xa0Insert Excerpt",
        onclick: function () {
          var html = "<!--  TMPL:EXCERPT -->";
          html +=
            '<table class="bdr:collapse mar:tp-0 mar:bt+0.5 wd:100% web[dsp:none]"><tbody class="fnt:siz-1"><tr><td class="bdr:so-1x bdr:bas+3 bkg:tint-bas+1 cnr:arch-x-small pad:+0.5" id="';
          html += randomID;
          html +=
            '"></td><td class="mce[dsp:none]"><!--more--></td></tr></tbody></table>';
          html += "<!-- /TMPL:EXCERPT -->";
          editor.execCommand("mceInsertContent", false, html);
          var newTag = editor.dom.select("td#" + randomID)[0];
          editor.selection.setCursorLocation(newTag);
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNOS40IDE2LjZMNC44IDEybDQuNi00LjZMOCA2bC02IDYgNiA2IDEuNC0xLjR6bTUuMiAwbDQuNi00LjYtNC42LTQuNkwxNiA2bDYgNi02IDYtMS40LTEuNHoiLz48L3N2Zz4=",
        text: "\xa0Code",
        onclick: function () {
          var txt = editor.selection.getContent({ format: "text" });
          var html = "<code>";
          html += encodeURI(txt).replace(/%(\w\w)/g, "&#x$1;");
          html += "</code>";
          editor.execCommand("mceReplaceContent", false, html);
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNSw3SDEwLjVMMTYsMjFIMTMuNkwxMi41LDE4SDYuM0w1LjIsMjFIM0w4LjUsN003LjEsMTZIMTEuOUw5LjUsOS43TDcuMSwxNk0yMiw1VjdIMTlWMTBIMTdWN0gxNFY1SDE3VjJIMTlWNUgyMloiIC8+PC9zdmc+",
        text: "\xa0Insert Redline",
        onclick: function () {
          editor.execCommand(
            "mceReplaceContent",
            false,
            "<ins>{$selection}</ins>"
          );
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjUsN0g4LjVMMywyMUg1LjJMNi4zLDE4SDEyLjVMMTMuNiwyMUgxNkwxMC41LDdNNy4xLDE2TDkuNSw5LjdMMTEuOSwxNkg3LjFNMjIsN0gxNFY1SDIyVjdaIiAvPjwvc3ZnPg==",
        text: "\xa0Delete Redline",
        onclick: function () {
          editor.execCommand(
            "mceReplaceContent",
            false,
            "<del>{$selection}</del>"
          );
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDguNDFMMTYuNTkgMTMgMTggMTEuNTlsLTYtNi02IDZMNy40MSAxMyAxMiA4LjQxek02IDE4aDEydi0ySDZ2MnoiLz48L3N2Zz4=",
        text: "\xa0Acronym",
        onclick: function () {
          editor.execCommand(
            "mceReplaceContent",
            false,
            "<abbr>{$selection}</abbr>"
          );
        },
      },
      {
        icon: true,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDRWMUw4IDVsNCA0VjZjMy4zMSAwIDYgMi42OSA2IDYgMCAxLjAxLS4yNSAxLjk3LS43IDIuOGwxLjQ2IDEuNDZDMTkuNTQgMTUuMDMgMjAgMTMuNTcgMjAgMTJjMC00LjQyLTMuNTgtOC04LTh6bTAgMTRjLTMuMzEgMC02LTIuNjktNi02IDAtMS4wMS4yNS0xLjk3LjctMi44TDUuMjQgNy43NEM0LjQ2IDguOTcgNCAxMC40MyA0IDEyYzAgNC40MiAzLjU4IDggOCA4djNsNC00LTQtNHYzeiIvPjwvc3ZnPg==",
        text: "\xa0Chr Substitution",
        onclick: function () {
          var mceCHR = editor.selection.getContent({
            format: "text",
          });
          switch (mceCHR) {
            case "(c)":
              editor.selection.setContent("&#0169;");
              break;
            case "(C)":
              editor.selection.setContent("&#0169;");
              break;
            case "(r)":
              editor.selection.setContent("&#0174;");
              break;
            case "(R)":
              editor.selection.setContent("&#0174;");
              break;
            case "#":
              editor.selection.setContent("&#9632;");
              break;
            case "$":
              editor.selection.setContent("&#0167;");
              break;
            case "*":
              editor.selection.setContent("&#9679;");
              break;
            case "0":
              editor.selection.setContent("&#176;");
              break;
            case "+/-":
              editor.selection.setContent("&#177;");
              break;
            case "x":
              editor.selection.setContent("&#215;");
              break;
            case "X":
              editor.selection.setContent("&#215;");
              break;
            case "1/3":
              editor.selection.setContent("&#8531;");
              break;
            case "1/4":
              editor.selection.setContent("&#188;");
              break;
            case "1/2":
              editor.selection.setContent("&#189;");
              break;
            case "2/3":
              editor.selection.setContent("&#8532;");
              break;
            case "3/4":
              editor.selection.setContent("&#190;");
              break;
            case "...":
              editor.selection.setContent("&#8230;");
              break;
            case "<-":
              editor.selection.setContent("&#8592;");
              break;
            case "->":
              editor.selection.setContent("&#8594;");
              break;
            case "<":
              editor.selection.setContent("&#9668;");
              break;
            case ">":
              editor.selection.setContent("&#9658;");
              break;
            default:
              alert("Substitution character not found!");
          }
        },
      },
    ],
  });
});
/* 
  END: mce toolbar
  EOF: add-misc-opts / plugin.js / 21.09.17
*/
